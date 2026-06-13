'use client';

import AnimatedCounter from './AnimatedCounter';
import type { ProofPoint } from '@/lib/portfolio';

export default function AnimatedProofStrip({ proofPoints }: { proofPoints: ProofPoint[] }) {
  return (
    <div className="proof-strip">
      {proofPoints.map((point) => (
        <AnimatedCounter key={point.label} value={point.value} label={point.label} />
      ))}
    </div>
  );
}
