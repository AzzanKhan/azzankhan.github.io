import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import posts from '../../src/content/posts.json';
import ThemeToggle from '../components/theme-toggle';
import ContactForm from '../components/contact-form';

type Post = (typeof posts)[number];
type Params = { slug?: string[] };

const arrow = <span aria-hidden="true">↗</span>;
const dot = <span className="eyebrow-dot" aria-hidden="true" />;
const navItems = [['What I build', '/what-i-build'], ['Work', '/work'], ['About', '/about'], ['Contact', '/contact']];

const pageMeta: Record<string, { title: string; description: string }> = {
  work: { title: 'Selected work', description: 'Enterprise case studies in healthcare, learning, AI, and commerce: the problems, the engineering decisions, and the production outcomes.' },
  'what-i-build': { title: 'What I build', description: 'Business websites, Applications, AI integrations and automation, and application modernization.' },
  projects: { title: 'Projects', description: 'Small builds, experiments, and independent projects, including Garden Public School.' },
  about: { title: 'About', description: 'Azzan Khan: a Lead Full-Stack Engineer with 7+ years across healthcare, learning, enterprise, and cloud platforms.' },
  blog: { title: 'Writing', description: 'Practical notes on JavaScript, APIs, authentication, Docker, and cloud deployment by Azzan Khan.' },
  contact: { title: 'Contact', description: 'Get in touch with Azzan Khan about a website, a web application, AI integration, or modernization.' },
  youtube: { title: 'YouTube', description: 'Practical engineering walkthroughs and architecture videos by Azzan Khan.' },
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const slug = (await params).slug ?? [];
  if (slug[0] === 'blog' && slug[1]) {
    const post = posts.find((item) => item.slug === slug[1]);
    if (post) {
      const url = `/blog/${post.slug}/`;
      return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: url },
        openGraph: { type: 'article', title: post.title, description: post.excerpt, url, images: [post.image.replace('./', '/')] },
      };
    }
  }
  const key = slug[0] ?? '';
  const meta = pageMeta[key];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${key}/` },
    openGraph: { title: meta.title, description: meta.description, url: `/${key}/` },
  };
}

export function generateStaticParams() {
  return [
    { slug: ['work'] }, { slug: ['what-i-build'] }, { slug: ['projects'] },
    { slug: ['blog'] }, { slug: ['about'] }, { slug: ['contact'] }, { slug: ['youtube'] },
    ...posts.map((post) => ({ slug: ['blog', post.slug] })),
  ];
}

function Header() {
  return <header className="site-header"><Link className="logo" href="/"><img className="logo-mark" src="/media/new-icon-dark.webp" alt="" width="34" height="34" /><span>Azzan Khan</span></Link><nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="header-actions"><ThemeToggle /></div><details className="mobile-menu"><summary aria-label="Open navigation"></summary><nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<ThemeToggle /></nav></details></header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-brand">
      <Link className="logo" href="/"><img className="logo-mark" src="/media/new-icon-dark.webp" alt="" width="34" height="34" /><span>Azzan Khan</span></Link>
      <p>Lead Engineer building thoughtful, production-ready software.</p>
      <div className="footer-socials" aria-label="Social links">
        <a href="https://www.instagram.com/azzankhanofficial/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
        </a>
        <a href="https://www.linkedin.com/in/azzan-khan-871958114/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06S7.4 4.23 7.4 5.37s-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.43c.99 0 1.79-.77 1.79-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
        </a>
        <a href="https://github.com/azzankhan" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.004 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.815 1.103.815 2.222v3.293c0 .32.216.694.825.576A12 12 0 0 0 12 .297z" /></svg>
        </a>
        <a href="https://www.youtube.com/@azzankhanofficial" target="_blank" rel="noreferrer" aria-label="YouTube">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" /></svg>
        </a>
      </div>
    </div>
    <nav className="footer-column" aria-label="Footer navigation">
      <h2>Navigate</h2>
      <Link href="/">Home</Link><Link href="/what-i-build">What I build</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
    </nav>
    <nav className="footer-column" aria-label="Resources">
      <h2>Explore</h2>
      <Link href="/blog">Blog</Link>
    </nav>
    <p className="copyright">© {new Date().getFullYear()} Azzan Khan</p>
  </footer>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function Intro({ kicker, title, copy }: { kicker: string; title: React.ReactNode; copy: string }) {
  return <section className="page-intro"><p className="eyebrow">{dot}{kicker}</p><h1>{title}</h1><p className="lead">{copy}</p></section>;
}

function PostCard({ post }: { post: Post }) {
  return <article className="post-card"><Link href={`/blog/${post.slug}`} className="post-image"><img src={post.image.replace('./', '/')} alt={post.title} loading="lazy" /></Link><div className="post-card-body"><div className="post-meta"><span>{post.category}</span></div><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article {arrow}</Link></div></article>;
}

const featuredWork = [
  {
    id: 'clinical-learning-platform',
    tag: 'Healthcare · Learning',
    title: 'Clinical Learning Platform',
    problem: 'A scalable learning experience for doctors and nurses, built on reusable components and structured content access.',
    outcome: 'In active delivery — and my daily proving ground for spec-driven development with AI coding agents.',
    tech: 'React · Node.js · SQL · AWS · Claude agents',
  },
  {
    id: 'microbial-detection-platform',
    tag: 'AI · Healthcare',
    title: 'Microbial Detection Platform',
    problem: 'Automatically identify and count microbial colonies from laboratory imagery.',
    outcome: 'A production platform connecting laboratory image analysis with an enterprise workflow.',
    tech: 'Angular · Node.js · Azure · CI/CD · Computer vision',
  },
  {
    id: 'ecommerce-platform',
    tag: 'Commerce · APIs',
    title: 'Ecommerce Platform',
    problem: "A dynamic, modular storefront for one of Europe's largest postal and ecommerce services.",
    outcome: 'Reusable frontend architecture serving a national-scale production experience.',
    tech: 'Angular · REST APIs · Modular frontend',
  },
];

const whatIBuild = [
  {
    id: 'applications',
    title: 'Applications',
    brief: 'Connected interfaces, APIs, and data built around real workflows.',
    summary: 'Dashboards, portals, and internal tools that replace spreadsheets, manual steps, and disconnected systems.',
    who: 'Teams that have outgrown spreadsheets, or need a customer or staff portal.',
    points: ['Requirements and acceptance criteria agreed before the build starts', 'Secure authentication and role-based access', 'APIs and databases designed around how your data is used', 'Cloud deployment with CI/CD and monitoring', 'Built to be extended as the business grows'],
  },
  {
    id: 'ai-integration-and-automation',
    title: 'AI integration and automation',
    brief: 'Practical AI features that make existing products and processes work smarter.',
    summary: 'Practical AI features and workflows that plug into the software you already use, rather than a risky rebuild.',
    who: 'Businesses that want to automate repetitive work, or make their own content and data searchable.',
    points: ['AI assistants or search over your own documents and content', 'Document, email, or data processing pipelines', 'Integration with your existing APIs and systems', 'Guardrails, logging, and human review where it matters', 'Measured against the outcome you care about'],
  },
  {
    id: 'application-modernization-and-cloud-delivery',
    title: 'Application modernization and cloud delivery',
    brief: 'Modernize what you have and make the path to production more reliable.',
    summary: 'Modernize an older site or application and improve its cloud delivery, without starting from zero.',
    who: 'Sites built years ago, legacy WordPress installs, or frontends that are slow, insecure, or hard to change.',
    points: ['Audit of performance, security, accessibility, and SEO', 'Migration to a modern stack, with a clear phased plan', 'URLs and SEO preserved, so existing search rankings are protected', 'Staged rollout with a fallback at each step', 'Documentation of what changed and why'],
  },
  {
    id: 'business-websites',
    title: 'Business websites',
    brief: 'Clear, responsive websites that turn a first visit into a great first impression.',
    summary: 'A fast, professional website for your business, designed and built to be found on Google and to turn visitors into enquiries.',
    who: 'Small and mid-size businesses, clinics, schools, and local organisations.',
    points: ['Custom design shaped around your brand and audience', 'Mobile-first, fast-loading pages with clean, accessible markup', 'SEO foundations: page metadata, sitemap, and structured data', 'Contact forms, analytics, and hosting set up for you', 'Handover notes, so you can update content with confidence'],
  },
];

const capabilityGroups = [
  ['01', 'Engineering', 'Seven years of enterprise delivery, distilled', 'System & application architecture · Full-stack development · API design · Authentication & authorization · Cloud architecture · CI/CD · Production debugging · Application modernization', ''],
  ['02', 'AI-native engineering', 'Where my practice is heading', 'Specification-driven development · Coding agents · Agentic workflows · AI-assisted implementation · AI-assisted testing · AI-assisted refactoring · AI-assisted documentation', ''],
  ['03', 'Technologies', 'Evidence, not identity', 'TypeScript · JavaScript · React · Angular · NextJS · VueJS · Node.js · AWS · Azure · SQL · NoSQL', 'skill-card-wide'],
];

const featuredQuests = [
  {
    tag: 'Education · Independent delivery',
    title: 'Garden Public School',
    copy: 'A live website for a school, delivered quickly with AI-assisted development.',
    url: 'https://www.gardenpublicschool.in/',
    label: 'Visit the site',
  },
];

export function Home() {
  return <Shell>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{dot}Lead Full-Stack Engineer · AI-native builder · India</p>
        <h1>I turn complex ideas into <em>production software.</em></h1>
        <p className="hero-lead">Across healthcare, learning, and enterprise platforms, I take products from specification to production, with every engineering decision kept human-owned.</p>
        <div className="hero-actions"><Link className="button button-dark" href="/work">View my work {arrow}</Link><Link className="text-link" href="/what-i-build">Explore what I build {arrow}</Link></div>
        <div className="hero-status"><span className="status-pulse" />Open to thoughtful collaborations <span>·</span> based in India</div>
      </div>
      <figure className="hero-portrait"><img src="/media/azzan-portrait.webp" alt="Azzan Khan" width="1400" height="733" /></figure>
    </section>
    <section className="signal-bar">
      <div><strong>7+</strong><span>years in enterprise engineering</span></div>
      <div><strong>E2E</strong><span>Full-stack engineering<br />Frontend · Backend · Cloud</span></div>
      <div><strong>2</strong><span>awards · Key Contributor / Digital Ninja</span></div>
    </section>
    <section className="section build-overview">
      <div className="section-heading">
        <div><p className="eyebrow">{dot}Capabilities</p><h2>What I <em>build.</em></h2></div>
        <Link className="text-link" href="/what-i-build">Explore capabilities {arrow}</Link>
      </div>
      <div className="build-overview-grid">{whatIBuild.map(({ id, title, brief }, index) => <Link className="build-overview-card" key={id} href={`/what-i-build#${id}`}><span className="build-card-top"><span className="build-card-number">0{index + 1}</span></span><span className="build-card-title">{title}</span><span className="build-card-brief">{brief}</span></Link>)}</div>
    </section>
    <section className="section">
      <div className="section-heading">
        <div><p className="eyebrow">{dot}Selected work</p><h2>Real problems.<br /><em>Production outcomes.</em></h2></div>
        <Link className="text-link" href="/work">All case studies {arrow}</Link>
      </div>
      <div className="story-grid">{featuredWork.map(({ id, tag, title, problem, outcome, tech }, index) => <Link className="story-card" href={`/work#${id}`} key={title}><span className="case-number">0{index + 1}</span><p className="eyebrow">{tag}</p><h3>{title}</h3><div className="story-line"><span>Problem</span><p>{problem}</p></div><div className="story-line"><span>Outcome</span><p>{outcome}</p></div><p className="story-tech">{tech}</p></Link>)}</div>
    </section>
    <section className="section side-quests">
      <div className="section-heading">
        <div><p className="eyebrow">{dot}Side Quests</p><h2>Independent <em>builds.</em></h2><p className="lead">Independent projects, experiments, and small builds exploring practical solutions through code.</p></div>
      </div>
      <div className="quest-grid">{featuredQuests.map(({ tag, title, copy, url, label }) => <a className="quest-card" key={title} href={url} target="_blank" rel="noreferrer"><p className="eyebrow">{tag}</p><h3>{title}</h3><p>{copy}</p><span className="quest-link">{label} {arrow}</span></a>)}</div>
    </section>
    <section className="section now-section">
      <div className="section-heading">
        <div><p className="eyebrow">{dot}Now</p><h2>Where the craft<br /><em>is heading.</em></h2></div>
      </div>
      <div className="now-grid">
        <p className="now-lead">Currently exploring AI-native software engineering — not as a badge, but as a daily working practice on a real production platform.</p>
        <div className="now-chips"><span>Specification-driven development</span><span>Coding agents</span><span>Agentic workflows</span><span>AI-assisted testing</span><span>Automated documentation</span><span>Generative UI workflows</span><span>Developer education</span></div>
      </div>
    </section>
    <section className="cta-section">
      <p className="eyebrow">{dot}Have a good problem?</p>
      <h2>Let&apos;s make something<br /><em>worth making.</em></h2>
      <Link className="button button-dark" href="/contact">Start a conversation {arrow}</Link>
    </section>
  </Shell>;
}

