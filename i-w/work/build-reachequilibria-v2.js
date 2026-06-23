const fs = require("fs");
const path = require("path");

const outDir = path.resolve("outputs/reachequilibria-site");
const v2Assets = path.resolve("outputs/reachequilibria-site-v2/assets");
const outAssets = path.join(outDir, "assets");
const hasLocalAssetCache = fs.existsSync(v2Assets);
const manifest = JSON.parse(fs.readFileSync("work/current-site-image-manifest.json", "utf8")).map((item) => ({
  ...item,
  sourceFile: item.file,
  file: item.file.endsWith(".img") ? item.file.replace(/\.img$/, ".png") : item.file,
}));

fs.mkdirSync(outAssets, { recursive: true });
if (hasLocalAssetCache) {
  for (const item of manifest) {
    fs.copyFileSync(path.join(v2Assets, item.sourceFile), path.join(outAssets, item.file));
  }
}

const docsDir = path.join(outAssets, "docs");
fs.mkdirSync(docsDir, { recursive: true });
fs.copyFileSync("work/source-docs/reachequilibria-constitution-v1.pdf", path.join(docsDir, "reachequilibria-constitution-v1.pdf"));
fs.copyFileSync("work/source-docs/req-chapter-resources-pack-v1.pdf", path.join(docsDir, "req-chapter-resources-pack-v1.pdf"));

const extraAssets = [
  "founder-satyam-sood.png",
  "chapter-campus-texas-am.jpg",
  "chapter-campus-ut-austin.jpg",
  "req-paint-it-out-workshop.jpg",
  "req-coppell-chamber-ribbon-cutting.jpg",
  "req-fun-family-fitness-event.jpg",
  "req-grant-halliburton-hope-kits.jpg",
  "req-community-booth.jpg",
  "req-dental-kit-packing.jpg",
];
for (const file of extraAssets) {
  fs.copyFileSync(path.join("work/source-assets", file), path.join(outAssets, file));
}

const byKey = Object.fromEntries(manifest.map((item) => [item.key, item.file]));
const byFile = Object.fromEntries(manifest.map((item) => [item.file, item]));
const projectAssets = new Set([...manifest.map((item) => item.file), ...extraAssets]);
const coppellHighExterior = "https://cmsv2-assets.apptegy.net/uploads/13926/file/5067396/ddd2f166-a74b-4d51-b8e6-878c826e028a.png";
const fallbackImage = byKey["ourcalling-group-photo-A85ELNa8gxcRBDQz.jpeg"] || byKey["image-6-13-24-at-2.05a-pm-YBgpzEG1PRsZ4voz.jpeg"] || byKey["2-img_3963-YNqMz4GOgzhLVQnG.jpg"] || "51-ourcalling-group-photo-a85elna8gxcrbdqz.jpg";
const externalImage = (value) => /^https?:\/\//.test(String(value || ""));
function safeImage(file) {
  return file && (externalImage(file) || projectAssets.has(file)) ? file : fallbackImage;
}
const imageFocus = {
  "founder-satyam-sood.png": "center 18%",
  "01-4b0ed8f5-283e-4836-8978-a9a52dd7aae3-dwxl8xbllwi08wy4.jpg": "center 18%",
  "04-img-6358-yv4glaocile7pjts.png": "center 18%",
  "05-immanuel-officer-yrd45peogyiqazyl.jpg": "center 16%",
  "06-johan-officer-photo-ykb8vkxr2rhbqxjl.jpg": "center 18%",
  "10-renderedimage-d95zje05oqckzxk8.jpg": "center 18%",
  "11-trinity-officer-photo-aq2gx7dob0ilbvko.jpg": "center 14%",
  "12-untitled-design-agbz0kb2gyuqrzvy.png": "center 16%",
  "24-brazos1-3ordzhralk9vtypo.jpg": "center 30%",
  "30-downloadgram-org-491468791-17889240723248141-4387261445290492030-n-l6d2h.jpg": "center 48%",
  "31-downloadgram-org-492134424-17889240834248141-7437419056652610628-n-mzkms.jpg": "center 42%",
  "32-downloadgram-org-494513513-17889713244248141-4040341651330130252-n-8qs95.jpg": "center 38%",
  "33-downloadgram-org-605433135-17917833435248141-6142891204662554544-n-vpnba.jpg": "center 42%",
  "34-downloadgram-org-640292536-18038967512767033-1100578638609987350-n-f0lvf.jpg": "center 35%",
  "37-grant-halliburton-gdsra4kt9gqjmhp6.jpg": "center 42%",
  "41-img-5816-mepnyw2o5zsgpkg4.jpg": "center 42%",
  "55-img-6248-2-awvkdn903vs7gzz9.jpg": "center 18%",
  "51-ourcalling-group-photo-a85elna8gxcrbdqz.jpg": "center 32%",
  "72-reach-equilibria-ourcalling-volunteering-m7v5xlqzzvcxjj8e.jpg": "center 34%",
  "74-reachequilibria-dental-kit-group-photo-ar0mo9zzwxc5qevm.jpg": "center 30%",
  "75-req-bake-sale-example-mxbmnqxwoqhel895.jpg": "center 48%",
  "76-req-chess-event-avl1593a0ncp8eky.jpg": "center 34%",
  "chapter-campus-texas-am.jpg": "center 45%",
  "chapter-campus-ut-austin.jpg": "center 48%",
  "req-paint-it-out-workshop.jpg": "center 48%",
  "req-coppell-chamber-ribbon-cutting.jpg": "center 45%",
  "req-fun-family-fitness-event.jpg": "center 58%",
  "req-grant-halliburton-hope-kits.jpg": "center 48%",
  "req-community-booth.jpg": "center 50%",
  "req-dental-kit-packing.jpg": "center 52%",
  [coppellHighExterior]: "center center",
};
const imageLabels = {
  "req-paint-it-out-workshop.jpg": "ReachEquilibria Paint it Out art workshop",
  "req-coppell-chamber-ribbon-cutting.jpg": "ReachEquilibria ribbon cutting with Coppell Chamber of Commerce",
  "req-fun-family-fitness-event.jpg": "ReachEquilibria community event volunteer booth",
  "req-grant-halliburton-hope-kits.jpg": "ReachEquilibria visit to Grant Halliburton Foundation",
  "req-community-booth.jpg": "ReachEquilibria community outreach booth",
  "req-dental-kit-packing.jpg": "ReachEquilibria dental kit packing",
};
const img = (file, alt = "") => {
  const source = safeImage(file);
  const meta = externalImage(source) ? {} : byFile[source] || {};
  const label = alt || imageLabels[source] || meta.alt || "ReachEquilibria image";
  const focus = imageFocus[source] ? ` style="--focus: ${escapeHtml(imageFocus[source])}"` : "";
  return `<img src="${asset(source)}" alt="${escapeHtml(label)}" loading="lazy"${focus}>`;
};

