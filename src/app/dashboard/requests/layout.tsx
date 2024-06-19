import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';

export const metadata = { title: `Solicitudes | Dashboard | ${config.site.name}` } satisfies Metadata;

interface RequestsLayoutProps {
  children: React.ReactNode;
}

export default function RequestsLayout({ children }: RequestsLayoutProps): React.JSX.Element {
  return (
    <div>
      {children}
    </div>
  );
}
