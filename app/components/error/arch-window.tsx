// The homepage's arched window, framing a drawn scene instead of the portrait.
// The scene rolls in like the portrait's blind.
export function ArchWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass aspect-[4/5] h-[clamp(8rem,calc(100svh-30rem),18rem)] rounded-t-full p-2">
      <div className="size-full overflow-hidden rounded-t-full">
        <svg
          viewBox="0 0 160 200"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="size-full motion-safe:animate-blind"
        >
          {children}
        </svg>
      </div>
    </div>
  );
}

// Far shore: two hills overlapping, opaque so whatever is in the sky sits behind them.
function Shore() {
  return (
    <>
      <path d="M0 120 Q30 92 64 110 T128 104 T160 112 V130 H0Z" className="fill-[#7f9fbb] dark:fill-[#2a4767]" />
      <path d="M0 126 Q44 108 92 122 T160 120 V130 H0Z" className="fill-ink" />
    </>
  );
}

// A calm evening: the sun setting over the lake. Used by the 404 page.
export function LakeView() {
  return (
    <>
      <rect width="160" height="200" className="fill-[#f3cf86] dark:fill-night" />
      <circle cx="104" cy="104" r="22" className="fill-ochre-deep/70 dark:fill-ochre/80" />
      <Shore />
      <rect y="128" width="160" height="72" className="fill-lake dark:fill-lake/60" />
      {/* The sun's reflection, broken up by the ripples. */}
      <g className="stroke-[#f3cf86]/70 dark:stroke-ochre/50 [stroke-linecap:round]" strokeWidth="2.5">
        <path d="M92 138h24M96 148h16M90 158h28M98 168h12M94 180h20" />
      </g>
      <g className="stroke-white/25 [stroke-linecap:round]" strokeWidth="1.5">
        <path d="M14 144h30M52 152h22M20 166h18M128 150h18M124 172h24M30 186h36" />
      </g>
    </>
  );
}

// The same view in a storm: low cloud, rain and a lightning strike. Used by the error page.
export function StormView() {
  return (
    <>
      <rect width="160" height="200" className="fill-[#9aa6b4] dark:fill-night" />
      {/* Lightning, drawn before the cloud so it drops out from underneath it. */}
      <path d="M98 60 L86 90 H96 L84 118 L110 82 H99 L108 60Z" className="fill-ochre" />
      <path
        d="M-10 70 Q4 44 30 52 Q42 30 68 40 Q86 22 108 38 Q132 28 146 48 Q170 46 172 70 Q150 82 128 74 Q104 86 80 76 Q56 86 32 76 Q12 84 -10 70Z"
        className="fill-[#5f6d80] dark:fill-[#26344f]"
      />
      <g className="stroke-ink/35 dark:stroke-white/25 [stroke-linecap:round]" strokeWidth="1.5">
        <path d="M18 86l-6 14M42 92l-6 14M64 88l-6 14M130 88l-6 14M148 84l-6 14M30 108l-5 10M140 106l-5 10M54 106l-5 10" />
      </g>
      <Shore />
      <rect y="128" width="160" height="72" className="fill-[#2f5578] dark:fill-lake/45" />
      {/* Choppy water, with a flash of the strike on it. */}
      <g className="stroke-white/30 [stroke-linecap:round] [stroke-linejoin:round]" fill="none" strokeWidth="1.5">
        <path d="M10 144l6-4 6 4 6-4 6 4M60 156l6-4 6 4 6-4 6 4M116 146l6-4 6 4 6-4 6 4M24 176l6-4 6 4 6-4 6 4M104 182l6-4 6 4 6-4 6 4" />
      </g>
      <path d="M88 140h16M92 150h8" strokeWidth="2.5" className="stroke-ochre/60 [stroke-linecap:round]" />
    </>
  );
}
