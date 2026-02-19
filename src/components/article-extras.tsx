"use client";

import React, { useRef, useState } from "react";
import { ChevronDown, ChevronUp, Link as LinkIcon, ArrowRight, Share2, Facebook, Twitter, Linkedin, MessageSquare, Minus, Plus, Search, Volume2, Pause, Play, Square, Settings } from "lucide-react";
import { useEffect } from "react";

// --- Original Components Restored Below ---

export function ArticleProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-stone-100 z-50">
      <div
        className="h-full bg-brand-primary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ArticleShareInline({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 py-8 border-y border-stone-200 my-8">
      <span className="font-heading text-xs font-bold uppercase tracking-widest text-stone-500">Share this story</span>
      <div className="flex gap-2">
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <Facebook className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <Twitter className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <Linkedin className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <LinkIcon className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
      </div>
    </div>
  );
}

export function ArticleShareRail({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Share</span>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on X">
        <i className="ri-twitter-x-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Facebook">
        <i className="ri-facebook-box-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Pinterest">
        <i className="ri-pinterest-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on LinkedIn">
        <i className="ri-linkedin-box-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <div className="h-px w-6 bg-stone-200 mx-auto my-1" />
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Copy Link">
        <i className="ri-link text-lg group-hover:scale-110 transition-transform"></i>
      </button>
    </div>
  );
}

export function ArticleClap() {
  const [claps, setClaps] = useState(0);
  const [isClapping, setIsClapping] = useState(false);

  const handleClap = () => {
    setClaps(c => c + 1);
    setIsClapping(true);
    setTimeout(() => setIsClapping(false), 800);
  };

  return (
    <div className="relative z-10 w-fit">
      <button
        onClick={handleClap}
        className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex flex-col items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 transition-all group"
        aria-label="Clap for this article"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 h-6 text-brand-primary group-hover:text-brand-dark fill-current transition-colors">
          <path d="M408 72L408 136C408 149.3 397.3 160 384 160C370.7 160 360 149.3 360 136L360 72C360 58.7 370.7 48 384 48C397.3 48 408 58.7 408 72zM284 74.7L316 122.7C323.4 133.7 320.4 148.6 309.3 156C298.2 163.4 283.4 160.4 276 149.3L244 101.3C236.6 90.3 239.6 75.4 250.7 68C261.8 60.6 276.6 63.7 284 74.7zM199 183C208.4 173.6 223.6 173.6 232.9 183L356.7 306.7C366.8 316.8 384 309.6 384 295.4L384 256C384 238.3 398.3 224 416 224C433.7 224 448 238.3 448 256L448 409.6C448 466.7 418 519.6 369.1 549C305.1 587.4 223.3 577.3 170.6 524.6L71 425C61.6 415.6 61.6 400.4 71 391.1C80.4 381.8 95.6 381.7 104.9 391.1L157.9 444.1C164 450.2 173.9 450.2 180 444.1C186.1 438 186.1 428.1 180 422L87 329C77.6 319.6 77.6 304.4 87 295.1C96.4 285.8 111.6 285.7 120.9 295.1L213.9 388.1C220 394.2 229.9 394.2 236 388.1C242.1 382 242.1 372.1 236 366L119 249C109.6 239.6 109.6 224.4 119 215.1C128.4 205.8 143.6 205.7 152.9 215.1L269.9 332.1C276 338.2 285.9 338.2 292 332.1C298.1 326 298.1 316.1 292 310L199 217C189.6 207.6 189.6 192.4 199 183.1zM497.1 548.9C472.9 563.4 446.2 571 419.4 572C467.5 532.4 496 473 496 409.6L496 311.5C504.2 311.4 512 305.1 512 295.5L512 256.1C512 238.4 526.3 224.1 544 224.1C561.7 224.1 576 238.4 576 256.1L576 409.7C576 466.8 546 519.7 497.1 549.1zM517.3 68C528.3 75.4 531.3 90.3 524 101.3L492 149.3C484.6 160.3 469.7 163.3 458.7 156C447.7 148.7 444.7 133.7 452 122.7L484 74.7C491.4 63.7 506.3 60.7 517.3 68z" />
        </svg>
        {isClapping && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-brand-primary font-bold animate-clap-float pointer-events-none">
            +1
          </div>
        )}
      </button>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-stone-400 font-body">
        {claps > 0 ? claps : ''}
      </span>
    </div>
  )
}

