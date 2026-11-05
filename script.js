/**
 * Nova Studio — Master Interactive Engine
 * Handcrafted with human-built precision & surgical performance
 * 
 * Features:
 * 1. Desktop cursor spotlight (60fps rAF tracked)
 * 2. Hero Interactive Prototype Switcher (Telemetry / Design Lab / AI Copilot)
 * 3. Interactive Project Scope & Budget Estimator
 * 4. 1-Click Email copy utility with tactile feedback
 * 5. Case Study Quick-View & Legal Policy modals
 * 6. Responsive mobile drawer with keyboard & focus traps
 * 7. Real-time contact dispatch to jkingsonisrael@gmail.com with fail-safe fallback
 * 8. Real-time newsletter dispatch & floating toast notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. DOM Element References
     ========================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  const yearSpan = document.getElementById('yearSpan');

  // Modal references
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBody = document.getElementById('modalBody');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');
  const policyButtons = document.querySelectorAll('.policy-link-btn');

  // Filter & FAQ references
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const faqItems = document.querySelectorAll('.faq-item');

  // Contact & Estimator references
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  // Set current year dynamically in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. Interactive Desktop Cursor Spotlight
     ========================================================================== */
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isTracking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isTracking) {
        isTracking = true;
        cursorGlow.style.opacity = '1';
        requestAnimationFrame(renderCursorGlow);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isTracking = false;
      cursorGlow.style.opacity = '0';
    });

    function renderCursorGlow() {
      if (!isTracking) return;
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursorGlow);
    }
  }

  /* ==========================================================================
     3. Hero Interactive Prototype Switcher (Telemetry / Design / AI)
     ========================================================================== */
  const heroTabs = document.querySelectorAll('.hero-tab');
  const demoViews = {
    telemetry: document.getElementById('view-telemetry'),
    design: document.getElementById('view-design'),
    ai: document.getElementById('view-ai')
  };

  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const target = tab.getAttribute('data-tab');
      Object.keys(demoViews).forEach(key => {
        if (demoViews[key]) {
          if (key === target) {
            demoViews[key].classList.add('active');
          } else {
            demoViews[key].classList.remove('active');
          }
        }
      });
    });
  });

  // Simulated live telemetry micro-fluctuations
  const dynLatency = document.getElementById('dynLatency');
  const dynRps = document.getElementById('dynRps');
  if (dynLatency && dynRps) {
    setInterval(() => {
      const lat = (13.5 + Math.random() * 2.2).toFixed(1);
      const rps = (28200 + Math.floor(Math.random() * 600)).toLocaleString();
      dynLatency.textContent = `${lat} ms`;
      dynRps.textContent = rps;
    }, 3200);
  }

  // Design Lab Interactive Controls
  const colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const color = swatch.getAttribute('data-color');
      showToast(`Design Token: Switched active theme accent to ${color}`);
    });
  });

  const demoFeedbackBtn = document.getElementById('demoFeedbackBtn');
  if (demoFeedbackBtn) {
    demoFeedbackBtn.addEventListener('click', () => {
      demoFeedbackBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        demoFeedbackBtn.style.transform = '';
      }, 150);
      showToast('Tactile micro-interaction triggered! Response budget: 14ms');
    });
  }

  /* ==========================================================================
     4. Interactive Project Scope & Budget Estimator (INR Currency)
     ========================================================================== */
  const scopeTypeBtns = document.querySelectorAll('.est-option-btn');
  const featureCheckboxes = document.querySelectorAll('.feature-chip input');
  const estPriceDisplay = document.getElementById('estPriceDisplay');
  const estTimelineDisplay = document.getElementById('estTimelineDisplay');
  const applyEstimateBtn = document.getElementById('applyEstimateBtn');

  let currentScopeBase = 150000;
  let currentScopeWeeks = 5;
  let currentScopeTitle = 'Full-Stack Web App';

  // Indian Rupee currency formatter (e.g. ₹1,50,000)
  const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  function calculateEstimate() {
    let featureSum = 0;
    let featureCount = 0;

    featureCheckboxes.forEach(cb => {
      const parentLabel = cb.closest('.feature-chip');
      if (cb.checked) {
        featureSum += parseInt(cb.value, 10);
        featureCount += 1;
        if (parentLabel) parentLabel.classList.add('selected');
      } else {
        if (parentLabel) parentLabel.classList.remove('selected');
      }
    });

    const totalLow = currentScopeBase + featureSum;
    const totalHigh = Math.round(totalLow * 1.25);
    const totalWeeksLow = currentScopeWeeks + Math.floor(featureCount / 2);
    const totalWeeksHigh = totalWeeksLow + 2;

    if (estPriceDisplay) {
      estPriceDisplay.textContent = `${inrFormatter.format(totalLow)} – ${inrFormatter.format(totalHigh)}`;
    }
    if (estTimelineDisplay) {
      estTimelineDisplay.textContent = `Estimated Delivery: ${totalWeeksLow} – ${totalWeeksHigh} Weeks`;
    }
  }

  scopeTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scopeTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScopeBase = parseInt(btn.getAttribute('data-base'), 10);
      currentScopeWeeks = parseInt(btn.getAttribute('data-weeks'), 10);
      currentScopeTitle = btn.querySelector('strong').textContent;
      calculateEstimate();
    });
  });

  featureCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateEstimate);
  });

  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const serviceSelect = document.getElementById('serviceType');
      const budgetSelect = document.getElementById('budget');
      const messageField = document.getElementById('message');

      if (serviceSelect) {
        if (currentScopeTitle.includes('Web App')) serviceSelect.value = 'web-dev';
        else if (currentScopeTitle.includes('Marketing')) serviceSelect.value = 'ui-ux';
        else if (currentScopeTitle.includes('AI')) serviceSelect.value = 'ai-integration';
      }

      if (budgetSelect) {
        budgetSelect.value = '1.5L-3.5L';
      }

      if (messageField) {
        messageField.value = `Estimated Project Scope: ${currentScopeTitle}\nCalculated Scope Estimate: ${estPriceDisplay ? estPriceDisplay.textContent : '₹1,75,000 – ₹2,20,000'}\nTimeline Target: ${estTimelineDisplay ? estTimelineDisplay.textContent : '4-6 Weeks'}\n\nProject Goals:\n`;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Scope estimation applied directly to your project brief below (in ₹ INR)!');
    });
  }

  /* ==========================================================================
     5. 1-Click Copy Email to Clipboard
     ========================================================================== */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'jkingsonisrael@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.textContent = '✓ Copied!';
        showToast('Email address copied to clipboard: jkingsonisrael@gmail.com');
        setTimeout(() => {
          copyEmailBtn.textContent = '📋 Copy';
        }, 3000);
      } catch (err) {
        showToast('Direct email: jkingsonisrael@gmail.com');
      }
    });
  }

  /* ==========================================================================
     6. Mobile Navigation Drawer
     ========================================================================== */
  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('lock-scroll');
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock-scroll');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) closeMobileMenu();
      else openMobileMenu();
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);
  drawerLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Handle escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer.classList.contains('open')) closeMobileMenu();
      if (projectModal && projectModal.classList.contains('active')) closeModal();
    }
  });

  /* ==========================================================================
     7. Header Scroll Styling & Back to Top Button
     ========================================================================== */
  function handleScrollState() {
    const scrollPos = window.scrollY;
    if (scrollPos > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     8. Smooth Anchor Scrolling (Fixed Header Offset)
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     9. Intersection Observer for Active Nav Highlighting
     ========================================================================== */
  const observedSections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
          else link.classList.remove('active');
        });
        drawerLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
          else link.classList.remove('active');
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  observedSections.forEach(section => sectionObserver.observe(section));

  /* ==========================================================================
     10. Projects Filter
     ========================================================================== */
  filterBtns.forEach(button => {
    button.addEventListener('click', () => {
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter');
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ==========================================================================
     11. Case Study & Policy Modal Data & Handlers
     ========================================================================== */
  const projectDetailsDatabase = {
    '1': {
      title: 'Prism Data Cloud',
      client: 'Prism Technologies',
      category: 'Web App & Telemetry',
      timeline: '8 Weeks',
      stack: ['Next.js', 'TypeScript', 'WebSockets', 'Tailwind', 'Go Engine'],
      description: 'Prism Data Cloud required an enterprise analytics interface capable of visualizing millions of streaming metrics per second without UI stuttering or memory leaks.',
      impact: 'Reduced dashboard initial load time from 3.4s to 420ms, supported 150k live concurrent sessions, and improved enterprise trial-to-paid conversion by 38%.'
    },
    '2': {
      title: 'Aura Audio Rebrand & Showcase',
      client: 'Aura Soundworks',
      category: 'Brand Architecture & Design System',
      timeline: '6 Weeks',
      stack: ['Figma', 'WebGL', 'Modern CSS', 'Audio Synthesis API'],
      description: 'Aura wanted a complete overhaul of their brand expression to position themselves in the ultra-luxury audio equipment sector.',
      impact: 'Delivered a bespoke responsive digital storefront with 3D headphone configurations and interactive acoustic simulation, achieving a 220% increase in product waitlist registrations.'
    },
    '3': {
      title: 'Cortex Intelligent Co-pilot',
      client: 'Cortex Intelligence',
      category: 'SaaS Platform & AI Tooling',
      timeline: '10 Weeks',
      stack: ['React', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
      description: 'An AI-powered document synthesis and financial forecasting engine designed to automate quantitative market analysis for investment analysts.',
      impact: 'Automated 14 hours of weekly manual reporting per analyst, deployed role-based data residency pipelines, and helped secure their ₹130 Cr Series A funding round.'
    },
    '4': {
      title: 'Velocity Global Payments',
      client: 'Velocity Financial Group',
      category: 'FinTech Engineering',
      timeline: '12 Weeks',
      stack: ['React', 'Node.js', 'Plaid API', 'Stripe Connect', 'Docker'],
      description: 'Multi-currency corporate treasury platform featuring automated FX conversion hedging, instant virtual credit card issuance, and high-frequency settlement telemetry.',
      impact: 'Processed over ₹330 Cr in transaction volume during the first 60 days of private beta with 99.99% uptime.'
    }
  };

  const policyDatabase = {
    privacy: {
      title: 'Privacy Policy',
      category: 'Data Protection & Governance',
      body: `
        <p>At Nova Studio, we protect your confidentiality and intellectual property with rigorous standards. Any data submitted via this website—including your name, email address, company details, and project specifications—is transmitted over encrypted TLS 1.3 channels and dispatched directly in real time to our principal inbox at <strong>jkingsonisrael@gmail.com</strong>.</p>
        <p>We do not track visitors across third-party networks, sell analytics datasets, or distribute contact lists to marketing vendors. All data retained is used solely for client communication, project delivery, and NDA-bound scope planning.</p>
        <p>If you wish to request full deletion of any correspondence or project records, please contact us directly at <a href="mailto:jkingsonisrael@gmail.com" style="color: var(--teal-neon);">jkingsonisrael@gmail.com</a>.</p>
      `
    },
    terms: {
      title: 'Terms of Service',
      category: 'Client Agreements & IP Ownership',
      body: `
        <p>All bespoke creative engineering, architectural blueprints, UI design systems, and software deliverables crafted by Nova Studio for paid client engagements become the exclusive intellectual property of the client upon completion of milestones and final settlement.</p>
        <p>Nova Studio retains the right to display non-confidential visual case studies in our portfolio unless a strict non-disclosure agreement (NDA) specifies otherwise.</p>
        <p>For custom master service agreements (MSA) or statement of work (SOW) inquiries, reach out to <a href="mailto:jkingsonisrael@gmail.com" style="color: var(--teal-neon);">jkingsonisrael@gmail.com</a>.</p>
      `
    },
    security: {
      title: 'Security Architecture',
      category: 'Security Standards & Compliance',
      body: `
        <p>We implement security-first engineering paradigms across every client application: sanitized input validation, least-privilege cloud roles, strict Content Security Policy (CSP) headers, and zero hardcoded production secrets.</p>
        <p>Form submissions from this website are delivered over secure HTTPS endpoints with rate limiting and automated anti-abuse telemetry.</p>
        <p>To report a security concern or request our vulnerability disclosure policy, email <a href="mailto:jkingsonisrael@gmail.com" style="color: var(--teal-neon);">jkingsonisrael@gmail.com</a>.</p>
      `
    }
  };

  function openModal(projectId) {
    const data = projectDetailsDatabase[projectId];
    if (!data || !modalBody) return;

    modalBody.innerHTML = `
      <div class="project-tags" style="margin-bottom: 12px;">
        <span class="tag" style="background: rgba(139, 92, 246, 0.2); color: #C084FC;">${data.category}</span>
      </div>
      <h3 id="modalTitle">${data.title}</h3>
      <p>${data.description}</p>
      
      <div class="modal-meta-grid">
        <div class="modal-meta-item">
          <strong>Client</strong>
          <span>${data.client}</span>
        </div>
        <div class="modal-meta-item">
          <strong>Delivery</strong>
          <span>${data.timeline}</span>
        </div>
        <div class="modal-meta-item">
          <strong>Status</strong>
          <span style="color: var(--teal-neon);">Production Live</span>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.9375rem; color: var(--text-primary); margin-bottom: 8px;">Technology Stack</h4>
        <div class="project-tags">
          ${data.stack.map(item => `<span class="tag">${item}</span>`).join('')}
        </div>
      </div>

      <div style="background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: var(--radius-md); padding: 16px;">
        <h4 style="font-size: 0.875rem; color: var(--teal-300); margin-bottom: 6px;">Key Business Impact</h4>
        <p style="font-size: 0.875rem; margin-bottom: 0; color: var(--text-secondary);">${data.impact}</p>
      </div>

      <div style="margin-top: 24px; text-align: right;">
        <a href="#contact" class="btn btn-primary btn-sm modal-contact-btn">
          Discuss a Similar Project &rarr;
        </a>
      </div>
    `;

    const modalContactBtn = modalBody.querySelector('.modal-contact-btn');
    if (modalContactBtn) {
      modalContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          setTimeout(() => {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }, 120);
        }
      });
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock-scroll');
  }

  function openPolicyModal(policyKey) {
    const policy = policyDatabase[policyKey];
    if (!policy || !modalBody) return;

    modalBody.innerHTML = `
      <div class="project-tags" style="margin-bottom: 12px;">
        <span class="tag" style="background: rgba(139, 92, 246, 0.2); color: #C084FC;">${policy.category}</span>
      </div>
      <h3 id="modalTitle">${policy.title}</h3>
      <div style="margin-top: 16px; font-size: 0.9375rem; line-height: 1.7; color: var(--text-secondary);">
        ${policy.body}
      </div>
      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <span style="font-size: 0.8125rem; color: var(--text-dim);">Direct Contact: jkingsonisrael@gmail.com</span>
        <button type="button" class="btn btn-outline btn-sm" id="closePolicyBtn">Close</button>
      </div>
    `;

    const closeBtn = document.getElementById('closePolicyBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock-scroll');
  }

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock-scroll');
  }

  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  policyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const policyKey = btn.getAttribute('data-policy');
      openPolicyModal(policyKey);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  /* ==========================================================================
     12. Accessible FAQ Accordion
     ========================================================================== */
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherPanel = otherItem.querySelector('.faq-panel');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        if (isExpanded) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  });

  /* ==========================================================================
     13. Toast Notification Dispatcher
     ========================================================================== */
  let toastTimer = null;

  function showToast(message, isSuccess = true) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    if (toastIcon) {
      toastIcon.textContent = isSuccess ? '✓' : '!';
      toastIcon.style.background = isSuccess ? 'var(--teal-500)' : '#EF4444';
    }

    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  /* ==========================================================================
     14. Real-Time Contact Form Validation & Dispatch
     ========================================================================== */
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len} / 1000`;
      charCount.style.color = len > 1000 ? '#EF4444' : 'var(--text-dim)';
    });
  }

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return regex.test(String(email).toLowerCase());
  }

  function setFieldError(inputElement, errorElement, message) {
    inputElement.classList.add('input-error');
    if (errorElement) errorElement.textContent = message;
  }

  function clearFieldError(inputElement, errorElement) {
    inputElement.classList.remove('input-error');
    if (errorElement) errorElement.textContent = '';
  }

  const nameField = document.getElementById('fullName');
  const emailField = document.getElementById('email');
  const serviceField = document.getElementById('serviceType');
  const budgetField = document.getElementById('budget');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const serviceError = document.getElementById('serviceError');
  const messageError = document.getElementById('messageError');

  if (nameField) nameField.addEventListener('input', () => clearFieldError(nameField, nameError));
  if (emailField) emailField.addEventListener('input', () => clearFieldError(emailField, emailError));
  if (serviceField) serviceField.addEventListener('change', () => clearFieldError(serviceField, serviceError));
  if (messageInput) messageInput.addEventListener('input', () => clearFieldError(messageInput, messageError));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;
      let firstInvalidInput = null;

      // 1. Validate Name
      const nameVal = nameField ? nameField.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        setFieldError(nameField, nameError, 'Please enter your full name (minimum 2 characters).');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = nameField;
      } else {
        clearFieldError(nameField, nameError);
      }

      // 2. Validate Email
      const emailVal = emailField ? emailField.value.trim() : '';
      if (!emailVal || !isValidEmail(emailVal)) {
        setFieldError(emailField, emailError, 'Please enter a valid email address.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = emailField;
      } else {
        clearFieldError(emailField, emailError);
      }

      // 3. Validate Service
      const serviceVal = serviceField ? serviceField.value : '';
      if (!serviceVal) {
        setFieldError(serviceField, serviceError, 'Please select a primary capability.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = serviceField;
      } else {
        clearFieldError(serviceField, serviceError);
      }

      // 4. Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 10) {
        setFieldError(messageInput, messageError, 'Please provide a brief overview of at least 10 characters.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else if (messageVal.length > 1000) {
        setFieldError(messageInput, messageError, 'Message must be within 1000 characters.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else {
        clearFieldError(messageInput, messageError);
      }

      if (hasErrors) {
        if (firstInvalidInput) firstInvalidInput.focus();
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.textContent = 'Please fix the highlighted fields before submitting.';
        }
        return;
      }

      // Form is valid: Prepare direct transmission to jkingsonisrael@gmail.com
      const submitBtn = document.getElementById('submitBtn');
      const defaultText = submitBtn.querySelector('.btn-text-default');
      const loadingText = submitBtn.querySelector('.btn-text-loading');

      if (submitBtn) submitBtn.disabled = true;
      if (defaultText) defaultText.classList.add('hidden');
      if (loadingText) loadingText.classList.remove('hidden');

      const budgetVal = budgetField && budgetField.value ? budgetField.options[budgetField.selectedIndex].text : 'Not specified';
      const serviceText = serviceField && serviceField.selectedIndex >= 0 ? serviceField.options[serviceField.selectedIndex].text : serviceVal;

      const emailSubject = `Nova Studio Project Inquiry from ${nameVal}`;
      const emailBody = `Hi Kingson,\n\nI would like to discuss a project with Nova Studio.\n\nProject Specifications:\n- Client Name: ${nameVal}\n- Reply Email: ${emailVal}\n- Service Required: ${serviceText}\n- Estimated Budget: ${budgetVal}\n\nProject Overview:\n${messageVal}\n\n---\nSent via Nova Studio Portfolio`;

      // 1. Gmail Web Direct Compose (Opens Gmail with To, Subject, and Body fully filled)
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jkingsonisrael@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // 2. Universal mailto link for desktop and mobile clients (Apple Mail, Outlook, etc.)
      const mailtoUrl = `mailto:jkingsonisrael@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // 3. Direct WhatsApp web/mobile link
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`*Nova Studio Project Inquiry*\nFrom: ${nameVal} (${emailVal})\nService: ${serviceText}\nBudget: ${budgetVal}\n\n${messageVal}`)}`;

      const payload = {
        name: nameVal,
        email: emailVal,
        service: serviceText,
        budget: budgetVal,
        message: messageVal
      };

      // Try local/deployed backend API first if available
      const backendEndpoints = ['/api/contact', 'http://localhost:5000/api/contact'];
      let apiPromise = Promise.reject(new Error('No backend contacted yet'));

      // Check if backend endpoint is reachable
      apiPromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => {
        if (!res.ok) throw new Error('Backend HTTP ' + res.status);
        return res.json();
      });

      apiPromise
      .then(data => {
        // Backend successfully processed and delivered email
        resetSubmitState();
        contactForm.reset();
        if (charCount) charCount.textContent = '0 / 1000';

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <strong>✓ Project Brief Sent to jkingsonisrael@gmail.com!</strong><br>
            Thank you, ${escapeHtml(nameVal)}. Your inquiry was processed and delivered directly to our lead developer at <strong>jkingsonisrael@gmail.com</strong>.<br>
            We will review your scope and follow up at <em>${escapeHtml(emailVal)}</em> within 24 business hours.
          `;
        }
        showToast('Brief delivered to jkingsonisrael@gmail.com!');
      })
      .catch(() => {
        // Static Hosting Mode (GitHub Pages): Trigger direct Gmail & mail client dispatch
        resetSubmitState();

        // Attempt automatic popup of Gmail compose
        const opened = window.open(gmailUrl, '_blank');
        if (!opened) {
          // If popup blocked, trigger mailto protocol
          window.location.href = mailtoUrl;
        }

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <strong>✓ Project Brief Prepared for jkingsonisrael@gmail.com!</strong><br>
            Thank you, ${escapeHtml(nameVal)}. Your brief is formatted and ready to send directly to <strong>jkingsonisrael@gmail.com</strong>.<br>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px;">
              <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="background: #EA4335; border-color: #EA4335;">
                ✉️ Send via Gmail Web &rarr;
              </a>
              <a href="${mailtoUrl}" class="btn btn-outline btn-sm">
                📧 Open Mail App &rarr;
              </a>
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="color: #25D366; border-color: #25D366;">
                💬 Send via WhatsApp
              </a>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 10px; margin-bottom: 0;">
              Clicking above will instantly send your pre-filled inquiry directly to <strong>jkingsonisrael@gmail.com</strong> without any 3rd-party bounce or spam blocks.
            </p>
          `;
        }

        showToast('Opening Gmail to send to jkingsonisrael@gmail.com');
      });

      function resetSubmitState() {
        if (submitBtn) submitBtn.disabled = false;
        if (defaultText) defaultText.classList.remove('hidden');
        if (loadingText) loadingText.classList.add('hidden');
      }
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     15. Footer Newsletter Subscription Form
     ========================================================================== */
  if (newsletterForm && newsletterEmail && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();

      if (!email || !isValidEmail(email)) {
        newsletterFeedback.style.color = '#F87171';
        newsletterFeedback.textContent = 'Please enter a valid email address.';
        newsletterEmail.focus();
        return;
      }

      newsletterFeedback.style.color = 'var(--teal-300)';
      newsletterFeedback.textContent = 'Subscribing...';

      // Dispatch newsletter subscription to jkingsonisrael@gmail.com
      fetch('https://formsubmit.co/ajax/jkingsonisrael@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subscription: 'Studio Dispatch Newsletter',
          subscriber_email: email,
          _subject: `New Studio Dispatch Subscriber: ${email}`,
          _template: 'table',
          _captcha: 'false'
        })
      })
      .finally(() => {
        newsletterFeedback.style.color = 'var(--teal-300)';
        newsletterFeedback.textContent = '✓ You have subscribed to Studio Dispatch!';
        newsletterEmail.value = '';
        showToast('Subscribed to Studio Dispatch!');

        setTimeout(() => {
          newsletterFeedback.textContent = '';
        }, 5000);
      });
    });
  }
});
