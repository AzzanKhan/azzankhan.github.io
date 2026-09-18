import Link from 'next/link';
import posts from '../../src/content/posts.json';
import ThemeToggle from '../components/theme-toggle';

type Post = (typeof posts)[number];
type Params = { slug?: string[] };

const arrow = <span aria-hidden="true">↗</span>;
const dot = <span className="eyebrow-dot" aria-hidden="true" />;
const navItems = [['Work', '/work'], ['Services', '/services'], ['Writing', '/blog'], ['About', '/about']];

export function generateStaticParams() {
  return [
    { slug: ['work'] }, { slug: ['services'] }, { slug: ['projects'] },
    { slug: ['blog'] }, { slug: ['about'] }, { slug: ['contact'] }, { slug: ['youtube'] },
    ...posts.map((post) => ({ slug: ['blog', post.slug] })),
  ];
}

function Header() {
  return <header className="site-header"><Link className="logo" href="/"><span className="logo-mark">AK</span><span>Azzan Khan</span></Link><nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="header-actions"><ThemeToggle /><Link className="button button-small button-dark header-cta" href="/contact">Let&apos;s talk {arrow}</Link></div><details className="mobile-menu"><summary aria-label="Open menu">Menu</summary><nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contact">Let&apos;s talk {arrow}</Link><ThemeToggle /></nav></details></header>;
}