export function ArticleActionsMobile({ title }: { title: string }) {
  return (
    <div className="lg:hidden flex items-center justify-between py-6 border-t border-stone-200 mt-10">
      <div className="flex flex-col gap-3">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400">Share</span>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on X">
            <i className="ri-twitter-x-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Facebook">
            <i className="ri-facebook-box-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Pinterest">
            <i className="ri-pinterest-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on LinkedIn">
            <i className="ri-linkedin-box-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <div className="w-px h-6 bg-stone-200 mx-1 self-center" />
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Copy Link">
            <i className="ri-link text-lg group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400">Clap</span>
        <ArticleClap />
      </div>
    </div>
  );
}

export function ArticleTextSizeControls() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    document.documentElement.style.setProperty('--story-scale', scale.toString());
  }, [scale]);

  const resetScale = () => setScale(1);

  return (
    <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-full p-1 w-fit shadow-sm">
      <button
        onClick={() => setScale(Math.max(0.8, scale - 0.1))}
        className="w-10 h-8 rounded-l-full flex items-center justify-center hover:bg-stone-50 text-stone-500 transition-all disabled:opacity-30"
        disabled={scale <= 0.8}
        aria-label="Decrease font size"
      >
        <span className="text-xs font-body font-bold">A-</span>
      </button>

      <div className="h-4 w-px bg-stone-200"></div>

      <button
        onClick={resetScale}
        className="px-3 h-8 flex items-center justify-center hover:bg-stone-50 text-stone-400 hover:text-brand-primary transition-all"
        aria-label="Reset font size"
      >
        <span className="text-[10px] font-body font-bold uppercase tracking-wider">Reset</span>
      </button>

      <div className="h-4 w-px bg-stone-200"></div>

      <button
        onClick={() => setScale(Math.min(1.5, scale + 0.1))}
        className="w-10 h-8 rounded-r-full flex items-center justify-center hover:bg-stone-50 text-stone-500 transition-all disabled:opacity-30"
        disabled={scale >= 1.5}
        aria-label="Increase font size"
      >
        <span className="text-sm font-body font-bold">A+</span>
      </button>
    </div>
  );
}

// Voice presets — mapped to generic gender choices for Chatterbox backend.
const TTS_VOICES = [
  { id: 'female', label: 'Female', description: 'Default female voice' },
  { id: 'male', label: 'Male', description: 'Default male voice' },
] as const;

type TtsVoiceId = typeof TTS_VOICES[number]['id'];

