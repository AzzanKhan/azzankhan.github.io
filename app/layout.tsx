import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Azzan Khan — Lead Engineer & Builder',
  description: 'Azzan Khan is a Lead Engineer and full-stack developer building thoughtful digital products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