let currentPrefix = "";
function asset(file) {
  if (externalImage(file)) return file;
  if (!hasLocalAssetCache && byFile[file]?.url) return byFile[file].url;
  return `${currentPrefix}assets/${file}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function p(text) {
  return `<p>${escapeHtml(text)}</p>`;
}

function h(level, text) {
  return `<h${level}>${escapeHtml(text)}</h${level}>`;
}

const nav = [
  ["Home", "index"],
  ["Learn", "learn"],
  ["Get Involved", "involved"],
  ["Get Help", "help"],
  ["About Us", "about"],
  ["Blogs", "blogs"],
  ["Ways to Give", "give"],
];

const chapterDriveUrl = "https://drive.google.com/drive/folders/1v3mGhQh0-XRE9vzAiHc308ZjZuxhuEwA?usp=sharing";

const routeMap = {
  index: "index.html",
  learn: "resources/index.html",
  involved: "chapters/index.html",
  help: "get-help/index.html",
  about: "about/index.html",
  impact: "impact/index.html",
  resources: "resources/index.html",
  chapters: "chapters/index.html",
  blogs: "blogs/index.html",
  give: "donate/index.html",
  donate: "donate/index.html",
  contact: "contact-us/index.html",
  team: "satyam-sood/index.html",
  story: "our-story/index.html",
  events: "past-events/index.html",
  articles: "mental-wellness-articles/index.html",
  join: "volunteering-opportunities/index.html",
  chapter: "create-a-chapter/index.html",
  gallery: "gallery/index.html",
  constitution: "constitution/index.html",
};

function hrefFor(slug) {
  return `${currentPrefix}${routeMap[slug]}`;
}

function pageIdentity({ title, active }) {
  const identity = {
    index: ["Support", "Solutions", "Awareness"],
    learn: ["Resources", "Mental Health Awareness Services", "National Suicide Hotline: 988"],
    involved: ["Volunteer", "Create a Chapter", "Internships"],
    help: ["988", "Contact", "Support"],
    about: ["501(c)(3)", "EIN 99-3505959", "Our Story"],
    blogs: ["Mindfulness", "Therapy", "Self-Care"],
    give: ["Donate", "$25,000+ Raised", "Community"],
  };
  const labels = identity[active] || ["Support", "Solutions", "Awareness"];
  const tabLabel = (nav.find(([, slug]) => slug === active) || ["ReachEquilibria"])[0];
  return `<section class="page-sigil" aria-label="ReachEquilibria">
    <div class="sigil-orb">
      <span>REQ</span>
      <small>${escapeHtml(tabLabel)}</small>
    </div>
    <div class="sigil-copy">
      <p class="eyebrow">Reaching Stability Together</p>
      <h2>${escapeHtml(title)}</h2>
      <p>Nobody is in this alone; We are here to help</p>
    </div>
    <div class="sigil-pills">
      ${labels.map((label) => `<span>${escapeHtml(label)}</span>`).join("")}
    </div>
  </section>`;
}

function shell({ title, active, eyebrow, heading, intro, heroImage, content, pageClass = "" }) {
  const description = "ReachEquilibria is a student-led Non-Profit organization that focuses on spreading mental health awareness and suicide awareness.";
  const navLinks = nav
    .map(([label, slug], index) => `<a class="${slug === active ? "active" : ""}" href="${hrefFor(slug)}" style="--tab-index: ${index + 1}">
      <span class="nav-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="nav-label">${escapeHtml(label)}</span>
    </a>`)
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | ReachEquilibria</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="theme-color" content="#26351f">
    <meta property="og:title" content="${escapeHtml(title)} | ReachEquilibria">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${asset(byKey["image-6-13-24-at-2.05a-pm-YBgpzEG1PRsZ4voz.jpeg"] || fallbackImage)}">
    <link rel="icon" href="${asset(byKey["screenshot-2024-06-14-100938-Aq2Br53rE7SqQgVl.png"] || byKey["image-6-13-24-at-2.05a-pm-YBgpzEG1PRsZ4voz.jpeg"])}">
    <link rel="stylesheet" href="${currentPrefix}styles.css">
  </head>
  <body class="${pageClass}">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="crisis-bar">
      <span>Nobody is in this alone; We are here to help</span>
      <a href="https://988lifeline.org" target="_blank" rel="noopener">National Suicide Hotline: 988</a>
    </div>
    <header class="site-header">
      <div class="header-top">
        <a class="brand" href="${hrefFor("index")}" aria-label="ReachEquilibria home">
          ${img(byKey["image-6-13-24-at-2.05a-pm-YBgpzEG1PRsZ4voz.jpeg"], "ReachEquilibria logo")}
        </a>
        <div class="header-actions">
          <a class="utility-link" href="https://988lifeline.org" target="_blank" rel="noopener">Call or text 988</a>
          <a class="donate-pill" href="${hrefFor("give")}">Donate</a>
        </div>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="site-nav" aria-label="Primary navigation" style="--nav-count: ${nav.length}">
        ${navLinks}
      </nav>
    </header>
    <main id="main">
      <section class="page-hero">
        <div class="hero-image">${heroImage ? img(heroImage.file, heroImage.alt || "") : ""}</div>
        <canvas class="hero-canvas" aria-hidden="true"></canvas>
        <div class="hero-motion" aria-hidden="true"></div>
        <div class="hero-orbit" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(eyebrow || "ReachEquilibria")}</p>
          <h1>${escapeHtml(heading)}</h1>
          ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
        </div>
      </section>
      ${pageIdentity({ title, active })}
      ${content}
    </main>
    <footer class="site-footer">
      <div>
        ${img(byKey["image-6-13-24-at-2.05a-pm-YBgpzEG1PRsZ4voz.jpeg"], "ReachEquilibria logo")}
        <p>Contact</p>
        <p>Sign up for our Newsletter</p>
        <p><a href="mailto:contact@reachequilibria.org">contact@reachequilibria.org</a></p>
        <p><a href="tel:+12146065320">214-606-5320</a></p>
      </div>
      <form class="newsletter-form">
        <label for="newsletter-${active}">Sign up for our Newsletter</label>
        <div>
          <input id="newsletter-${active}" type="email" name="email" placeholder="contact@reachequilibria.org" required>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div class="footer-legal">
        <p>© 2025. All rights reserved to ReachEquilibria.</p>
        <p>Reach Equilibria is a 501(c)(3) non-profit organization. EIN 99-3505959.</p>
      </div>
    </footer>
    <section class="reach-chat" aria-label="Reach chatbot">
      <div class="reach-screen-popup" role="dialog" aria-modal="true" aria-label="Ask Reach">
        <div class="reach-popup-panel">
          <button type="button" class="reach-popup-close" aria-label="Close Reach popup">&times;</button>
          <span>Reach</span>
          <h2>Need something?</h2>
          <p>Ask the chatbot if you have any questions or need something or any services.</p>
          <button type="button" class="reach-popup-open">Ask Reach</button>
        </div>
      </div>
      <div class="reach-chat-nudge">Ask Reach if you have any questions or need something or any services.</div>
      <div class="reach-chat-window" aria-hidden="true">
        <div class="reach-chat-header">
          <div>
            <strong>Reach</strong>
            <span>ReachEquilibria assistant</span>
          </div>
          <button type="button" class="reach-chat-close" aria-label="Close Reach chatbot">&times;</button>
        </div>
        <div class="reach-chat-messages" aria-live="polite">
          <p class="reach-message bot">Hi, I’m Reach. Ask me about volunteering, creating a chapter, donations, resources, events, or contacting ReachEquilibria.</p>
        </div>
        <form class="reach-chat-form">
          <input name="question" autocomplete="off" placeholder="Ask Reach a question..." aria-label="Ask Reach a question">
          <button type="submit">Send</button>
        </form>
      </div>
      <button type="button" class="reach-chat-toggle" aria-expanded="false">
        <span>Reach</span>
      </button>
    </section>
    <div class="toast" role="status" aria-live="polite"></div>
    <script src="${currentPrefix}script.js"></script>
  </body>
</html>`;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function section(title, body, cls = "", id = "") {
  const sectionId = id || (title ? slugify(title) : "");
  return `<section${sectionId ? ` id="${sectionId}"` : ""} class="content-section ${cls}"><div class="section-inner">${title ? h(2, title) : ""}${body}</div></section>`;
}

function splitSection(left, right, cls = "") {
  return `<section class="split-section ${cls}"><div>${left}</div><div>${right}</div></section>`;
}

function uniqueImageFiles(files, exclude = []) {
  const excluded = new Set(exclude.map((file) => safeImage(file)));
  const seen = new Set();
  return files
    .map((file) => safeImage(file))
    .filter((file) => {
      if (excluded.has(file) || seen.has(file)) return false;
      seen.add(file);
      return true;
    });
}

function imageGrid(files, cls = "") {
  return `<div class="photo-grid ${cls}">${uniqueImageFiles(files).map((file) => {
    const meta = byFile[file] || {};
    const label = imageLabels[file] || meta.alt || "";
    return `<figure>${img(file, label || "ReachEquilibria image")}<figcaption>${escapeHtml(label)}</figcaption></figure>`;
  }).join("")}</div>`;
}

function photoRibbon(files, cls = "") {
  return `<div class="photo-ribbon ${cls}">${files.map((file) => {
    const meta = byFile[file] || {};
    return `<figure>${img(file, meta.alt || "ReachEquilibria image")}</figure>`;
  }).join("")}</div>`;
}

function linkCards(cards, cls = "") {
  return `<div class="link-card-grid ${cls}">${cards.map((card) => {
    const external = /^https?:\/\//.test(card.href);
    return `<a href="${card.href}" class="link-card"${external ? ` target="_blank" rel="noopener"` : ""}>
    ${card.image ? img(card.image, card.title) : ""}
    <span>${escapeHtml(card.kicker || "")}</span>
    <strong>${escapeHtml(card.title)}</strong>
    <p>${escapeHtml(card.text || "")}</p>
  </a>`;
  }).join("")}</div>`;
}

function statBand() {
  return `<section class="stat-band">
    <article><strong>$25,000+</strong><span>Raised</span></article>
    <article><strong>988</strong><span>National Suicide Hotline: 988</span></article>
    <article><strong>501(c)(3)</strong><span>Reach Equilibria is a 501(c)(3) non-profit organization. EIN 99-3505959.</span></article>
  </section>`;
}

function docActions(downloadHref, label) {
  return `<div class="document-actions">
    <a class="button" href="${downloadHref}" target="_blank" rel="noopener">${escapeHtml(label)}</a>
  </div>`;
}

function blogHref(slug) {
  return `${currentPrefix}blogs/${slug}/index.html`;
}

function signatureBoard() {
  return `<section class="signature-board">
    <div class="signature-copy">
      <p class="eyebrow">Reaching Stability Together</p>
      <h2>Empowering Minds Through Compassion</h2>
      <p>ReachEquilibria is a welcoming online space dedicated to mental health support and resources. We're here to raise awareness and push for meaningful change.</p>
      <div class="signature-actions">
        <a class="button light" href="${hrefFor("learn")}">Learn</a>
        <a class="button light" href="${hrefFor("involved")}">Get Involved</a>
      </div>
    </div>
    <div class="signature-mosaic">
      ${img("34-downloadgram-org-640292536-18038967512767033-1100578638609987350-n-f0lvf.jpg", "Heritage Night")}
      ${img("51-ourcalling-group-photo-a85elna8gxcrbdqz.jpg", "ReachEquilibria volunteers")}
      ${img("74-reachequilibria-dental-kit-group-photo-ar0mo9zzwxc5qevm.jpg", "Dental kit creation")}
      ${img("75-req-bake-sale-example-mxbmnqxwoqhel895.jpg", "Bakesale")}
    </div>
  </section>`;
}

function reachLab() {
  return `<section class="reach-lab">
    <div class="reach-lab-copy">
      <p class="eyebrow">ReachEquilibria System</p>
      <h2>Support, Solutions, Awareness</h2>
      <p>We're all about raising mental health awareness and creating a caring, supportive community.</p>
      <p>Find real solutions and resources to support your mental wellness journey with us.</p>
    </div>
    <div class="mind-map" aria-label="ReachEquilibria focus areas">
      <div class="mind-core">
        <strong>REQ</strong>
        <span>Reaching Stability Together</span>
      </div>
      <article class="mind-node node-one"><strong>Support</strong><span>Join us for mental health support and a push for real change.</span></article>
      <article class="mind-node node-two"><strong>Solutions</strong><span>Find real solutions and resources to support your mental wellness journey with us.</span></article>
      <article class="mind-node node-three"><strong>Awareness</strong><span>We're all about raising mental health awareness and creating a caring, supportive community.</span></article>
      <article class="mind-node node-four"><strong>Service</strong><span>We create tangible impact through action, volunteerism, and community engagement.</span></article>
    </div>
  </section>`;
}

function serviceConstellation() {
  return `<section class="service-constellation">
    <div class="constellation-copy">
      <p class="eyebrow">What ReachEquilibria Builds</p>
      <h2>One mission, many ways to reach people.</h2>
    </div>
    <div class="constellation-field">
      <article class="constellation-node c-one"><span>01</span><strong>Advocacy</strong><p>We speak up for those who need support and work to create meaningful change.</p></article>
      <article class="constellation-node c-two"><span>02</span><strong>Service</strong><p>We create tangible impact through action, volunteerism, and community engagement.</p></article>
      <article class="constellation-node c-three"><span>03</span><strong>Leadership</strong><p>We empower students to lead initiatives that improve their schools and communities.</p></article>
      <article class="constellation-node c-four"><span>04</span><strong>Education</strong><p>We believe knowledge reduces stigma and promotes understanding.</p></article>
      <article class="constellation-node c-five"><span>05</span><strong>Impact</strong><p>We prioritize measurable, sustainable, and lasting change.</p></article>
    </div>
  </section>`;
}

function impactPortal() {
  return `<section class="impact-portal">
    <div class="portal-copy">
      <p class="eyebrow">Impact in motion</p>
      <h2>Community events that feel alive.</h2>
      <p>We host fundraisers and services, and our student-led team(of several members as of now) is at the center of our mission; we intend to encourage young people to help others of all ages and volunteer for the community.</p>
      <a class="button light" href="${hrefFor("impact")}">Our Past Events</a>
    </div>
    <div class="portal-gallery">
      ${img("req-coppell-chamber-ribbon-cutting.jpg", "ReachEquilibria ribbon cutting with Coppell Chamber of Commerce")}
      ${img("req-paint-it-out-workshop.jpg", "ReachEquilibria Paint it Out art workshop")}
      ${img("req-community-booth.jpg", "ReachEquilibria community outreach booth")}
    </div>
  </section>`;
}

const eventData = [
  {
    title: "Heritage Night",
    text: "At our eighteenth project, we partnered with Charitable Investments and APEX Dance to host Heritage Night at Coppell High School! We had so many amazing performances and club booths, and it was an incredible experience to try foods from all the different cultures. We are so thankful to everyone who showed up and made this night one to remember! Credits go to Kevin Gunnampalli for capturing these awesome photos.",
    files: ["34-downloadgram-org-640292536-18038967512767033-1100578638609987350-n-f0lvf.jpg", "35-downloadgram-org-650840748-18038967593767033-6342304214646070494-n-cgzvs.jpg", "36-downloadgram-org-651763362-18038967485767033-7781539816868533617-n-qvgva.jpg", "45-jan1-fvje4qk6lkormekr.jpg", "46-jan2-tbmehng1zwr5kebu.jpg", "47-jan3-jrvh1xtxe54rzfbm.jpg"],
  },
  {
    title: "3rd Coppell Farmers Market Bakesale",
    text: "For our seventeenth project, we had our third bakesale at the Coppell Farmers Market! Despite the cold weather, we were able to sell over 300 baked goods, including brownies, cookies, and hot chocolate, raising about $700. We are so grateful for everyone who volunteered, baked, stopped by our booth, and purchased goods online.",
    files: ["75-req-bake-sale-example-mxbmnqxwoqhel895.jpg", "41-img-5816-mepnyw2o5zsgpkg4.jpg"],
  },
  {
    title: "November Knockout",
    text: "Our sixteenth project was incredible, as we had 18 teams compete in this tournament over Thanksgiving Break, marking our first-ever November Knockout! Each team was guaranteed three games, and our winning team took home a $500 grand prize. Thank you so much to our sponsors for making this event possible, as well as Coppell Chambers for your continued support. Be on the lookout for future basketball tournaments!",
    files: ["28-copy-of-basketball-0ehcr4ptpksag65a.png", "33-downloadgram-org-605433135-17917833435248141-6142891204662554544-n-vpnba.jpg"],
  },
  {
    title: "Paint it Out Art Event",
    text: "To go along with our last event, we worked with Love Care and Art for our fifteenth project to organize activities with watercolor, epsom salt, art murals, and dot art. Through this event, we brought kids and parents all across the community for an art therapy session. We are so grateful for Lori Vann's generosity in providing the venue, as well as the volunteers and supplies from Falak Art Studio. It was so inspirational to see the beautiful art we were able to create together!",
    files: ["req-paint-it-out-workshop.jpg", "19-art1-bblqqtxd0d3w7nik.jpg", "20-art2-26jceknruh5spmtk.jpg", "21-art4-hleyryoymojh8i14.jpg"],
  },
  {
    title: "Art & Heart Craft Fair",
    text: "For our fourteenth project, we partnered with Love Care & Art to give a sneak peek of our upcoming Paint it Out! It was such a joy to meet everyone who stopped by and added to our mural with paper hearts and positive messages. We were able to give out so many brochures, pins, stickers, and candy, and had a great time with our dot art activity session. Thank you so much to New Tech Hope Squad for helping us host such an incredible event!",
    files: ["22-art6-czjgutrupmxo4vh5.jpg", "23-art7-wliygfjbebwpb6lv.jpg"],
  },
  {
    title: "St Ann's Carnival Booth",
    text: "At our thirteenth project, we were able to hold a booth at the St. Ann's Carnival! Thank you so much to Sandeep Naidu and St Ann's for helping us get involved, as well as all of the volunteers who came out to help. On our bulletin board, 750+ small words of encouragement were created and compiled to be delivered to a hospital. We are so thankful to everyone who contributed to our board and supported our mission of advocating for mental health awareness.",
    files: ["25-carnival1-fsewjeoug9hasqve.jpg", "26-carnival3-6yho6jiipliflbk4.jpg", "27-carnival4-y9basgwaqkome9jz.jpg"],
  },
  {
    title: "Play It Forward Music Fair",
    text: "Our twelfth project was a huge success! This was our first-ever Music Fair, which was completely free, and we were able to educate so many kids about the correlation between music and mental health with the help of Coppell High School's Speaker Association! We are so grateful for Brazos Creative for their support in this amazing event, and we are so thankful for all the donation we received. We are also so fortunate to have had so many student volunteers from Coppell High School's Music for Medicine who came out to teach music to the kids!",
    files: ["48-music2-ba21fpqqve2e27oa.jpg", "49-music3-e83iehscddhzxqb0.jpg", "50-music5-hgdayjwvhlx5yb5i.jpg"],
  },
  {
    title: "Reach Equilibria - Ribbon Cutting",
    text: "We are so proud to have become members of the Coppell Chamber at our eleventh project! Thank you to everyone who came out and supported our Ribbon Cutting. Reach Equilibria was founded after the loss of a loved one, and this ribbon cutting serves as a significant milestone in pursuing our mission of advocating for suicide prevention and mental health.",
    files: ["req-coppell-chamber-ribbon-cutting.jpg", "52-ribbon1-ewbxhwhyy9hktv7u.jpg", "53-ribbon2-kcxwparbm9fxlpmu.jpg", "54-ribbon5-owy1cxjikqh68uip.jpg"],
  },
  {
    title: "Brazos Creative's Summer Music Camp",
    text: "We had a blast at our tenth project, Brazos Creative's summer music camp, which tied in with our seventh project! It was an amazing experience helping connect the Grant Halliburton Foundation with Brazos Creative. We are so grateful for Stephanie and Parker for believing in our mission, as well as the Coppell Chamber for helping us grow tremendously.",
    files: ["24-brazos1-3ordzhralk9vtypo.jpg"],
  },
  {
    title: "Coppell High School's Mental Health Fair",
    text: "For our ninth project, we were fortunate enough to have a booth at Coppell High School's mental health fair, thanks to the Defensive Line. At this event, we passed out stickers, pins, wristbands, keychains, lanyards, and brochures as prizes for the winners of our situational awareness games. Through this event, we met so many new people and helped them understand how they might approach someone struggling with negative thoughts.",
    files: ["req-community-booth.jpg", "32-downloadgram-org-494513513-17889713244248141-4040341651330130252-n-8qs95.jpg", "30-downloadgram-org-491468791-17889240723248141-4387261445290492030-n-l6d2h.jpg"],
  },
  {
    title: "2nd Coppell Farmers Market Bakesale",
    text: "This was our eighth project and our second bakesale at the Coppell Farmers Market. We raised over $1,000 at this event and sold nearly 300 baked goods. We also gave out free mental health awareness bracelets, pins, brochures, and keychains, and we are beyond grateful for everyone who came and supported us.",
    files: ["38-img-4737-mv02qvwgozij8kbb.jpg", "39-img-5514-yyvzwmnl3vs4w7l4.jpg", "40-img-5730-m6ljne5grktbox18.jpg"],
  },
  {
    title: "Grant Halliburton Foundation Visit",
    text: "At our seventh project, we had the amazing opportunity to come and tour the Grant Halliburton Foundation. We had a great time learning from mental health professionals and discussing our next steps in raising mental health awareness in the community. We are so thankful to the Grant Halliburton Foundation for providing us with this educational experience!",
    files: ["req-grant-halliburton-hope-kits.jpg", "37-grant-halliburton-gdsra4kt9gqjmhp6.jpg"],
  },
  {
    title: "OurCalling Homeless Ministry",
    text: "This was our sixth project, where we visited and volunteered at a homeless ministry. While there, we engaged in mental health talks with the people we encountered, and assisted staff in preparing shower rooms, sorting out donations, and loading laundry.",
    files: ["51-ourcalling-group-photo-a85elna8gxcrbdqz.jpg", "72-reach-equilibria-ourcalling-volunteering-m7v5xlqzzvcxjj8e.jpg"],
  },
  {
    title: "Winter Clothing Donation Drive",
    text: "Our fifth project was also tied together with our sixth project. In partnership with Coppell High School's National Honor Society, we were able to raise over 1,000+ articles of clothing to donate. The monetary value of all the clothing was over $7,000. We were able to donate all the clothing to OurCalling for the winter succesfully.",
    files: ["43-img-8661-azg3qzkobrumbez7.jpg", "44-img-8984-awv80w9e9pu1vz45.png"],
  },
  {
    title: "Dental Kit Creation",
    text: "Our fourth project related to our sixth project, and involved creating dental kits consisting of toothbrushes and toothpaste to donate to those in need, mainly the homeless. We packed together almost 400 dental kits for donation and were able to do this with the help of our wonderful volunteers.",
    files: ["req-dental-kit-packing.jpg", "74-reachequilibria-dental-kit-group-photo-ar0mo9zzwxc5qevm.jpg", "73-reachequilbria-dentalkit-volunteering-example-aqeda1ggowsmqnbz.jpg"],
  },
  {
    title: "Food Fundraisers",
    text: "Our third project was reaching out to multiple of our local food chains, and asking to do a partnership with them for donations. These restaurants include BJ's, Chipotle, and Panda Express. All combined, we were able to raise over $250 in a short amount of time, and are grateful to everyone who ordered at those restaurants during the fundraiser. We brought together friends, family, and community while spreading mental health awareness and offering discounts out of pocket for meals.",
    files: ["29-downloadgram-org-491445439-17889240927248141-8496320806070686705-n-hzoxl.jpg", "31-downloadgram-org-492134424-17889240834248141-7437419056652610628-n-mzkms.jpg"],
  },
  {
    title: "Coppell Chess Tournament",
    text: "Our second project was partnered with the Coppell Chess Club to set up a chess tournament. In this event, participants competed in a Swiss Rapid Chess tournament, and we had over 20+ participants. We raised a little over $150 through this event.",
    files: ["76-req-chess-event-avl1593a0ncp8eky.jpg"],
  },
  {
    title: "1st Coppell Farmers Market Bakesale",
    text: "Our first large event and fundraiser for ReachEquilibria. With this Bakesale, we raised over $500+ while informing those who stopped by our booth about our mission and what we stand for. Overall, it was a successful first event and a wonderful experience to connect with our community and volunteers.",
    files: ["75-req-bake-sale-example-mxbmnqxwoqhel895.jpg"],
  },
];

const blogPosts = [
  {
    slug: "mental-health-awareness-services",
    title: "Mental Health Awareness Services",
    kicker: "Resources",
    image: "req-grant-halliburton-hope-kits.jpg",
    excerpt: "ReachEquilibria offers a digital sanctuary and provides solace, support, and resources.",
    paragraphs: [
      "ReachEquilibria offers a digital sanctuary and provides solace, support, and resources.",
      "Our mission is to amplify awareness, foster community, and advocate for systemic change.",
      "Support and Resources Available Find support, resources, and a community to help you navigate mental health challenges.",
    ],
    gallery: ["req-grant-halliburton-hope-kits.jpg", "55-img-6248-2-awvkdn903vs7gzz9.jpg", "41-img-5816-mepnyw2o5zsgpkg4.jpg", "37-grant-halliburton-gdsra4kt9gqjmhp6.jpg"],
  },
  {
    slug: "every-person-matters",
    title: "Every Person Matters",
    kicker: "Volunteering",
    image: "req-fun-family-fitness-event.jpg",
    excerpt: "Discover how you can make a difference by volunteering and taking action today.",
    paragraphs: [
      "Discover how you can make a difference by volunteering and taking action today.",
      "Empowering individuals through volunteer opportunities to make a difference in the world. Join us today and be part of something meaningful.",
      "Join us in spreading mental health awareness and show that every person counts towards creating a supportive community.",
      "Volunteering opportunities are plentiful and the message that every person matters is truly inspiring.",
    ],
    gallery: ["req-fun-family-fitness-event.jpg", "req-community-booth.jpg", "72-reach-equilibria-ourcalling-volunteering-m7v5xlqzzvcxjj8e.jpg", "73-reachequilbria-dentalkit-volunteering-example-aqeda1ggowsmqnbz.jpg", "51-ourcalling-group-photo-a85elna8gxcrbdqz.jpg"],
  },
  {
    slug: "our-story",
    title: "Our Story",
    kicker: "Founding Story",
    image: "13-20230722-125049-mp4pknzoxgigo2ox.jpg",
    excerpt: "Satyam Sood founded ReachEquilibria near the end of his sophmore year In Memory and Dedication to Shivam Sood",
    paragraphs: [
      "Satyam Sood founded ReachEquilibria near the end of his sophmore year In Memory and Dedication to Shivam Sood",
      "Reach Equilibria was founded after our CEO, Satyam Sood, experienced the devastating loss of his older brother – Shivam Sood,",
      "Shivam’s passing left a void that words can’t fill, but also lit a fire that inspired Satyam to take action.",
      "Our organization was born out of deep personal pain and a burning desire to prevent others from experiencing similar losses. We believe that raising mental health awareness and providing support can create a ripple effect of compassion and resilience.",
      "ReachEquilibria isn’t just a nonprofit for us—it’s a salute. It's our way of honoring Shivam’s memory by striving to make the world kinder, more understanding, and more supportive.",
    ],
    gallery: ["13-20230722-125049-mp4pknzoxgigo2ox.jpg", "14-alaska-trip-aug2013-10-m7vp4we08ehqjz9n.jpg", "15-cimg2107-mp8nev3orxfw79qj.jpg", "16-img-2633-yyvob3xxexhz4bdp.jpg"],
  },
  {
    slug: "heritage-night",
    title: "Heritage Night",
    kicker: "Past Events",
    image: "34-downloadgram-org-640292536-18038967512767033-1100578638609987350-n-f0lvf.jpg",
    excerpt: eventData[0].text,
    paragraphs: [eventData[0].text],
    gallery: eventData[0].files,
  },
  {
    slug: "paint-it-out-art-event",
    title: "Paint it Out Art Event",
    kicker: "Past Events",
    image: "19-art1-bblqqtxd0d3w7nik.jpg",
    excerpt: eventData[3].text,
    paragraphs: [eventData[3].text],
    gallery: eventData[3].files,
  },
  {
    slug: "play-it-forward-music-fair",
    title: "Play It Forward Music Fair",
    kicker: "Past Events",
    image: "48-music2-ba21fpqqve2e27oa.jpg",
    excerpt: eventData[6].text,
    paragraphs: [eventData[6].text],
    gallery: eventData[6].files,
  },
];

function blogCards(cls = "") {
  const posts = /\b(featured|compact-list)\b/.test(cls) ? blogPosts.slice(0, 3) : blogPosts;
  return `<div class="blog-grid ${cls}">${posts.map((post) => `<a class="blog-card" href="${blogHref(post.slug)}">
    ${img(safeImage(post.image), post.title)}
    <span>${escapeHtml(post.kicker)}</span>
    <strong>${escapeHtml(post.title)}</strong>
    <p>${escapeHtml(post.excerpt)}</p>
  </a>`).join("")}</div>`;
}

function mottoBanner() {
  return `<section id="motto" class="motto-banner">
    <div class="motto-mark">
      <span>REQ</span>
    </div>
    <div class="motto-copy">
      <p class="eyebrow">Our Motto</p>
      <h2>Reaching Stability Together</h2>
      <p>Nobody is in this alone; We are here to help</p>
      <a href="https://988lifeline.org" target="_blank" rel="noopener">National Suicide Hotline: 988</a>
    </div>
    <div class="motto-lines" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
  </section>`;
}

function chapterNetwork() {
  const campuses = [
    ["Coppell High School", coppellHighExterior, "Coppell High School exterior"],
    ["Texas A&M", "chapter-campus-texas-am.jpg", "Texas A&M campus"],
    ["UT Austin", "chapter-campus-ut-austin.jpg", "UT Austin campus"],
  ];
  return `<section id="chapter-network" class="chapter-network">
    <div class="chapter-network-head">
      <p class="eyebrow">Chapter Network</p>
      <h2><span>3</span> Chapters</h2>
      <p>Coppell High School, Texas A&M, and UT Austin</p>
    </div>
    <div class="campus-grid">
      ${campuses.map(([name, file, alt]) => `<article class="campus-card">
        ${img(file, alt)}
        <div>
          <strong>${escapeHtml(name)}</strong>
          <span></span>
        </div>
      </article>`).join("")}
    </div>
    <div class="chapter-admissions-note">
      <strong>Leadership that carries forward.</strong>
      <p>Our officers and presidents of chapters have been accepted into multiple Top 20 schools in the US, and doing so looks great on college applications because it shows initiative, service, leadership, and community impact.</p>
    </div>
  </section>`;
}

function homePage() {
  const actionCards = [
    { href: hrefFor("learn"), image: "req-grant-halliburton-hope-kits.jpg", kicker: "Learn", title: "Mental Health Awareness Services", text: "ReachEquilibria offers a digital sanctuary and provides solace, support, and resources." },
    { href: hrefFor("involved"), image: "req-fun-family-fitness-event.jpg", kicker: "Get Involved", title: "Every Person Matters", text: "Discover how you can make a difference by volunteering and taking action today." },
    { href: hrefFor("impact"), image: "req-coppell-chamber-ribbon-cutting.jpg", kicker: "Impact", title: "Our Past Events", text: "Join us in spreading hope and preventing suicide through fundraisers and events" },
  ];
  return shell({
    title: "Who We Are",
    active: "index",
    eyebrow: "Reaching Stability Together",
    heading: "Who We Are",
    intro: "ReachEquilibria is a student-led Non-Profit organization that focuses on spreading mental health awareness and suicide awareness, with our primary target being teens and young adults. We host community events focused on mental health and connect organizations with larger non-profits that offer professional public speaking services. In the upcoming year, we are planning to host school speaking events featuring professional speakers, as well as other types of events.",
    heroImage: { file: "req-community-booth.jpg", alt: "ReachEquilibria community outreach booth" },
    content:
      statBand() +
      signatureBoard() +
      reachLab() +
      serviceConstellation() +
      section("Explore ReachEquilibria", linkCards(actionCards), "wide compact") +
      impactPortal() +
      splitSection(
        `${h(2, "Our Mission")}${p("Reach Equilibria is a student-created and youth-led mental health non-profit. Our mission is to spread resources that help all those who need them, increase inclusivity in our community, and advocate for mental health and suicide awareness. We host fundraisers and services, and our student-led team(of several members as of now) is at the center of our mission; we intend to encourage young people to help others of all ages and volunteer for the community.")}`,
        imageGrid(["req-dental-kit-packing.jpg", "req-paint-it-out-workshop.jpg", "24-brazos1-3ordzhralk9vtypo.jpg"], "tight"),
        "olive"
      ) +
      section("Empowering Minds Through Compassion", `${p("ReachEquilibria is a welcoming online space dedicated to mental health support and resources. We're here to raise awareness and push for meaningful change.")}<div class="three-up"><article>${h(3, "Support")}${p("Join us for mental health support and a push for real change.")}</article><article>${h(3, "Solutions")}${p("Find real solutions and resources to support your mental wellness journey with us.")}</article><article>${h(3, "Awareness")}${p("We're all about raising mental health awareness and creating a caring, supportive community.")}</article></div>`, "compact") +
      section("Featured Stories", blogCards("featured"), "wide compact") +
      mottoBanner(),
  });
}

function aboutPage() {
  const teamPreview = [
    ["Satyam Sood: CoFounder", "CEO", "founder-satyam-sood.png"],
    ["Gabriel Wang: CoFounder", "COO", "12-untitled-design-agbz0kb2gyuqrzvy.png"],
    ["Johan Padayatti", "Outreach Director", "06-johan-officer-photo-ykb8vkxr2rhbqxjl.jpg"],
    ["Trinity Mcconnell", "Creative Director", "11-trinity-officer-photo-aq2gx7dob0ilbvko.jpg"],
  ];
  return shell({
    title: "About",
    active: "about",
    eyebrow: "About",
    heading: "What is ReachEquilibria?",
    intro: "Our purpose is to increase mental health awareness and to help those who are struggling with mental health. Various ways to do so include writing informational articles (done with research) and creating events that interact with the community on individual levels.",
    heroImage: { file: "11-trinity-officer-photo-aq2gx7dob0ilbvko.jpg", alt: "Trinity Mcconnell" },
    content:
      splitSection(
        `${h(2, "Purpose")}${h(3, "Who are We?")}${p("We are a student-led 501(c)(3) nonprofit, based in Coppell, TX, founded by Satyam Sood and Gabriel Wang during their sophomore year at 15-16 yrs old. With our amazing volunteers, we are able to make all of our events run smoothly, and we hope to continue doing so with larger events. We want everybody to know they are not alone; you can always talk to someone - or us - by email, phone, WhatsApp, and more.")}${p("Reach Equilibria is a 501(c)(3) non-profit organization. EIN 99-3505959.")}`,
        imageGrid(["69-image-6-13-24-at-2-05a-pm-ybgpzeg1prsz4voz.jpg", "51-ourcalling-group-photo-a85elna8gxcrbdqz.jpg"], "tight"),
        "olive"
      ) +
      section("Meet The Team", `<p>To verify someone's leadership or involvement in ReachEquilibria, please email us at verify@reachequilibria.org</p><div class="team-grid preview">${teamPreview.map(([name, role, file]) => `<article>${img(file, name)}<h3>${escapeHtml(name)}</h3><p>${escapeHtml(role)}</p></article>`).join("")}</div><p><a class="button" href="${hrefFor("team")}">Meet The Team</a></p>`, "wide compact") +
      section("Our Story", `${p("Satyam Sood founded ReachEquilibria near the end of his sophmore year In Memory and Dedication to Shivam Sood")}${photoRibbon(["13-20230722-125049-mp4pknzoxgigo2ox.jpg", "14-alaska-trip-aug2013-10-m7vp4we08ehqjz9n.jpg", "15-cimg2107-mp8nev3orxfw79qj.jpg", "16-img-2633-yyvob3xxexhz4bdp.jpg"])}<p><a class="button" href="${hrefFor("story")}">Our Story</a></p>`, "wide compact"),
  });
}

function teamPage() {
  const team = [
    ["Satyam Sood: CoFounder", "CEO", "founder-satyam-sood.png"],
    ["Gabriel Wang: CoFounder", "COO", "12-untitled-design-agbz0kb2gyuqrzvy.png"],
    ["Johan Padayatti", "Outreach Director", "06-johan-officer-photo-ykb8vkxr2rhbqxjl.jpg"],
    ["Dhanushi Raval", "Creative Director", "02-dhanushi-officer-photo-azgmawxqxbilqrkw.jpg"],
    ["Trinity Mcconnell", "Creative Director", "11-trinity-officer-photo-aq2gx7dob0ilbvko.jpg"],
    ["Fay Xu", "Development Director", "03-fay-officer-photo-m5k8o90onku6pepz.jpg"],
    ["Daniel Johnson", "Media Director", "10-renderedimage-d95zje05oqckzxk8.jpg"],
    ["Immanuel George", "Fundraising Director", "05-immanuel-officer-yrd45peogyiqazyl.jpg"],
  ];
  return shell({
    title: "Meet the Team",
    active: "about",
    eyebrow: "Meet the Team",
    heading: "Meet the Team",
    intro: "Join us in spreading hope and preventing suicide through fundraisers and events",
    heroImage: { file: "founder-satyam-sood.png", alt: "Satyam Sood" },
    content:
      section("", `${h(3, "To verify someone's leadership or involvement in ReachEquilibria, please email us at verify@reachequilibria.org")}${h(3, "Meet The Team")}<div class="team-grid">${team.map(([name, role, file]) => `<article>${img(file, name)}<h3>${escapeHtml(name)}</h3><p>${escapeHtml(role)}</p></article>`).join("")}</div>${h(3, "SatyamSood@ReachEquilibria.org")}${h(3, "GabrielDWang@ReachEquilibria.org")}`) +
      section("", `${p("This organization truly cares about mental health and suicide prevention. They are making a real difference in the community.")}${p("Mary Clint")}${p("★★★★★")}`),
  });
}

function storyPage() {
  return shell({
    title: "Our Story",
    active: "about",
    eyebrow: "Our Story",
    heading: "Our Story",
    intro: "Satyam Sood founded ReachEquilibria near the end of his sophmore year In Memory and Dedication to Shivam Sood",
    heroImage: { file: byKey["20230722_125049-mP4pknZOxgIGO2Ox.jpg"], alt: "The CEO and Founder of ReachEquilibria, Satyam Sood, and his brother, Shivam Sood" },
    content:
      splitSection(
        `${p("He is the youngest to ever found and own a nonprofit in Coppell history")}${p("Loving Brother and Friend")}${p("https://www.hughesftc.com/obituary/Shivam-Sood")}${p("Reach Equilibria was founded after our CEO, Satyam Sood, experienced the devastating loss of his older brother – Shivam Sood,")}${p("Shivam’s passing left a void that words can’t fill, but also lit a fire that inspired Satyam to take action.")}${p("We're not experts in this field, just people with a shared experience that has shaped our lives. We wanted to do something meaningful, something that could offer hope and support to those who might be struggling in silence.")}${p("Our organization was born out of deep personal pain and a burning desire to prevent others from experiencing similar losses. We believe that raising mental health awareness and providing support can create a ripple effect of compassion and resilience.")}${p("ReachEquilibria isn’t just a nonprofit for us—it’s a salute. It's our way of honoring Shivam’s memory by striving to make the world kinder, more understanding, and more supportive.")}${p("Through community outreach, education, and support programs, we're committed to making a difference, one step at a time. Join us on this hopeful journey. Together, we can turn pain into purpose and make a lasting impact.")}`,
        imageGrid(["13-20230722-125049-mp4pknzoxgigo2ox.jpg", "14-alaska-trip-aug2013-10-m7vp4we08ehqjz9n.jpg", "15-cimg2107-mp8nev3orxfw79qj.jpg", "16-img-2633-yyvob3xxexhz4bdp.jpg"], "story-photos")
      ) +
      section("", `${p("Satyam and Gabriel are the dynamic duo behind this amazing brand. Their story is inspiring and their passion shines through every product.")}${p("Erin Crawford")}${p("★★★★★")}`),
  });
}

function eventsPage() {
  const eventCards = eventData.map((event) => `<article class="event-block">
    <div class="event-text">${h(2, event.title)}${p(event.text)}</div>
    ${imageGrid(event.files, "event-photos")}
  </article>`).join("");
  const allEventFiles = [...new Set(eventData.flatMap((event) => event.files))];
  return shell({
    title: "Impact",
    active: "index",
    eyebrow: "Impact",
    heading: "Our Past Events",
    intro: eventData[0].text,
    heroImage: { file: "req-coppell-chamber-ribbon-cutting.jpg", alt: "ReachEquilibria ribbon cutting with Coppell Chamber of Commerce" },
    content:
      statBand() +
      section("Impact Photos", photoRibbon(allEventFiles.slice(0, 10)), "wide compact") +
      `<section class="events-list">${eventCards}</section>${section("Past Events Photos", imageGrid(allEventFiles, "masonry"), "wide")}`,
  });
}

const impactPage = eventsPage;

function resourcesPage() {
  const resourceCards = [
    { href: "https://988lifeline.org", image: "req-grant-halliburton-hope-kits.jpg", kicker: "Get help", title: "National Suicide Hotline: 988", text: "Nobody is in this alone; We are here to help" },
    { href: blogHref("mental-health-awareness-services"), image: "55-img-6248-2-awvkdn903vs7gzz9.jpg", kicker: "Learn", title: "Mental Health Awareness Services", text: "ReachEquilibria offers a digital sanctuary and provides solace, support, and resources." },
    { href: hrefFor("blogs"), image: "req-paint-it-out-workshop.jpg", kicker: "Articles", title: "Blogs", text: "1 2" },
  ];
  return shell({
    title: "Resources",
    active: "learn",
    eyebrow: "Resources",
    heading: "Subscribe to our newsletter",
    intro: "Be notified by potential opportunities in your area!",
    heroImage: { file: "req-grant-halliburton-hope-kits.jpg", alt: "ReachEquilibria visit to Grant Halliburton Foundation" },
    content:
      section("Find Support", linkCards(resourceCards), "wide compact") +
      splitSection(
        `${h(2, "Mental Health Awareness Services")}${p("ReachEquilibria offers a digital sanctuary and provides solace, support, and resources.")}${h(3, "Amplifying Community Awareness")}${p("Our mission is to amplify awareness, foster community, and advocate for systemic change.")}${p("Support and Resources Available Find support, resources, and a community to help you navigate mental health challenges.")}`,
        imageGrid(["req-grant-halliburton-hope-kits.jpg", "req-community-booth.jpg"], "tight")
      ) +
      section("Openable Blogs", blogCards("compact-list"), "wide compact"),
  });
}

function articlesPage() {
  const blogImages = ["req-grant-halliburton-hope-kits.jpg", "req-paint-it-out-workshop.jpg", "req-community-booth.jpg", "55-img-6248-2-awvkdn903vs7gzz9.jpg", "82-shivam24-1-a1akzxxolkflz37p.jpg"].filter((file) => projectAssets.has(file));
  return shell({
    title: "Blogs",
    active: "blogs",
    eyebrow: "Articles",
    heading: "Blogs",
    intro: "1 2",
    heroImage: { file: "req-paint-it-out-workshop.jpg", alt: "ReachEquilibria art workshop" },
    content:
      section("Blogs", `${p("1 2")}${blogCards()}`, "wide compact") +
      section("Blog Photos", imageGrid(blogImages, "masonry"), "wide"),
  });
}

const blogsPage = articlesPage;

function getHelpPage() {
  const helpCards = [
    { href: "https://988lifeline.org", image: "req-grant-halliburton-hope-kits.jpg", kicker: "Crisis Support", title: "National Suicide Hotline: 988", text: "Nobody is in this alone; We are here to help" },
    { href: hrefFor("contact"), image: "req-community-booth.jpg", kicker: "Contact", title: "We'd love to hear from you!!", text: "We are always looking for passionate individuals to help make a difference in our community. Join us in our mission to create positive change." },
    { href: hrefFor("learn"), image: "55-img-6248-2-awvkdn903vs7gzz9.jpg", kicker: "Resources", title: "Mental Health Awareness Services", text: "ReachEquilibria offers a digital sanctuary and provides solace, support, and resources." },
  ];
  return shell({
    title: "Get Help",
    active: "help",
    eyebrow: "Get Help",
    heading: "Get Help",
    intro: "Nobody is in this alone; We are here to help",
    heroImage: { file: "req-grant-halliburton-hope-kits.jpg", alt: "ReachEquilibria visit to Grant Halliburton Foundation" },
    content:
      section("Support and Resources Available", linkCards(helpCards), "wide compact") +
      splitSection(
        `${h(2, "National Suicide Hotline: 988")}${p("Nobody is in this alone; We are here to help")}${p("https://988lifeline.org")}${h(3, "Phone")}${p("469-837-9294")}${h(3, "Email")}${p("contact@reachequilibria.org")}`,
        imageGrid(["req-grant-halliburton-hope-kits.jpg", "req-community-booth.jpg"], "tight"),
        "olive"
      ) +
      section("Mental Health Awareness Services", `${p("ReachEquilibria offers a digital sanctuary and provides solace, support, and resources.")}${p("Our mission is to amplify awareness, foster community, and advocate for systemic change.")}${p("Support and Resources Available Find support, resources, and a community to help you navigate mental health challenges.")}`),
  });
}

function blogPostPage(post) {
  const detailGallery = uniqueImageFiles(post.gallery, [post.image]);
  const asidePhotos = detailGallery.slice(0, 3);
  const morePhotos = detailGallery.slice(3);
  return shell({
    title: post.title,
    active: "blogs",
    eyebrow: post.kicker,
    heading: post.title,
    intro: post.excerpt,
    heroImage: { file: post.image, alt: post.title },
    pageClass: "blog-detail",
    content:
      `<section class="article-shell"><article class="readable-article">${h(2, post.title)}${post.paragraphs.map((text) => p(text)).join("")}<p><a class="button" href="${hrefFor("blogs")}">Back to Blogs</a></p></article><aside class="article-aside">${imageGrid(asidePhotos, "tight")}</aside></section>` +
      (morePhotos.length ? section("Photos", imageGrid(morePhotos, "masonry"), "wide compact") : ""),
  });
}

function donatePage() {
  const givingOptions = [
    ["PayPal", "https://www.paypal.com/donate/?hosted_button_id=E39SGTD3UE75A", "PP", "Donate through PayPal."],
  ];
  return shell({
    title: "Donations",
    active: "give",
    eyebrow: "Donate",
    heading: "Donations",
    intro: "ReachEquilibria, an international 501(c)(3) non-profit organization founded by high schooler Satyam Sood, is hosting this event. ReachEquilibria seeks to gather funds for anyone who is struggling and in need of mental health services. This money will be used to cover medical costs and other expenses that some people may be unable to afford. We are also aiming to improve international access to treatment and care. We've also started adopting other fundraisers.",
    heroImage: { file: "req-community-booth.jpg", alt: "ReachEquilibria community outreach booth" },
    content:
      `<section class="donation-portal">
        <div class="donation-copy">
          <p class="eyebrow">Ways to Give</p>
          <h2>Give where support becomes action.</h2>
          ${p("Satyam chose to gather donations for this after losing his brother recently. Suicide, a rising cause of death globally, has no pity and, indeed, no discrimination. It has a global impact on people of all ages, genders, and races. Combating depression/suicidal ideation is a long, arduous journey. In addition, Every 40 seconds, someone dies by suicide somewhere in the world.")}
          ${p("All donations will support our activities, benefiting thousands of individuals globally, particularly those in underprivileged areas. Any donation would have a significant impact! I appreciate your generosity.")}
          <div class="donation-metrics">
            <article><strong>$25,000+</strong><span>Raised</span></article>
            <article><strong>501(c)(3)</strong><span>EIN 99-3505959</span></article>
            <article><strong>40</strong><span>Every 40 seconds, someone dies by suicide somewhere in the world.</span></article>
          </div>
        </div>
        <div class="donation-visual" aria-hidden="true">
          ${img("req-community-booth.jpg", "ReachEquilibria community outreach booth")}
          ${img("req-dental-kit-packing.jpg", "ReachEquilibria dental kit packing")}
        </div>
      </section>
      <section class="giving-grid">
        ${givingOptions.map(([name, href, mark, text]) => `<a class="giving-card" href="${href}" target="_blank" rel="noopener">
          <span class="giving-mark">${escapeHtml(mark)}</span>
          <strong>${escapeHtml(name)}</strong>
          <p>${escapeHtml(text)}</p>
          <em>Open donation link</em>
        </a>`).join("")}
        <button class="giving-card zelle-card" type="button" data-copy="REQ@ReachEquilibria.org">
          <span class="giving-mark">ZL</span>
          <strong>Zelle</strong>
          <p>REQ@ReachEquilibria.org</p>
          <em>Copy Zelle email</em>
        </button>
      </section>`,
  });
}

function joinPage() {
  return shell({
    title: "Volunteering Opportunities",
    active: "involved",
    eyebrow: "Get Involved",
    heading: "Every Person Matters",
    intro: "Discover how you can make a difference by volunteering and taking action today.",
    heroImage: { file: "req-fun-family-fitness-event.jpg", alt: "ReachEquilibria community event volunteer booth" },
    content:
      statBand() +
      section("Every Person Matters", `${p("Empowering individuals through volunteer opportunities to make a difference in the world. Join us today and be part of something meaningful.")}${h(3, "$25,000+")}${p("Raised")}`) +
      section("Internship Opportunities", `${h(3, "All Eligible For PVSA")}<div class="role-grid"><a href="https://forms.gle/ix5mq84cGSknx5q57" target="_blank" rel="noopener">Website Development</a><a href="https://forms.gle/ix5mq84cGSknx5q57" target="_blank" rel="noopener">Resource Articles</a><a href="https://forms.gle/ix5mq84cGSknx5q57" target="_blank" rel="noopener">Outreach/Event Set Up</a><a href="https://forms.gle/ix5mq84cGSknx5q57" target="_blank" rel="noopener">Social Media</a></div>${h(3, "In this internship, interns will work on improving the ReachEquilibria website. Tasks may include uploading articles, updating events, changing timelines, adding webpages, etc. Interns are expected to be proficient in website design, technological problem solving, and use critical thinking skills to innovate and advance website design and progress.")}${h(3, "For this internship opportunity, interns will write research and blog articles that contribute to mental health awareness and ways to combat it. Interns are expected to be able to write with proper grammar and sophistication, while also being able to complete proper research with citing from multiple credible scholarly and research sources.")}${h(3, "Interns will be provided work emails from Reach Equilibria, and are expected to contact shelters, non-profits, businesses, and more to organize events like fundraisers, donation drives, clinics for mental health, and more. Interns should be able to write proper and professional emails, with time management skills to set up events in a timely manner and give updates.")}${h(3, "Interns are expected to generate video ideas for different activities and record videos to upload to our social media websites. These videos will promote mental health awareness, facts about mental health, information about Reach Equilibria events, and more. Interns should be comfortable with speaking properly on film, and to be posted online.")}<p><a class="button" href="https://forms.gle/ix5mq84cGSknx5q57" target="_blank" rel="noopener">Apply Now</a></p>`) +
      splitSection(
        `${h(2, "Volunteering Opportunities")}${p("Join us in spreading mental health awareness and show that every person counts towards creating a supportive community.")}${h(3, "Phone")}${p("214-606-5320")}${h(3, "Email")}${p("contact@reachequilibria.org")}${p("Volunteer for mental health awareness")}${p("Spread awareness through volunteering*")}${p("Reason for volunteering*")}${p("Submit form to volunteer")}${p("Volunteering opportunities are plentiful and the message that every person matters is truly inspiring.")}${p("Sara T.")}${p("★★★★★")}`,
        imageGrid(["req-fun-family-fitness-event.jpg", "req-dental-kit-packing.jpg"], "tight")
      ),
  });
}

function chapterPage() {
  const chapterDoc = asset("docs/req-chapter-resources-pack-v1.pdf");
  const constitutionDoc = asset("docs/reachequilibria-constitution-v1.pdf");
  const resources = [
    ["Chapter Launch Checklist", "Starting a new chapter from zero"],
    ["First 30 Days Plan", "Setting up leadership, advisor support, and first meeting"],
    ["First 90 Days Plan", "Completing first event, report, and recruitment cycle"],
    ["Officer Role Cards", "Clarifying responsibilities"],
    ["Monthly Report Template", "Submitting required data to National"],
    ["Fundraising & Sponsorship Tools", "Raising money without national funding"],
    ["Event Playbooks", "Planning service, education, advocacy, and fundraising events"],
    ["Branding Guide", "Keeping chapter communications professional"],
  ];
  const checklist = [
    "Identify chapter president",
    "Recruit five additional active members",
    "Confirm required officer team",
    "Secure faculty advisor or adult support contact",
    "Submit chapter application to National",
    "Create chapter group chat or communication channel",
    "Plan first general meeting",
    "Choose first service, education, advocacy, or fundraising project",
    "Notify National of chapter social media accounts",
    "Submit first monthly report after launch",
  ];
  const officers = [
    ["President", "Leads the chapter, appoints officers, communicates with National, and ensures reports are submitted."],
    ["Vice President", "Supports the President, helps manage meetings, tracks chapter progress, and steps in when needed."],
    ["Treasurer", "Tracks funds raised, saves documentation, organizes receipts, and prepares financial reporting."],
    ["Director of Outreach", "Builds relationships with schools, nonprofits, businesses, speakers, and community partners."],
    ["Director of Fundraising", "Plans fundraisers, sponsorship outreach, restaurant nights, tournaments, and donor communication."],
    ["Director of Service", "Plans volunteer opportunities, donation drives, shelter support, and direct community impact projects."],
  ];
  return shell({
    title: "Create a Chapter",
    active: "involved",
    eyebrow: "Chapter Resources Pack",
    heading: "Create a Chapter",
    intro: "Launch. Lead. Report. Grow.",
    heroImage: { file: "req-community-booth.jpg", alt: "ReachEquilibria community outreach booth" },
    content:
      section("CHAPTER RESOURCES PACK", `${h(3, "Launch. Lead. Report. Grow.")}${p("Official Edition 2026")}${p("Version 1.0")}${p("Built for chapter presidents, advisors, and student leaders")}${h(3, "PURPOSE OF THIS PACKET")}${p("This document turns the ReachEquilibria Constitution into practical tools for starting, operating, and growing a chapter. It is designed so a student leader can take action immediately without waiting for national leadership to explain every step.")}${docActions(chapterDoc, "Open Chapter Resources Pack")}<p><a class="button" href="${chapterDriveUrl}" target="_blank" rel="noopener">Open Chapter Google Drive</a></p>`, "wide") +
      splitSection(
        `${h(2, "How to Use This Packet")}${p("This packet is the practical operating toolkit for ReachEquilibria chapters. The Constitution explains what ReachEquilibria is. This packet explains how to start and run it at the chapter level.")}${p("Presidents should use this packet during chapter launch, monthly planning, officer transitions, sponsor outreach, and event preparation. Advisors should use it to understand expectations and support student leadership without taking control of the chapter.")}${h(3, "CHAPTER PHILOSOPHY")}${p("National alignment. Local freedom. Chapters are expected to uphold the mission, submit reports, and represent the brand professionally while adapting events and recruitment to their own community.")}`,
        `<div class="table-wrap"><table><thead><tr><th>Resource</th><th>Best Used For</th></tr></thead><tbody>${resources.map(([resource, use]) => `<tr><td>${escapeHtml(resource)}</td><td>${escapeHtml(use)}</td></tr>`).join("")}</tbody></table></div>`,
        "olive"
      ) +
      section("Chapter Launch Checklist", `<p>A chapter is ready to launch when it has a committed president, required officers, an advisor, a clear school/community base, and a plan for the first meeting.</p><div class="table-wrap"><table><thead><tr><th>Step</th><th>Action</th><th>Status</th></tr></thead><tbody>${checklist.map((item, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(item)}</td><td>[ ]</td></tr>`).join("")}</tbody></table></div>${h(3, "APPROVAL STANDARD")}${p("A chapter should not publicly represent itself as an official ReachEquilibria chapter until National approval has been granted.")}`, "wide") +
      section("First 30 Days Plan", `<div class="table-wrap"><table><thead><tr><th>Week</th><th>Priority</th><th>Deliverable</th></tr></thead><tbody><tr><td>Week 1</td><td>Build the team</td><td>President, officers, advisor, minimum members</td></tr><tr><td>Week 2</td><td>Plan the launch</td><td>Meeting date, agenda, recruitment message</td></tr><tr><td>Week 3</td><td>Hold first meeting</td><td>Attendance list, interest form, officer intro</td></tr><tr><td>Week 4</td><td>Choose first initiative</td><td>Project plan and monthly report draft</td></tr></tbody></table></div>${h(2, "First 90 Days Plan")}<div class="table-wrap"><table><thead><tr><th>Month</th><th>Goal</th><th>Evidence to Save</th></tr></thead><tbody><tr><td>Month 1</td><td>Launch chapter and recruit members</td><td>Photos, attendance, flyers</td></tr><tr><td>Month 2</td><td>Host first initiative</td><td>Event photos, volunteer hours, funds raised</td></tr><tr><td>Month 3</td><td>Submit complete report and plan next quarter</td><td>Report, screenshots, receipts</td></tr></tbody></table></div>${h(3, "LAUNCH GOAL")}${p("The first 90 days do not need to be perfect. The goal is to prove the chapter can organize people, complete one meaningful initiative, and report accurately.")}`, "wide") +
      section("Officer Role Cards", `<div class="doc-card-grid">${officers.map(([role, description]) => `<article><h3>${escapeHtml(role)}</h3><p>${escapeHtml(description)}</p><p>Weekly Focus Monthly Deliverable</p><p>Support chapter priorities as ${escapeHtml(role)} Update President before monthly report</p></article>`).join("")}</div>`) +
      splitSection(
        `${h(2, "ARTICLE IX LOCAL CHAPTERS")}${p("Section 1. Purpose Local chapters serve as the primary vehicle through which ReachEquilibria fulfills its mission within schools and communities. Each chapter operates under the mission, values, and standards of ReachEquilibria while maintaining flexibility to address local needs.")}${p("Section 4. Chapter Approval All chapters must receive approval from the Chief Executive Officer before receiving official recognition. No chapter may represent itself as an official ReachEquilibria chapter without approval.")}${docActions(constitutionDoc, "Open Constitution")}`,
        imageGrid(["req-community-booth.jpg", "req-coppell-chamber-ribbon-cutting.jpg"], "tight")
      ) +
      section("Full Chapter Resources Pack", `${p("ReachEquilibria Chapter Resources Pack v1.0")}${docActions(chapterDoc, "Download Chapter Resources Pack")}<object class="pdf-frame" data="${chapterDoc}" type="application/pdf"><p><a href="${chapterDoc}" target="_blank" rel="noopener">ReachEquilibria Chapter Resources Pack v1.0</a></p></object>`, "wide"),
  });
}

function chaptersPage() {
  const chapterDoc = asset("docs/req-chapter-resources-pack-v1.pdf");
  const constitutionDoc = asset("docs/reachequilibria-constitution-v1.pdf");
  const chapterCards = [
    { href: hrefFor("join"), image: "req-fun-family-fitness-event.jpg", kicker: "Volunteer", title: "Every Person Matters", text: "Discover how you can make a difference by volunteering and taking action today." },
    { href: hrefFor("chapter"), image: "76-req-chess-event-avl1593a0ncp8eky.jpg", kicker: "Create a Chapter", title: "Launch. Lead. Report. Grow.", text: "Built for chapter presidents, advisors, and student leaders" },
    { href: hrefFor("constitution"), image: "69-image-6-13-24-at-2-05a-pm-ybgpzeg1prsz4voz.jpg", kicker: "Official", title: "Constitution", text: "Student-Led. Adult-Supported. Mission-Driven." },
    { href: chapterDriveUrl, image: "req-community-booth.jpg", kicker: "Chapter Drive", title: "Chapter Information", text: "Chapter information, brand logo design, rules, etc." },
  ];
  return shell({
    title: "Chapters",
    active: "involved",
    eyebrow: "Get Involved",
    heading: "Chapters",
    intro: "National alignment. Local freedom.",
    heroImage: { file: "req-coppell-chamber-ribbon-cutting.jpg", alt: "ReachEquilibria ribbon cutting with Coppell Chamber of Commerce" },
    content:
      statBand() +
      chapterNetwork() +
      section("Chapter Pathways", linkCards(chapterCards), "wide compact") +
      section("Chapter Google Drive", `${h(3, "Chapter information, brand logo design, rules, etc.")}${p("Use this Google Drive folder for chapter information, brand logo design, rules, and everything needed for chapters to start.")}<p><a class="button" href="${chapterDriveUrl}" target="_blank" rel="noopener">Open Chapter Google Drive</a></p>`, "wide compact") +
      splitSection(
        `${h(2, "Every Person Matters")}${p("Empowering individuals through volunteer opportunities to make a difference in the world. Join us today and be part of something meaningful.")}${h(3, "$25,000+")}${p("Raised")}${p("Join us in spreading mental health awareness and show that every person counts towards creating a supportive community.")}<p><a class="button" href="${hrefFor("join")}">Volunteering Opportunities</a></p>`,
        imageGrid(["req-fun-family-fitness-event.jpg", "req-grant-halliburton-hope-kits.jpg"], "tight"),
        "olive"
      ) +
      section("CHAPTER RESOURCES PACK", `${h(3, "Launch. Lead. Report. Grow.")}${p("Official Edition 2026")}${p("Version 1.0")}${p("Built for chapter presidents, advisors, and student leaders")}${h(3, "PURPOSE OF THIS PACKET")}${p("This document turns the ReachEquilibria Constitution into practical tools for starting, operating, and growing a chapter. It is designed so a student leader can take action immediately without waiting for national leadership to explain every step.")}${docActions(chapterDoc, "Open Chapter Resources Pack")}<p><a class="button" href="${chapterDriveUrl}" target="_blank" rel="noopener">Open Chapter Google Drive</a></p>`, "wide compact") +
      splitSection(
        `${h(2, "CHAPTER PHILOSOPHY")}${p("National alignment. Local freedom. Chapters are expected to uphold the mission, submit reports, and represent the brand professionally while adapting events and recruitment to their own community.")}${h(3, "APPROVAL STANDARD")}${p("A chapter should not publicly represent itself as an official ReachEquilibria chapter until National approval has been granted.")}${docActions(constitutionDoc, "Open Constitution")}`,
        imageGrid(["req-dental-kit-packing.jpg", "req-community-booth.jpg"], "tight")
      ),
  });
}

function contactPage() {
  return shell({
    title: "Contact Us",
    active: "help",
    eyebrow: "Contact Us",
    heading: "We'd love to hear from you!!",
    intro: "We are always looking for passionate individuals to help make a difference in our community. Join us in our mission to create positive change.",
    heroImage: { file: "req-community-booth.jpg", alt: "ReachEquilibria community outreach booth" },
    content:
      splitSection(
        `${h(2, "Contact Us Now")}${p("Phone")}${p("469-837-9294")}${p("Email")}${p("contact@reachequilibria.org")}${h(2, "Explore How You Can Help")}${p("Be The Change.")}${p("Donate Donate Now Contact")}${p("214-606-5320")}`,
        `<form class="contact-form"><label>Name*<input name="name" required></label><label>Last name*<input name="lastName" required></label><label>Email*<input type="email" name="email" required></label><label>Message*<textarea name="message" rows="7" required></textarea></label><button type="submit">Submit</button></form>`
      ),
  });
}

function galleryPage() {
  const files = uniqueImageFiles([
    "founder-satyam-sood.png",
    "01-4b0ed8f5-283e-4836-8978-a9a52dd7aae3-dwxl8xbllwi08wy4.jpg",
    "02-dhanushi-officer-photo-azgmawxqxbilqrkw.jpg",
    "03-fay-officer-photo-m5k8o90onku6pepz.jpg",
    "04-img-6358-yv4glaocile7pjts.png",
    "05-immanuel-officer-yrd45peogyiqazyl.jpg",
    "06-johan-officer-photo-ykb8vkxr2rhbqxjl.jpg",
    "10-renderedimage-d95zje05oqckzxk8.jpg",
    "11-trinity-officer-photo-aq2gx7dob0ilbvko.jpg",
    "12-untitled-design-agbz0kb2gyuqrzvy.png",
    "13-20230722-125049-mp4pknzoxgigo2ox.jpg",
    "14-alaska-trip-aug2013-10-m7vp4we08ehqjz9n.jpg",
    "15-cimg2107-mp8nev3orxfw79qj.jpg",
    "16-img-2633-yyvob3xxexhz4bdp.jpg",
    "req-fun-family-fitness-event.jpg",
    ...eventData.flatMap((event) => event.files),
    "62-294-m6lvywjvv8tvazjl.jpg",
    "72-reach-equilibria-ourcalling-volunteering-m7v5xlqzzvcxjj8e.jpg",
    "73-reachequilbria-dentalkit-volunteering-example-aqeda1ggowsmqnbz.jpg",
    "74-reachequilibria-dental-kit-group-photo-ar0mo9zzwxc5qevm.jpg",
    "75-req-bake-sale-example-mxbmnqxwoqhel895.jpg",
    "76-req-chess-event-avl1593a0ncp8eky.jpg",
    "82-shivam24-1-a1akzxxolkflz37p.jpg",
  ]);
  return shell({
    title: "Gallery",
    active: "index",
    eyebrow: "Gallery",
    heading: "Gallery",
    intro: "Our Past Events",
    heroImage: { file: "75-req-bake-sale-example-mxbmnqxwoqhel895.jpg", alt: "ReachEquilibria bake sale fundraiser" },
    content: section("Our Past Events", imageGrid(files, "masonry all-photos")),
  });
}

function constitutionPage() {
  const constitutionDoc = asset("docs/reachequilibria-constitution-v1.pdf");
  return shell({
    title: "Constitution",
    active: "involved",
    eyebrow: "Constitution",
    heading: "Constitution",
    intro: "Reach Equilibria is a 501(c)(3) non-profit organization. EIN 99-3505959.",
    heroImage: { file: byKey["image-6-13-24-at-2.05a-pm-YBgpzEG1PRsZ4voz.jpeg"], alt: "ReachEquilibria logo" },
    content:
      section("CONSTITUTION Version 1.0", `${p("Reaching Stability Together")}${p("Founded June 11, 2024")}${p("Coppell, Texas")}${p("501(c)(3) Nonprofit Organization")}${p("Official Edition 2026")}${p("Adopted June 13, 2026")}${p("Student-Led. Adult-Supported. Mission-Driven.")}${docActions(constitutionDoc, "Open Constitution")}`, "wide") +
      splitSection(
        `${h(2, "FOUNDER LETTER")}${p("To Future ReachEquilibria Leaders, ReachEquilibria was founded on the belief that students possess the ability to create meaningful and lasting change. While the organization was inspired by personal loss, its future is defined by service, advocacy, education, leadership, and impact. ReachEquilibria was never intended to depend upon one individual. Instead, it was created to empower generations of students to improve their communities and advance mental health awareness, support, and reform.")}${p("This Constitution exists to preserve the mission, values, and long-term vision of ReachEquilibria while providing a framework that allows future leaders to expand the organization far beyond its origins.")}${p("As leaders, your responsibility is not simply to maintain ReachEquilibria. Your responsibility is to strengthen it, expand its impact, and leave it better than you found it. Thank you for continuing the mission. Sincerely, Satyam Sood Co-Founder & Chief Executive Officer ReachEquilibria")}`,
        `${h(2, "FOUNDING PRINCIPLE")}${p("The mission is larger than any individual. The purpose is larger than any single generation of leaders.")}${p("ReachEquilibria was founded because one family's loss revealed a need for greater mental health awareness, education, advocacy, service, and support. While inspired by a personal story, ReachEquilibria exists to serve communities everywhere. The organization is committed to empowering future generations of leaders to create meaningful change while advancing mental health advocacy and reducing stigma. ReachEquilibria exists to build a future in which mental health is understood, supported, and prioritized.")}`,
        "olive"
      ) +
      section("ORGANIZATIONAL IDENTITY", `${h(3, "MISSION")}${p("ReachEquilibria is a student-created and youth-led mental health nonprofit. Our mission is to spread resources that help all those who need them, increase inclusivity in our communities, and advocate for mental health and suicide awareness. Through fundraisers, service initiatives, educational programs, and advocacy efforts, we empower young people to create meaningful change while supporting individuals and families affected by mental health challenges.")}${h(3, "VISION")}${p("To become the leading student-led mental health advocacy organization in the United States.")}${h(3, "Core Values")}${p("Advocacy We speak up for those who need support and work to create meaningful change.")}${p("Service We create tangible impact through action, volunteerism, and community engagement.")}${p("Leadership We empower students to lead initiatives that improve their schools and communities.")}${p("Integrity We act honestly, responsibly, and transparently in all organizational activities.")}${p("Education We believe knowledge reduces stigma and promotes understanding.")}${p("Inclusivity Mental health support should be accessible and welcoming to all individuals.")}${p("Impact We prioritize measurable, sustainable, and lasting change.")}${h(3, "Strategic Pillars")}${p("1. Advocacy 2. Policy Reform 3. Service 4. Education 5. Awareness Official Motto: Reaching Stability Together")}`, "wide") +
      section("Full Constitution", `${p("To verify someone's leadership or involvement in ReachEquilibria, please email us at verify@reachequilibria.org")}${p("Reach Equilibria is a 501(c)(3) non-profit organization. EIN 99-3505959.")}${docActions(constitutionDoc, "Download Constitution")}<object class="pdf-frame" data="${constitutionDoc}" type="application/pdf"><p><a href="${constitutionDoc}" target="_blank" rel="noopener">ReachEquilibria Constitution Version 1.0</a></p></object>`, "wide"),
  });
}

const pages = [
  ["index", "index.html", homePage],
  ["about", "about/index.html", aboutPage],
  ["impact", "impact/index.html", impactPage],
  ["resources", "resources/index.html", resourcesPage],
  ["help", "get-help/index.html", getHelpPage],
  ["chapters", "chapters/index.html", chaptersPage],
  ["blogs", "blogs/index.html", blogsPage],
  ["donate", "donate/index.html", donatePage],
  ["contact", "contact-us/index.html", contactPage],
  ["team", "satyam-sood/index.html", teamPage],
  ["story", "our-story/index.html", storyPage],
  ["events", "past-events/index.html", eventsPage],
  ["articles", "mental-wellness-articles/index.html", articlesPage],
  ["join", "volunteering-opportunities/index.html", joinPage],
  ["chapter", "create-a-chapter/index.html", chapterPage],
  ["gallery", "gallery/index.html", galleryPage],
  ["constitution", "constitution/index.html", constitutionPage],
  ...blogPosts.map((post) => [`blog-${post.slug}`, `blogs/${post.slug}/index.html`, () => blogPostPage(post)]),
];

function prefixFor(route) {
  const depth = route.split("/").length - 1;
  return depth ? "../".repeat(depth) : "";
}

for (const [, route, make] of pages) {
  currentPrefix = prefixFor(route);
  const dest = path.join(outDir, route);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, make());
}

fs.writeFileSync(path.join(outDir, "CNAME"), "www.reachequilibria.org\n");
fs.writeFileSync(path.join(outDir, "README.md"), `# ReachEquilibria Static Website

This folder is a multi-page static website for ReachEquilibria.

The same domain can still be used: www.reachequilibria.org. The domain stays yours; DNS just needs to point to the new host.

Suggested free hosting:
- GitHub Pages
- Cloudflare Pages
- Netlify

The included CNAME file is set to www.reachequilibria.org for GitHub Pages.
`);

fs.writeFileSync(path.join(outDir, "styles.css"), `:root {
  --black: #050705;
  --ink: #11150f;
  --olive-dark: #26351f;
  --olive: #566b3f;
  --olive-soft: #e9efe3;
  --white: #ffffff;
  --line: #d5ddcf;
  --muted: #596453;
  --shadow: 0 24px 60px rgba(5, 7, 5, 0.18);
  --max: 1180px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background:
    radial-gradient(circle at 10% 0%, rgba(86,107,63,.18), transparent 28rem),
    radial-gradient(circle at 100% 20%, rgba(38,53,31,.12), transparent 30rem),
    linear-gradient(180deg, var(--white), #f7faf4 45%, var(--white));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(38,53,31,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(38,53,31,.04) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
}
img {
  display: block;
  max-width: 100%;
  object-position: var(--focus, center center);
}
a { color: inherit; }
button, input, textarea { font: inherit; }
.skip-link {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 50;
  transform: translateY(-150%);
  background: var(--black);
  color: var(--white);
  padding: .7rem 1rem;
  border-radius: 6px;
}
.skip-link:focus { transform: translateY(0); }
.crisis-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: .7rem;
  padding: .55rem 1rem;
  color: var(--white);
  background: var(--black);
  font-size: .9rem;
  font-weight: 750;
}
.crisis-bar a { color: var(--white); text-underline-offset: 3px; }
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: grid;
  gap: .65rem;
  padding: .72rem max(20px, calc((100vw - var(--max)) / 2)) .8rem;
  background: rgba(255,255,255,.96);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(16px);
}
.header-top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
}
.brand img { width: 176px; max-height: 48px; object-fit: contain; }
.header-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .65rem;
}
.utility-link,
.donate-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: .58rem .9rem;
  border-radius: 999px;
  text-decoration: none;
  font-size: .82rem;
  font-weight: 900;
}
.utility-link {
  color: var(--olive-dark);
  background: var(--olive-soft);
}
.donate-pill {
  color: var(--white);
  background: var(--olive-dark);
}
.site-nav {
  display: grid;
  grid-template-columns: repeat(var(--nav-count), minmax(0, 1fr));
  gap: .45rem;
  width: 100%;
  padding: .4rem;
  border: 1px solid rgba(38,53,31,.12);
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(233,239,227,.92), rgba(255,255,255,.86)),
    repeating-linear-gradient(115deg, rgba(38,53,31,.06) 0 1px, transparent 1px 18px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 14px 32px rgba(5,7,5,.06);
}
.site-nav a {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  place-items: center;
  align-items: center;
  gap: .42rem;
  min-height: 52px;
  padding: .62rem .58rem;
  overflow: hidden;
  border: 1px solid rgba(38,53,31,.12);
  border-radius: 18px 8px 18px 8px;
  color: var(--olive-dark);
  text-decoration: none;
  font-size: .82rem;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
  background:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,.95), transparent 44%),
    linear-gradient(135deg, rgba(255,255,255,.92), rgba(233,239,227,.86));
  box-shadow: 0 8px 22px rgba(5,7,5,.055);
  transform: translateY(0);
  transition: transform .18s ease, color .18s ease, background .18s ease, box-shadow .18s ease;
}
.site-nav a:nth-child(even) {
  border-radius: 8px 18px 8px 18px;
}
.site-nav a::before,
.site-nav a::after {
  content: "";
  position: absolute;
  pointer-events: none;
}
.site-nav a::before {
  z-index: -1;
  inset: auto -18% -72% -18%;
  height: 92%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(86,107,63,.3), transparent 67%);
  transition: transform .2s ease, opacity .2s ease;
}
.site-nav a::after {
  inset: 7px;
  border: 1px solid rgba(38,53,31,.08);
  border-radius: inherit;
  opacity: .62;
}
.nav-number {
  display: grid;
  place-items: center;
  width: 26px;
  aspect-ratio: 1;
  color: var(--white);
  border-radius: 50%;
  background: var(--olive-dark);
  font-size: .62rem;
  font-weight: 950;
  line-height: 1;
}
.nav-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.site-nav a:hover,
.site-nav a.active {
  color: var(--white);
  background:
    radial-gradient(circle at 78% 20%, rgba(233,239,227,.2), transparent 32%),
    linear-gradient(135deg, var(--olive-dark), #111b0f);
  box-shadow: 0 16px 34px rgba(5,7,5,.18);
  transform: translateY(-2px);
}
.site-nav a:hover::before,
.site-nav a.active::before {
  opacity: .9;
  transform: translateY(-18%);
}
.site-nav a:hover::after,
.site-nav a.active::after {
  border-color: rgba(255,255,255,.18);
}
.site-nav a:hover .nav-number,
.site-nav a.active .nav-number {
  color: var(--olive-dark);
  background: var(--white);
}
.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  place-items: center;
  gap: 5px;
}
.menu-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--black);
}
.page-hero {
  position: relative;
  display: grid;
  align-items: end;
  min-height: clamp(560px, 70vh, 780px);
  color: var(--white);
  background: var(--olive-dark);
  overflow: hidden;
}
.hero-copy {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: end;
  max-width: var(--max);
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto;
  padding: clamp(5rem, 10vw, 9rem) 0 clamp(4rem, 8vw, 7rem);
}
.hero-image {
  position: absolute;
  inset: 0;
  background: var(--black);
}
.hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: .52;
}
.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .48;
  filter: saturate(.86) contrast(1.08);
}
.hero-motion {
  position: absolute;
  inset: -30%;
  z-index: 2;
  background:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,.22), transparent 25%),
    radial-gradient(circle at 80% 10%, rgba(125,157,93,.42), transparent 28%),
    radial-gradient(circle at 50% 95%, rgba(255,255,255,.16), transparent 30%),
    linear-gradient(120deg, rgba(5,7,5,.68), rgba(38,53,31,.42), rgba(5,7,5,.7));
  mix-blend-mode: screen;
  animation: drift 30s ease-in-out infinite alternate;
}
.hero-orbit {
  position: absolute;
  inset: 7% max(20px, calc((100vw - var(--max)) / 2));
  z-index: 2;
  pointer-events: none;
}
.hero-orbit span {
  position: absolute;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 999px;
  filter: drop-shadow(0 0 18px rgba(255,255,255,.16));
}
.hero-orbit span:nth-child(1) {
  right: 0;
  top: 8%;
  width: clamp(180px, 24vw, 360px);
  aspect-ratio: 1;
  animation: floatRing 18s ease-in-out infinite;
}
.hero-orbit span:nth-child(2) {
  right: 16%;
  bottom: 4%;
  width: clamp(110px, 14vw, 220px);
  aspect-ratio: 1 / .55;
  transform: rotate(-18deg);
  animation: floatRing 22s ease-in-out infinite reverse;
}
.hero-orbit span:nth-child(3) {
  left: 2%;
  top: 18%;
  width: clamp(90px, 12vw, 190px);
  aspect-ratio: 1;
  border-style: dashed;
  animation: pulseRing 14s ease-in-out infinite;
}
.page-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(90deg, rgba(5,7,5,.78), rgba(38,53,31,.38) 52%, rgba(5,7,5,.62)),
    repeating-linear-gradient(115deg, rgba(255,255,255,.08) 0 1px, transparent 1px 80px);
}
@keyframes drift {
  0% { transform: translate3d(-2%, -1%, 0) scale(1); }
  100% { transform: translate3d(2%, 1%, 0) scale(1.08); }
}
@keyframes floatRing {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(-18px, 20px, 0) rotate(8deg); }
}
@keyframes pulseRing {
  0%, 100% { transform: scale(1); opacity: .56; }
  50% { transform: scale(1.18); opacity: .94; }
}
.eyebrow {
  margin: 0 0 .9rem;
  color: #dfe8d6;
  font-size: .78rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}
