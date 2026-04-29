// ===== Tectum V2 — Interactive Scripts =====

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Scroll Reveal (IntersectionObserver) ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => revealObs.observe(el));


  // ── 2. Navbar Scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  // ── 3. Mobile Menu ──
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }


  // ── 4. FAQ Accordion ──
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-trigger').addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });


  // ── 5. Smooth Anchor Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 16 : 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });


  // ── 6. Animated Counters ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2200;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = prefix + Math.round(eased * target).toLocaleString('pt-BR') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });
  counters.forEach(el => counterObs.observe(el));


  // ── 7. Spotlight Card Effect (React Bits-inspired) ──
  document.querySelectorAll('.bento-card').forEach(card => {
    const spotlight = card.querySelector('.spotlight');
    if (!spotlight) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(27,94,59,0.12), transparent 70%)`;
    });
  });


  // ── 8. Magnetic Button Effect ──
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });


  // ── 9. Lead Form Feedback ──
  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      if (email && email.value) {
        btn.innerHTML = '<svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Enviado!';
        btn.style.background = '#16a34a';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Baixar Checklist Gratuito';
          btn.style.background = '';
          btn.disabled = false;
          email.value = '';
        }, 3000);
      }
    });
  }


  // ── 10. Text Reveal Animation ──
  document.querySelectorAll('.text-reveal').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${i * 0.02}s`;
      el.appendChild(span);
    });
  });


  // ── 11. Tilt Effect on Specialist Photo ──
  const tiltCard = document.getElementById('specialist-card');
  if (tiltCard) {
    const photo = tiltCard.querySelector('.specialist-photo');
    if (photo) {
      tiltCard.addEventListener('mousemove', (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        photo.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03) translateY(-4px)`;
      });
      tiltCard.addEventListener('mouseleave', () => {
        photo.style.transform = 'rotateY(0) rotateX(0) scale(1) translateY(0)';
      });
    }
  }


  // ── 12. Back to Top Button ──
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ── 13. Typewriter Animation ──
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.typewriter-line');
    const allChars = []; // {span, parent} pairs

    lines.forEach(line => {
      const nodes = [...line.childNodes];
      line.innerHTML = '';

      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          [...node.textContent].forEach(ch => {
            if (ch === ' ') {
              // Use a real text node for spaces so word-wrap works
              const space = document.createTextNode(' ');
              line.appendChild(space);
              allChars.push({ el: space, type: 'space', parent: line });
            } else {
              const span = document.createElement('span');
              span.className = 'typewriter-char';
              span.textContent = ch;
              line.appendChild(span);
              allChars.push({ el: span, type: 'char', parent: line });
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const wrapper = node.cloneNode(false);
          [...node.textContent].forEach(ch => {
            if (ch === ' ') {
              const space = document.createTextNode(' ');
              wrapper.appendChild(space);
              allChars.push({ el: space, type: 'space', parent: wrapper });
            } else {
              const span = document.createElement('span');
              span.className = 'typewriter-char';
              span.textContent = ch;
              wrapper.appendChild(span);
              allChars.push({ el: span, type: 'char', parent: wrapper });
            }
          });
          line.appendChild(wrapper);
        }
      });
    });

    // Create blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.innerHTML = '\u200B'; // zero-width space

    // Insert cursor at the beginning
    if (allChars.length > 0) {
      const first = allChars[0];
      first.parent.insertBefore(cursor, first.el);
    }

    // Reveal chars sequentially & move cursor alongside
    const typeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let delay = 0;
          allChars.forEach((item, i) => {
            setTimeout(() => {
              if (item.type === 'char') {
                item.el.classList.add('visible');
              }
              // Move cursor after this character
              if (item.el.nextSibling) {
                item.parent.insertBefore(cursor, item.el.nextSibling);
              } else {
                item.parent.appendChild(cursor);
              }
            }, delay);
            delay += 45;
          });
          // Hide cursor after typing completes
          setTimeout(() => {
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
            cursor.style.transition = 'opacity 0.4s ease';
          }, delay + 800);
          typeObs.unobserve(heroTitle);
        }
      });
    }, { threshold: 0.2 });
    typeObs.observe(heroTitle);
  }

});
