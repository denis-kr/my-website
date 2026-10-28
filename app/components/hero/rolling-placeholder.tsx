import { useEffect, useState } from "react";

const SWAP_MS = 3000;

// Stands in for an input's placeholder and rolls through `phrases`: the current one slides up and out
// while the next slides in from below. Lay it over the input and hide it once the input has a value.
export function RollingPlaceholder({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  // Counts swaps rather than wrapping, so the very first phrase doesn't get a phantom predecessor rolling out.
  const [swaps, setSwaps] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setSwaps((n) => n + 1), SWAP_MS);
    return () => window.clearInterval(timer);
  }, [phrases.length]);

  const index = swaps % phrases.length;
  const previous = (swaps - 1) % phrases.length;

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden whitespace-nowrap ${className}`}
    >
      {/* Keyed on the swap count so both spans remount, and replay their animations, on every swap. */}
      {swaps > 0 && (
        <span
          key={`out-${swaps}`}
          className="absolute inset-0 flex items-center opacity-0 motion-safe:animate-roll-out"
        >
          {phrases[previous]}
        </span>
      )}
      <span
        key={`in-${swaps}`}
        className={`absolute inset-0 flex items-center ${swaps > 0 ? "motion-safe:animate-roll-in" : ""}`}
      >
        {phrases[index]}
      </span>
    </span>
  );
}
