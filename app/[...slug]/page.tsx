import Link from 'next/link';
import posts from '../../src/content/posts.json';
import ThemeToggle from '../components/theme-toggle';
import ContactForm from '../components/contact-form';

type Post = (typeof posts)[number];
type Params = { slug?: string[] };

const arrow = <span aria-hidden="true">↗</span>;
const dot = <span className="eyebrow-dot" aria-hidden="true" />;
const navItems = [['Work', '/work'], ['Services', '/services'], ['Writing', '/blog'], ['About', '/about'], ['Contact', '/contact']];

export function generateStaticParams() {
  return [
    { slug: ['work'] }, { slug: ['services'] }, { slug: ['projects'] },
    { slug: ['blog'] }, { slug: ['about'] }, { slug: ['contact'] }, { slug: ['youtube'] },
    ...posts.map((post) => ({ slug: ['blog', post.slug] })),
  ];
}

function Header() {
  return <header className="site-header"><Link className="logo" href="/"><span className="logo-mark">AK</span><span>Azzan Khan</span></Link><nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="header-actions"><ThemeToggle /><Link className="button button-small button-dark header-cta" href="/contact">Let&apos;s talk {arrow}</Link></div><details className="mobile-menu"><summary aria-label="Open navigation"></summary><nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<ThemeToggle /></nav></details></header>;
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
  return <Shell><section className="hero"><div className="hero-copy"><p className="eyebrow">{dot}Lead engineer · Full-stack builder · India</p><h1>I make complex systems feel <em>simple.</em></h1><p className="hero-lead">I&apos;m Azzan — a Lead Engineer with 7+ years building dependable web platforms, APIs, cloud systems, and AI-assisted products for enterprise domains.</p><div className="hero-actions"><Link className="button button-dark" href="/work">See the work {arrow}</Link><Link className="text-link" href="/blog">Read the field notes {arrow}</Link></div><div className="hero-status"><span className="status-pulse" />Open to thoughtful collaborations <span>·</span> based in India</div></div><div className="hero-visual"><div className="orb orb-one" /><div className="orb orb-two" /><div className="code-card"><span className="code-label">az.khan / operating-principles.ts</span><code><b>export const</b> approach = {'{'}<br />&nbsp;&nbsp;clarity: <i>&quot;first&quot;</i>,<br />&nbsp;&nbsp;quality: <i>&quot;always&quot;</i>,<br />&nbsp;&nbsp;ship: <i>&quot;often&quot;</i><br />{'}'};</code></div><div className="hero-note">Systems thinker<br /><strong>with a maker&apos;s bias.</strong></div><span className="hero-coordinate">28.6139° N / 77.2090° E</span></div></section><section className="signal-bar"><div><strong>7+</strong><span>years in enterprise engineering</span></div><div><strong>6</strong><span>named product programmes</span></div><div><strong>2</strong><span>awards · Key Contributor / Digital Ninja</span></div><div className="signal-stack"><span>Web platforms</span><span>APIs</span><span>Cloud</span><span>AI-assisted</span></div></section><section className="section"><div className="section-heading"><div><p className="eyebrow">{dot}Selected work</p><h2>Building for people,<br /><em>not just pixels.</em></h2></div><Link className="text-link" href="/work">View all work {arrow}</Link></div><div className="work-grid"><a className="work-card work-card-large" href="https://gardenpublicschool.in/" target="_blank" rel="noreferrer"><div className="work-card-art garden-art"><span>Garden<br /><i>Public School</i></span><small>Education · Digital experience</small></div><div className="work-card-caption"><strong>Garden Public School</strong><span>Visit live site {arrow}</span></div></a><Link className="work-card" href="/work"><div className="work-card-art systems-art"><span>Enterprise<br /><i>product systems</i></span><small>Healthcare · Learning · AI · Commerce</small></div><div className="work-card-caption"><strong>Six public-safe case studies</strong><span>Case studies {arrow}</span></div></Link></div><div className="proof-note"><span className="eyebrow">The through-line</span><p>I work across architecture, development, cloud delivery, and the details that make complex products dependable for real users.</p></div></section><section className="section writing-section"><div className="section-heading"><div><p className="eyebrow">{dot}From the archive</p><h2>Notes on the<br /><em>craft of building.</em></h2></div><Link className="text-link" href="/blog">Browse all writing {arrow}</Link></div><div className="post-grid">{posts.slice(0, 3).map((post) => <PostCard key={post.slug} post={post} />)}</div></section><section className="video-banner"><div><p className="eyebrow">Watch along</p><h2>Build in public.<br /><em>Learn out loud.</em></h2><p>Practical videos on engineering, architecture, and the lessons hiding in the work.</p></div>  <a className="button button-light" href="https://www.youtube.com/@azzankhanofficial" target="_blank" rel="noreferrer">Visit YouTube {arrow}</a></section><section className="cta-section"><p className="eyebrow">{dot}Have a good problem?</p><h2>Let&apos;s make something<br /><em>worth making.</em></h2><Link className="button button-dark" href="/contact">Start a conversation {arrow}</Link></section></Shell>;
}

