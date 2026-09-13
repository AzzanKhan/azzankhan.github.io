import './style.css';
import posts from './content/posts.json';

const app = document.querySelector('#app');
const navItems = [
  ['Work', '/work'],
  ['Services', '/services'],
  ['Writing', '/blog'],
  ['About', '/about'],
];

const icons = {
  arrow: '<span aria-hidden="true">â†—</span>',
  dot: '<span class="eyebrow-dot" aria-hidden="true"></span>',
};

function escapeHtml(value = '') {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function nav() {
  return `<header class="site-header"><a class="logo" href="/" data-link><span class="logo-mark">AK</span><span>Azzan Khan</span></a>
    <nav aria-label="Primary navigation">${navItems.map(([label, href]) => `<a href="${href}" data-link>${label}</a>`).join('')}</nav>
    <a class="button button-small button-dark" href="/contact" data-link>Let's talk ${icons.arrow}</a>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">â˜°</button>
  </header>`;
}

function footer() {
  return `<footer class="site-footer"><div><a class="logo" href="/" data-link><span class="logo-mark">AK</span><span>Azzan Khan</span></a><p class="muted">Lead Engineer Â· Full-Stack Developer Â· Builder</p></div>
    <div class="footer-links"><a href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube ${icons.arrow}</a><a href="mailto:hello@azzankhan.dev">Email ${icons.arrow}</a><a href="/contact" data-link>Contact ${icons.arrow}</a></div>
    <p class="copyright">Â© ${new Date().getFullYear()} Azzan Khan. Built with intent.</p></footer>`;
}

function shell(content, label = 'Azzan Khan') {
  return `${nav()}<main>${content}</main>${footer()}<div class="toast" role="status" aria-live="polite"></div>`.replaceAll('href="/', 'href="#/');
}

function pageIntro(kicker, title, copy) {
  return `<section class="page-intro"><p class="eyebrow">${icons.dot}${kicker}</p><h1>${title}</h1><p class="lead">${copy}</p></section>`;
}

function postCard(post, featured = false) {
  const image = post.image || './media/Blog.jpg';
  return `<article class="post-card ${featured ? 'post-card-featured' : ''}"><a href="/blog/${post.slug}" data-link class="post-image"><img src="${image}" alt="" loading="lazy" /></a><div class="post-card-body"><div class="post-meta"><span>${post.category}</span><span>${post.dateLabel}</span></div><h3><a href="/blog/${post.slug}" data-link>${escapeHtml(post.title)}</a></h3><p>${escapeHtml(post.excerpt)}</p><a class="text-link" href="/blog/${post.slug}" data-link>Read article ${icons.arrow}</a></div></article>`;
}

function home() {
  const featured = posts[0];
  return shell(`<section class="hero"><div class="hero-copy"><p class="eyebrow">${icons.dot}Independent engineer Â· India</p><h1>I turn complex ideas into <em>useful</em> digital products.</h1><p class="hero-lead">Iâ€™m Azzan â€” a lead engineer and full-stack developer who enjoys the space between a clear product idea and a well-crafted launch.</p><div class="hero-actions"><a class="button button-dark" href="/work" data-link>See my work ${icons.arrow}</a><a class="text-link" href="/about" data-link>More about me ${icons.arrow}</a></div></div><div class="hero-visual"><div class="orb orb-one"></div><div class="orb orb-two"></div><div class="code-card"><span class="code-label">currently_building</span><code><b>const</b> goodWork = {<br />&nbsp;&nbsp;clarity: <i>true</i>,<br />&nbsp;&nbsp;craft: <i>true</i>,<br />&nbsp;&nbsp;momentum: <i>true</i><br />};</code></div><div class="hero-note">Systems thinker<br /><strong>with a makerâ€™s bias.</strong></div></div></section>
    <section class="trusted section-rule"><p class="eyebrow">A few things I care about</p><div class="principles"><div><strong>01</strong><span>Make it clear</span></div><div><strong>02</strong><span>Make it useful</span></div><div><strong>03</strong><span>Make it last</span></div></div></section>
    <section class="section"><div class="section-heading"><div><p class="eyebrow">${icons.dot}Selected work</p><h2>Building for people,<br /><em>not just pixels.</em></h2></div><a class="text-link" href="/work" data-link>View all work ${icons.arrow}</a></div><div class="work-grid"><a class="work-card work-card-large" href="/work" data-link><div class="work-card-art garden-art"><span>Garden<br /><i>Public School</i></span><small>Education Â· Digital experience</small></div><div class="work-card-caption"><strong>Garden Public School</strong><span>01 / Featured work</span></div></a><a class="work-card" href="/projects" data-link><div class="work-card-art systems-art"><span>Systems<br /><i>that scale</i></span><small>Engineering Â· Product thinking</small></div><div class="work-card-caption"><strong>Product & platform work</strong><span>02 / Ongoing</span></div></a></div></section>
    <section class="section writing-section"><div class="section-heading"><div><p class="eyebrow">${icons.dot}From the archive</p><h2>Notes on the<br /><em>craft of building.</em></h2></div><a class="text-link" href="/blog" data-link>Browse all writing ${icons.arrow}</a></div><div class="post-grid">${posts.slice(0, 3).map((post) => postCard(post)).join('')}</div></section>
    <section class="video-banner"><div><p class="eyebrow">Watch along</p><h2>Build in public.<br /><em>Learn out loud.</em></h2><p>Practical videos on engineering, architecture, and the lessons hiding in the work.</p></div><a class="button button-light" href="/youtube" data-link>Visit YouTube ${icons.arrow}</a></section>
    <section class="cta-section"><p class="eyebrow">${icons.dot}Have a good problem?</p><h2>Letâ€™s make something<br /><em>worth making.</em></h2><a class="button button-dark" href="/contact" data-link>Start a conversation ${icons.arrow}</a></section>`, 'Home');
}

function work() {
  return shell(`${pageIntro('Selected work', 'Thoughtful work,<br /><em>built to matter.</em>', 'A selection of projects and product experiences where engineering, clarity, and a little stubbornness came together.') }<section class="work-list"><article class="project-feature"><div class="project-art garden-art"><span>Garden<br /><i>Public School</i></span><small>Education Â· Featured work</small></div><div class="project-copy"><p class="eyebrow">01 / Featured</p><h2>A warmer front door<br />for a growing school.</h2><p>Garden Public School is a people-first education experience. Iâ€™m interested in making the digital layer feel as welcoming, legible, and useful as the people behind it.</p><a class="text-link" href="/contact" data-link>Discuss a project ${icons.arrow}</a></div></article><article class="project-feature project-reverse"><div class="project-art systems-art"><span>Product<br /><i>systems</i></span><small>Engineering Â· Platform thinking</small></div><div class="project-copy"><p class="eyebrow">02 / Ongoing</p><h2>Reliable systems<br />behind useful products.</h2><p>From APIs and authentication to data flows and deployment, I build the invisible foundations that help teams move quickly without creating tomorrowâ€™s problems.</p><a class="text-link" href="/services" data-link>See how I work ${icons.arrow}</a></div></article></section>`);
}

function services() {
  const items = [['01', 'Product engineering', 'From first sketch to production: interfaces, APIs, data models, and the decisions that make a product feel coherent.'], ['02', 'Technical direction', 'Architecture that serves the product. I help teams make pragmatic choices, reduce unknowns, and build momentum.'], ['03', 'Systems & platform', 'The reliable layer underneath: authentication, integrations, deployment, observability, and a calm path to scale.']];
  return shell(`${pageIntro('Services', 'Good work is a<br /><em>team sport.</em>', 'I partner with founders, teams, and thoughtful organisations to turn ambitious ideas into dependable software.') }<section class="service-list">${items.map(([n, title, copy]) => `<article class="service-item"><span class="service-number">${n}</span><div><h2>${title}</h2><p>${copy}</p></div><span class="service-arrow">${icons.arrow}</span></article>`).join('')}</section><section class="split-callout"><p class="eyebrow">My approach</p><h2>Less theatre.<br /><em>More progress.</em></h2><p>Clear questions, small iterations, and enough care in the details to make the final thing feel inevitable.</p></section>`);
}

function blog() {
  return shell(`${pageIntro('Writing', 'Ideas from the<br /><em>shipping lane.</em>', 'An archive of practical notes on JavaScript, APIs, authentication, infrastructure, and the lessons that survive the code review.') }<div class="blog-toolbar"><span>${posts.length} articles in the archive</span><span>2022 â€” present</span></div><section class="post-grid post-grid-all">${posts.map((post) => postCard(post)).join('')}</section>`);
}

function article(slug) {
  const post = posts.find((item) => item.slug === slug);
  if (!post) return notFound();
  const related = posts.filter((item) => item.slug !== slug).slice(0, 2);
  return shell(`<article class="article"><a class="back-link" href="/blog" data-link>â† Back to writing</a><header class="article-header"><div class="post-meta"><span>${post.category}</span><span>${post.dateLabel}</span></div><h1>${escapeHtml(post.title)}</h1><p class="article-excerpt">${escapeHtml(post.excerpt)}</p></header><img class="article-image" src="${post.image || './media/Blog.jpg'}" alt="" /><div class="article-layout"><div class="article-content">${post.content}</div><aside><p class="eyebrow">Keep reading</p>${related.map((item) => `<a class="related-link" href="/blog/${item.slug}" data-link><strong>${escapeHtml(item.title)}</strong><span>${item.dateLabel} ${icons.arrow}</span></a>`).join('')}</aside></div></article>`);
}

function about() {
  return shell(`${pageIntro('About Azzan', 'Engineer by trade.<br /><em>Builder by nature.</em>', 'I like useful things, honest conversations, and the moment a messy problem becomes a simple next step.') }<section class="about-grid"><div class="about-statement"><p>Iâ€™m a full-stack engineer who has spent my career moving between product questions and technical details. That range is where Iâ€™m happiest: close enough to the user to understand the why, deep enough in the stack to make the how hold up.</p><p>My public professional context includes work with CitiusTech. I keep the details of that work private, and share the lessons that can stand on their own.</p></div><div class="about-facts"><div><span>Based in</span><strong>India Â· Working globally</strong></div><div><span>Focus</span><strong>Product engineering<br />Technical direction</strong></div><div><span>Outside work</span><strong>Writing Â· YouTube<br />Curious side projects</strong></div></div></section>`);
}

function contact() {
  return shell(`${pageIntro('Contact', 'Have a problem worth<br /><em>solving?</em>', 'Tell me what youâ€™re working on, where youâ€™re stuck, or what you want to make better. Iâ€™ll get back to you with a thoughtful next step.') }<section class="contact-panel"><div><p class="eyebrow">Best way to reach me</p><a class="contact-email" href="mailto:hello@azzankhan.dev">hello@azzankhan.dev ${icons.arrow}</a><p class="muted">Usually replies within a couple of working days.</p></div><div class="contact-social"><a href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube ${icons.arrow}</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ${icons.arrow}</a><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ${icons.arrow}</a></div></section>`);
}

function youtube() {
  return shell(`${pageIntro('YouTube', 'The build log,<br /><em>in motion.</em>', 'A place for practical engineering walkthroughs, architecture conversations, and the occasional lesson learned the hard way.') }<section class="youtube-panel"><div class="play-button">â–¶</div><div><p class="eyebrow">Azzan Khan on YouTube</p><h2>Build in public.<br /><em>Learn out loud.</em></h2><a class="button button-dark" href="https://www.youtube.com/" target="_blank" rel="noreferrer">Open channel ${icons.arrow}</a></div></section>`);
}

function projects() {
  return shell(`${pageIntro('Projects', 'Small experiments,<br /><em>serious curiosity.</em>', 'A living shelf of things Iâ€™m building, exploring, or learning from.') }<section class="project-notes"><div><span class="note-index">01</span><h2>Garden Public School</h2><p>Featured work focused on a clear, welcoming digital presence for a school community.</p><a class="text-link" href="/work" data-link>View the story ${icons.arrow}</a></div><div><span class="note-index">02</span><h2>Writing archive</h2><p>Technical guides from the WordPress archive, brought forward with their original dates and practical spirit.</p><a class="text-link" href="/blog" data-link>Read the archive ${icons.arrow}</a></div></section>`);
}

function notFound() { return shell(`${pageIntro('404', 'That page took<br /><em>a wrong turn.</em>', 'The link you followed doesnâ€™t point anywhere here.') }<a class="button button-dark" href="/" data-link>Back home ${icons.arrow}</a>`); }

function render() {
  const path = (window.location.hash.slice(1).replace(/\/+$/, '') || '/');
  let view = path === '/' ? home() : path === '/work' ? work() : path === '/services' ? services() : path === '/blog' ? blog() : path === '/about' ? about() : path === '/contact' ? contact() : path === '/youtube' ? youtube() : path === '/projects' ? projects() : path.startsWith('/blog/') ? article(path.split('/')[2]) : notFound();
  app.innerHTML = view;
  document.querySelectorAll('[data-link]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); window.location.hash = link.getAttribute('href').replace(/^#/, ''); window.scrollTo(0, 0); }));
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('nav');
  toggle?.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', open); });
}

window.addEventListener('hashchange', render);
render();

