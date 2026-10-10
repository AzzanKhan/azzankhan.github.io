import Link from 'next/link';
import posts from '../../src/content/posts.json';
import ThemeToggle from '../components/theme-toggle';
import ContactForm from '../components/contact-form';

type Post = (typeof posts)[number];
type Params = { slug?: string[] };

const arrow = <span aria-hidden="true">↗</span>;
const dot = <span className="eyebrow-dot" aria-hidden="true" />;
const navItems = [['Work', '/work'], ['Skills', '/skills'], ['About', '/about']];

export function generateStaticParams() {
  return [
    { slug: ['work'] }, { slug: ['skills'] }, { slug: ['services'] }, { slug: ['projects'] },
    { slug: ['blog'] }, { slug: ['about'] }, { slug: ['contact'] }, { slug: ['youtube'] },
    ...posts.map((post) => ({ slug: ['blog', post.slug] })),
  ];
}

function Header() {
  return <header className="site-header"><Link className="logo" href="/"><span className="logo-mark">AK</span><span>Azzan Khan</span></Link><nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="header-actions"><ThemeToggle /><Link className="button button-small button-dark header-cta" href="/contact">Let&apos;s talk {arrow}</Link></div><details className="mobile-menu"><summary aria-label="Open navigation"></summary><nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<ThemeToggle /></nav></details></header>;
}

function Footer() {
  return <footer className="site-footer"><div><Link className="logo" href="/"><span className="logo-mark">AK</span><span>Azzan Khan</span></Link><p className="muted">Lead Full-Stack Engineer · Specification-driven · AI-native</p></div><div className="footer-links"><Link href="/blog">Blog {arrow}</Link><a href="https://www.youtube.com/@azzankhanofficial" target="_blank" rel="noreferrer">YouTube {arrow}</a><a href="https://www.linkedin.com/in/azzan-khan-871958114/" target="_blank" rel="noreferrer">LinkedIn {arrow}</a><a href="https://github.com/azzankhan" target="_blank" rel="noreferrer">GitHub {arrow}</a><Link href="/contact">Contact {arrow}</Link></div><p className="copyright">© {new Date().getFullYear()} Azzan Khan · Built with Next.js and AI-assisted development.</p></footer>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function Intro({ kicker, title, copy }: { kicker: string; title: React.ReactNode; copy: string }) {
  return <section className="page-intro"><p className="eyebrow">{dot}{kicker}</p><h1>{title}</h1><p className="lead">{copy}</p></section>;
}

function PostCard({ post }: { post: Post }) {
  return <article className="post-card"><Link href={`/blog/${post.slug}`} className="post-image"><img src={post.image.replace('./', '/')} alt="" loading="lazy" /></Link><div className="post-card-body"><div className="post-meta"><span>{post.category}</span></div><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article {arrow}</Link></div></article>;
}

const featuredWork = [
  {
    tag: 'Healthcare · Learning',
    title: 'Clinical Learning Platform',
    problem: 'A scalable learning experience for doctors and nurses, built on reusable components and structured content access.',
    outcome: 'In active delivery — and my daily proving ground for spec-driven development with AI coding agents.',
    tech: 'React · Node.js · SQL · AWS · Claude agents',
  },
  {
    tag: 'AI · Healthcare',
    title: 'Microbial Detection Platform',
    problem: 'Automatically identify and count microbial colonies from laboratory imagery.',
    outcome: 'A production platform connecting laboratory image analysis with an enterprise workflow.',
    tech: 'Angular · Node.js · Azure · CI/CD · Computer vision',
  },
  {
    tag: 'Commerce · APIs',
    title: 'Ecommerce Platform',
    problem: "A dynamic, modular storefront for one of Europe's largest postal and ecommerce services.",
    outcome: 'Reusable frontend architecture serving a national-scale production experience.',
    tech: 'Angular · REST APIs · Modular frontend',
  },
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
        <div className="hero-actions"><Link className="button button-dark" href="/work">View my work {arrow}</Link><Link className="text-link" href="/#how-i-build">Read how I build {arrow}</Link></div>
        <div className="hero-status"><span className="status-pulse" />Open to thoughtful collaborations <span>·</span> based in India</div>
      </div>
      <figure className="hero-portrait"><img src="/media/azzan-hero.png" alt="Azzan Khan" /></figure>
    </section>
    <section className="signal-bar">
      <div><strong>7+</strong><span>years in enterprise engineering</span></div>
      <div><strong>5</strong><span>enterprise clients · Elsevier, GSK, GE, Roche, bpost</span></div>
      <div><strong>2</strong><span>awards · Key Contributor / Digital Ninja</span></div>
    </section>
    <section className="sdd-band" id="how-i-build">
      <p className="eyebrow">{dot}How I build</p>
      <h2>Specify first. <em>Let agents execute.</em></h2>
      <p className="sdd-copy">AI can write code extremely quickly. The harder problem is telling it what the software should do. I define the problem, constraints, expected behaviour, and acceptance criteria first, then let agents execute against them, with human review on every change.</p>
      <p className="sdd-flow">Requirements → Specification → Agent → Code → Tests → Review</p>
    </section>
    <section className="section">
      <div className="section-heading">
        <div><p className="eyebrow">{dot}Selected work</p><h2>Real problems.<br /><em>Production outcomes.</em></h2></div>
        <Link className="text-link" href="/work">All case studies {arrow}</Link>
      </div>
      <div className="story-grid">{featuredWork.map(({ tag, title, problem, outcome, tech }, index) => <article className="story-card" key={title}><span className="case-number">0{index + 1}</span><p className="eyebrow">{tag}</p><h3>{title}</h3><div className="story-line"><span>Problem</span><p>{problem}</p></div><div className="story-line"><span>Outcome</span><p>{outcome}</p></div><p className="story-tech">{tech}</p></article>)}</div>
      
    </section>
    <section className="section side-quests">
      <div className="section-heading">
        <div><p className="eyebrow">{dot}Small builds, independent projects, and experiments</p><h2>Side <em>quests.</em></h2></div>
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
  return <Shell><article className="article"><Link className="back-link" href="/blog">← Back to writing</Link><header className="article-header"><div className="post-meta"><span>{post.category}</span><span>{post.dateLabel}</span></div><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p></header><img className="article-image" src={post.image.replace('./', '/')} alt="" /><div className="article-layout"><div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} /><aside><p className="eyebrow">Keep reading</p>{posts.filter((item) => item.slug !== post.slug).slice(0, 2).map((item) => <Link className="related-link" href={`/blog/${item.slug}`} key={item.slug}><strong>{item.title}</strong><span>{item.dateLabel} {arrow}</span></Link>)}</aside></div></article></Shell>;
}

