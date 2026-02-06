document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("preload");

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".menu-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((btn) => btn.classList.remove("active"));
      filter.classList.add("active");
      const category = filter.dataset.filter;

      cards.forEach((card) => {
        const matches = category === "all" || card.dataset.category === category;
        card.style.display = matches ? "flex" : "none";
      });
    });
  });

  const parallax = document.querySelector(".parallax");
  if (parallax) {
    const onScroll = () => {
      const rect = parallax.getBoundingClientRect();
      const offset = rect.top * -0.08;
      parallax.style.transform = `translateY(${offset}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const form = document.getElementById("reservation-form");
  const formNote = document.querySelector(".form-note");
  const formSuccess = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formNote.textContent = "";

      if (!form.checkValidity()) {
        formNote.textContent = "Please complete all fields to confirm your reservation.";
        return;
      }

      formSuccess.classList.add("show");
      formSuccess.setAttribute("aria-hidden", "false");
      form.reset();
      formNote.textContent = "We'll confirm your reservation by email shortly.";

      setTimeout(() => {
        formSuccess.classList.remove("show");
        formSuccess.setAttribute("aria-hidden", "true");
      }, 4000);
    });
  }
});
