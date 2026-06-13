'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(value, setDisplayValue);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="proof-item" ref={ref}>
      <strong>{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
}

function animateValue(
  target: string,
  setter: (val: string) => void
) {
  // Extract numeric portion and suffix
  const match = target.match(/^([\d.]+)(.*)$/);
  if (!match) {
    setter(target);
    return;
  }

  const numericTarget = parseFloat(match[1]);
  const suffix = match[2]; // e.g., '%', '+ yrs', etc.
  const duration = 1200;
  const startTime = performance.now();
  const isInteger = Number.isInteger(numericTarget);

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = numericTarget * eased;

    if (isInteger) {
      setter(`${Math.round(current)}${suffix}`);
    } else {
      setter(`${current.toFixed(1)}${suffix}`);
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      setter(target);
    }
  }

  requestAnimationFrame(step);
}
