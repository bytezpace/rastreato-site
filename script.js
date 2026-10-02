const WA_NUMBER = "5538999497070";

// WhatsApp links with a prefilled message per button
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(el.dataset.wa)}`;
  el.target = "_blank";
  el.rel = "noopener";
});

// Demo notice
document.getElementById("demoClose").addEventListener("click", () =>
  document.getElementById("demoBanner").remove()
);

// Mobile menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Header border on scroll
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Videos load only when near the viewport and pause when off-screen
const videoObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else if (v.src) {
        v.pause();
      }
    }),
  { rootMargin: "200px" }
);
document.querySelectorAll(".lazy-video").forEach((v) => videoObserver.observe(v));

// Animated counters
const countObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      countObserver.unobserve(target);
      const end = +target.dataset.count;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1200, 1);
        target.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }),
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

// YouTube embed loads only on click
document.getElementById("ytPoster").addEventListener("click", function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube-nocookie.com/embed/qdp-PBbxga0?autoplay=1&rel=0";
  iframe.title = "Rastreato - Videotelemetria";
  iframe.allow = "autoplay; encrypted-media; picture-in-picture";
  iframe.allowFullscreen = true;
  this.replaceWith(iframe);
});

document.getElementById("year").textContent = new Date().getFullYear();
