/**
 * RK MECHANICAL WORKS PRIVATE LIMITED
 * Apple-Inspired Corporate Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Apple Pro Dark by default, with smooth light mode switch)
  const themeToggle = document.getElementById('themeToggle');

  const getSavedTheme = () => {
    const saved = localStorage.getItem('rk_apple_theme');
    if (saved) return saved;
    // Default to dark (Apple Keynote Pro dark aesthetic)
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setAppleTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rk_apple_theme', theme);
    if (themeToggle) {
      const nextMode = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', nextMode);
      themeToggle.setAttribute('title', nextMode);
    }
  };

  // Initialize
  setAppleTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const target = current === 'dark' ? 'light' : 'dark';
      setAppleTheme(target);
    });
  }

  // 2. Mobile Global Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const appleNavLinks = document.getElementById('appleNavLinks');

  if (mobileMenuBtn && appleNavLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      appleNavLinks.classList.toggle('open');
      const isOpen = appleNavLinks.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    appleNavLinks.querySelectorAll('.apple-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        appleNavLinks.classList.remove('open');
      });
    });
  }

  // 3. Apple Modal / Sheet (Request Technical RFQ)
  const rfqModal = document.getElementById('rfqModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="rfqModal"]');
  const closeModalBtns = document.querySelectorAll('.apple-modal-close, .apple-modal-overlay');

  if (rfqModal) {
    const showModal = () => {
      rfqModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
      rfqModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
      });
    });

    document.querySelectorAll('.apple-modal-close').forEach(btn => {
      btn.addEventListener('click', hideModal);
    });

    rfqModal.addEventListener('click', (e) => {
      if (e.target === rfqModal) {
        hideModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && rfqModal.classList.contains('active')) {
        hideModal();
      }
    });
  }

  // 4. Interactive Tabs (Investors & Corporate Governance)
  const tabBtns = document.querySelectorAll('.apple-tab-btn');
  const tabPanes = document.querySelectorAll('.apple-tab-pane');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.classList.add('active');
        }
      });
    });
  }

  // 5. Interactive RFQ Form Submission
  const rfqForms = document.querySelectorAll('.apple-interactive-form, #modalRfqForm');
  rfqForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Verifying & Encrypting...</span>';
      }

      setTimeout(() => {
        const feedback = form.querySelector('.form-feedback') || document.createElement('div');
        feedback.className = 'form-feedback success';
        feedback.style.marginTop = '1rem';
        feedback.style.padding = '1rem';
        feedback.style.borderRadius = '12px';
        feedback.style.backgroundColor = 'rgba(0, 192, 240, 0.12)';
        feedback.style.border = '1px solid rgba(0, 192, 240, 0.4)';
        feedback.style.color = 'var(--text-primary)';
        feedback.style.fontSize = '0.9rem';
        feedback.style.lineHeight = '1.5';
        feedback.innerHTML = `
          <strong style="color: var(--accent-cyan); font-size: 1rem;">Specification Received</strong><br>
          Your technical data sheet has been dispatched to the Chief Engineering Desk at RK Mechanical Works Private Limited. An estimation engineer will contact your office within 4 business hours.
        `;
        if (!form.querySelector('.form-feedback')) {
          form.appendChild(feedback);
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 800);
    });
  });

  // 6. Big Counter Animation
  const counterElements = document.querySelectorAll('.counter-val');
  let hasAnimated = false;

  const runCounters = () => {
    counterElements.forEach(el => {
      const target = +el.getAttribute('data-target');
      const duration = 1800;
      const stepInterval = 20;
      const totalSteps = duration / stepInterval;
      const increment = target / totalSteps;
      let currentVal = 0;

      const timer = setInterval(() => {
        currentVal += increment;
        if (currentVal >= target) {
          el.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(currentVal).toLocaleString();
        }
      }, stepInterval);
    });
  };

  const metricsSection = document.querySelector('.apple-metrics-grid');
  if (metricsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        runCounters();
        hasAnimated = true;
      }
    }, { threshold: 0.25 });
    observer.observe(metricsSection);
  }

  // 7. Equalize Brand Subtitle Width to Exactly Match Main Title Length
  const syncBrandLength = () => {
    document.querySelectorAll('.brand-text-block').forEach(block => {
      const title = block.querySelector('.brand-main-title');
      const sub = block.querySelector('.brand-sub-title');
      if (title && sub) {
        const w = title.getBoundingClientRect().width;
        if (w > 0) {
          sub.style.width = w + 'px';
        }
      }
    });
  };

  syncBrandLength();
  window.addEventListener('resize', syncBrandLength);
  if (document.fonts) {
    document.fonts.ready.then(syncBrandLength);
  }
});
