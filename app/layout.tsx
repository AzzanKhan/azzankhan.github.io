import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Azzan Khan — Lead Engineer & Builder',
  description: 'Azzan Khan is a Lead Engineer and full-stack developer building thoughtful digital products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('azzan-theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}` }} /></head><body>{children}</body></html>;
}
