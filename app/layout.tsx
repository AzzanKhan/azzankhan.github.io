import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Azzan Khan — Lead Full-Stack Engineer',
  description: 'I turn complex ideas into production software — specification-driven, AI-native engineering across healthcare, learning, and enterprise platforms.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('azzan-theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}` }} /></head><body>{children}</body></html>;
}
