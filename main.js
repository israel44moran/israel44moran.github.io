/* ============================================================
   Portafolio · Israel Moran Rivera
   Scroll reveals + smooth-scroll mejorado.
   Vanilla JS, sin dependencias.
============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // Scroll reveal con IntersectionObserver
  // ----------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fallback: si no hay IntersectionObserver, mostrar todo.
    reveals.forEach((el) => el.classList.add('is-visible'));
  }


  // ----------------------------------------------------------
  // Smooth scroll con offset para la barra sticky
  // ----------------------------------------------------------
  const navHeight = 64;
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      // Actualiza el hash sin saltar
      history.pushState(null, '', id);
    });
  });


  // ----------------------------------------------------------
  // Active nav link al hacer scroll
  // ----------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    let current = '';
    const scrollY = window.pageYOffset + navHeight + 80;

    sections.forEach((s) => {
      if (s.offsetTop <= scrollY) current = s.id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').slice(1);
      if (href === current) {
        link.style.color = 'var(--cream)';
      } else {
        link.style.color = '';
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });


  // ----------------------------------------------------------
  // Año dinámico en footer (si existe el data-year)
  // ----------------------------------------------------------
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
