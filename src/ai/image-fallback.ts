type FallbackParams = {
  title: string;
  category?: string;
  seed?: number;
};

function sanitize(value: string): string {
  return value.replace(/[<>]/g, "").trim();
}

function pickPalette(category?: string): { start: string; end: string } {
  const key = (category || "").toLowerCase();
  if (key.includes("climate") || key.includes("impact")) return { start: "#2e6f5b", end: "#91c3b3" };
  if (key.includes("business") || key.includes("invest")) return { start: "#1e3a34", end: "#3a8b72" };
  if (key.includes("culture") || key.includes("fiction")) return { start: "#5a3d2b", end: "#a77b57" };
  return { start: "#2e6f5b", end: "#3a8b72" };
}

export function getFallbackImageSrc({ title, category, seed = 1 }: FallbackParams): string {
  const safeTitle = sanitize(title || "Susinsight Story");
  const safeCategory = sanitize(category || "Susinsight");
  const palette = pickPalette(category);

  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${palette.start}' />
      <stop offset='100%' stop-color='${palette.end}' />
    </linearGradient>
  </defs>
  <rect width='1200' height='675' fill='url(#g)' />
  <g opacity='0.15' fill='white'>
    <circle cx='${120 + (seed % 300)}' cy='120' r='80' />
    <circle cx='980' cy='560' r='140' />
  </g>
  <text x='72' y='120' font-family='Arial, sans-serif' font-size='26' fill='white' opacity='0.9'>${safeCategory.toUpperCase()}</text>
  <text x='72' y='220' font-family='Arial, sans-serif' font-size='56' font-weight='700' fill='white'>Susinsight</text>
  <foreignObject x='72' y='260' width='1050' height='300'>
    <div xmlns='http://www.w3.org/1999/xhtml' style='font-family: Arial, sans-serif; font-size: 38px; line-height: 1.25; color: white;'>${safeTitle}</div>
  </foreignObject>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
