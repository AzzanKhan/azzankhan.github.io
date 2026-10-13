import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <main className="page-intro">
    <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />404</p>
    <h1>This page <em>isn&apos;t here.</em></h1>
    <p className="lead">The link may be old or mistyped. Try one of these instead.</p>
    <div className="hero-actions"><Link className="button button-dark" href="/">Back to home</Link><Link className="text-link" href="/work/">View my work</Link></div>
  </main>;
}
