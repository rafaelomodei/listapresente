const createSvgDataUri = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg)}`;

const createGiftImageSvg = (label: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2a231d" />
        <stop offset="100%" stop-color="#3b2c22" />
      </linearGradient>
    </defs>
    <rect width="480" height="320" rx="24" fill="url(#bg)" />
    <circle cx="376" cy="80" r="64" fill="rgba(217,121,64,0.2)" />
    <circle cx="96" cy="240" r="72" fill="rgba(255,255,255,0.08)" />
    <text x="50%" y="54%" text-anchor="middle" font-size="140" font-family="Inter, Arial, sans-serif" fill="#f5e9dc" opacity="0.9">${label}</text>
  </svg>
`;

const createReservedGiftSvg = () => `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <rect width="480" height="320" rx="24" fill="#1f1b18" />
    <path d="M142 136h196v120a16 16 0 0 1-16 16H158a16 16 0 0 1-16-16V136Z" fill="#d97940" opacity="0.8" />
    <path d="M126 120a16 16 0 0 1 16-16h196a16 16 0 0 1 16 16v24H126v-24Z" fill="#c7997e" />
    <path d="M240 104c-22 0-40-18-40-40 0-14 9-26 22-26 9 0 18 6 26 18 8-12 17-18 26-18 13 0 22 12 22 26 0 22-18 40-40 40h-16Z" fill="#f5e9dc" />
    <rect x="230" y="136" width="20" height="136" fill="#f5e9dc" opacity="0.8" />
  </svg>
`;

export const RESERVED_GIFT_IMAGE = createSvgDataUri(createReservedGiftSvg());

export const getGiftImageSrc = (name: string) => {
  const label = name.trim().charAt(0).toUpperCase() || 'P';
  return createSvgDataUri(createGiftImageSvg(label));
};
