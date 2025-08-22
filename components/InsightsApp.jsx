'use client';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { usePathname } from 'next/navigation';

export function InsightsApp() {
  const pathname = usePathname();

  return <SpeedInsights route={pathname} />;
}