function Blog() {
  return <Shell><Intro kicker="Writing" title={<>Ideas from the<br /><em>shipping lane.</em></>} copy="An archive of practical notes on JavaScript, APIs, authentication, infrastructure, and the lessons that survive the code review." /><div className="blog-toolbar"><span>{posts.length} articles in the archive</span><span>Practical engineering notes</span></div><section className="post-grid post-grid-all">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</section></Shell>;
}

function Article({ post }: { post: Post }) {
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt, datePublished: post.dateLabel.replace(/\./g, '-'), image: `https://azzankhan.github.io${post.image.replace('./', '/')}`, author: { '@type': 'Person', name: 'Azzan Khan', url: 'https://azzankhan.github.io' }, mainEntityOfPage: `https://azzankhan.github.io/blog/${post.slug}/` };
  return <Shell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><article className="article"><Link className="back-link" href="/blog">← Back to writing</Link><header className="article-header"><div className="post-meta"><span>{post.category}</span><span>{post.dateLabel}</span></div><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p></header><img className="article-image" src={post.image.replace('./', '/')} alt={post.title} /><div className="article-layout"><div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} /><aside><p className="eyebrow">Keep reading</p>{posts.filter((item) => item.slug !== post.slug).slice(0, 2).map((item) => <Link className="related-link" href={`/blog/${item.slug}`} key={item.slug}><strong>{item.title}</strong><span>{item.dateLabel} {arrow}</span></Link>)}</aside></div></article></Shell>;
}