function Footer() {
  return <footer className="site-footer"><div><Link className="logo" href="/"><span className="logo-mark">AK</span><span>Azzan Khan</span></Link><p className="muted">Lead Engineer · Full-Stack Developer · Builder</p></div><div className="footer-links"><a href="https://www.youtube.com/@azzankhanofficial" target="_blank" rel="noreferrer">YouTube {arrow}</a><a href="https://www.linkedin.com/in/azzan-khan-871958114/" target="_blank" rel="noreferrer">LinkedIn {arrow}</a><Link href="/contact">Contact {arrow}</Link></div><p className="copyright">© {new Date().getFullYear()} Azzan Khan. Built with intent.</p></footer>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function Intro({ kicker, title, copy }: { kicker: string; title: React.ReactNode; copy: string }) {
  return <section className="page-intro"><p className="eyebrow">{dot}{kicker}</p><h1>{title}</h1><p className="lead">{copy}</p></section>;
}

function PostCard({ post }: { post: Post }) {
  return <article className="post-card"><Link href={`/blog/${post.slug}`} className="post-image"><img src={post.image.replace('./', '/')} alt="" loading="lazy" /></Link><div className="post-card-body"><div className="post-meta"><span>{post.category}</span><span>{post.dateLabel}</span></div><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article {arrow}</Link></div></article>;
}

export function Home() {
  return <Shell><section className="hero"><div className="hero-copy"><p className="eyebrow">{dot}Lead engineer · Full-stack builder · India</p><h1>I make complex systems feel <em>simple.</em></h1><p className="hero-lead">I&apos;m Azzan — a lead engineer building dependable digital products with React, Angular, Node.js, TypeScript, and a bias toward useful outcomes.</p><div className="hero-actions"><Link className="button button-dark" href="/work">See the work {arrow}</Link><Link className="text-link" href="/blog">Read the field notes {arrow}</Link></div><div className="hero-status"><span className="status-pulse" />Open to thoughtful collaborations <span>·</span> based in India</div></div><div className="hero-visual"><div className="orb orb-one" /><div className="orb orb-two" /><div className="code-card"><span className="code-label">az.khan / operating-principles.ts</span><code><b>export const</b> approach = {'{'}<br />&nbsp;&nbsp;clarity: <i>&quot;first&quot;</i>,<br />&nbsp;&nbsp;quality: <i>&quot;always&quot;</i>,<br />&nbsp;&nbsp;ship: <i>&quot;often&quot;</i><br />{'}'};</code></div><div className="hero-note">Systems thinker<br /><strong>with a maker&apos;s bias.</strong></div><span className="hero-coordinate">28.6139° N / 77.2090° E</span></div></section><section className="signal-bar"><div><strong>7+</strong><span>years shipping software</span></div><div><strong>10</strong><span>technical field notes</span></div><div><strong>∞</strong><span>curiosity in production</span></div><div className="signal-stack"><span>React</span><span>Node</span><span>AWS</span><span>TypeScript</span></div></section><section className="section"><div className="section-heading"><div><p className="eyebrow">{dot}Selected work</p><h2>Building for people,<br /><em>not just pixels.</em></h2></div><Link className="text-link" href="/work">View all work {arrow}</Link></div><div className="work-grid"><a className="work-card work-card-large" href="https://gardenpublicschool.in/" target="_blank" rel="noreferrer"><div className="work-card-art garden-art"><span>Garden<br /><i>Public School</i></span><small>Education · Digital experience</small></div><div className="work-card-caption"><strong>Garden Public School</strong><span>Visit live site {arrow}</span></div></a><Link className="work-card" href="/projects"><div className="work-card-art systems-art"><span>Systems<br /><i>that scale</i></span><small>Engineering · Product thinking</small></div><div className="work-card-caption"><strong>Product &amp; platform work</strong><span>02 / Ongoing</span></div></Link></div><div className="proof-note"><span className="eyebrow">The through-line</span><p>From healthcare platforms to school experiences and small experiments, I care about the same thing: making the next useful decision easier.</p></div></section><section className="section writing-section"><div className="section-heading"><div><p className="eyebrow">{dot}From the archive</p><h2>Notes on the<br /><em>craft of building.</em></h2></div><Link className="text-link" href="/blog">Browse all writing {arrow}</Link></div><div className="post-grid">{posts.slice(0, 3).map((post) => <PostCard key={post.slug} post={post} />)}</div></section><section className="video-banner"><div><p className="eyebrow">Watch along</p><h2>Build in public.<br /><em>Learn out loud.</em></h2><p>Practical videos on engineering, architecture, and the lessons hiding in the work.</p></div>  <a className="button button-light" href="https://www.youtube.com/@azzankhanofficial" target="_blank" rel="noreferrer">Visit YouTube {arrow}</a></section><section className="cta-section"><p className="eyebrow">{dot}Have a good problem?</p><h2>Let&apos;s make something<br /><em>worth making.</em></h2><Link className="button button-dark" href="/contact">Start a conversation {arrow}</Link></section></Shell>;
}

function Blog() {
  return <Shell><Intro kicker="Writing" title={<>Ideas from the<br /><em>shipping lane.</em></>} copy="An archive of practical notes on JavaScript, APIs, authentication, infrastructure, and the lessons that survive the code review." /><div className="blog-toolbar"><span>{posts.length} articles in the archive</span><span>2022 — present</span></div><section className="post-grid post-grid-all">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</section></Shell>;
}

function Article({ post }: { post: Post }) {
  return <Shell><article className="article"><Link className="back-link" href="/blog">← Back to writing</Link><header className="article-header"><div className="post-meta"><span>{post.category}</span><span>{post.dateLabel}</span></div><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p></header><img className="article-image" src={post.image.replace('./', '/')} alt="" /><div className="article-layout"><div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} /><aside><p className="eyebrow">Keep reading</p>{posts.filter((item) => item.slug !== post.slug).slice(0, 2).map((item) => <Link className="related-link" href={`/blog/${item.slug}`} key={item.slug}><strong>{item.title}</strong><span>{item.dateLabel} {arrow}</span></Link>)}</aside></div></article></Shell>;
}