// Split long text into chunks ≤ 4800 chars at sentence boundaries
function chunkText(text: string, maxLen = 4800): string[] {
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > maxLen) {
    let cut = remaining.lastIndexOf('. ', maxLen);
    if (cut === -1) cut = maxLen;
    else cut += 1;
    chunks.push(remaining.slice(0, cut).trim());
    remaining = remaining.slice(cut).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

// Scrape article content — headline, excerpt, body only (no authors/dates/newsletter)
function scrapeArticleText(): string {
  const fragments: string[] = [];

  // 1. Headline
  const headline = document.querySelector('h1');
  if (headline) fragments.push(headline.textContent?.trim() || '');

  // 2. Excerpt / subheadline
  const excerpt =
    document.querySelector('article > p.font-serif') ||
    document.querySelector('.story-content p:first-child');
  if (excerpt) {
    const t = excerpt.textContent?.trim() || '';
    if (t && !fragments.includes(t)) fragments.push(t);
  }

  // 3. Main article sections (skip newsletter, forms, subscribe blocks)
  const storyContent = document.querySelector('.story-content');
  if (storyContent) {
    Array.from(storyContent.querySelectorAll('p, h2, h3')).forEach(el => {
      const text = el.textContent?.trim();
      if (!text) return;
      const skip =
        el.closest('.bg-brand-light') ||
        el.closest('form') ||
        text.toLowerCase().includes('subscribe') ||
        text.toLowerCase().includes('newsletter');
      if (!skip && !fragments.includes(text)) fragments.push(text);
    });
  }

  return fragments.join('. ');
}

function getCurrentLanguageCode(): string {
  const htmlLang = document.documentElement.lang?.toLowerCase().trim();
  if (htmlLang) return htmlLang;

  const cookieMatch = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (cookieMatch?.[1]) {
    const parts = decodeURIComponent(cookieMatch[1]).split('/');
    const maybeLang = parts[parts.length - 1]?.toLowerCase().trim();
    if (maybeLang) return maybeLang;
  }

  return 'en';
}

function normalizeLanguageCode(code: string): string {
  const raw = code.toLowerCase();
  const map: Record<string, string> = {
    'en-us': 'en',
    'en-gb': 'en',
    'fr-fr': 'fr',
    'es-es': 'es',
    'es-419': 'es',
    'pt-br': 'pt',
    'pt-pt': 'pt',
    'zh-cn': 'zh',
    'zh-tw': 'zh',
    'zh-hk': 'zh',
    'ar-sa': 'ar',
  };

  if (map[raw]) return map[raw];
  if (raw.includes('-')) return raw.split('-')[0];
  return raw || 'en';
}

export function ArticleAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<TtsVoiceId>('female');
  const [rate, setRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioLanguage, setAudioLanguage] = useState("en");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Keep audio playback rate in sync with rate slider
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    setAudioLanguage(normalizeLanguageCode(getCurrentLanguageCode()));
  }, []);

  const isEnglish = audioLanguage === "en";

  const fetchAndPlayChunk = async (chunkIndex: number, voice: TtsVoiceId, language: string) => {
    const chunks = chunksRef.current;
    if (chunkIndex >= chunks.length) {
      // All chunks played — done
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    setIsLoading(chunkIndex === 0); // show loading only on first chunk

    try {
      abortRef.current = new AbortController();
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: chunks[chunkIndex],
          voice,
          rate,
          language,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'TTS failed' }));
        const detail =
          typeof err?.detail === 'string'
            ? err.detail
            : err?.detail?.message || err?.detail?.error || '';
        throw new Error(detail || err.error || 'TTS request failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.playbackRate = rate;
      audioRef.current = audio;

      audio.oncanplay = () => setIsLoading(false);

      audio.onended = () => {
        URL.revokeObjectURL(url);
        chunkIndexRef.current = chunkIndex + 1;
        fetchAndPlayChunk(chunkIndex + 1, voice, language);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
        setError('Playback error. Please try again.');
      };

      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return; // user stopped
      console.error('[ArticleAudioPlayer] TTS playback failed:', err);
      setIsPlaying(false);
      setIsLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : 'Chatterbox audio failed. Check your TTS server connection.'
      );
    }
  };

  const handlePlay = () => {
    const language = normalizeLanguageCode(getCurrentLanguageCode());
    if (language !== "en") {
      setError("Audio is currently available in English only.");
      return;
    }

    if (isPaused && audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Fresh start — scrape content and begin
    const text = scrapeArticleText();
    if (!text) { setError('No article content found.'); return; }

    chunksRef.current = chunkText(text);
    chunkIndexRef.current = 0;
    setError(null);
    fetchAndPlayChunk(0, selectedVoice, language);
  };

  const handlePause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    chunksRef.current = [];
    chunkIndexRef.current = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoading(false);
    setError(null);
  };

  // When voice changes mid-session, restart from beginning
  const handleVoiceChange = (v: TtsVoiceId) => {
    handleStop();
    setSelectedVoice(v);
  };

  return (
    <div
      className={`flex items-center gap-1 border rounded-full p-1 shadow-sm h-[42px] relative ${
        isEnglish ? "bg-white border-stone-200" : "bg-stone-100 border-stone-300 opacity-70"
      }`}
    >
      {/* Play / Pause / Resume button area */}
      {!isPlaying && !isPaused ? (
        <button
          onClick={handlePlay}
          disabled={isLoading || !isEnglish}
          className="px-4 h-full flex items-center justify-center gap-2 hover:bg-stone-50 text-stone-600 hover:text-brand-primary transition-all rounded-full group disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Listen to article"
        >
          {isLoading ? (
            <svg className="w-4 h-4 animate-spin text-brand-primary" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          )}
          <span className="text-[10px] font-body font-bold uppercase tracking-wider">
            {isLoading ? 'Loading…' : 'Listen'}
          </span>
        </button>
      ) : (
        <div className="flex items-center h-full gap-1">
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="w-8 h-full flex items-center justify-center hover:bg-stone-50 text-brand-primary transition-all rounded-l-full"
              aria-label="Pause"
            >
              <Pause className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="w-8 h-full flex items-center justify-center hover:bg-stone-50 text-brand-primary transition-all rounded-l-full"
              aria-label="Resume"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          )}
          <div className="h-4 w-px bg-stone-200" />
          <button
            onClick={handleStop}
            className="w-8 h-full flex items-center justify-center hover:bg-stone-50 text-stone-400 hover:text-red-500 transition-all group"
            aria-label="Stop"
          >
            <Square className="w-3 h-3 fill-current group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      <div className="h-4 w-px bg-stone-200" />

      {/* Settings toggle */}
      <button
        onClick={() => isEnglish && setShowSettings(!showSettings)}
        disabled={!isEnglish}
        className={`w-10 h-full flex items-center justify-center rounded-r-full hover:bg-stone-50 transition-all disabled:cursor-not-allowed ${showSettings ? 'text-brand-primary' : 'text-stone-400'}`}
        aria-label="Audio settings"
      >
        <Settings className={`w-4 h-4 ${showSettings ? 'rotate-45' : ''} transition-transform duration-200`} />
      </button>

      {/* Error message */}
      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-50 border border-red-200 text-red-600 text-[10px] font-body rounded-lg px-3 py-2 z-50">
          {error}
        </div>
      )}

      {!isEnglish && !error && (
        <div className="absolute top-full mt-2 right-0 bg-stone-100 border border-stone-300 text-stone-600 text-[10px] font-body rounded-lg px-3 py-2 z-50">
          Audio available in English only.
        </div>
      )}

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white border border-stone-200 rounded-2xl shadow-xl z-50 p-5 font-body">
          <div className="space-y-5">

            {/* Voice selector — 3 pill buttons */}
            <div>
              <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">
                Voice
              </label>
              <div className="flex gap-2">
                {TTS_VOICES.map(v => (
                  <button
                    key={v.id}
                    onClick={() => handleVoiceChange(v.id)}
                    className={`flex-1 py-2 px-2 rounded-lg border text-center transition-all ${selectedVoice === v.id
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-brand-primary/40'
                      }`}
                  >
                    <div className="text-[11px] font-body font-semibold">{v.label}</div>
                    <div className={`text-[8px] font-body mt-0.5 ${selectedVoice === v.id ? 'text-white/70' : 'text-stone-400'}`}>
                      {v.description.split(' · ')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Speed slider */}
            <div>
              <label className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2 flex justify-between">
                Reading Speed <span>{rate}×</span>
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.25"
                  value={rate}
                  onChange={e => setRate(parseFloat(e.target.value))}
                  className="w-full accent-brand-primary h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs font-body font-normal text-black">
                  <span>Slow</span><span>Normal</span><span>Fast</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}


export function FeaturedImageWithCaption({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-10">
      <div className="rounded-xl overflow-hidden bg-stone-100 relative aspect-video shadow-sm">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-left text-xs text-stone-500 font-body border-b border-stone-100 pb-3 inline-block w-full">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

interface TaxonomyItem {
  name: string;
  slug: string;
}

interface ArticleExtrasProps {
  authors: Author[];
  categories: TaxonomyItem[];
  tags: TaxonomyItem[];
  primaryCategoryName?: string;
  seriesName?: string;
}

export function SeriesCallout({ seriesName }: { seriesName: string }) {
  return (
    <div className="bg-brand-light/40 p-8 md:p-12 rounded-[2rem] my-12 text-center border border-brand-primary/10">
      <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-dark leading-tight mb-4">
        This story is being curated under our <span className="text-brand-primary">"{seriesName}"</span> series.
      </h3>
      <p className="font-body text-stone-600 text-sm mb-8 max-w-xl mx-auto">
        Dive deeper into the intersection of technology, culture, and progress with more stories from this collection.
      </p>
      <a
        href={`/category/${seriesName.toLowerCase().replace(/\s+/g, '-')}`}
        className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-primary text-white text-sm font-heading font-bold rounded-lg hover:bg-brand-dark transition-all shadow-sm hover:shadow-md active:scale-95"
      >
        Explore Series <ArrowRight className="w-4 h-4 text-white" />
      </a>
    </div>
  );
}

export function TagsSection({ tags, limit = 11 }: { tags: TaxonomyItem[]; limit?: number }) {
  const [showAll, setShowAll] = useState(false);
  const displayTags = showAll ? tags : tags.slice(0, limit);

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-col h-full">
      <p className="font-heading text-[12px] uppercase tracking-widest text-stone-500 mb-4 px-2">Tags</p>
      <div className="flex flex-wrap gap-2 transition-all duration-300">
        {displayTags.map((tag) => (
          <a
            key={tag.slug}
            href={`/tag/${tag.slug}`}
            className="px-4 py-1.5 rounded-full border border-stone-200 bg-stone-50/50 text-xs font-body font-semibold text-black hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-dark transition-all"
          >
            {tag.name}
          </a>
        ))}
      </div>
      {tags.length > limit && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-stone-400 hover:text-brand-primary text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-1 mt-4 self-start px-2"
        >
          {showAll ? (
            <>Show Less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Show More <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  );
}
export function AuthorSection({ authors }: { authors: { name: string; avatar?: string; bio?: string }[] }) {
  if (!authors.length) return null;

  return (
    <div className="border-t border-stone-200 pt-12 mt-12">
      <p className="font-heading text-xs font-bold uppercase tracking-widest text-stone-400 mb-8 px-2">Written By</p>
      <div className="grid grid-cols-1 gap-10">
        {authors.map((author, i) => (
          <div key={i} className="flex items-center gap-6 group px-2">
            <a
              href={`/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200 shadow-sm hover:border-brand-primary/30 transition-all"
            >
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-50">
                  <span className="text-2xl font-bold">{author.name.charAt(0)}</span>
                </div>
              )}
            </a>
            <div className="flex-1">
              <a
                href={`/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-heading font-bold text-lg text-brand-dark hover:text-brand-primary hover:underline transition-colors block mb-1"
              >
                {author.name}
              </a>
              <p className="font-body text-stone-600 text-sm leading-relaxed max-w-xl">
                {author.bio || `${author.name} is a contributing writer at Susinsight, exploring systems and progress across Africa.`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryGroup({ label, categories, showMoreThreshold = 0 }: { label: string; categories: TaxonomyItem[]; showMoreThreshold?: number }) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = (showMoreThreshold > 0 && !showAll) ? categories.slice(0, showMoreThreshold) : categories;

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-x-4 gap-y-3 mb-6 last:mb-0">
      <h4 className="font-heading text-[12px] font-bold uppercase tracking-widest text-stone-500 whitespace-nowrap min-w-[100px]">{label}:</h4>
      <div className="flex flex-wrap gap-2 flex-1 items-center">
        {displayItems.map(cat => (
          <a
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="px-4 py-1.5 rounded-full border border-stone-200 bg-stone-50/50 text-xs font-body font-semibold text-black hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-all"
          >
            {cat.name}
          </a>
        ))}
        {showMoreThreshold > 0 && categories.length > showMoreThreshold && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[10px] font-heading font-bold uppercase tracking-widest text-stone-400 hover:text-brand-primary transition-colors ml-1"
          >
            {showAll ? "Show Less" : `+${categories.length - showMoreThreshold} More`}
          </button>
        )}
      </div>
    </div>
  );
}

export function ArticleExtras({ authors, categories, tags, primaryCategoryName, seriesName }: ArticleExtrasProps) {
  // Filter out the primary category from the categories list
  const secondaryCategories = categories.filter(cat => cat.name !== primaryCategoryName);

  // Grouping logic
  const regions = ["Across Africa", "West Africa", "East Africa", "North Africa", "Southern Africa", "Central Africa"];
  const sdgKeywords = ["Energy", "Climate", "Growth", "Infrastructure", "Education", "Inequality", "Consumption", "Cities", "Poverty", "Hunger", "Health", "Gender", "Water", "Work", "Life", "Justice", "Partnerships"];

  const grouped = {
    Region: secondaryCategories.filter(cat => regions.includes(cat.name)),
    Series: secondaryCategories.filter(cat => cat.name === "Tech for Tomorrow" || cat.name === seriesName),
    "World Days": secondaryCategories.filter(cat =>
      !regions.includes(cat.name) &&
      cat.name !== "Tech for Tomorrow" &&
      cat.name !== seriesName &&
      cat.name.toLowerCase().includes("day")
    ),
    SDGs: secondaryCategories.filter(cat =>
      !regions.includes(cat.name) &&
      cat.name !== "Tech for Tomorrow" &&
      cat.name !== seriesName &&
      !cat.name.toLowerCase().includes("day") &&
      sdgKeywords.some(sdg => cat.name.includes(sdg))
    ),
    Other: secondaryCategories.filter(cat =>
      !regions.includes(cat.name) &&
      cat.name !== "Tech for Tomorrow" &&
      cat.name !== seriesName &&
      !cat.name.toLowerCase().includes("day") &&
      !sdgKeywords.some(sdg => cat.name.includes(sdg))
    )
  };

  return (
    <div className="space-y-12 mt-16">
      <AuthorSection authors={authors} />

      {/* Categories / Filed Under Section */}
      {secondaryCategories.length > 0 && (
        <div className="border-t border-stone-200 pt-12">
          <p className="font-heading text-[12px] uppercase tracking-widest text-stone-500 mb-4 px-2">Filed Under</p>
          <div className="space-y-6 px-2">
            <CategoryGroup label="Region" categories={grouped.Region} />
            <CategoryGroup label="Series" categories={grouped.Series} />
            <CategoryGroup label="SDGs" categories={grouped.SDGs} showMoreThreshold={5} />
            <CategoryGroup label="World Days" categories={grouped["World Days"]} showMoreThreshold={5} />
            <CategoryGroup label="Themes" categories={grouped.Other} showMoreThreshold={5} />
          </div>
        </div>
      )}

      {/* Tags Section */}
      <div className="border-t border-stone-200 pt-12">
        <TagsSection tags={tags} />
      </div>
    </div>
  );
}