h1, h2, h3, p {
  overflow-wrap: break-word;
  word-break: normal;
}
h1 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(3.6rem, 8vw, 7.3rem);
  line-height: .92;
  letter-spacing: 0;
}
.hero-copy > p:last-child {
  max-width: 720px;
  margin: 1.3rem 0 0;
  color: rgba(255,255,255,.86);
  font-size: clamp(1.04rem, 1.6vw, 1.28rem);
}
h2 {
  margin: 0 0 1rem;
  font-size: clamp(2.1rem, 4vw, 4.4rem);
  line-height: 1;
  letter-spacing: 0;
}
h3 { margin: 1rem 0 .5rem; font-size: 1.18rem; line-height: 1.25; }
p { margin: 0 0 1rem; }
.content-section,
.split-section,
.events-list,
.stat-band {
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto;
}
.content-section { padding: clamp(4rem, 7vw, 7rem) 0; }
.content-section.compact { padding: clamp(3rem, 5vw, 4.8rem) 0; }
.section-inner {
  width: 100%;
  max-width: 920px;
  margin-inline: auto;
}
.content-section.wide .section-inner {
  max-width: var(--max);
}
.content-section.compact .section-inner > h2,
.content-section.wide .section-inner > h2,
.content-section.compact .section-inner > p:first-child,
.content-section.wide .section-inner > p:first-child {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.content-section,
.split-section,
.events-list,
.signature-board,
.reach-lab,
.service-constellation,
.impact-portal,
.motto-banner,
.donation-portal,
.giving-grid,
.chapter-network,
.article-shell {
  content-visibility: auto;
  contain-intrinsic-size: 760px;
}
.split-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, .8fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
  padding: clamp(4rem, 7vw, 7rem) 0;
}
.split-section.olive {
  width: 100%;
  max-width: none;
  padding-left: max(20px, calc((100vw - var(--max)) / 2));
  padding-right: max(20px, calc((100vw - var(--max)) / 2));
  color: var(--white);
  background: var(--olive-dark);
}
.split-section.olive p { color: rgba(255,255,255,.8); }
.split-section.olive .button {
  color: var(--olive-dark);
  background: var(--white);
}
.stat-band {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin-top: -42px;
  position: relative;
  z-index: 2;
  background: var(--line);
  box-shadow: var(--shadow);
}
.stat-band article {
  min-height: 150px;
  padding: 1.3rem;
  background: var(--white);
}
.stat-band strong {
  display: block;
  color: var(--olive-dark);
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 1;
}
.stat-band span {
  display: block;
  margin-top: .8rem;
  color: var(--muted);
  font-weight: 800;
}
.page-sigil + .stat-band {
  margin-top: clamp(1rem, 3vw, 2rem);
}
.page-sigil {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) minmax(220px, .48fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
  width: min(var(--max), calc(100% - 40px));
  margin: clamp(2rem, 4vw, 3rem) auto 0;
  padding: clamp(1rem, 2.5vw, 1.4rem);
  overflow: hidden;
  border: 1px solid rgba(38,53,31,.14);
  border-radius: 34px 8px 34px 8px;
  background:
    radial-gradient(circle at 6% 18%, rgba(86,107,63,.18), transparent 14rem),
    linear-gradient(135deg, rgba(255,255,255,.92), rgba(233,239,227,.76));
  box-shadow: 0 18px 50px rgba(5,7,5,.08);
}
.page-sigil::before,
.page-sigil::after {
  content: "";
  position: absolute;
  z-index: -1;
  pointer-events: none;
}
.page-sigil::before {
  right: clamp(1rem, 5vw, 5rem);
  top: 50%;
  width: clamp(120px, 18vw, 240px);
  aspect-ratio: 1;
  border: 1px dashed rgba(38,53,31,.18);
  border-radius: 50%;
  transform: translateY(-50%);
}
.page-sigil::after {
  left: -5rem;
  bottom: -7rem;
  width: clamp(170px, 20vw, 300px);
  aspect-ratio: 1;
  border-radius: 44% 56% 52% 48% / 48% 42% 58% 52%;
  background: rgba(38,53,31,.1);
}
.sigil-orb {
  display: grid;
  place-items: center;
  width: clamp(86px, 9vw, 118px);
  aspect-ratio: 1;
  color: var(--white);
  text-align: center;
  border-radius: 42% 58% 50% 50% / 45% 48% 52% 55%;
  background:
    radial-gradient(circle at 34% 24%, rgba(255,255,255,.24), transparent 34%),
    var(--olive-dark);
  box-shadow: 0 16px 34px rgba(5,7,5,.18);
}
.sigil-orb span {
  display: block;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 950;
  line-height: .9;
}
.sigil-orb small {
  max-width: 8ch;
  color: rgba(255,255,255,.72);
  font-size: .66rem;
  font-weight: 900;
  text-transform: uppercase;
}
.sigil-copy .eyebrow {
  color: var(--olive);
  margin-bottom: .35rem;
}
.sigil-copy h2 {
  margin: 0;
  font-size: clamp(1.7rem, 2.8vw, 3.1rem);
  line-height: 1;
}
.sigil-copy p:not(.eyebrow) {
  margin: .45rem 0 0;
  color: var(--muted);
  font-weight: 800;
}
.sigil-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: .5rem;
}
.sigil-pills span {
  padding: .55rem .75rem;
  color: var(--olive-dark);
  border: 1px solid rgba(38,53,31,.15);
  border-radius: 999px;
  background: rgba(255,255,255,.72);
  font-size: .8rem;
  font-weight: 900;
}
.three-up,
.team-grid,
.role-grid,
.donate-grid,
.link-card-grid,
.blog-grid {
  display: grid;
  gap: 1rem;
}
.three-up,
.blog-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.link-card-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 245px), 1fr));
}
.three-up article,
.team-grid article,
.role-grid a,
.donate-grid a,
.donate-grid button {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 0 14px 35px rgba(5,7,5,.07);
}
.three-up article { padding: 1.2rem; }
.team-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 235px), 1fr)); margin-top: 1.5rem; }
.team-grid article { overflow: hidden; }
.team-grid img { width: 100%; aspect-ratio: 4/5; object-fit: cover; background: var(--olive-soft); }
.team-grid article:first-child img { object-position: center 16%; }
.team-grid h3, .team-grid p { padding: 0 1rem; }
.team-grid p { padding-bottom: 1rem; color: var(--muted); font-weight: 750; }
.role-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin: 1.2rem 0; }
.role-grid a {
  min-height: 96px;
  display: grid;
  place-items: center;
  padding: 1rem;
  color: var(--white);
  background: var(--olive-dark);
  text-align: center;
  text-decoration: none;
  font-weight: 900;
}
.button,
.contact-form button,
.newsletter-form button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: .8rem 1.1rem;
  border: 0;
  border-radius: 6px;
  color: var(--white);
  background: var(--olive-dark);
  text-decoration: none;
  font-weight: 900;
  cursor: pointer;
}
.button.light {
  color: var(--olive-dark);
  background: var(--white);
}
.signature-board {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(360px, 1.1fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: center;
  width: min(var(--max), calc(100% - 40px));
  margin: clamp(3rem, 6vw, 5rem) auto 0;
  padding: clamp(2rem, 5vw, 4rem);
  color: var(--white);
  background:
    radial-gradient(circle at 18% 12%, rgba(255,255,255,.16), transparent 28%),
    linear-gradient(135deg, var(--black), var(--olive-dark));
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}
.signature-board::before {
  content: "REQ";
  position: absolute;
  right: -2rem;
  bottom: -4rem;
  color: rgba(255,255,255,.055);
  font-size: clamp(8rem, 22vw, 20rem);
  line-height: 1;
  font-weight: 950;
}
.signature-board::after {
  content: "";
  position: absolute;
  inset: -40%;
  background: conic-gradient(from 90deg, transparent, rgba(255,255,255,.12), transparent, rgba(125,157,93,.22), transparent);
  animation: slowSpin 52s linear infinite;
}
.signature-copy,
.signature-mosaic {
  position: relative;
  z-index: 2;
}
.signature-copy h2 {
  max-width: 680px;
  font-size: clamp(2.5rem, 5vw, 5rem);
}
.signature-copy p:not(.eyebrow) {
  max-width: 620px;
  color: rgba(255,255,255,.82);
  font-size: 1.1rem;
}
.signature-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .8rem;
  margin-top: 1.3rem;
}
.signature-mosaic {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  grid-auto-rows: 180px;
  gap: .75rem;
}
.signature-mosaic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 8px;
}
.signature-mosaic img:first-child {
  grid-row: span 2;
}
@keyframes slowSpin {
  to { transform: rotate(360deg); }
}
.reach-lab {
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, .75fr) minmax(420px, 1.25fr);
  gap: clamp(2rem, 7vw, 6rem);
  align-items: center;
  width: min(var(--max), calc(100% - 40px));
  margin: clamp(4rem, 8vw, 7rem) auto;
}
.reach-lab::before {
  content: "";
  position: absolute;
  inset: -3rem -2rem;
  z-index: -1;
  background:
    radial-gradient(circle at 25% 25%, rgba(86,107,63,.24), transparent 28%),
    radial-gradient(circle at 82% 62%, rgba(38,53,31,.16), transparent 34%);
  border-radius: 52% 48% 48% 52% / 36% 42% 58% 64%;
}
.reach-lab-copy {
  padding: clamp(1rem, 2vw, 1.5rem);
}
.reach-lab-copy h2 {
  max-width: 13ch;
  font-size: clamp(2.25rem, 4.35vw, 4.9rem);
  line-height: 1.05;
  text-wrap: balance;
  overflow-wrap: normal;
}
.mind-map {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-areas:
    "one core two"
    "three core four";
  gap: clamp(.8rem, 1.8vw, 1.15rem);
  min-height: auto;
  padding: clamp(1rem, 2vw, 1.55rem);
  border-radius: 42px;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.95), rgba(233,239,227,.8) 54%, rgba(38,53,31,.12)),
    conic-gradient(from 120deg, rgba(38,53,31,.18), rgba(255,255,255,.65), rgba(86,107,63,.2), rgba(255,255,255,.75), rgba(38,53,31,.18));
  border: 1px solid rgba(38,53,31,.16);
  box-shadow: 0 28px 80px rgba(5,7,5,.14);
  overflow: hidden;
}
.mind-map::before,
.mind-map::after {
  content: "";
  position: absolute;
  inset: 12%;
  border: 1px dashed rgba(38,53,31,.22);
  border-radius: 50%;
  animation: slowSpin 58s linear infinite;
}
.mind-map::after {
  inset: 24%;
  animation-direction: reverse;
  animation-duration: 44s;
}
.mind-core,
.mind-node {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  text-align: center;
  box-shadow: 0 18px 48px rgba(5,7,5,.12);
  min-width: 0;
}
.mind-core {
  grid-area: core;
  align-self: stretch;
  width: 100%;
  min-height: 360px;
  padding: 1.4rem;
  color: var(--white);
  background: var(--olive-dark);
  border-radius: 44% 56% 52% 48% / 44% 48% 52% 56%;
}
.mind-core strong {
  display: block;
  font-size: clamp(2.15rem, 4.3vw, 4.85rem);
  line-height: .95;
  overflow-wrap: anywhere;
  text-wrap: balance;
}
.mind-core span {
  max-width: 12rem;
  font-weight: 850;
}
.mind-node {
  width: 100%;
  min-height: 180px;
  padding: clamp(.95rem, 1.8vw, 1.25rem);
  color: var(--ink);
  background: rgba(255,255,255,.9);
  border: 1px solid rgba(38,53,31,.18);
  backdrop-filter: blur(16px);
}
.mind-node strong {
  display: block;
  color: var(--olive-dark);
  font-size: 1.05rem;
}
.mind-node span {
  color: var(--muted);
  font-size: .86rem;
  font-weight: 700;
}
.node-one {
  grid-area: one;
  border-radius: 62% 38% 54% 46% / 44% 52% 48% 56%;
}
.node-two {
  grid-area: two;
  border-radius: 38% 62% 44% 56% / 58% 44% 56% 42%;
}
.node-three {
  grid-area: three;
  border-radius: 46% 54% 64% 36% / 48% 58% 42% 52%;
}
.node-four {
  grid-area: four;
  border-radius: 55% 45% 41% 59% / 42% 52% 48% 58%;
}
.service-constellation {
  position: relative;
  width: min(var(--max), calc(100% - 40px));
  min-height: auto;
  margin: clamp(4rem, 8vw, 7rem) auto;
  padding: clamp(2rem, 4vw, 3rem);
  overflow: hidden;
  border-radius: 38px;
  background:
    radial-gradient(circle at 18% 22%, rgba(86,107,63,.24), transparent 20rem),
    radial-gradient(circle at 88% 70%, rgba(38,53,31,.18), transparent 24rem),
    rgba(255,255,255,.72);
  border: 1px solid rgba(38,53,31,.12);
  box-shadow: 0 24px 70px rgba(5,7,5,.1);
}
.service-constellation::before {
  content: "";
  position: absolute;
  z-index: 0;
  inset: 9%;
  border: 1px dashed rgba(38,53,31,.18);
  border-radius: 50%;
}
.service-constellation::after {
  content: "";
  position: absolute;
  z-index: 0;
  right: -10%;
  top: -18%;
  width: 40%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(38,53,31,.16), transparent 68%);
}
.constellation-copy {
  position: relative;
  z-index: 2;
  max-width: 620px;
}
.constellation-copy h2 {
  font-size: clamp(2.4rem, 5vw, 5.4rem);
  line-height: 1;
}
.constellation-field {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: clamp(.8rem, 1.6vw, 1rem);
  margin-top: clamp(1.6rem, 3.5vw, 2.6rem);
  pointer-events: auto;
}
.constellation-node {
  position: relative;
  width: 100%;
  min-height: 174px;
  display: grid;
  align-content: center;
  gap: .25rem;
  margin: 0;
  padding: 1rem;
  color: var(--ink);
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(38,53,31,.16);
  box-shadow: 0 18px 42px rgba(5,7,5,.1);
  backdrop-filter: blur(14px);
}
.constellation-node span {
  color: var(--olive);
  font-size: .78rem;
  font-weight: 950;
}
.constellation-node strong {
  color: var(--olive-dark);
  font-size: 1.2rem;
}
.constellation-node p {
  margin: 0;
  color: var(--muted);
  font-size: .88rem;
  font-weight: 700;
}
.c-one {
  border-radius: 64% 36% 52% 48% / 42% 52% 48% 58%;
}
.c-two {
  border-radius: 42% 58% 36% 64% / 58% 42% 58% 42%;
}
.c-three {
  border-radius: 36% 64% 56% 44% / 44% 60% 40% 56%;
}
.c-four {
  border-radius: 54% 46% 42% 58% / 48% 38% 62% 52%;
}
.c-five {
  border-radius: 46% 54% 62% 38% / 56% 46% 54% 44%;
}
.impact-portal {
  position: relative;
  display: grid;
  grid-template-columns: minmax(300px, .8fr) minmax(420px, 1.2fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
  width: 100%;
  padding: clamp(4rem, 8vw, 7rem) max(20px, calc((100vw - var(--max)) / 2));
  color: var(--white);
  background:
    linear-gradient(135deg, rgba(5,7,5,.96), rgba(38,53,31,.9)),
    radial-gradient(circle at 80% 20%, rgba(233,239,227,.16), transparent 28rem);
  overflow: hidden;
  clip-path: polygon(0 5%, 100% 0, 100% 92%, 0 100%);
}
.impact-portal::before {
  content: "";
  position: absolute;
  inset: -30%;
  background: repeating-linear-gradient(115deg, rgba(255,255,255,.08) 0 1px, transparent 1px 86px);
  animation: portalScan 34s linear infinite;
}
.portal-copy,
.portal-gallery {
  position: relative;
  z-index: 1;
}
.portal-copy p {
  color: rgba(255,255,255,.82);
}
.portal-gallery {
  min-height: 560px;
}
.portal-gallery img {
  position: absolute;
  width: min(58%, 430px);
  height: 320px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 28px 80px rgba(0,0,0,.35);
  clip-path: polygon(8% 0, 100% 12%, 92% 100%, 0 84%);
}
.portal-gallery img:nth-child(1) {
  left: 0;
  top: 0;
  transform: rotate(-6deg);
}
.portal-gallery img:nth-child(2) {
  right: 0;
  top: 26%;
  transform: rotate(7deg);
}
.portal-gallery img:nth-child(3) {
  left: 18%;
  bottom: 0;
  transform: rotate(-2deg);
}
@keyframes portalScan {
  to { transform: translate3d(8%, 0, 0); }
}
.link-card,
.blog-card {
  position: relative;
  overflow: hidden;
  min-height: 420px;
  display: grid;
  align-content: end;
  gap: .55rem;
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--white);
  background: var(--olive-dark);
  text-decoration: none;
  box-shadow: 0 14px 35px rgba(5,7,5,.08);
}
.link-card img,
.blog-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .48;
  transition: transform .35s ease, opacity .35s ease;
}
.link-card::after,
.blog-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5,7,5,.04), rgba(5,7,5,.82));
}
.link-card:hover img,
.blog-card:hover img {
  transform: scale(1.04);
  opacity: .6;
}
.link-card span,
.link-card strong,
.link-card p,
.blog-card span,
.blog-card strong,
.blog-card p {
  position: relative;
  z-index: 2;
}
.link-card span,
.blog-card span {
  color: #dfe8d6;
  font-size: .76rem;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
}
.link-card strong,
.blog-card strong {
  font-size: clamp(1.45rem, 2.2vw, 2.1rem);
  line-height: 1.05;
}
.link-card p,
.blog-card p {
  max-width: 34rem;
  margin: 0;
  color: rgba(255,255,255,.83);
}
.blog-grid.featured,
.blog-grid.compact-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.blog-grid.featured .blog-card:nth-child(n+4) { display: none; }
.blog-grid.compact-list .blog-card:nth-child(n+4) { display: none; }
.motto-banner {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) minmax(170px, .3fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
  width: min(var(--max), calc(100% - 40px));
  margin: clamp(3rem, 7vw, 6rem) auto;
  padding: clamp(1.4rem, 4vw, 3rem);
  overflow: hidden;
  color: var(--white);
  border-radius: 54px 10px 54px 10px;
  background:
    radial-gradient(circle at 15% 15%, rgba(255,255,255,.18), transparent 18rem),
    radial-gradient(circle at 82% 78%, rgba(125,157,93,.3), transparent 20rem),
    linear-gradient(135deg, #050705, var(--olive-dark));
  box-shadow: 0 28px 80px rgba(5,7,5,.22);
}
.motto-banner::before {
  content: "Reaching Stability Together";
  position: absolute;
  right: -4rem;
  bottom: -1.2rem;
  z-index: -1;
  color: rgba(255,255,255,.055);
  font-size: clamp(3.4rem, 8vw, 9rem);
  font-weight: 950;
  line-height: .8;
  white-space: nowrap;
}
.motto-mark {
  display: grid;
  place-items: center;
  width: clamp(92px, 12vw, 150px);
  aspect-ratio: 1;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 42% 58% 48% 52% / 54% 42% 58% 46%;
  background:
    radial-gradient(circle at 34% 24%, rgba(255,255,255,.25), transparent 30%),
    rgba(255,255,255,.1);
  box-shadow: inset 0 0 40px rgba(255,255,255,.08), 0 18px 48px rgba(5,7,5,.22);
}
.motto-mark span {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 950;
}
.motto-copy .eyebrow { color: #dfe8d6; }
.motto-copy h2 {
  max-width: 880px;
  margin-bottom: .7rem;
  font-size: clamp(2.6rem, 6vw, 6rem);
}
.motto-copy p {
  color: rgba(255,255,255,.82);
  font-size: clamp(1rem, 1.6vw, 1.25rem);
  font-weight: 800;
}
.motto-copy a {
  color: var(--olive-dark);
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  margin-top: .5rem;
  padding: .8rem 1rem;
  border-radius: 999px;
  background: var(--white);
  font-weight: 950;
  text-decoration: none;
}
.motto-lines {
  display: grid;
  gap: .65rem;
}
.motto-lines span {
  height: 12px;
  border-radius: 999px;
  background: rgba(255,255,255,.72);
}
.motto-lines span:nth-child(2) {
  width: 72%;
  background: rgba(233,239,227,.42);
}
.motto-lines span:nth-child(3) {
  width: 46%;
  background: rgba(125,157,93,.72);
}
.donation-portal {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(320px, .72fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
  width: min(var(--max), calc(100% - 40px));
  margin: clamp(3rem, 7vw, 6rem) auto 0;
  padding: clamp(1.4rem, 4vw, 3rem);
  overflow: hidden;
  border: 1px solid rgba(38,53,31,.14);
  border-radius: 42px;
  background:
    radial-gradient(circle at 8% 15%, rgba(86,107,63,.2), transparent 19rem),
    linear-gradient(135deg, rgba(255,255,255,.95), rgba(233,239,227,.72));
  box-shadow: 0 24px 70px rgba(5,7,5,.1);
}
.donation-copy .eyebrow { color: var(--olive); }
.donation-copy h2 {
  max-width: 760px;
  font-size: clamp(2.4rem, 5.2vw, 5.7rem);
}
.donation-copy p {
  max-width: 78ch;
}
.donation-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .75rem;
  margin-top: 1.4rem;
}
.donation-metrics article {
  min-height: 118px;
  padding: 1rem;
  color: var(--white);
  border-radius: 24px 8px 24px 8px;
  background: var(--olive-dark);
}
.donation-metrics strong {
  display: block;
  font-size: clamp(1.8rem, 3vw, 3.4rem);
  line-height: 1;
}
.donation-metrics span {
  display: block;
  margin-top: .55rem;
  color: rgba(255,255,255,.78);
  font-weight: 850;
}
.donation-visual {
  position: relative;
  min-height: 470px;
}
.donation-visual img {
  position: absolute;
  width: min(86%, 420px);
  height: 62%;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 34px 8px 34px 8px;
  box-shadow: 0 22px 60px rgba(5,7,5,.18);
}
.donation-visual img:first-child {
  right: 0;
  top: 0;
  transform: rotate(3deg);
}
.donation-visual img:last-child {
  left: 0;
  bottom: 0;
  transform: rotate(-5deg);
}
.giving-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  width: min(var(--max), calc(100% - 40px));
  margin: 1rem auto clamp(4rem, 7vw, 7rem);
}
.giving-card {
  position: relative;
  display: grid;
  align-content: space-between;
  min-height: 230px;
  padding: 1.15rem;
  overflow: hidden;
  color: var(--white);
  text-align: left;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 28px 8px 28px 8px;
  background:
    radial-gradient(circle at 88% 8%, rgba(233,239,227,.18), transparent 45%),
    linear-gradient(135deg, var(--olive-dark), #0b1008);
  box-shadow: 0 18px 45px rgba(5,7,5,.12);
  cursor: pointer;
}
.giving-card:nth-child(even) {
  border-radius: 8px 28px 8px 28px;
}
.giving-card::after {
  content: "";
  position: absolute;
  right: -4rem;
  bottom: -5rem;
  width: 13rem;
  aspect-ratio: 1;
  border: 1px dashed rgba(255,255,255,.18);
  border-radius: 50%;
}
.giving-mark {
  display: grid;
  place-items: center;
  width: 56px;
  aspect-ratio: 1;
  color: var(--olive-dark);
  border-radius: 50%;
  background: var(--white);
  font-weight: 950;
}
.giving-card strong {
  display: block;
  margin-top: 1.1rem;
  font-size: clamp(1.45rem, 2.5vw, 2.4rem);
}
.giving-card p {
  max-width: 30rem;
  color: rgba(255,255,255,.78);
  font-weight: 760;
}
.giving-card em {
  position: relative;
  z-index: 1;
  color: #dfe8d6;
  font-style: normal;
  font-weight: 950;
}
.zelle-card {
  border: 0;
  font: inherit;
}
.chapter-network {
  position: relative;
  width: min(var(--max), calc(100% - 40px));
  margin: clamp(3rem, 7vw, 6rem) auto 0;
  padding: clamp(1.4rem, 4vw, 3rem);
  overflow: hidden;
  color: var(--white);
  border-radius: 44px 8px 44px 8px;
  background:
    radial-gradient(circle at 12% 18%, rgba(255,255,255,.16), transparent 17rem),
    linear-gradient(135deg, #050705, var(--olive-dark));
  box-shadow: 0 26px 80px rgba(5,7,5,.18);
}
.chapter-network-head {
  display: grid;
  gap: .4rem;
  margin-bottom: clamp(1.4rem, 3vw, 2rem);
}
.chapter-network-head h2 {
  margin: 0;
  font-size: clamp(2.8rem, 7vw, 7rem);
}
.chapter-network-head h2 span {
  display: inline-grid;
  place-items: center;
  width: clamp(76px, 10vw, 132px);
  aspect-ratio: 1;
  margin-right: .55rem;
  color: var(--olive-dark);
  border-radius: 50%;
  background: var(--white);
}
.chapter-network-head p {
  color: rgba(255,255,255,.8);
  font-weight: 850;
}
.campus-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
.campus-card {
  overflow: hidden;
  margin: 0;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 28px 8px 28px 8px;
  background: rgba(255,255,255,.08);
}
.campus-card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.campus-card div {
  padding: 1rem;
}
.campus-card strong {
  display: block;
  font-size: 1.12rem;
}
.campus-card span {
  display: block;
  width: 100%;
  height: 3px;
  margin-top: .85rem;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--white), rgba(125,157,93,.5), transparent);
}
.chapter-admissions-note {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 24px 8px 24px 8px;
  background: rgba(255,255,255,.09);
}
.chapter-admissions-note strong {
  font-size: clamp(1.35rem, 2vw, 2rem);
}
.chapter-admissions-note p {
  margin: 0;
  color: rgba(255,255,255,.8);
  font-weight: 760;
}
.photo-ribbon {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 1fr);
  gap: .8rem;
  overflow-x: auto;
  padding-bottom: .25rem;
}
.photo-ribbon figure {
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  background: var(--olive-soft);
}
.photo-ribbon img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.document-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .8rem;
  margin: 1.4rem 0 0;
}
.table-wrap {
  width: 100%;
  margin: 1.3rem 0;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 14px 35px rgba(5,7,5,.07);
}
table {
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
  color: var(--ink);
  background: var(--white);
}
th,
td {
  padding: .85rem .9rem;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}
