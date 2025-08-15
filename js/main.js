// =========================
// Fade-in on scroll
// =========================
const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);
faders.forEach((fade) => appearOnScroll.observe(fade));
// =========================
// Active menu highlight
// =========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
// =========================
// Animasi skill cards
// =========================
const skillCards = document.querySelectorAll(".skill-card");
function checkSkillsVisible() {
  skillCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add("show");
    }
  });
}
window.addEventListener("scroll", checkSkillsVisible);
checkSkillsVisible(); // panggil pertama kali
// =========================
// Animasi About Section
// =========================
const aboutSections = document.querySelectorAll(".about-image, .about-text");
function animateAbout() {
  aboutSections.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", animateAbout);
animateAbout();
// =========================
// Typing effect (aman dari null)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typing");
  const target = document.getElementById("business-experience");
  // Jika elemen 'typing' tidak ada, jangan jalankan efek
  if (!el) return;
  const text = el.getAttribute("data-text") || "";
  let typingTimer;
  function typeEffect() {
    el.textContent = "";
    let i = 0;
    function type() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        typingTimer = setTimeout(type, 23);
      }
    }
    type();
  }
  // Hanya buat observer jika target ada
  if ("IntersectionObserver" in window && target) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(typingTimer);
            typeEffect();
          } else {
            clearTimeout(typingTimer);
            el.textContent = "";
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(target);
  } else {
    // Fallback: kalau IntersectionObserver/target tidak ada, langsung tampilkan teks
    el.textContent = text;
  }
});

// Efek 3D Tilt
document.querySelectorAll(".portfolio").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // posisi X mouse
    const y = e.clientY - rect.top; // posisi Y mouse
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10 derajat
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});
