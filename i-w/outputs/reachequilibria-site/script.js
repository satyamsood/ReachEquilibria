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
