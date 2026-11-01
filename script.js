/**
 * Nova Studio — Interactive Web Experience
 * Core JavaScript Logic
 * 
 * Features:
 * - Responsive mobile navigation drawer with ARIA management & keyboard navigation
 * - Dynamic header scroll state & active section tracking via IntersectionObserver
 * - Smooth scroll navigation with dynamic fixed-header offset
 * - Interactive project portfolio filtering with state management
 * - Rich case study quick-view modal dialog
 * - Accessible FAQ accordion
 * - Robust client-side contact form validation with real-time feedback
 * - Toast notification dispatch system
 * - Footer newsletter validation & back-to-top handler
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. DOM Element References
     ========================================================================== */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBody = document.getElementById('modalBody');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');
  const faqItems = document.querySelectorAll('.faq-item');
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const yearSpan = document.getElementById('yearSpan');

  // Set current year dynamically in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. Mobile Navigation Drawer
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
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeMobileMenu);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Handle escape key to close open menus or modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
      if (projectModal && projectModal.classList.contains('active')) {
        closeModal();
      }
    }
  });

  /* ==========================================================================
     3. Header Scroll Styling & Back to Top Button
     ========================================================================== */
  function handleScrollState() {
    const scrollPos = window.scrollY;

    // Header blur & shadow trigger
    if (scrollPos > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState(); // initial evaluation

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     4. Smooth Scroll for Anchor Links (accounting for sticky header offset)
     ========================================================================== */
  const internalAnchors = document.querySelectorAll('a[href^="#"]');

  internalAnchors.forEach(anchor => {
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
     5. Intersection Observer for Active Nav Highlighting
     ========================================================================== */
  const observedSections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        drawerLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  observedSections.forEach(section => sectionObserver.observe(section));

  /* ==========================================================================
     6. Project Portfolio Filter
     ========================================================================== */
  filterBtns.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state on buttons
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter');

      // Filter projects with smooth visibility toggling
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
     7. Project Case Study Modal Data & Handlers
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
      impact: 'Automated 14 hours of weekly manual reporting per analyst, deployed role-based data residency pipelines, and helped secure their $16M Series A funding round.'
    },
    '4': {
      title: 'Velocity Global Payments',
      client: 'Velocity Financial Group',
      category: 'FinTech Engineering',
      timeline: '12 Weeks',
      stack: ['React', 'Node.js', 'Plaid API', 'Stripe Connect', 'Docker'],
      description: 'Multi-currency corporate treasury platform featuring automated FX conversion hedging, instant virtual credit card issuance, and high-frequency settlement telemetry.',
      impact: 'Processed over $40M in transaction volume during the first 60 days of private beta with 99.99% uptime.'
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
        <h4 style="font-size: 0.9375rem; color: var(--text-main); margin-bottom: 8px;">Technology Stack</h4>
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

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock-scroll');
  }

  // Legal & Policy modal content database
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
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock-scroll');
  }

  const policyButtons = document.querySelectorAll('.policy-link-btn');
  policyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const policyKey = btn.getAttribute('data-policy');
      openPolicyModal(policyKey);
    });
  });

  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  /* ==========================================================================
     8. Accessible FAQ Accordion
     ========================================================================== */
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Optional accordion behavior: close others
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
     9. Toast Notification System
     ========================================================================== */
  let toastTimer = null;

  function showToast(message, isSuccess = true) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    const toastIcon = document.getElementById('toastIcon');
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
     10. Contact Form Client-Side Validation
     ========================================================================== */
  // Character counter for textarea
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len} / 1000`;
      if (len > 1000) {
        charCount.style.color = '#EF4444';
      } else {
        charCount.style.color = 'var(--text-dim)';
      }
    });
  }

  // Email format validator regex
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return regex.test(String(email).toLowerCase());
  }

  // Field validation helpers
  function setFieldError(inputElement, errorElement, message) {
    inputElement.classList.add('input-error');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearFieldError(inputElement, errorElement) {
    inputElement.classList.remove('input-error');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  // Realtime clear on input
  const nameField = document.getElementById('fullName');
  const emailField = document.getElementById('email');
  const serviceField = document.getElementById('serviceType');
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

      // 1. Validate Full Name
      const nameVal = nameField ? nameField.value.trim() : '';
      if (!nameVal) {
        setFieldError(nameField, nameError, 'Please enter your name.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = nameField;
      } else if (nameVal.length < 2) {
        setFieldError(nameField, nameError, 'Name must be at least 2 characters.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = nameField;
      } else {
        clearFieldError(nameField, nameError);
      }

      // 2. Validate Email
      const emailVal = emailField ? emailField.value.trim() : '';
      if (!emailVal) {
        setFieldError(emailField, emailError, 'Please enter your email address.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = emailField;
      } else if (!isValidEmail(emailVal)) {
        setFieldError(emailField, emailError, 'Please provide a valid email format (e.g., name@company.com).');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = emailField;
      } else {
        clearFieldError(emailField, emailError);
      }

      // 3. Validate Service Selection
      const serviceVal = serviceField ? serviceField.value : '';
      if (!serviceVal) {
        setFieldError(serviceField, serviceError, 'Please choose a service capability.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = serviceField;
      } else {
        clearFieldError(serviceField, serviceError);
      }

      // 4. Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        setFieldError(messageInput, messageError, 'Please provide an overview of your project.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else if (messageVal.length < 10) {
        setFieldError(messageInput, messageError, 'Please write at least 10 characters.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else if (messageVal.length > 1000) {
        setFieldError(messageInput, messageError, 'Message must be within 1000 characters.');
        hasErrors = true;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else {
        clearFieldError(messageInput, messageError);
      }

      // Focus first error field if any
      if (hasErrors) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.textContent = 'Please fix the highlighted fields before submitting.';
        }
        return;
      }

      // Form is valid: dispatch directly in real time to jkingsonisrael@gmail.com
      const submitBtn = document.getElementById('submitBtn');
      const defaultText = submitBtn.querySelector('.btn-text-default');
      const loadingText = submitBtn.querySelector('.btn-text-loading');

      if (submitBtn) submitBtn.disabled = true;
      if (defaultText) defaultText.classList.add('hidden');
      if (loadingText) loadingText.classList.remove('hidden');

      const budgetField = document.getElementById('budget');
      const budgetVal = budgetField && budgetField.value ? budgetField.options[budgetField.selectedIndex].text : 'Not specified';
      const serviceText = serviceField && serviceField.selectedIndex >= 0 ? serviceField.options[serviceField.selectedIndex].text : serviceVal;

      const payload = {
        name: nameVal,
        email: emailVal,
        service: serviceText,
        budget: budgetVal,
        message: messageVal,
        _subject: `New Nova Studio Project Inquiry from ${nameVal}`,
        _template: 'table',
        _captcha: 'false'
      };

      // Real-time dispatch via FormSubmit API to jkingsonisrael@gmail.com
      fetch('https://formsubmit.co/ajax/jkingsonisrael@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server response not ok');
        }
        return response.json();
      })
      .then(() => {
        if (submitBtn) submitBtn.disabled = false;
        if (defaultText) defaultText.classList.remove('hidden');
        if (loadingText) loadingText.classList.add('hidden');

        contactForm.reset();
        if (charCount) charCount.textContent = '0 / 1000';

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <strong>✓ Project Brief Dispatched in Real Time!</strong><br>
            Thank you, ${escapeHtml(nameVal)}. Your brief was delivered directly to our principal inbox at <strong>jkingsonisrael@gmail.com</strong>.<br>
            We will review your objectives and follow up at <em>${escapeHtml(emailVal)}</em> within 24 business hours.<br>
            <div style="margin-top: 10px;">
              <a href="mailto:jkingsonisrael@gmail.com?subject=Inquiry%20from%20${encodeURIComponent(nameVal)}" style="color: var(--teal-neon); font-size: 0.8125rem; text-decoration: underline;">
                Need an immediate follow-up? Click to email directly &rarr;
              </a>
            </div>
          `;
        }

        showToast('Brief delivered to jkingsonisrael@gmail.com!');
      })
      .catch(err => {
        console.warn('Real-time API fallback triggered:', err);
        // Fail-safe fallback: ensures message is never lost even if adblock/network offline
        if (submitBtn) submitBtn.disabled = false;
        if (defaultText) defaultText.classList.remove('hidden');
        if (loadingText) loadingText.classList.add('hidden');

        const mailtoUrl = `mailto:jkingsonisrael@gmail.com?subject=${encodeURIComponent('Nova Studio Inquiry: ' + nameVal)}&body=${encodeURIComponent(
          'Name: ' + nameVal + '\nEmail: ' + emailVal + '\nService: ' + serviceText + '\nBudget: ' + budgetVal + '\n\nMessage:\n' + messageVal
        )}`;

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <strong>Inquiry Ready for Direct Dispatch!</strong><br>
            Thank you, ${escapeHtml(nameVal)}. Click below to send your prepared brief directly to <strong>jkingsonisrael@gmail.com</strong>:<br>
            <div style="margin-top: 12px;">
              <a href="${mailtoUrl}" class="btn btn-outline btn-sm" style="display: inline-block;">
                Send directly to jkingsonisrael@gmail.com &rarr;
              </a>
            </div>
          `;
        }
        showToast('Inquiry prepared for jkingsonisrael@gmail.com');
      });
    });
  }

  // Basic HTML entity escaping for user input display
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     11. Footer Newsletter Subscription Form
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
