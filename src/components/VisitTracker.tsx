'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.toString();
    const path = `${pathname || '/'}${search ? `?${search}` : ''}`;
    const payload = JSON.stringify({
      path,
      referrer: document.referrer || null,
    });

    if (navigator.sendBeacon) {
      const body = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/visits', body);
      return;
    }

    void fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  }, [pathname, searchParams]);

  return null;
}
