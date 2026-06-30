/* ==========================================================================
   Page-specific JavaScript
   ========================================================================== */

// === Contact Form Handler ===
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Disable button & show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Transmitting...</span>';

    // Simulate form submission (in production, replace with real endpoint)
    setTimeout(() => {
      // Show success
      status.textContent = '✓ Message received. We will respond within 24 hours.';
      status.className = 'form-status success';
      form.reset();

      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Hide status after 5s
      setTimeout(() => {
        status.className = 'form-status';
      }, 5000);
    }, 1500);
  });

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.style.borderColor = 'var(--color-accent)';
      } else {
        this.style.borderColor = '';
      }
    });
    input.addEventListener('focus', function() {
      this.style.borderColor = '';
    });
  });
}

// === FAQ Accordion ===
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// === News Filters ===
function initNewsFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      newsCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// === Legal Page TOC Active State ===
function initLegalTOC() {
  const tocLinks = document.querySelectorAll('.legal-toc a[href^="#"]');
  if (tocLinks.length === 0) return;

  const sections = document.querySelectorAll('.legal-content h2[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-100px 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));

  // Back to top button
  const backToTop = document.querySelector('.legal-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// === Init everything when DOM ready ===
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initFAQ();
  initNewsFilters();
  initLegalTOC();
});
