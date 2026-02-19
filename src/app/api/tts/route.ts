import { NextRequest, NextResponse } from "next/server";

const DEFAULT_POCKET_TTS_URL = "http://127.0.0.1:8010/tts";

function normalizeLanguage(input: unknown): string {
  if (typeof input !== "string") return "en";
  const raw = input.toLowerCase().trim();
  if (!raw) return "en";
  if (raw.includes("-")) return raw.split("-")[0];
  return raw;
}

function mapVoiceToPocketPreset(voice: string): string {
  // Pocket TTS predefined voices.
  // female -> cosette, male -> marius
  if (voice === "male") return "marius";
  return "cosette";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    const language = normalizeLanguage(body?.language);
    const voice = typeof body?.voice === "string" ? body.voice : "female";

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (language !== "en") {
      return NextResponse.json(
        { error: "Audio is currently available in English only." },
        { status: 422 }
      );
    }

    const endpoint = process.env.POCKET_TTS_API_URL || DEFAULT_POCKET_TTS_URL;
    const form = new FormData();
    form.append("text", text.slice(0, 1200));
    form.append("voice_url", mapVoiceToPocketPreset(voice));

    let upstream: Response;
    try {
      upstream = await fetch(endpoint, {
        method: "POST",
        body: form
      });
    } catch (error) {
      console.error("[TTS] Pocket TTS connection failed:", error);
      return NextResponse.json(
        {
          error: "Pocket TTS service unreachable",
          detail: `Could not connect to ${endpoint}.`
        },
        { status: 503 }
      );
    }

    if (!upstream.ok) {
      const raw = await upstream.text();
      console.error("[TTS] Pocket TTS upstream error:", upstream.status, raw);
      return NextResponse.json(
        { error: "TTS generation failed", detail: raw },
        { status: upstream.status }
      );
    }

    const bytes = await upstream.arrayBuffer();
    const contentType = upstream.headers.get("content-type") || "audio/wav";
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("[TTS] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
