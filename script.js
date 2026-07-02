document.getElementById("year").textContent = new Date().getFullYear();

const track = document.getElementById("track");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const scrollHint = document.querySelector(".scroll-hint");
const scrollPrev = document.getElementById("scroll-prev");
const scrollNext = document.getElementById("scroll-next");
const panels = [...document.querySelectorAll(".panel")];
const navLinks = [...document.querySelectorAll(".nav-links a")];
const panelDots = [...document.querySelectorAll(".panel-dot")];

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

function closeMobileNav() {
  nav.classList.remove("nav-open");
  toggle.setAttribute("aria-expanded", "false");
}

document.querySelectorAll(".nav-links a, .panel-dot, .nav-logo, .nav-cta").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

track.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }
  },
  { passive: false }
);

function getActiveIndex() {
  const center = track.scrollLeft + track.clientWidth / 2;
  let activeIndex = 0;

  panels.forEach((panel, index) => {
    const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
    if (center >= panelCenter - panel.offsetWidth / 2) {
      activeIndex = index;
    }
  });

  return activeIndex;
}

function scrollToPanel(index) {
  const panel = panels[index];
  if (!panel) return;

  panel.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
}

scrollPrev.addEventListener("click", () => {
  scrollToPanel(getActiveIndex() - 1);
});

scrollNext.addEventListener("click", () => {
  scrollToPanel(getActiveIndex() + 1);
});

let hintHidden = false;
track.addEventListener("scroll", () => {
  if (!hintHidden && track.scrollLeft > 40) {
    scrollHint.classList.add("hidden");
    hintHidden = true;
  }
  updateActiveSection();
});

function updateActiveSection() {
  const activeIndex = getActiveIndex();

  navLinks.forEach((link, index) => {
    link.classList.toggle("active", index === activeIndex);
  });

  panelDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });

  scrollPrev.disabled = activeIndex === 0;
  scrollNext.disabled = activeIndex === panels.length - 1;
}

updateActiveSection();