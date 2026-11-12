/**
 * RK MECHANICAL WORKS PRIVATE LIMITED
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Light / Dark Theme Management
  const themeToggle = document.getElementById('themeToggle');

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('rk_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rk_theme', theme);
    if (themeToggle) {
      const nextLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', nextLabel);
      themeToggle.setAttribute('title', nextLabel);
    }
  };

  // Set initial state
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = active === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Listen for OS scheme change if user hasn't manually selected
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('rk_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Sticky Header elevation on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Tab Switching for Investors / Governance Page
  const tabPills = document.querySelectorAll('.inv-pill');
  const tabPanes = document.querySelectorAll('.inv-tab-pane');

  if (tabPills.length > 0) {
    tabPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const targetId = pill.getAttribute('data-target');

        tabPills.forEach(p => p.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        pill.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // 4. Project / Solution Category Filter
  const filterBtns = document.querySelectorAll('.project-tab-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. RFQ Modal Open & Close
  const modalTriggers = document.querySelectorAll('[data-open-modal="rfqModal"]');
  const rfqModal = document.getElementById('rfqModal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

  if (rfqModal) {
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        rfqModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeTargetModal = () => {
      rfqModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', closeTargetModal);
    });

    rfqModal.addEventListener('click', (e) => {
      if (e.target === rfqModal) {
        closeTargetModal();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && rfqModal.classList.contains('active')) {
        closeTargetModal();
      }
    });
  }

  // 6. Interactive Form Submissions (Demo Handler with real confirmation)
  const contactForms = document.querySelectorAll('.contact-form, #modalRfqForm');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting Specification...</span>';
      }

      setTimeout(() => {
        if (feedback) {
          feedback.classList.add('success');
          feedback.innerHTML = `
            <strong>Inquiry Received Successfully!</strong><br>
            Thank you for reaching out to RK Mechanical Works Private Limited. Our senior technical estimation desk has received your request and will contact you at your provided coordinates within 4 business hours.
          `;
          feedback.style.display = 'block';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Technical Inquiry</span>';
        }
      }, 900);
    });
  });

  // 7. Animated Numbers on Scroll (Stats Counter)
  const statsCounters = document.querySelectorAll('.stat-count');
  let animated = false;

  const animateCounters = () => {
    statsCounters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600; // ms
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const stepVal = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepVal;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  };

  // Check if stats are in view
  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }
});