function Blog() {
  return <Shell><Intro kicker="Writing" title={<>Ideas from the<br /><em>shipping lane.</em></>} copy="An archive of practical notes on JavaScript, APIs, authentication, infrastructure, and the lessons that survive the code review." /><div className="blog-toolbar"><span>{posts.length} articles in the archive</span><span>2022 — present</span></div><section className="post-grid post-grid-all">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</section></Shell>;
}

function Article({ post }: { post: Post }) {
  return <Shell><article className="article"><Link className="back-link" href="/blog">← Back to writing</Link><header className="article-header"><div className="post-meta"><span>{post.category}</span><span>{post.dateLabel}</span></div><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p></header><img className="article-image" src={post.image.replace('./', '/')} alt="" /><div className="article-layout"><div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} /><aside><p className="eyebrow">Keep reading</p>{posts.filter((item) => item.slug !== post.slug).slice(0, 2).map((item) => <Link className="related-link" href={`/blog/${item.slug}`} key={item.slug}><strong>{item.title}</strong><span>{item.dateLabel} {arrow}</span></Link>)}</aside></div></article></Shell>;
}

function WorkPage() {
  const projects = [
    { title: 'E-Learning Platform for Doctors and Nurses', client: 'Client: Elsevier · associated with CitiusTech', dates: 'Jan 2025 — present', tag: 'Healthcare · Learning', copy: 'Developing a scalable learning platform for healthcare professionals, with reusable interface components, resilient APIs, structured data access, and dependable cloud delivery.', capabilities: 'React · Node.js · SQL · AWS' },
    { title: 'Microbial Detection Application', client: 'Client: GSK · associated with CitiusTech', dates: 'Jan 2024 — Dec 2024', tag: 'AI · Healthcare', copy: 'Led full-stack development of an AI-assisted image annotation platform, delivering enterprise features and maintaining repeatable release workflows for the product team.', capabilities: 'MEAN stack · Azure DevOps · CI/CD' },
    { title: 'Communication Portal', client: 'Client: GE Healthcare · associated with CitiusTech', dates: 'Aug 2022 — Dec 2023', tag: 'Healthcare · Cloud', copy: 'Led development of a healthcare communication portal, connecting a responsive product experience with backend services and event-driven cloud functions.', capabilities: 'React · Node.js · AWS EC2 · Lambda' },
    { title: 'Data Visualization Tool', client: 'Client: Roche · associated with CitiusTech', dates: 'Jan 2022 — Jul 2022', tag: 'Healthcare · Data', copy: 'Delivered a data visualization solution designed to make complex information easier to interpret and support better operational decision-making.', capabilities: 'MEAN stack · Data visualization', url: 'https://www.wayfind-r.com/home.html' },
    { title: 'Ecommerce Platform', client: 'Client: Belgium Post · associated with Infosys', dates: 'Jul 2021 — Dec 2021', tag: 'Commerce · APIs', copy: 'Built a dynamic, modular frontend for a large postal and ecommerce experience, integrating reusable interface patterns with REST-based services.', capabilities: 'Angular · REST APIs · Modular frontend', url: 'https://www.bpost.be/en' },
    { title: 'Cloud Migration to AWS', client: 'Client: Belgium Post · associated with Infosys', dates: 'Sep 2019 — Jun 2021', tag: 'Cloud · Integration', copy: 'Developed reliable service integrations as part of a cloud migration programme, connecting existing workflows with managed AWS services.', capabilities: 'AWS Lambda · S3 · Step Functions' },
  ];
  return <Shell><Intro kicker="Selected work" title={<>Proof over<br /><em>promises.</em></>} copy="View of product problems, responsibilities, and delivery environments from my time associated with CitiusTech and Infosys." /><section className="case-study-grid">{projects.map(({ title, client, dates, tag, copy, capabilities, url }, index) => <article className="case-study" key={title}><span className="case-number">0{index + 1}</span><p className="eyebrow">{tag}</p><h2>{title}</h2><p className="case-client">{client}</p><p className="case-dates">{dates}</p><p className="case-description">{copy}</p><p className="case-capabilities"><span>Technical capabilities</span>{capabilities}</p>{url && <a className="case-link" href={url} target="_blank" rel="noreferrer">View public organisation site {arrow}</a>}</article>)}</section><section className="split-callout"><p className="eyebrow">How I contribute</p><h2>From first<br /><em>diagram to delivery.</em></h2><p>I translate product requirements into maintainable systems, build across the stack, integrate APIs and data, and support cloud delivery and team execution.</p></section></Shell>;
}

