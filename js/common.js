/* ==========================================================================
   frostdevcloudgrid - Common JavaScript
   ========================================================================== */

(function() {
  'use strict';

  // === Navigation Scroll Effect ===
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // === Mobile Navigation Toggle ===
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // === Scroll Reveal Animation ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    revealElements.forEach(el => observer.observe(el));
  }

  // === Animated Counters ===
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (target - startValue) * eased;
      if (Number.isInteger(target)) {
        el.innerHTML = Math.floor(current).toLocaleString() + (progress === 1 ? suffix : '');
      } else {
        el.innerHTML = current.toFixed(1) + suffix;
      }
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerHTML = target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  // === Service Card Mouse Tracking for Glow Effect ===
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--x', x + '%');
      card.style.setProperty('--y', y + '%');
    });
  });

  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  // === Parallax Effect for Hero ===
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    let ticking = false;
    const handleParallax = () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        const opacity = 1 - (scrolled / window.innerHeight) * 0.6;
        heroBg.style.opacity = Math.max(opacity, 0.2);
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // === Magnetic Button Effect ===
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // === Animated Tech Grid Particles ===
  const particleContainers = document.querySelectorAll('.particle-container');
  particleContainers.forEach(container => {
    createParticles(container, 30);
  });

  function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(232, 33, 39, ${Math.random() * 0.8 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(232, 33, 39, 0.6);
        --dx: ${(Math.random() - 0.5) * 200}px;
        --dy: ${(Math.random() - 0.5) * 200}px;
        animation: particleDrift ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(particle);
    }
  }

  // === Ripple Effect on Buttons ===
  document.querySelectorAll('.btn, .nav-link, .footer-social a').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      const computedPosition = window.getComputedStyle(this).position;
      if (computedPosition === 'static') {
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
      }
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // === Console Branding ===
  if (window.console && console.log) {
    const styles = [
      'background: linear-gradient(135deg, #e82127, #ff3b3f)',
      'color: white',
      'padding: 8px 16px',
      'border-radius: 4px',
      'font-size: 14px',
      'font-weight: bold',
      'font-family: monospace'
    ].join(';');
    console.log('%c frostdevcloudgrid.com ', styles);
    console.log('%cMinimalist Design · Privacy First · Experience First', 'color: #b8b8b8; font-style: italic;');
  }

})();