function WorkPage() {
  const projects = [
    {
      id: 'clinical-learning-platform',
      title: 'Clinical Learning Platform',
      client: 'Client: Elsevier · associated with CitiusTech',
      dates: 'Jan 2025 — present',
      tag: 'Healthcare · Learning',
      problem: 'Deliver a scalable learning experience for doctors and nurses, with reusable interfaces, structured content access, and dependable cloud delivery.',
      role: 'Lead full-stack engineer across the application — architecture, implementation, and delivery.',
      engineering: ['Designed the component architecture and API layer', 'Structured data access over SQL with resilient service boundaries', 'Run an AI-native workflow: specification-driven development with Claude coding agents, custom agent skills, and human-owned review of every change'],
      outcome: 'An evolving production platform — and a working model for how AI agents and engineering judgment ship software together.',
      tech: 'React · Node.js · SQL · AWS · Claude agents · SDD',
    },
    {
      id: 'microbial-detection-platform',
      title: 'Microbial Detection Platform',
      client: 'Client: GSK · associated with CitiusTech',
      dates: 'Jan 2024 — Dec 2024',
      tag: 'AI · Healthcare',
      problem: 'Automatically identify and count microbial colonies from laboratory imagery.',
      role: 'Led full-stack engineering across the application — image annotation workflows, authentication, APIs, and cloud deployment.',
      engineering: ['Designed the frontend and backend architecture', 'Integrated computer-vision image annotation workflows', 'Implemented authentication and role-based authorization', 'Established repeatable release workflows with Azure DevOps CI/CD'],
      outcome: 'A production platform connecting laboratory image analysis with an enterprise workflow.',
      tech: 'Angular · Node.js · Azure · CI/CD · Computer vision',
    },
    {
      id: 'healthcare-communication-portal',
      title: 'Healthcare Communication Portal',
      client: 'Client: GE Healthcare · associated with CitiusTech',
      dates: 'Aug 2022 — Dec 2023',
      tag: 'Healthcare · Cloud',
      problem: 'Give healthcare teams a responsive communication portal backed by event-driven cloud services.',
      role: 'Led development across the frontend experience and the backend services.',
      engineering: ['Built the responsive product experience in React', 'Developed Node.js services behind the portal', 'Designed event-driven workflows on AWS Lambda', 'Ran delivery on EC2-hosted infrastructure'],
      outcome: 'A dependable communication portal inside an enterprise healthcare ecosystem.',
      tech: 'React · Node.js · AWS EC2 · Lambda',
    },
    {
      id: 'data-visualization-tool',
      title: 'Data Visualization Tool',
      client: 'Client: Roche · associated with CitiusTech',
      dates: 'Jan 2022 — Jul 2022',
      tag: 'Healthcare · Data',
      problem: 'Make complex research data easier to interpret, so teams can make better operational decisions.',
      role: 'Full-stack delivery of the visualization solution.',
      engineering: ['Built interactive visualizations on the MEAN stack', 'Designed API-driven data flows for large datasets', 'Shaped the interface around readability and exploration'],
      outcome: 'A public-facing visualization platform supporting better decision-making.',
      tech: 'MEAN stack · Data visualization',
      url: 'https://www.wayfind-r.com/home.html',
    },
    {
      id: 'ecommerce-platform',
      title: 'Ecommerce Platform',
      client: 'Client: Belgium Post · associated with Infosys',
      dates: 'Jul 2021 — Dec 2021',
      tag: 'Commerce · APIs',
      problem: "Build a dynamic, modular storefront for one of Europe's largest postal and ecommerce services.",
      role: 'Frontend engineering on the modular platform.',
      engineering: ['Built a modular Angular frontend architecture', 'Created reusable interface patterns across the storefront', 'Integrated REST-based services behind the experience'],
      outcome: 'A production ecommerce experience operating at national scale.',
      tech: 'Angular · REST APIs · Modular frontend',
      url: 'https://www.bpost.be/en',
    },
    {
      id: 'cloud-migration-to-aws',
      title: 'Cloud Migration to AWS',
      client: 'Client: Belgium Post · associated with Infosys',
      dates: 'Sep 2019 — Jun 2021',
      tag: 'Cloud · Integration',
      problem: 'Move existing workflows onto managed AWS services without breaking reliability.',
      role: 'Service integration development within the migration programme.',
      engineering: ['Developed service integrations with AWS Lambda, S3, and Step Functions', 'Connected existing workflows to cloud-native services', 'Kept reliability front and centre through the transition'],
      outcome: 'Legacy workflows reconnected to managed cloud services, as part of a large-scale migration.',
      tech: 'AWS Lambda · S3 · Step Functions',
    },
  ];
  return <Shell><Intro kicker="Selected work" title={<>Enterprise<br /><em>Engineering.</em></>} copy="I've contributed to enterprise applications across healthcare, education, computer vision, and business systems. My experience spans full-stack development, API integrations, authentication, cloud deployment, and AI-assisted engineering, with a focus on building maintainable, production-ready software." /><section className="section enterprise-section"><div className="case-study-grid">{projects.map(({ id, title, client, dates, tag, problem, role, engineering, outcome, tech, url }, index) => <article id={id} className="case-study case-story" key={title}><span className="case-number">0{index + 1}</span><p className="eyebrow">{tag}</p><h2>{title}</h2><p className="case-client">{client}</p><p className="case-dates">{dates}</p><div className="case-block"><span>The problem</span><p>{problem}</p></div><div className="case-block"><span>My role</span><p>{role}</p></div><div className="case-block"><span>Engineering</span><ul>{engineering.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="case-block"><span>Outcome</span><p>{outcome}</p></div><p className="case-capabilities"><span>Technologies</span>{tech}</p>{url && <a className="case-link" href={url} target="_blank" rel="noreferrer">View public organisation site {arrow}</a>}</article>)}</div></section><section className="section side-quests">
      <div className="section-heading">
        <div><p className="eyebrow">{dot}Side Quests</p><h2>Independent <em>builds.</em></h2><p className="lead">Independent projects, experiments, and small builds exploring practical solutions through code.</p></div>
      </div>
      <div className="quest-grid">{featuredQuests.map(({ tag, title, copy, url, label }) => <a className="quest-card" key={title} href={url} target="_blank" rel="noreferrer"><p className="eyebrow">{tag}</p><h3>{title}</h3><p>{copy}</p><span className="quest-link">{label} {arrow}</span></a>)}</div>
    </section><section className="split-callout"><p className="eyebrow">The common thread</p><h2>Same loop,<br /><em>every project.</em></h2><p>Understand, specify, architect, build with agents, validate, ship. The stack changes per project — the discipline doesn&apos;t.</p><Link className="button button-dark" href="/what-i-build">Explore what I build {arrow}</Link></section></Shell>;
}

function WhatIBuildPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: whatIBuild.map(({ title, summary }, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Service', name: title, description: summary, provider: { '@type': 'Person', name: 'Azzan Khan', url: 'https://azzankhan.github.io' } } })) };
  return <Shell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><Intro kicker="Capabilities" title={<>What I <em>build.</em></>} copy="A snapshot of the kinds of engineering work I have experience delivering, from business websites to full-stack platforms, AI integrations, and modernization." /><section className="capability-grid">{whatIBuild.map(({ id, title, summary, who, points }, index) => <article className="capability-card" id={id} key={id}><span className="case-number">0{index + 1}</span><h2>{title}</h2><p className="capability-summary">{summary}</p><p className="capability-who"><strong>Best for:</strong> {who}</p><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</section><section className="cta-section capability-cta"><p className="eyebrow">{dot}Have something in mind?</p><h2>Let&apos;s talk about what<br /><em>you&apos;re building.</em></h2><p className="cta-copy">Whether you have a clear brief or just an early idea, I&apos;d be glad to hear about it and explore how we could work together.</p><Link className="button button-dark" href="/contact">Start a conversation {arrow}</Link></section></Shell>;
}

function ProjectsPage() {
  return <Shell><Intro kicker="Projects and experiments" title={<>What I&apos;m<br /><em>learning by doing.</em></>} copy="These project notes now live on the About page, alongside the experience and practices that shape the work." /><section className="project-notes project-page-moved"><div><p className="eyebrow">Find them on About</p><h2>Projects, in context.</h2><p>Explore current focus, daily practice, side projects, and how I approach shipping and iteration.</p><Link className="text-link" href="/about#projects">View projects and practice {arrow}</Link></div></section></Shell>;
}

function StandardPage({ kind }: { kind: string }) {
  const content: Record<string, { kicker: string; title: React.ReactNode; copy: string }> = {
    projects: { kicker: 'Projects', title: <>Small experiments,<br /><em>serious curiosity.</em></>, copy: 'A living shelf of things I’m building, exploring, or learning from.' },
    about: { kicker: 'About Azzan', title: <>Engineer by trade.<br /><em>Builder by nature.</em></>, copy: 'I like useful things, honest conversations, and the moment a messy problem becomes a simple next step.' },
    contact: { kicker: 'Contact', title: <>Let&apos;s <em>talk.</em></>, copy: 'Tell me what you’re working on, where you’re stuck, or what you want to make better. I usually reply within a day on weekdays.' },
    youtube: { kicker: 'YouTube', title: <>The build log,<br /><em>in motion.</em></>, copy: 'A place for practical engineering walkthroughs, architecture conversations, and the occasional lesson learned the hard way.' },
  };
  const item = content[kind] ?? content.about;
  if (kind === 'work') return <WorkPage />;
  if (kind === 'what-i-build') return <WhatIBuildPage />;
  if (kind === 'projects') return <ProjectsPage />;
  if (kind === 'about') return <Shell>
    <Intro {...item} />
    <section className="about-grid">
      <div className="about-statement">
        <p>I&apos;m a Lead Engineer and full-stack developer with 7+ years of experience building enterprise-grade web applications across healthcare, learning, AI-assisted workflows, and ecommerce.</p>
        <p>I work across modern web platforms, APIs, cloud infrastructure, data systems, and delivery practices. I enjoy turning complex product requirements into clear, maintainable software, and I use AI-assisted development to accelerate the work while keeping engineering judgment in the loop.</p>
      </div>
      <div className="about-facts">
        <div><span>Current role</span><strong>Lead Engineer<br />CitiusTech · Apr 2024 — present</strong></div>
        <div><span>Prior role</span><strong>Senior Software Engineer<br />CitiusTech · Jan 2022 — Mar 2024</strong></div>
        <div><span>Earlier</span><strong>Systems Engineer → Senior Systems Engineer<br />Infosys · Jan 2019 — Jan 2022</strong></div>
        <div><span>Recognition</span><strong>Key Contributor Award · 2023<br />Digital Ninja Award · 2021<br /><small>Associated with CitiusTech / Infosys</small></strong></div>
      </div>
    </section>
    <section className="section capability-heading"><div className="section-heading"><div><p className="eyebrow">{dot}Capabilities</p><h2>Skills, <em>by what they do.</em></h2></div></div></section>
    <section className="skills-grid">{capabilityGroups.map(([number, title, subtitle, skills, extra]) => <article className={`skill-card ${extra}`} key={number}><span className="skill-number">{number}</span><p className="eyebrow">{subtitle}</p><h2>{title}</h2><p className="skill-list">{skills}</p></article>)}</section>
    <section className="section about-projects" id="projects">
      <p className="eyebrow">{dot}Focus</p>
      <h2>What I&apos;m learning<br /><em>by doing.</em></h2>
      <p className="lead">A mix of public work, technical experiments, and small systems that keep my curiosity close to the craft.</p>
      <div className="project-notes">
        <div><p className="eyebrow">Current focus</p><h2>Specification-driven development</h2><p>Defining behaviour, constraints, and acceptance criteria before code — so AI agents execute against intent, not guesses.</p></div>
        <div><p className="eyebrow">Daily practice</p><h2>Coding agents in production</h2><p>Working extensively with Claude agents, custom agent skills, and agentic workflows on the clinical learning platform — with human review on every change.</p></div>
        <div><p className="eyebrow">Side direction</p><h2>Small products, real users</h2><p>Building and learning in public through independent web projects, technical writing, and experiments that turn ideas into working interfaces.</p></div>
        <div><p className="eyebrow">Always improving</p><h2>Ship, observe, refine</h2><p>The work is not finished at deployment. Feedback, tests, monitoring, and thoughtful iteration are part of the product.</p></div>
      </div>
    </section>
    <section className="career-section">
      <p className="eyebrow">{dot}Professional journey</p>
      <h2>Experience across<br /><em>high-stakes products.</em></h2>
      <div className="career-grid">
        <div><strong>CitiusTech</strong><span>Lead Engineer · Apr 2024 — present<br />Senior Software Engineer · Jan 2022 — Mar 2024</span><p>Enterprise healthcare and learning products, contributing across architecture, full-stack development, APIs, data, cloud delivery, CI/CD, and production quality.</p></div>
        <div><strong>Infosys</strong><span>Senior Systems Engineer · Jan 2021 — Jan 2022<br />Systems Engineer · Jun 2019 — Dec 2020<br />Trainee · Jan 2019 — May 2019</span><p>Enterprise ecommerce and cloud modernization work, delivering modular product experiences, API integrations, and AWS-backed workflows.</p></div>
      </div>
    </section>
  </Shell>;
  if (kind === 'contact') return <Shell><Intro {...item} /><section className="contact-layout"><div className="contact-copy"><p className="eyebrow">Reach out directly</p><ul className="direct-list"><li><a href="mailto:azzankhanofficial@gmail.com"><strong>Email {arrow}</strong><span className="handle">azzankhanofficial@gmail.com</span><small>Best for hiring, consulting, and longer messages.</small></a></li><li><a href="https://www.linkedin.com/in/azzan-khan-871958114/" target="_blank" rel="noreferrer"><strong>LinkedIn {arrow}</strong><span className="handle">in/azzan-khan-871958114</span><small>Professional inquiries and recruiting.</small></a></li><li><a href="https://github.com/azzankhan" target="_blank" rel="noreferrer"><strong>GitHub {arrow}</strong><span className="handle">github.com/azzankhan</span><small>Code samples, open-source work, and issues on shared repos.</small></a></li></ul></div><ContactForm /></section></Shell>;
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
  if (!['work', 'what-i-build', 'projects', 'about', 'contact', 'youtube'].includes(slug[0])) notFound();
  return <StandardPage kind={slug[0]} />;
}