function ServicesPage() {
  const services = [
    ['01', 'Product engineering', 'End-to-end web product development across user experience, APIs, data, integrations, and production delivery.'],
    ['02', 'Platform and API work', 'Service design, REST API development, integrations, data flows, and backend improvements for growing products.'],
    ['03', 'Cloud delivery', 'Practical delivery across cloud infrastructure, CI/CD, environment setup, release workflows, and operational quality.'],
    ['04', 'Engineering enablement', 'Code quality, testing, performance, documentation, AI-assisted workflows, and repeatable practices that help teams move well.'],
  ];
  return <Shell><Intro kicker="Capabilities" title={<>Useful skills,<br /><em>carefully applied.</em></>} copy="An informational view of the capabilities I bring to product teams and engineering environments." /><section className="service-list">{services.map(([number, title, copy]) => <div className="service-item" key={number}><span className="service-number">{number}</span><div><h2>{title}</h2><p>{copy}</p></div><span className="service-arrow" aria-hidden="true">↗</span></div>)}</section></Shell>;
}

function ProjectsPage() {
  return <Shell><Intro kicker="Projects and experiments" title={<>What I&apos;m<br /><em>learning by doing.</em></>} copy="A mix of public work, technical experiments, and small systems that keep my curiosity close to the craft." /><section className="project-notes"><div><p className="eyebrow">Current learning</p><h2>AI-assisted development</h2><p>Exploring how Claude, GitHub Copilot, ChatGPT, Gemini, and Microsoft Copilot can accelerate delivery without lowering engineering standards.</p></div><div><p className="eyebrow">Engineering principles</p><h2>Clarity before cleverness</h2><p>Make the problem legible, keep the design maintainable, automate the repeatable, and leave the system easier to change.</p></div><div><p className="eyebrow">Side direction</p><h2>Small products, real users</h2><p>Building and learning in public through Garden Public School, technical writing, and experiments that turn ideas into working interfaces.</p></div><div><p className="eyebrow">Always improving</p><h2>Ship, observe, refine</h2><p>The work is not finished at deployment. Feedback, tests, monitoring, and thoughtful iteration are part of the product.</p></div></section></Shell>;
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
  if (kind === 'work') return <WorkPage />;
  if (kind === 'services') return <ServicesPage />;
  if (kind === 'projects') return <ProjectsPage />;
  if (kind === 'about') return <Shell><Intro {...item} /><section className="about-grid"><div className="about-statement"><img className="about-photo" src="/media/azzan-profile.jpg" alt="Azzan Khan" /><p>I&apos;m a Lead Engineer and full-stack developer with 7+ years of experience building enterprise-grade web applications across healthcare, learning, AI-assisted workflows, and ecommerce.</p><p>I work across modern web platforms, APIs, cloud infrastructure, data systems, and delivery practices. I enjoy turning complex product requirements into clear, maintainable software, and I use AI-assisted development to accelerate the work while keeping engineering judgment in the loop.</p></div><div className="about-facts"><div><span>Current role</span><strong>Lead Engineer<br />CitiusTech · Apr 2024 — present</strong></div><div><span>Prior role</span><strong>Senior Software Engineer<br />CitiusTech · Jan 2022 — Mar 2024</strong></div><div><span>Earlier</span><strong>Systems Engineer → Senior Systems Engineer<br />Infosys · Jan 2019 — Jan 2022</strong></div><div><span>Technical range</span><strong>Modern web platforms · APIs<br />Cloud · SQL · MongoDB · CI/CD</strong></div><div><span>Recognition</span><strong>Key Contributor Award · 2023<br />Digital Ninja Award · 2021<br /><small>Associated with CitiusTech / Infosys</small></strong></div></div></section><section className="career-section"><p className="eyebrow">{dot}Professional journey</p><h2>Experience across<br /><em>high-stakes products.</em></h2><div className="career-grid"><div><strong>CitiusTech</strong><span>Lead Engineer · Apr 2024 — present<br />Senior Software Engineer · Jan 2022 — Mar 2024</span><p>Enterprise healthcare and learning products, contributing across architecture, full-stack development, APIs, data, cloud delivery, CI/CD, and production quality.</p></div><div><strong>Infosys</strong><span>Senior Systems Engineer · Jan 2021 — Jan 2022<br />Systems Engineer · Jun 2019 — Dec 2020<br />Trainee · Jan 2019 — May 2019</span><p>Enterprise ecommerce and cloud modernization work, delivering modular product experiences, API integrations, and AWS-backed workflows.</p></div></div></section></Shell>;
  if (kind === 'contact') return <Shell><Intro {...item} /><section className="contact-layout"><div className="contact-copy"><p className="eyebrow">Direct line</p><h2>Start with a<br /><em>good question.</em></h2><p>You can reach me at this address: <strong>azzankhanofficial@gmail.com</strong></p><a className="text-link" href="https://www.linkedin.com/in/azzan-khan-871958114/" target="_blank" rel="noreferrer">Connect on LinkedIn {arrow}</a></div><ContactForm /></section></Shell>;
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