th {
  color: var(--white);
  background: var(--olive-dark);
  font-size: .78rem;
  text-transform: uppercase;
}
tr:last-child td { border-bottom: 0; }
.doc-card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
.doc-card-grid article {
  padding: 1.1rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 0 14px 35px rgba(5,7,5,.07);
}
.doc-card-grid article p:last-child { margin-bottom: 0; }
.pdf-frame {
  width: 100%;
  min-height: 760px;
  margin-top: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--olive-soft);
}
.article-shell {
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(320px, .65fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto;
  padding: clamp(4rem, 7vw, 7rem) 0;
}
.readable-article {
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 0 18px 45px rgba(5,7,5,.08);
}
.readable-article h2 {
  font-size: clamp(2.2rem, 4vw, 4.4rem);
}
.readable-article p {
  max-width: 76ch;
  color: var(--ink);
  font-size: 1.12rem;
  line-height: 1.82;
}
.article-aside {
  position: sticky;
  top: 150px;
  align-self: start;
}
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: .85rem;
  align-items: stretch;
}
.photo-grid.tight { grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); }
.photo-grid figure {
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  background: var(--olive-soft);
}
.photo-grid img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform .25s ease;
}
.photo-grid figure:hover img { transform: scale(1.03); }
.photo-grid figcaption {
  min-height: 0;
  padding: .45rem .6rem;
  color: var(--muted);
  font-size: .78rem;
}
.photo-grid.masonry {
  columns: 4 220px;
  display: block;
}
.photo-grid.masonry figure {
  display: inline-block;
  width: 100%;
  margin: 0 0 .75rem;
}
.photo-grid.masonry img { aspect-ratio: auto; }
.events-list { padding: clamp(3rem, 6vw, 6rem) 0 0; }
.event-block {
  display: grid;
  grid-template-columns: minmax(0, .75fr) minmax(0, 1.25fr);
  gap: 1.5rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--line);
}
.event-text h2 { font-size: clamp(1.8rem, 3vw, 3.2rem); }
.event-photos { grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr)); }
.event-photos figure:only-child { grid-column: 1 / -1; }
.donate-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 2rem;
}
.donate-grid a,
.donate-grid button {
  display: grid;
  gap: .75rem;
  padding: 1rem;
  color: var(--ink);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.donate-grid img { max-height: 88px; object-fit: contain; }
.contact-form {
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  border: 1px solid var(--line);
  border-radius: 8px;
}
.contact-form label { display: grid; gap: .35rem; font-weight: 850; }
input, textarea {
  width: 100%;
  padding: .85rem .9rem;
  border: 1px solid var(--line);
  border-radius: 6px;
}
.site-footer {
  display: grid;
  grid-template-columns: 1fr minmax(280px, .8fr) 1fr;
  gap: 2rem;
  padding: 3rem max(20px, calc((100vw - var(--max)) / 2));
  color: var(--white);
  background: var(--black);
}
.site-footer img { width: 220px; margin-bottom: 1rem; background: var(--white); border-radius: 4px; }
.site-footer a { color: var(--white); }
.newsletter-form { display: grid; gap: .7rem; align-content: start; }
.newsletter-form div { display: grid; grid-template-columns: 1fr auto; gap: .5rem; }
.footer-legal { color: rgba(255,255,255,.72); font-size: .92rem; }
.reach-screen-popup {
  position: fixed;
  inset: 0;
  z-index: 78;
  display: grid;
  place-items: center;
  padding: 24px;
  color: var(--white);
  background:
    radial-gradient(circle at 18% 20%, rgba(233,239,227,.22), transparent 28rem),
    radial-gradient(circle at 80% 70%, rgba(86,107,63,.24), transparent 30rem),
    rgba(5,7,5,.68);
  backdrop-filter: blur(20px);
}
.reach-chat.popup-dismissed .reach-screen-popup,
.reach-chat.popup-dismissed .reach-chat-nudge {
  display: none;
}
.reach-popup-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255,255,255,.28);
  border-radius: 50%;
  color: var(--white);
  background: rgba(255,255,255,.12);
  cursor: pointer;
  font-size: 1.45rem;
  line-height: 1;
  box-shadow: 0 12px 32px rgba(5,7,5,.24);
}
.reach-popup-panel {
  position: relative;
  width: min(620px, calc(100vw - 40px));
  min-height: min(420px, calc(100vh - 64px));
  max-height: calc(100vh - 48px);
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  padding: clamp(1.8rem, 5vw, 3.4rem);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 34px;
  background:
    radial-gradient(circle at 30% 20%, rgba(255,255,255,.2), transparent 20rem),
    linear-gradient(135deg, rgba(5,7,5,.92), rgba(38,53,31,.9));
  box-shadow: 0 34px 110px rgba(5,7,5,.46);
}
.reach-popup-panel::before,
.reach-popup-panel::after {
  content: "";
  position: absolute;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 50%;
  pointer-events: none;
}
.reach-popup-panel::before {
  inset: 8%;
}
.reach-popup-panel::after {
  inset: 17%;
  border-style: dashed;
}
.reach-popup-panel span,
.reach-popup-panel h2,
.reach-popup-panel p,
.reach-popup-open {
  position: relative;
  z-index: 1;
}
.reach-popup-panel span {
  color: #dfe8d6;
  font-weight: 950;
  text-transform: uppercase;
}
.reach-popup-panel h2 {
  margin: .5rem 0 1rem;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  line-height: .9;
}
.reach-popup-panel p {
  max-width: 470px;
  color: rgba(255,255,255,.82);
  font-size: clamp(1.04rem, 2vw, 1.25rem);
}
.reach-popup-open {
  min-height: 52px;
  margin-top: .8rem;
  padding: .9rem 1.25rem;
  border: 0;
  border-radius: 999px;
  color: var(--olive-dark);
  background: var(--white);
  font-weight: 950;
  cursor: pointer;
}
.reach-chat {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 80;
  display: grid;
  justify-items: end;
  gap: .75rem;
  font-family: inherit;
}
.reach-chat-nudge {
  width: min(310px, calc(100vw - 44px));
  padding: .9rem 1rem;
  color: var(--white);
  background: rgba(5,7,5,.86);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 18px 18px 6px 18px;
  box-shadow: 0 18px 52px rgba(5,7,5,.28);
  backdrop-filter: blur(16px);
  font-size: .92rem;
  font-weight: 800;
  transform-origin: bottom right;
  animation: chatNudge 7s ease-in-out infinite;
}
.reach-chat.is-open .reach-chat-nudge,
.reach-chat.dismissed .reach-chat-nudge {
  display: none;
}
.reach-chat-toggle {
  position: relative;
  width: 72px;
  height: 72px;
  border: 0;
  border-radius: 50%;
  color: var(--white);
  background:
    radial-gradient(circle at 28% 20%, rgba(255,255,255,.32), transparent 28%),
    conic-gradient(from 140deg, var(--olive-dark), var(--olive), var(--black), var(--olive-dark));
  box-shadow: 0 18px 46px rgba(5,7,5,.32);
  cursor: pointer;
}
.reach-chat-toggle::before,
.reach-chat-toggle::after {
  content: "";
  position: absolute;
  inset: -8px;
  border: 1px solid rgba(86,107,63,.42);
  border-radius: 50%;
  animation: reachPulse 2.8s ease-out infinite;
}
.reach-chat-toggle::after {
  animation-delay: 1.1s;
}
.reach-chat-toggle span {
  position: relative;
  z-index: 1;
  font-size: .86rem;
  font-weight: 950;
}
.reach-chat-window {
  display: none;
  width: min(390px, calc(100vw - 44px));
  max-height: min(650px, calc(100vh - 130px));
  overflow: hidden;
  border: 1px solid rgba(38,53,31,.18);
  border-radius: 24px 24px 8px 24px;
  background: rgba(255,255,255,.96);
  box-shadow: 0 28px 90px rgba(5,7,5,.26);
  backdrop-filter: blur(20px);
}
.reach-chat.is-open .reach-chat-window {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.reach-chat-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  color: var(--white);
  background:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,.24), transparent 28%),
    linear-gradient(135deg, var(--black), var(--olive-dark));
}
.reach-chat-header strong {
  display: block;
  font-size: 1.25rem;
}
.reach-chat-header span {
  display: block;
  color: rgba(255,255,255,.75);
  font-size: .82rem;
  font-weight: 800;
}
.reach-chat-close {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 50%;
  color: var(--white);
  background: rgba(255,255,255,.12);
  cursor: pointer;
  font-size: 1.35rem;
}
.reach-chat-messages {
  display: grid;
  align-content: start;
  gap: .72rem;
  max-height: 410px;
  overflow-y: auto;
  padding: 1rem;
  background:
    radial-gradient(circle at 0 0, rgba(86,107,63,.12), transparent 16rem),
    var(--white);
}
.reach-message {
  max-width: 88%;
  margin: 0;
  padding: .78rem .9rem;
  border-radius: 16px;
  font-size: .92rem;
  line-height: 1.45;
}
.reach-message a {
  color: var(--olive-dark);
  font-weight: 950;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.reach-message.user a {
  color: var(--white);
}
.reach-message.bot {
  justify-self: start;
  color: var(--ink);
  background: var(--olive-soft);
  border-bottom-left-radius: 4px;
}
.reach-message.user {
  justify-self: end;
  color: var(--white);
  background: var(--olive-dark);
  border-bottom-right-radius: 4px;
}
.reach-chat-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: .55rem;
  padding: .85rem;
  border-top: 1px solid var(--line);
  background: var(--white);
}
.reach-chat-form input {
  min-height: 46px;
  border-radius: 999px;
}
.reach-chat-form button {
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  color: var(--white);
  background: var(--olive-dark);
  font-weight: 900;
  cursor: pointer;
}
@keyframes chatNudge {
  0%, 70%, 100% { transform: translateY(0) scale(1); }
  76% { transform: translateY(-7px) scale(1.015); }
  82% { transform: translateY(0) scale(1); }
}
@keyframes reachPulse {
  0% { transform: scale(.82); opacity: .8; }
  100% { transform: scale(1.38); opacity: 0; }
}
.toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 60;
  padding: .85rem 1rem;
  color: var(--white);
  background: var(--olive-dark);
  border-radius: 6px;
  opacity: 0;
  transform: translateY(12px);
  transition: .2s ease;
}
.toast.is-visible { opacity: 1; transform: translateY(0); }
@media (max-width: 1100px) {
  .reach-lab,
  .donation-portal,
  .impact-portal {
    grid-template-columns: 1fr;
  }
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  }
  .giving-grid,
  .campus-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .reach-lab-copy h2 {
    max-width: 14ch;
    font-size: clamp(2.35rem, 8vw, 5.4rem);
  }
  .mind-map {
    width: min(900px, 100%);
    margin: 0 auto;
  }
  .portal-gallery {
    min-height: 620px;
  }
}
@media (max-width: 980px) {
  .site-header { gap: .5rem; }
  .header-top { grid-template-columns: auto auto; }
  .header-actions { display: none; }
  .menu-toggle { display: grid; justify-self: end; }
  .site-nav {
    display: none;
    grid-template-columns: 1fr;
    flex-direction: column;
    align-items: stretch;
    background: var(--white);
  }
  body.menu-open .site-nav { display: flex; }
  .site-nav a {
    grid-template-columns: auto 1fr;
    justify-items: start;
    padding: .9rem;
    white-space: normal;
  }
}
@media (max-width: 1100px) {
  .hero-canvas { display: none; }
}
@media (max-width: 820px) {
  .page-hero,
  .split-section,
  .event-block,
  .page-sigil,
  .site-footer {
    grid-template-columns: 1fr;
  }
  .page-hero { min-height: auto; }
  .hero-canvas { display: none; }
  .hero-copy {
    width: min(var(--max), calc(100% - 32px));
    padding: 8rem 0 3rem;
  }
  h1 { font-size: clamp(3rem, 17vw, 5rem); }
  .signature-board,
  .article-shell,
  .reach-lab,
  .motto-banner,
  .impact-portal {
    grid-template-columns: 1fr;
  }
  .motto-lines {
    display: none;
  }
  .donation-metrics,
  .giving-grid,
  .campus-grid,
  .chapter-admissions-note {
    grid-template-columns: 1fr;
  }
  .donation-visual {
    min-height: 420px;
  }
  .chapter-network,
  .donation-portal,
  .motto-banner {
    border-radius: 30px 8px 30px 8px;
  }
  .mind-map {
    grid-template-columns: 1fr;
    grid-template-areas:
      "core"
      "one"
      "two"
      "three"
      "four";
    gap: .85rem;
    min-height: auto;
    border-radius: 28px;
  }
  .mind-core {
    min-height: 220px;
  }
  .mind-node {
    min-height: auto;
  }
  .impact-portal {
    clip-path: none;
  }
  .portal-gallery {
    min-height: 760px;
  }
  .portal-gallery img {
    width: min(86%, 420px);
  }
  .signature-mosaic {
    grid-template-columns: 1fr;
    grid-auto-rows: 210px;
  }
  .signature-mosaic img:first-child { grid-row: auto; }
  .article-aside { position: static; }
  .page-sigil {
    border-radius: 24px 8px 24px 8px;
  }
  .sigil-pills {
    justify-content: flex-start;
  }
  .service-constellation {
    min-height: auto;
  }
  .service-constellation::before,
  .service-constellation::after {
    display: none;
  }
  .stat-band,
  .three-up,
  .team-grid,
  .role-grid,
  .donate-grid,
  .link-card-grid,
  .blog-grid,
  .blog-grid.featured,
  .blog-grid.compact-list {
    grid-template-columns: 1fr;
  }
  .stat-band { margin-top: 0; }
  .link-card,
  .blog-card { min-height: 330px; }
  .event-photos { grid-template-columns: 1fr; }
  .doc-card-grid { grid-template-columns: 1fr; }
  .pdf-frame { min-height: 560px; }
  .newsletter-form div { grid-template-columns: 1fr; }
  .signature-board::after,
  .mind-map::before,
  .mind-map::after,
  .impact-portal::before {
    animation: none;
  }
}
@media (max-width: 520px) {
  .content-section,
  .split-section,
  .events-list,
  .stat-band,
  .reach-lab,
  .article-shell {
    width: min(var(--max), calc(100% - 28px));
  }
  .content-section {
    padding: 3rem 0;
  }
  .split-section {
    padding: 3rem 0;
  }
  .hero-copy {
    width: min(var(--max), calc(100% - 28px));
  }
  .motto-banner,
  .donation-portal,
  .giving-grid,
  .chapter-network {
    width: min(var(--max), calc(100% - 28px));
  }
  .donation-visual {
    display: grid;
    gap: .85rem;
    min-height: auto;
  }
  .donation-visual img {
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    transform: none !important;
  }
  .giving-card {
    min-height: 210px;
  }
  .page-sigil {
    width: min(var(--max), calc(100% - 28px));
    padding: 1rem;
  }
  .sigil-orb {
    width: 82px;
  }
  .reach-popup-panel {
    width: calc(100vw - 28px);
    min-height: 360px;
    padding: 1.5rem;
  }
  .reach-popup-panel h2 {
    font-size: clamp(2.2rem, 14vw, 3.5rem);
  }
  .reach-chat {
    right: 14px;
    bottom: 14px;
  }
  .reach-chat-toggle {
    width: 64px;
    height: 64px;
  }
  .reach-chat-window {
    width: calc(100vw - 28px);
  }
  .reach-chat-form {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
`);

fs.writeFileSync(path.join(outDir, "script.js"), `const body = document.body;
const menu = document.querySelector(".menu-toggle");
const toast = document.querySelector(".toast");
let timer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}
menu?.addEventListener("click", () => {
  const open = body.classList.toggle("menu-open");
  menu.setAttribute("aria-expanded", String(open));
});
document.querySelector(".site-nav")?.addEventListener("click", () => {
  body.classList.remove("menu-open");
  menu?.setAttribute("aria-expanded", "false");
});
const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".hero-canvas").forEach((canvas) => {
  const ctx = canvas.getContext("2d");
  const lowPower = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 6) || (navigator.deviceMemory && navigator.deviceMemory < 6);
  if (!ctx || !motionOK || lowPower || window.matchMedia("(max-width: 1100px)").matches) return;
  let width = 0;
  let height = 0;
  let points = [];
  let active = true;
  let frameId = 0;
  let lastFrame = 0;
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = width < 1200 ? 12 : 18;
    points = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .18,
      r: 1.2 + Math.random() * 2.2,
      phase: index * .21
    }));
  }
  function draw(time) {
    if (!active) return;
    if (time - lastFrame < 50) {
      frameId = requestAnimationFrame(draw);
      return;
    }
    lastFrame = time;
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createRadialGradient(width * .72, height * .22, 0, width * .72, height * .22, Math.max(width, height) * .72);
    gradient.addColorStop(0, "rgba(233,239,227,.18)");
    gradient.addColorStop(.48, "rgba(86,107,63,.09)");
    gradient.addColorStop(1, "rgba(5,7,5,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    for (const point of points) {
      point.x += point.vx + Math.sin(time * .00045 + point.phase) * .08;
      point.y += point.vy + Math.cos(time * .00038 + point.phase) * .06;
      if (point.x < -20) point.x = width + 20;
      if (point.x > width + 20) point.x = -20;
      if (point.y < -20) point.y = height + 20;
      if (point.y > height + 20) point.y = -20;
    }
    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j += 1) {
        const b = points[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 96) {
          ctx.strokeStyle = "rgba(233,239,227," + ((96 - distance) / 96 * .1).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    points.forEach((point, index) => {
      ctx.fillStyle = index % 4 === 0 ? "rgba(233,239,227,.72)" : "rgba(125,157,93,.58)";
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      ctx.fill();
    });
    frameId = requestAnimationFrame(draw);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active && !frameId) frameId = requestAnimationFrame(draw);
      if (!active && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    }, { threshold: .05 });
    observer.observe(canvas);
  }
  document.addEventListener("visibilitychange", () => {
    active = document.visibilityState === "visible";
    if (active && !frameId) frameId = requestAnimationFrame(draw);
    if (!active && frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  });
  frameId = requestAnimationFrame(draw);
});
const reachChat = document.querySelector(".reach-chat");
const reachToggle = document.querySelector(".reach-chat-toggle");
const reachWindow = document.querySelector(".reach-chat-window");
const reachClose = document.querySelector(".reach-chat-close");
const reachPopupClose = document.querySelector(".reach-popup-close");
const reachPopupOpen = document.querySelector(".reach-popup-open");
const reachMessages = document.querySelector(".reach-chat-messages");
const reachForm = document.querySelector(".reach-chat-form");
const reachScriptSource = document.currentScript?.getAttribute("src") || "script.js";
const reachSitePrefix = reachScriptSource.includes("script.js") ? reachScriptSource.split("script.js")[0] : "";
function reachSiteLink(path, label) {
  return '<a href="' + reachSitePrefix + path + '">' + label + '</a>';
}
function reachExternalLink(url, label) {
  return '<a href="' + url + '" target="_blank" rel="noopener">' + label + '</a>';
}
function dismissReachPopup() {
  reachChat?.classList.add("popup-dismissed");
  try {
    sessionStorage.setItem("reachPopupDismissed", "true");
  } catch {}
}
try {
  if (sessionStorage.getItem("reachPopupDismissed") === "true") {
    reachChat?.classList.add("popup-dismissed");
  }
} catch {}
function reachAnswer(question) {
  const q = question.toLowerCase();
  if (q.includes("988") || q.includes("crisis") || q.includes("suicide") || q.includes("emergency") || q.includes("danger")) {
    return "If this is urgent or someone may be in danger, call or text 988 right now. Use " + reachExternalLink("https://988lifeline.org", "the 988 Lifeline") + " for immediate crisis support. You can also open " + reachSiteLink("get-help/index.html#support-and-resources-available", "Get Help") + " for ReachEquilibria support information.";
  }
  if (q.includes("chapter resource") || q.includes("google drive") || q.includes("brand") || q.includes("logo") || q.includes("rules") || q.includes("packet")) {
    return "For chapter resources, open the " + reachSiteLink("chapters/index.html#chapter-google-drive", "Chapter Google Drive section") + " or the " + reachSiteLink("create-a-chapter/index.html#chapter-resources-pack", "Chapter Resources Pack") + ". The packet PDF is also here: " + reachSiteLink("assets/docs/req-chapter-resources-pack-v1.pdf", "REQ Chapter Resources Pack v1.0") + ".";
  }
  if (q.includes("start") && q.includes("chapter") || q.includes("create a chapter") || q.includes("president") || q.includes("advisor") || q.includes("officer")) {
    return "To create a chapter, start with " + reachSiteLink("create-a-chapter/index.html#chapter-resources-pack", "Create a Chapter") + ". A chapter needs a president, officers, advisor or adult support contact, members, a first meeting plan, and National approval. The " + reachSiteLink("create-a-chapter/index.html#chapter-launch-checklist", "launch checklist") + " is the fastest place to begin.";
  }
  if (q.includes("chapter") || q.includes("school") || q.includes("coppell") || q.includes("a&m") || q.includes("ut austin") || q.includes("college application")) {
    return "ReachEquilibria currently lists 3 chapters: Coppell High School, Texas A&M, and UT Austin. See the " + reachSiteLink("chapters/index.html#chapter-network", "Chapter Network") + " and the note about chapter leadership, Top 20 school acceptances, service, leadership, and college applications.";
  }
  if (q.includes("volunteer") || q.includes("intern") || q.includes("pvsa") || q.includes("join") || q.includes("apply")) {
    return "You can get involved through volunteering opportunities and internships. Current areas include Website Development, Resource Articles, Outreach/Event Set Up, and Social Media. Open " + reachSiteLink("volunteering-opportunities/index.html#internship-opportunities", "Internship Opportunities") + " or " + reachSiteLink("chapters/index.html#chapter-pathways", "Chapter Pathways") + ".";
  }
  if (q.includes("donate") || q.includes("money") || q.includes("zelle") || q.includes("paypal") || q.includes("give")) {
    return "You can donate through PayPal or Zelle. Zelle is REQ@ReachEquilibria.org. Open " + reachSiteLink("donate/index.html#ways-to-give", "Ways to Give") + " or " + reachSiteLink("donate/index.html#donations", "the donation overview") + ".";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("verify")) {
    return "You can contact ReachEquilibria at contact@reachequilibria.org. For leadership verification, the site says to email verify@reachequilibria.org. Open " + reachSiteLink("contact-us/index.html#contact-us-now", "Contact Us Now") + " or " + reachSiteLink("about/index.html#meet-the-team", "Meet The Team") + ".";
  }
  if (q.includes("event") || q.includes("impact") || q.includes("gallery") || q.includes("photo") || q.includes("past")) {
    return "The Impact and Gallery pages show past ReachEquilibria events, including Heritage Night, bake sales, tournaments, art events, music events, donation drives, and service projects. Open " + reachSiteLink("impact/index.html#impact-photos", "Impact Photos") + " or " + reachSiteLink("gallery/index.html#our-past-events", "Gallery") + ".";
  }
  if (q.includes("blog") || q.includes("article") || q.includes("mindfulness") || q.includes("therapy") || q.includes("self-care") || q.includes("self care")) {
    return "ReachEquilibria blogs and mental wellness articles are openable from " + reachSiteLink("blogs/index.html#blogs", "Blogs") + ". You can also start with " + reachSiteLink("mental-wellness-articles/index.html#blog-photos", "Blog Photos") + " or the " + reachSiteLink("blogs/mental-health-awareness-services/index.html", "Mental Health Awareness Services article") + ".";
  }
  if (q.includes("resource") || q.includes("mental") || q.includes("help") || q.includes("support")) {
    return "The Learn and Get Help pages include mental health awareness services, 988 information, contact options, and ReachEquilibria support language. Open " + reachSiteLink("resources/index.html#find-support", "Find Support") + " or " + reachSiteLink("get-help/index.html#support-and-resources-available", "Support and Resources Available") + ".";
  }
  if (q.includes("team") || q.includes("founder") || q.includes("satyam") || q.includes("gabriel") || q.includes("trinity")) {
    return "For leadership and founder information, open " + reachSiteLink("about/index.html#meet-the-team", "Meet The Team") + ", " + reachSiteLink("satyam-sood/index.html", "the full team page") + ", or " + reachSiteLink("our-story/index.html", "Our Story") + ".";
  }
  if (q.includes("constitution") || q.includes("501") || q.includes("ein") || q.includes("mission") || q.includes("rules")) {
    return "Reach Equilibria is listed as a 501(c)(3) non-profit organization with EIN 99-3505959. Open " + reachSiteLink("constitution/index.html#organizational-identity", "Organizational Identity") + " or " + reachSiteLink("assets/docs/reachequilibria-constitution-v1.pdf", "the Constitution PDF") + ".";
  }
  if (q.includes("motto") || q.includes("stability")) {
    return "The motto is Reaching Stability Together. You can jump to the motto design on the home page here: " + reachSiteLink("index.html#motto", "Our Motto") + ".";
  }
  return "I can help with " + reachSiteLink("volunteering-opportunities/index.html", "volunteering") + ", " + reachSiteLink("create-a-chapter/index.html", "starting a chapter") + ", " + reachSiteLink("donate/index.html", "donations") + ", " + reachSiteLink("resources/index.html", "resources") + ", " + reachSiteLink("impact/index.html", "events") + ", " + reachSiteLink("contact-us/index.html", "contact information") + ", or " + reachExternalLink("https://988lifeline.org", "988 support") + ". Ask me for the exact thing you need and I’ll point you there.";
}
function addReachMessage(text, type, allowHtml = false) {
  if (!reachMessages) return;
  const message = document.createElement("p");
  message.className = "reach-message " + type;
  if (allowHtml) {
    message.innerHTML = text;
  } else {
    message.textContent = text;
  }
  reachMessages.appendChild(message);
  reachMessages.scrollTop = reachMessages.scrollHeight;
}
function setReachOpen(open) {
  if (!reachChat || !reachToggle) return;
  reachChat.classList.toggle("is-open", open);
  reachChat.classList.add("dismissed");
  dismissReachPopup();
  reachToggle.setAttribute("aria-expanded", String(open));
  reachWindow?.setAttribute("aria-hidden", String(!open));
  const input = reachChat.querySelector("input");
  if (open && input) input.focus();
}
reachToggle?.addEventListener("click", () => setReachOpen(!reachChat.classList.contains("is-open")));
reachClose?.addEventListener("click", () => setReachOpen(false));
reachPopupClose?.addEventListener("click", dismissReachPopup);
reachPopupOpen?.addEventListener("click", () => setReachOpen(true));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  dismissReachPopup();
  setReachOpen(false);
});
reachForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = reachForm.querySelector("input");
  const question = input ? input.value.trim() : "";
  if (!question) return;
  addReachMessage(question, "user");
  if (input) input.value = "";
  setTimeout(() => addReachMessage(reachAnswer(question), "bot", true), 180);
});
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showToast("REQ@ReachEquilibria.org");
    } catch {
      showToast(value);
    }
  });
});
document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = encodeURIComponent(String(data.get("message") || ""));
    const email = encodeURIComponent(String(data.get("email") || ""));
    window.location.href = "mailto:contact@reachequilibria.org?subject=Contact%20Us%20Now&body=" + message + "%0A%0A" + email;
  });
});
document.querySelectorAll(".newsletter-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = encodeURIComponent(new FormData(form).get("email") || "");
    window.location.href = "mailto:contact@reachequilibria.org?subject=Sign%20up%20for%20our%20Newsletter&body=" + email;
  });
});
`);

console.log(`Built ${pages.length} pages in ${outDir}`);
