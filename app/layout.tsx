import type { Metadata } from 'next';
import { DM_Mono, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono', display: 'swap' });

const siteUrl = 'https://azzankhan.github.io';
const siteTitle = 'Azzan Khan — Lead Full-Stack Engineer';
const siteDescription = 'Lead Full-Stack Engineer building production software through specification-driven, AI-native engineering across healthcare, learning, and enterprise platforms.';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Azzan Khan',
  url: siteUrl,
  image: `${siteUrl}/media/azzan-portrait.webp`,
  jobTitle: 'Lead Full-Stack Engineer',
  worksFor: { '@type': 'Organization', name: 'CitiusTech' },
  knowsAbout: ['Full-stack engineering', 'Specification-driven development', 'AI-native engineering', 'Node.js', 'Angular', 'React', 'AWS', 'Azure', 'Healthcare software'],
  sameAs: ['https://www.linkedin.com/in/azzan-khan-871958114/', 'https://github.com/azzankhan', 'https://www.youtube.com/@azzankhanofficial'],
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: '%s · Azzan Khan' },
  description: siteDescription,
  keywords: ['Azzan Khan', 'Lead Full-Stack Engineer', 'full-stack developer India', 'specification-driven development', 'AI-native engineering', 'Node.js', 'Angular', 'React', 'AWS', 'healthcare software engineer'],
  authors: [{ name: 'Azzan Khan', url: siteUrl }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Azzan Khan',
    title: siteTitle,
    description: siteDescription,
    locale: 'en_IN',
    images: [{ url: '/media/azzan-portrait.webp', width: 1400, height: 730, alt: 'Azzan Khan' }],
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription, images: ['/media/azzan-portrait.webp'] },
  robots: { index: true, follow: true },
  verification: { google: 'VelD59-gtCXhiwwtqiUY_bK_kf0LOkbAiWev0GLYSSo' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning className={`${manrope.variable} ${dmMono.variable}`}><head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('azzan-theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}` }} /></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /></body></html>;
}