function StandardPage({ kind }: { kind: string }) {
  const content: Record<string, { kicker: string; title: React.ReactNode; copy: string }> = {
    work: { kicker: 'Selected work', title: <>Thoughtful work,<br /><em>built to matter.</em></>, copy: 'A selection of projects and product experiences where engineering, clarity, and a little stubbornness came together.' },
    services: { kicker: 'Services', title: <>Good work is a<br /><em>team sport.</em></>, copy: 'I partner with founders, teams, and thoughtful organisations to turn ambitious ideas into dependable software.' },
    projects: { kicker: 'Projects', title: <>Small experiments,<br /><em>serious curiosity.</em></>, copy: 'A living shelf of things I’m building, exploring, or learning from.' },
    about: { kicker: 'About Azzan', title: <>Engineer by trade.<br /><em>Builder by nature.</em></>, copy: 'I like useful things, honest conversations, and the moment a messy problem becomes a simple next step.' },
    contact: { kicker: 'Contact', title: <>Have a problem worth<br /><em>solving?</em></>, copy: 'Tell me what you’re working on, where you’re stuck, or what you want to make better. I’ll get back to you with a thoughtful next step.' },
    youtube: { kicker: 'YouTube', title: <>The build log,<br /><em>in motion.</em></>, copy: 'A place for practical engineering walkthroughs, architecture conversations, and the occasional lesson learned the hard way.' },
  };
  const item = content[kind] ?? content.work;
  if (kind === 'about') return <Shell><Intro {...item} /><section className="about-grid"><div className="about-statement"><img className="about-photo" src="/media/azzan-profile.jpg" alt="Azzan Khan" /><p>I&apos;m a Senior Full-Stack JavaScript Developer and Lead Engineer with 7+ years of experience building enterprise-grade web applications. I work across React, Angular, Node.js, TypeScript, REST APIs, AWS, Azure DevOps, SQL, and MongoDB.</p><p>I enjoy turning complex product requirements into clean, maintainable software, and I use modern AI-assisted development workflows to improve quality, automate repetitive work, and help teams ship faster.</p></div><div className="about-facts"><div><span>Current role</span><strong>Lead Engineer<br />CitiusTech · Apr 2024 — present</strong></div><div><span>Earlier</span><strong>Senior Systems Engineer<br />Infosys · 2019 — 2022</strong></div><div><span>Core stack</span><strong>React · Angular · Node.js<br />AWS · Azure · SQL · MongoDB</strong></div><div><span>Education</span><strong>M.Tech, Amity University<br />B.E., Birla Institute of Technology</strong></div><div><span>Recognition</span><strong>Key Contributor Award · 2023<br />Digital Ninja Award · 2021</strong></div></div></section><section className="career-section"><p className="eyebrow">{dot}Professional journey</p><h2>Experience across<br /><em>high-stakes products.</em></h2><div className="career-grid"><div><strong>CitiusTech</strong><span>Lead Engineer · Senior Software Engineer</span><p>Healthcare and learning products for enterprise clients, spanning React, Node.js, MEAN stack, SQL, AWS, Azure DevOps, and production delivery.</p></div><div><strong>Infosys</strong><span>Senior Systems Engineer · Systems Engineer</span><p>Angular ecommerce experiences and AWS cloud migration work using Lambda, S3, Step Functions, REST APIs, and modular frontend architecture.</p></div></div></section></Shell>;
  if (kind === 'contact') return <Shell><Intro {...item} /><section className="contact-layout"><div className="contact-copy"><p className="eyebrow">Direct line</p><h2>Start with a<br /><em>good question.</em></h2><p>You can reach me at this address: <strong>azzankhanofficial@gmail.com</strong></p><a className="text-link" href="https://www.linkedin.com/in/azzan-khan-871958114/" target="_blank" rel="noreferrer">Connect on LinkedIn {arrow}</a></div><form className="contact-form" action="https://formsubmit.co/azzankhanofficial@gmail.com" method="POST"><input type="hidden" name="_subject" value="[Azzan Khan Website] New inquiry" /><input type="hidden" name="_next" value="https://azzankhan.github.io/contact?sent=true" /><input type="hidden" name="_captcha" value="false" /><label>Name<input name="name" required autoComplete="name" /></label><label>Email<input type="email" name="email" required autoComplete="email" /></label><label>What can I help with?<textarea name="message" rows={6} required /></label><button className="button button-dark" type="submit">Send inquiry {arrow}</button></form></section></Shell>;
  return <Shell><Intro {...item} /><section className="split-callout"><p className="eyebrow">Azzan Khan</p><h2>Less theatre.<br /><em>More progress.</em></h2><p>Clear questions, small iterations, and enough care in the details to make the final thing feel inevitable.</p><Link className="button button-dark" href="/contact">Start a conversation {arrow}</Link></section></Shell>;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const slug = resolved.slug ?? [];
  if (slug.length === 0) return <Home />;
  if (slug[0] === 'blog' && slug[1]) {
    const post = posts.find((item) => item.slug === slug[1]);
    return post ? <Article post={post} /> : <StandardPage kind="work" />;
  }
  if (slug[0] === 'blog') return <Blog />;
  return <StandardPage kind={slug[0]} />;
}
