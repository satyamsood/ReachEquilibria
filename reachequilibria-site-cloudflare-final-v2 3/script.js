const body = document.body;
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
const reachChapterDrive = "https://drive.google.com/drive/folders/1v3mGhQh0-XRE9vzAiHc308ZjZuxhuEwA?usp=sharing";
const reachVolunteerForm = "https://forms.gle/ix5mq84cGSknx5q57";
const reachEventLinks = [
  { terms: ["heritage", "culture", "cultural", "night"], label: "Heritage Night", path: "impact/index.html#heritage-night" },
  { terms: ["bake", "bakesale", "bake sale", "brownie", "cookie", "hot chocolate", "farmers market"], label: "Farmers Market Bake Sales", path: "impact/index.html#3rd-coppell-farmers-market-bakesale" },
  { terms: ["november", "knockout", "basketball", "tournament"], label: "November Knockout", path: "impact/index.html#november-knockout" },
  { terms: ["paint", "paint it out", "art event", "watercolor", "therapy"], label: "Paint it Out Art Event", path: "impact/index.html#paint-it-out-art-event" },
  { terms: ["heart", "craft", "love care", "mural"], label: "Art & Heart Craft Fair", path: "impact/index.html#art-and-heart-craft-fair" },
  { terms: ["carnival", "st ann", "encouragement"], label: "St Ann's Carnival Booth", path: "impact/index.html#st-ann-s-carnival-booth" },
  { terms: ["music", "play it forward", "brazos", "instrument", "guitar", "trumpet", "tuba"], label: "Play It Forward Music Fair", path: "impact/index.html#play-it-forward-music-fair" },
  { terms: ["ribbon", "chamber", "coppell chamber"], label: "Reach Equilibria - Ribbon Cutting", path: "impact/index.html#reach-equilibria-ribbon-cutting" },
  { terms: ["mental health fair", "defensive line", "bracelet", "lanyard", "keychain"], label: "Coppell High School's Mental Health Fair", path: "impact/index.html#coppell-high-school-s-mental-health-fair" },
  { terms: ["grant", "halliburton", "hope"], label: "Grant Halliburton Foundation Visit", path: "impact/index.html#grant-halliburton-foundation-visit" },
  { terms: ["ourcalling", "homeless", "shelter", "shower", "laundry"], label: "OurCalling Homeless Ministry", path: "impact/index.html#ourcalling-homeless-ministry" },
  { terms: ["clothing", "winter", "donation drive"], label: "Winter Clothing Donation Drive", path: "impact/index.html#winter-clothing-donation-drive" },
  { terms: ["dental", "toothbrush", "toothpaste", "kit"], label: "Dental Kit Creation", path: "impact/index.html#dental-kit-creation" },
  { terms: ["food", "chipotle", "panda", "bj"], label: "Food Fundraisers", path: "impact/index.html#food-fundraisers" },
  { terms: ["chess"], label: "Coppell Chess Tournament", path: "impact/index.html#coppell-chess-tournament" },
];
function reachHas(q, terms) {
  return terms.some((term) => {
    const value = term.toLowerCase();
    if (/^[a-z0-9]+$/.test(value)) {
      return new RegExp("\\b" + value + "\\b").test(q);
    }
    return q.includes(value);
  });
}
function reachLinks(items) {
  return items.map((item) => reachSiteLink(item[0], item[1])).join(", ");
}
function reachAnswer(question) {
  const q = question.toLowerCase().replace(/[^a-z0-9@&+.'\s-]/g, " ").replace(/\s+/g, " ").trim();
  if (reachHas(q, ["hi", "hello", "hey", "yo", "what can you do", "help me"])) {
    return "Hi, I’m Reach. I can point you to chapters, donations, volunteering, mental health resources, blogs, team/founder info, the Constitution, chapter documents, or exact event photos. Try asking: who founded ReachEquilibria, how do I start a chapter, where do I donate, or show me OurCalling photos.";
  }
  if (reachHas(q, ["988", "crisis", "suicide", "emergency", "danger", "hurt myself", "self harm", "kill myself"])) {
    return "If this is urgent or someone may be in danger, call or text 988 right now. Use " + reachExternalLink("https://988lifeline.org", "the 988 Lifeline") + " for immediate crisis support. You can also open " + reachSiteLink("get-help/index.html#support-and-resources-available", "Get Help") + " for ReachEquilibria support information.";
  }
  if (reachHas(q, ["who are you", "chatbot", "reach bot", "assistant", "your name"])) {
    return "I’m Reach, the ReachEquilibria site assistant. I help visitors move around the website, find resources, learn about the founders, open event photos, get chapter documents, and contact the organization.";
  }
  if (reachHas(q, ["founded", "founder", "satyam", "accomplishment", "accomplishments", "gabriel", "ceo", "cofounder", "co-founder", "shivam", "brother", "story", "youngest"])) {
    return "Satyam Sood is a founder and CEO of ReachEquilibria. He founded ReachEquilibria near the end of his sophomore year in memory and dedication to Shivam Sood, after losing Shivam due to suicide. The site lists major accomplishments connected to Satyam and ReachEquilibria, including founding and leading a 501(c)(3) nonprofit as a high schooler, being the youngest to ever found and own a nonprofit in Coppell history, helping raise $25,000+, building chapters at Coppell High School, Texas A&M, and UT Austin, organizing many community events, and expanding student-led mental health awareness. Gabriel Wang is the COO and CoFounder. Open " + reachLinks([["our-story/index.html", "Our Story"], ["about/index.html#meet-the-team", "Meet The Team"], ["satyam-sood/index.html", "Full Team Page"], ["impact/index.html#impact-photos", "Our Past Events"]]) + ".";
  }
  if (reachHas(q, ["what is reach", "what is reachequilibria", "mission", "purpose", "vision", "who are we", "what do you do"])) {
    return "ReachEquilibria is a student-created and youth-led mental health nonprofit. Its mission is to spread resources that help those who need them, increase inclusivity in communities, and advocate for mental health and suicide awareness. Start at " + reachSiteLink("index.html#our-mission", "Our Mission") + " or " + reachSiteLink("constitution/index.html#organizational-identity", "Organizational Identity") + ".";
  }
  if (reachHas(q, ["chapter resource", "google drive", "drive", "brand", "logo", "rules", "packet", "resources pack", "chapter documents"])) {
    return "For chapter resources, open the " + reachExternalLink(reachChapterDrive, "Chapter Google Drive") + ", the " + reachSiteLink("chapters/index.html#chapter-google-drive", "Chapter Google Drive section") + ", or the " + reachSiteLink("create-a-chapter/index.html#chapter-resources-pack", "Chapter Resources Pack") + ". The packet PDF is here: " + reachSiteLink("assets/docs/req-chapter-resources-pack-v1.pdf", "REQ Chapter Resources Pack v1.0") + ".";
  }
  if ((q.includes("start") && q.includes("chapter")) || reachHas(q, ["create a chapter", "launch chapter", "chapter president", "advisor", "officer role", "monthly report", "first meeting"])) {
    return "To create a chapter, start with " + reachSiteLink("create-a-chapter/index.html#chapter-resources-pack", "Create a Chapter") + ". A chapter needs a president, officers, advisor or adult support contact, members, a first meeting plan, and National approval. Use the " + reachSiteLink("create-a-chapter/index.html#chapter-launch-checklist", "Chapter Launch Checklist") + ", " + reachSiteLink("create-a-chapter/index.html#first-30-days-plan", "First 30 Days Plan") + ", and " + reachSiteLink("create-a-chapter/index.html#officer-role-cards", "Officer Role Cards") + ".";
  }
  if (reachHas(q, ["chapter", "chapters", "school", "coppell", "texas a&m", "a&m", "ut austin", "college application", "top 20", "accepted"])) {
    return "ReachEquilibria currently lists 3 chapters: Coppell High School, Texas A&M, and UT Austin. The chapter page also notes that officers and presidents of chapters have been accepted into multiple Top 20 schools in the US, and that chapter leadership can show initiative, service, leadership, and community impact. Open " + reachSiteLink("chapters/index.html#chapter-network", "Chapter Network") + ".";
  }
  if (reachHas(q, ["volunteer", "intern", "pvsa", "join", "apply", "service hours", "opportunity", "opportunities"])) {
    return "You can get involved through volunteering opportunities and internships. Current areas include Website Development, Resource Articles, Outreach/Event Set Up, and Social Media. Open " + reachSiteLink("volunteering-opportunities/index.html#internship-opportunities", "Internship Opportunities") + ", " + reachSiteLink("volunteering-opportunities/index.html#volunteering-opportunities", "Volunteering Opportunities") + ", or " + reachExternalLink(reachVolunteerForm, "Apply Now") + ".";
  }
  if (reachHas(q, ["donate", "donation", "money", "zelle", "paypal", "give", "raised", "fundraising"])) {
    return "ReachEquilibria lists $25,000+ raised. You can donate through PayPal or Zelle. Zelle is REQ@ReachEquilibria.org. Open " + reachSiteLink("donate/index.html#ways-to-give", "Ways to Give") + " or " + reachSiteLink("donate/index.html#donation-links", "Donation Links") + ".";
  }
  if (reachHas(q, ["contact", "email", "phone", "verify", "leadership verification", "call", "number"])) {
    return "You can contact ReachEquilibria at contact@reachequilibria.org or 469-837-9294. For leadership verification, email verify@reachequilibria.org. Open " + reachSiteLink("contact-us/index.html#contact-us-now", "Contact Us Now") + " or " + reachSiteLink("about/index.html#meet-the-team", "Meet The Team") + ".";
  }
  const matchedEvent = reachEventLinks.find((event) => reachHas(q, event.terms));
  if (matchedEvent) {
    return "That sounds like " + matchedEvent.label + ". Open " + reachSiteLink(matchedEvent.path, matchedEvent.label) + " for the event details and photos, or browse " + reachSiteLink("gallery/index.html#our-past-events", "the full Gallery") + ".";
  }
  if (reachHas(q, ["event", "impact", "gallery", "photo", "picture", "past", "photos", "show me"])) {
    return "The Impact and Gallery pages show past ReachEquilibria events, including Heritage Night, bake sales, tournaments, art events, music events, donation drives, and service projects. Open " + reachSiteLink("impact/index.html#impact-photos", "Impact Photos") + " or " + reachSiteLink("gallery/index.html#our-past-events", "Gallery") + ". You can also ask for a specific event like OurCalling, Grant Halliburton, Heritage Night, Dental Kit Creation, or Paint it Out.";
  }
  if (reachHas(q, ["blog", "article", "mindfulness", "therapy", "self-care", "self care", "read", "writing"])) {
    return "ReachEquilibria blogs and mental wellness articles are openable from " + reachSiteLink("blogs/index.html#blogs", "Blogs") + ". You can also start with " + reachSiteLink("mental-wellness-articles/index.html#blog-photos", "Blog Photos") + " or the " + reachSiteLink("blogs/mental-health-awareness-services/index.html", "Mental Health Awareness Services article") + ".";
  }
  if (reachHas(q, ["resource", "mental", "help", "support", "awareness", "wellness", "sad", "anxious", "depressed"])) {
    return "The Learn and Get Help pages include mental health awareness services, 988 information, contact options, and ReachEquilibria support language. Open " + reachSiteLink("resources/index.html#find-support", "Find Support") + ", " + reachSiteLink("get-help/index.html#support-and-resources-available", "Support and Resources Available") + ", or " + reachExternalLink("https://988lifeline.org", "988 support") + ".";
  }
  if (reachHas(q, ["team", "trinity", "dhanushi", "johan", "fay", "daniel", "immanuel", "liam", "service director", "officer", "director"])) {
    return "For leadership and team information, open " + reachSiteLink("about/index.html#meet-the-team", "Meet The Team") + " or " + reachSiteLink("satyam-sood/index.html", "the full team page") + ". Liam Li is listed as Service Director. For verification, email verify@reachequilibria.org.";
  }
  if (reachHas(q, ["constitution", "501", "501c3", "ein", "nonprofit", "non-profit", "tax", "official", "values"])) {
    return "Reach Equilibria is listed as a 501(c)(3) non-profit organization with EIN 99-3505959. The Constitution includes the mission, vision, values, founding principle, and chapter rules. Open " + reachSiteLink("constitution/index.html#organizational-identity", "Organizational Identity") + " or " + reachSiteLink("assets/docs/reachequilibria-constitution-v1.pdf", "the Constitution PDF") + ".";
  }
  if (reachHas(q, ["motto", "stability", "reaching stability together"])) {
    return "The motto is Reaching Stability Together. You can jump to the motto design on the home page here: " + reachSiteLink("index.html#motto", "Our Motto") + ".";
  }
  if (reachHas(q, ["home", "homepage", "main page", "tabs", "navigation", "menu", "where"])) {
    return "Here are the main places people usually need: " + reachLinks([["index.html", "Home"], ["about/index.html", "About"], ["resources/index.html", "Resources"], ["get-help/index.html", "Get Help"], ["impact/index.html", "Impact"], ["volunteering-opportunities/index.html", "Volunteer"], ["chapters/index.html", "Chapters"], ["donate/index.html", "Donate"]]) + ".";
  }
  if (reachHas(q, ["thank", "thanks", "appreciate"])) {
    return "Of course. Ask me for a page, event, resource, founder fact, chapter tool, or donation link and I’ll route you there.";
  }
  return "I can help with " + reachSiteLink("volunteering-opportunities/index.html", "volunteering") + ", " + reachSiteLink("create-a-chapter/index.html", "starting a chapter") + ", " + reachSiteLink("donate/index.html", "donations") + ", " + reachSiteLink("resources/index.html", "resources") + ", " + reachSiteLink("impact/index.html", "events") + ", " + reachSiteLink("contact-us/index.html", "contact information") + ", founder/team facts, or " + reachExternalLink("https://988lifeline.org", "988 support") + ". Ask me the exact thing you need, like: Who founded ReachEquilibria? Where are chapter resources? Show me dental kit photos.";
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
document.querySelectorAll(".secure-donation-card").forEach((card) => {
  const amountInput = card.querySelector(".custom-amount input");
  card.querySelectorAll("[data-donation-amount]").forEach((button) => {
    button.addEventListener("click", () => {
      card.querySelectorAll("[data-donation-amount]").forEach((option) => option.classList.remove("is-active"));
      button.classList.add("is-active");
      if (amountInput) amountInput.value = button.getAttribute("data-donation-amount") || "";
    });
  });
  card.querySelectorAll(".donation-frequency button").forEach((button) => {
    button.addEventListener("click", () => {
      card.querySelectorAll(".donation-frequency button").forEach((option) => option.classList.remove("is-active"));
      button.classList.add("is-active");
    });
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
    const data = new FormData(form);
    const firstName = encodeURIComponent(data.get("firstName") || "");
    const lastName = encodeURIComponent(data.get("lastName") || "");
    const email = encodeURIComponent(data.get("email") || "");
    window.location.href = "mailto:contact@reachequilibria.org?subject=Sign%20up%20for%20our%20Newsletter&body=First%20name%3A%20" + firstName + "%0ALast%20name%3A%20" + lastName + "%0AEmail%3A%20" + email;
  });
});
const cookieBanner = document.querySelector(".cookie-banner");
const cookieAccept = document.querySelector(".cookie-accept");
try {
  if (localStorage.getItem("reqCookiesAccepted") === "yes") {
    cookieBanner?.classList.add("is-hidden");
  }
} catch {}
cookieAccept?.addEventListener("click", () => {
  try {
    localStorage.setItem("reqCookiesAccepted", "yes");
  } catch {}
  cookieBanner?.classList.add("is-hidden");
});
