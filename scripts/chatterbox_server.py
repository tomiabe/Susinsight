#!/usr/bin/env python3
import io
import os
from typing import Optional

import torchaudio
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel

from chatterbox.tts_turbo import ChatterboxTurboTTS


class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = "female"
    language: Optional[str] = "en"
    rate: Optional[float] = 1.0


def normalize_lang(language: str | None) -> str:
    if not language:
        return "en"
    raw = language.lower().strip()
    mapping = {
        "en-us": "en",
        "en-gb": "en",
        "fr-fr": "fr",
        "es-es": "es",
        "es-419": "es",
        "pt-br": "pt",
        "pt-pt": "pt",
        "zh-cn": "zh",
        "zh-tw": "zh",
        "zh-hk": "zh",
        "ar-sa": "ar",
    }
    raw = mapping.get(raw, raw.split("-")[0] if "-" in raw else raw)
    return raw or "en"


def get_voice_prompt(voice: str | None) -> Optional[str]:
    voice = (voice or "female").lower().strip()
    female_prompt = os.getenv("CHATTERBOX_FEMALE_PROMPT", "").strip()
    male_prompt = os.getenv("CHATTERBOX_MALE_PROMPT", "").strip()

    if voice == "male" and male_prompt:
        return male_prompt
    if voice == "female" and female_prompt:
        return female_prompt
    return None


app = FastAPI(title="Susinsight Chatterbox TTS")

# Load with MPS on Apple Silicon.
_device = "mps"
_model = ChatterboxTurboTTS.from_pretrained(device=_device)


@app.get("/health")
def health():
    return {
        "ok": True,
        "device": _device,
        "mode": "turbo",
        "male_prompt": bool(os.getenv("CHATTERBOX_MALE_PROMPT")),
        "female_prompt": bool(os.getenv("CHATTERBOX_FEMALE_PROMPT")),
    }


@app.post("/tts")
def tts(payload: TTSRequest):
    text = (payload.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")

    _language = normalize_lang(payload.language)
    audio_prompt_path = get_voice_prompt(payload.voice)

    try:
        wav = _model.generate(
            text=text[:5000],
            audio_prompt_path=audio_prompt_path,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"TTS generation failed: {exc}") from exc

    if wav is None:
        raise HTTPException(status_code=500, detail="TTS model returned no audio")

    if wav.dim() == 1:
        wav = wav.unsqueeze(0)

    out = io.BytesIO()
    torchaudio.save(out, wav.detach().cpu(), _model.sr, format="mp3")
    out.seek(0)
    return Response(content=out.read(), media_type="audio/mpeg")
