"use client";
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
/** The waitlist has its own navigation and footer. Other routes retain their existing chrome. */
export function RouteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname === '/waitlist' || pathname === '/waitlist/' ? null : children;
}