function WorkPage() {
  const projects = [
    {
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
  return <Shell><Intro kicker="Selected work" title={<>Proof over<br /><em>promises.</em></>} copy="Six public-safe case studies from enterprise programmes associated with CitiusTech and Infosys — the problems, the engineering, and the production outcomes." /><section className="case-study-grid">{projects.map(({ title, client, dates, tag, problem, role, engineering, outcome, tech, url }, index) => <article className="case-study case-story" key={title}><span className="case-number">0{index + 1}</span><p className="eyebrow">{tag}</p><h2>{title}</h2><p className="case-client">{client}</p><p className="case-dates">{dates}</p><div className="case-block"><span>The problem</span><p>{problem}</p></div><div className="case-block"><span>My role</span><p>{role}</p></div><div className="case-block"><span>Engineering</span><ul>{engineering.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="case-block"><span>Outcome</span><p>{outcome}</p></div><p className="case-capabilities"><span>Technologies</span>{tech}</p>{url && <a className="case-link" href={url} target="_blank" rel="noreferrer">View public organisation site {arrow}</a>}</article>)}</section><section className="split-callout"><p className="eyebrow">The common thread</p><h2>Same loop,<br /><em>every project.</em></h2><p>Understand, specify, architect, build with agents, validate, ship. The stack changes per project — the discipline doesn&apos;t.</p><Link className="text-link" href="/#how-i-build">See the process {arrow}</Link></section></Shell>;
}

function SkillsPage() {
  const groups = [
    ['01', 'Engineering', 'Seven years of enterprise delivery, distilled', 'System & application architecture · Full-stack development · API design · Authentication & authorization · Cloud architecture · CI/CD · Production debugging · Application modernization', ''],
    ['02', 'AI-native engineering', 'Where my practice is heading', 'Specification-driven development · Coding agents · Agentic workflows · AI-assisted implementation · AI-assisted testing · AI-assisted refactoring · AI-assisted documentation', ''],
    ['03', 'Technologies', 'Evidence, not identity', 'TypeScript · JavaScript · React · Angular · NextJS · VueJS · Node.js · AWS · Azure · SQL · NoSQL', 'skill-card-wide'],
  ];
  return <Shell><Intro kicker="Skills" title={<>Capabilities first.<br /><em>Tools second.</em></>} copy="Technologies change every few years. The ability to take a problem from specification to production doesn't — so that's what I lead with." /><section className="skills-grid">{groups.map(([number, title, subtitle, skills, extra]) => <article className={`skill-card ${extra}`} key={number}><span className="skill-number">{number}</span><p className="eyebrow">{subtitle}</p><h2>{title}</h2><p className="skill-list">{skills}</p></article>)}</section></Shell>;
}

function ProjectsPage() {
  return <Shell><Intro kicker="Projects and experiments" title={<>What I&apos;m<br /><em>learning by doing.</em></>} copy="A mix of public work, technical experiments, and small systems that keep my curiosity close to the craft." /><section className="project-notes"><div><p className="eyebrow">Current focus</p><h2>Specification-driven development</h2><p>Defining behaviour, constraints, and acceptance criteria before code — so AI agents execute against intent, not guesses.</p></div><div><p className="eyebrow">Daily practice</p><h2>Coding agents in production</h2><p>Working extensively with Claude agents, custom agent skills, and agentic workflows on the clinical learning platform — with human review on every change.</p></div><div><p className="eyebrow">Side direction</p><h2>Small products, real users</h2><p>Building and learning in public through Garden Public School, technical writing, and experiments that turn ideas into working interfaces.</p></div><div><p className="eyebrow">Always improving</p><h2>Ship, observe, refine</h2><p>The work is not finished at deployment. Feedback, tests, monitoring, and thoughtful iteration are part of the product.</p></div></section></Shell>;
}

function StandardPage({ kind }: { kind: string }) {
  const content: Record<string, { kicker: string; title: React.ReactNode; copy: string }> = {
    work: { kicker: 'Selected work', title: <>Thoughtful work,<br /><em>built to matter.</em></>, copy: 'A selection of projects and product experiences where engineering, clarity, and a little stubbornness came together.' },
    skills: { kicker: 'Technical skills', title: <>A broad toolkit,<br /><em>built through delivery.</em></>, copy: 'Engineering capabilities developed through enterprise healthcare, learning, AI-assisted, ecommerce, and cloud programmes.' },
    services: { kicker: 'Technical skills', title: <>A broad toolkit,<br /><em>built through delivery.</em></>, copy: 'Engineering capabilities developed through enterprise healthcare, learning, AI-assisted, ecommerce, and cloud programmes.' },
    projects: { kicker: 'Projects', title: <>Small experiments,<br /><em>serious curiosity.</em></>, copy: 'A living shelf of things I’m building, exploring, or learning from.' },
    about: { kicker: 'About Azzan', title: <>Engineer by trade.<br /><em>Builder by nature.</em></>, copy: 'I like useful things, honest conversations, and the moment a messy problem becomes a simple next step.' },
    contact: { kicker: 'Contact', title: <>Let&apos;s <em>talk.</em></>, copy: 'Tell me what you’re working on, where you’re stuck, or what you want to make better. I usually reply within a day on weekdays.' },
    youtube: { kicker: 'YouTube', title: <>The build log,<br /><em>in motion.</em></>, copy: 'A place for practical engineering walkthroughs, architecture conversations, and the occasional lesson learned the hard way.' },
  };
  const item = content[kind] ?? content.work;
  if (kind === 'work') return <WorkPage />;
  if (kind === 'skills' || kind === 'services') return <SkillsPage />;
  if (kind === 'projects') return <ProjectsPage />;
  if (kind === 'about') return <Shell><Intro {...item} /><section className="about-grid"><div className="about-statement"><p>I&apos;m a Lead Engineer and full-stack developer with 7+ years of experience building enterprise-grade web applications across healthcare, learning, AI-assisted workflows, and ecommerce.</p><p>I work across modern web platforms, APIs, cloud infrastructure, data systems, and delivery practices. I enjoy turning complex product requirements into clear, maintainable software, and I use AI-assisted development to accelerate the work while keeping engineering judgment in the loop.</p></div><div className="about-facts"><div><span>Current role</span><strong>Lead Engineer<br />CitiusTech · Apr 2024 — present</strong></div><div><span>Prior role</span><strong>Senior Software Engineer<br />CitiusTech · Jan 2022 — Mar 2024</strong></div><div><span>Earlier</span><strong>Systems Engineer → Senior Systems Engineer<br />Infosys · Jan 2019 — Jan 2022</strong></div><div><span>Recognition</span><strong>Key Contributor Award · 2023<br />Digital Ninja Award · 2021<br /><small>Associated with CitiusTech / Infosys</small></strong></div></div></section><section className="career-section"><p className="eyebrow">{dot}Professional journey</p><h2>Experience across<br /><em>high-stakes products.</em></h2><div className="career-grid"><div><strong>CitiusTech</strong><span>Lead Engineer · Apr 2024 — present<br />Senior Software Engineer · Jan 2022 — Mar 2024</span><p>Enterprise healthcare and learning products, contributing across architecture, full-stack development, APIs, data, cloud delivery, CI/CD, and production quality.</p></div><div><strong>Infosys</strong><span>Senior Systems Engineer · Jan 2021 — Jan 2022<br />Systems Engineer · Jun 2019 — Dec 2020<br />Trainee · Jan 2019 — May 2019</span><p>Enterprise ecommerce and cloud modernization work, delivering modular product experiences, API integrations, and AWS-backed workflows.</p></div></div></section></Shell>;
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
  return <StandardPage kind={slug[0]} />;
}
