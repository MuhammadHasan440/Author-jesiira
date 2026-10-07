/**
 * THE DEAF GIRL | AUTHOR JESIIRA D
 * Interactive JavaScript Engine
 * Handles Navigation, Accessibility Widget, Interactive Modals, Filtering & Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollSpy();
  initAccessibilityWidget();
  initBookParallax();
  initJournalFilters();
  initModals();
  initForms();
  initAudioVisualizerSimulation();
});

/* ==========================================================================
   STICKY HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   SCROLLSPY (ACTIVE LINK INDICATOR)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   ACCESSIBILITY PREFERENCES ENGINE
   ========================================================================== */
function initAccessibilityWidget() {
  const trigger = document.getElementById('a11y-trigger');
  const navTrigger = document.getElementById('nav-a11y-btn');
  const panel = document.getElementById('a11y-panel');
  const closeBtn = document.getElementById('a11y-close');

  if (!panel) return;

  const togglePanel = () => {
    panel.classList.toggle('open');
    const isOpen = panel.classList.contains('open');
    if (trigger) trigger.setAttribute('aria-expanded', isOpen);
  };

  if (trigger) trigger.addEventListener('click', togglePanel);
  if (navTrigger) navTrigger.addEventListener('click', togglePanel);
  if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('open') && 
        !panel.contains(e.target) && 
        e.target !== trigger && 
        !trigger?.contains(e.target) &&
        e.target !== navTrigger &&
        !navTrigger?.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Font Size Buttons
  const fontBtns = document.querySelectorAll('[data-font-size]');
  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fontBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const size = btn.dataset.fontSize;
      document.body.classList.remove('font-large', 'font-xlarge');
      if (size === 'large') document.body.classList.add('font-large');
      if (size === 'xlarge') document.body.classList.add('font-xlarge');
      localStorage.setItem('desiira_font_size', size);
    });
  });

  // High Contrast Toggle
  const contrastToggle = document.getElementById('toggle-contrast');
  if (contrastToggle) {
    contrastToggle.addEventListener('change', () => {
      document.body.classList.toggle('high-contrast', contrastToggle.checked);
      localStorage.setItem('desiira_contrast', contrastToggle.checked ? 'high' : 'normal');
    });
  }

  // Dyslexia Font Toggle
  const dyslexiaToggle = document.getElementById('toggle-dyslexia');
  if (dyslexiaToggle) {
    dyslexiaToggle.addEventListener('change', () => {
      document.body.classList.toggle('dyslexia-font', dyslexiaToggle.checked);
      localStorage.setItem('desiira_dyslexia', dyslexiaToggle.checked ? 'on' : 'off');
    });
  }

  // Reduced Motion Toggle
  const motionToggle = document.getElementById('toggle-motion');
  if (motionToggle) {
    motionToggle.addEventListener('change', () => {
      document.body.classList.toggle('reduced-motion', motionToggle.checked);
      localStorage.setItem('desiira_motion', motionToggle.checked ? 'reduced' : 'normal');
    });
  }

  // Highlight Links Toggle
  const linksToggle = document.getElementById('toggle-links');
  if (linksToggle) {
    linksToggle.addEventListener('change', () => {
      document.body.classList.toggle('highlight-links', linksToggle.checked);
      localStorage.setItem('desiira_links', linksToggle.checked ? 'highlight' : 'normal');
    });
  }

  // Load Saved Preferences
  const savedFontSize = localStorage.getItem('desiira_font_size');
  if (savedFontSize) {
    const activeBtn = document.querySelector(`[data-font-size="${savedFontSize}"]`);
    if (activeBtn) activeBtn.click();
  }

  if (localStorage.getItem('desiira_contrast') === 'high' && contrastToggle) {
    contrastToggle.checked = true;
    document.body.classList.add('high-contrast');
  }

  if (localStorage.getItem('desiira_dyslexia') === 'on' && dyslexiaToggle) {
    dyslexiaToggle.checked = true;
    document.body.classList.add('dyslexia-font');
  }

  if (localStorage.getItem('desiira_motion') === 'reduced' && motionToggle) {
    motionToggle.checked = true;
    document.body.classList.add('reduced-motion');
  }

  if (localStorage.getItem('desiira_links') === 'highlight' && linksToggle) {
    linksToggle.checked = true;
    document.body.classList.add('highlight-links');
  }
}

/* ==========================================================================
   3D BOOK TILT / PARALLAX
   ========================================================================== */
function initBookParallax() {
  const book = document.querySelector('.hero-book-card .book-3d');
  if (!book) return;

  const wrapper = document.querySelector('.hero-visual-wrapper');
  if (!wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    if (document.body.classList.contains('reduced-motion')) return;
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotY = (x / rect.width) * 14;
    const rotX = -(y / rect.height) * 14;

    book.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    book.style.transform = '';
  });
}

/* ==========================================================================
   JOURNAL / BLOG CATEGORY FILTERING
   ========================================================================== */
function initJournalFilters() {
  const filterBtns = document.querySelectorAll('.journal-filters .filter-btn');
  const cards = document.querySelectorAll('.journal-grid .journal-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   INTERACTIVE MODALS ENGINE
   ========================================================================== */
function initModals() {
  const backdrop = document.querySelector('.modal-backdrop');
  const modalContainer = document.querySelector('.modal-container');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  if (!backdrop || !modalContainer) return;

  const closeModal = () => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openModalWithContent = (htmlContent) => {
    const bodySlot = modalContainer.querySelector('.modal-dynamic-content');
    if (bodySlot) {
      bodySlot.innerHTML = htmlContent;
    }
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // 1. Video Card Click Modal
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.video-title')?.innerText || 'Sign Language Lesson';
      const desc = card.querySelector('.video-desc')?.innerText || '';
      const category = card.querySelector('.video-category-tag')?.innerText || 'ASL Video';

      const content = `
        <div class="video-modal-view">
          <div class="modal-video-box">
            <img src="assets/images/sign-language-video.jpg" alt="Video demonstration preview" />
            <div class="modal-captions-overlay">
              <span>[CC • Active Subtitles] Jesiira signs: "Courage begins when you realize your difference is your power."</span>
            </div>
          </div>
          <span class="badge badge-plum" style="margin-bottom: 0.8rem;">${category}</span>
          <h2 style="margin-bottom: 0.6rem;">${title}</h2>
          <p style="color: var(--color-charcoal-700); margin-bottom: 1.5rem;">${desc}</p>
          
          <div style="background: var(--color-lavender-50); border: 1px solid var(--color-lavender-200); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <h4 style="color: var(--color-plum-900); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>
              Lesson Highlights & ASL Etiquette:
            </h4>
            <ul style="padding-left: 1.2rem; color: var(--color-charcoal-700); font-size: 0.95rem; line-height: 1.6;">
              <li>Always maintain direct eye contact when signing or watching someone sign.</li>
              <li>Facial expressions constitute 50% of American Sign Language grammar and emotion.</li>
              <li>Practice signing with your dominant hand as the active hand and your non-dominant hand as base support.</li>
            </ul>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://instagram.com/itz.siira" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              Watch More on Instagram @itz.siira
            </a>
            <button onclick="document.querySelector('.modal-backdrop').classList.remove('active'); document.body.style.overflow='';" class="btn btn-secondary btn-sm">
              Close Preview
            </button>
          </div>
        </div>
      `;
      openModalWithContent(content);
    });
  });

  // 2. Journal Read More Modals
  const journalArticles = {
    '1': {
      title: 'The Story Behind The Deaf Girl',
      category: 'Author Life',
      date: 'Author Note • 2026',
      content: `
        <p class="lead">Growing up, I spent years looking at book covers in libraries, wishing I could see just one character who looked at the world the way I did.</p>
        <p>Wearing hearing aids as a young girl often felt like carrying a secret that was simultaneously visible to everyone. Children would stare, classmates would ask questions I didn't always have the words to answer, and there was this unspoken desire inside me to blend in.</p>
        <p>It took years of personal growth, discovering Deaf pride, and learning the richness of American Sign Language to realize something profound: our differences are never flaws. They are our distinctive signatures. <em>The Deaf Girl</em> was born out of that realization. I wrote it for my younger self, and for every young boy or girl sitting quietly in a classroom today, wondering if they are enough.</p>
        <p>Sarah, our protagonist, doesn't need to be 'fixed'. Her journey is about learning that courage doesn't require sound—it requires truth, heart, and self-acceptance.</p>
      `
    },
    '2': {
      title: 'Growing Up Deaf: What I Wish My Younger Self Knew',
      category: 'Deaf Culture',
      date: 'Essay • 2026',
      content: `
        <p class="lead">If I could travel back in time and sit next to 10-year-old Jesiira, I wouldn't tell her that things would be easy. I would tell her that she was already powerful.</p>
        <p>I would tell her that covering her ears with her hair wasn't protecting her—it was keeping her from showing the world how resilient she truly was. Deafness is not an absence of hearing; it is the presence of an extraordinarily visual, expressive, and deeply connected culture.</p>
        <p>When you communicate through sign language, every emotion is embodied. You look directly into the eyes of the person you love. You learn empathy before you learn vocabulary. That sensitivity is a gift, not a limitation.</p>
      `
    },
    '3': {
      title: "Why Representation Matters in Children's Literature",
      category: 'Behind The Book',
      date: 'Reflection • 2026',
      content: `
        <p class="lead">Books are both mirrors and windows. They allow children to see themselves reflected, and they provide windows into lives unlike their own.</p>
        <p>For decades, characters with hearing devices or disabilities were portrayed as objects of pity or passive sidekicks waiting for rescue. In <em>The Deaf Girl</em>, Sarah is the center of her own universe. She is funny, courageous, stubborn, artistic, and kind.</p>
        <p>When a Deaf child opens this book, they see someone like them being brave. And when a hearing child reads it, they learn empathy, compassion, and respect for Deaf communication.</p>
      `
    },
    '4': {
      title: 'Meet Sarah: Creating a Deaf Hero Without Stereotypes',
      category: 'Behind The Book',
      date: 'Character Profile • 2026',
      content: `
        <p class="lead">Designing Sarah was one of the most deliberate creative tasks of my life.</p>
        <p>Sarah uses both American Sign Language and cochlear implants. She loves vibrant colors, she carries a sketchbook everywhere, and her cochlear processor has purple skin with a tiny gold star. That detail matters: medical devices do not have to be clinical or grey. They can be personal expressions of joy.</p>
        <p>Sarah faces real challenges: noisy school cafeterias, impatient peers, and moments of isolation. But what defines her is not the obstacles—it is how she chooses to meet them with grace and backbone.</p>
      `
    },
    '5': {
      title: 'My Journey as an Author: Turning Vulnerability Into Art',
      category: 'Author Life',
      date: 'Personal Journey • 2026',
      content: `
        <p class="lead">Writing requires you to revisit the very moments you once tried to escape.</p>
        <p>When I sat down to write the bullying scenes and the feelings of being misunderstood at school, my heart pounded. But vulnerability is where connection happens. If you tell the truth on the page, the reader feels it across miles and across generations.</p>
        <p>This book is more than words on paper; it is an invitation to every reader to stand taller in their own skin.</p>
      `
    },
    '6': {
      title: "Writing The First Book: Drafting Sarah's World",
      category: 'Behind The Book',
      date: 'Writing Update • 2026',
      content: `
        <p class="lead">From the first notebook scribbles to final manuscript polish, crafting Book One has been a labor of love.</p>
        <p>We spent countless hours making sure the visual storytelling, character arcs, and cultural authenticity honored the Deaf community while staying deeply engaging for young readers everywhere.</p>
        <p>The finish line for Book One is near, and I cannot wait for Sarah to step off these pages and into your hands.</p>
      `
    }
  };

  const readMoreBtns = document.querySelectorAll('.journal-read-more-btn');
  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.articleId;
      const article = journalArticles[id];
      if (!article) return;

      const html = `
        <div class="journal-full-article">
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 1rem;">
            <span class="badge badge-plum">${article.category}</span>
            <span style="font-size: 0.85rem; color: var(--color-charcoal-500);">${article.date}</span>
          </div>
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.4rem); margin-bottom: 1.25rem;">${article.title}</h2>
          <div style="color: var(--color-charcoal-700); line-height: 1.8; font-size: 1.05rem;">
            ${article.content}
          </div>
          <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--color-cream-300); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <span style="font-weight: 700; color: var(--color-plum-900);">Written by Jesiira D</span>
            <button onclick="document.querySelector('.modal-backdrop').classList.remove('active'); document.body.style.overflow='';" class="btn btn-primary btn-sm">
              Close Essay
            </button>
          </div>
        </div>
      `;
      openModalWithContent(html);
    });
  });

  // 3. Synopsis Preview Modal Trigger
  const synopsisTriggers = document.querySelectorAll('[data-trigger-synopsis]');
  synopsisTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const html = `
        <div class="synopsis-modal">
          <span class="badge badge-plum" style="margin-bottom: 1rem;">Book One • Sneak Preview</span>
          <h2 style="margin-bottom: 0.5rem;">The Deaf Girl</h2>
          <p style="font-style: italic; color: var(--color-plum-700); font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 1.5rem;">
            "One girl. One journey. One powerful reminder: you are enough."
          </p>
          <div style="line-height: 1.8; color: var(--color-charcoal-700); font-size: 1.02rem;">
            <p>Ten-year-old Sarah has always seen the world in colors, gestures, and vibrations that other people miss. She loves starry nights, sketchbook doodles, and her custom purple cochlear implants that sparkle with little constellations.</p>
            <p>But middle school can be an echoing corridor where whispers hurt more than shouting. When she encounters teasing and the loneliness of feeling like the only one who uses American Sign Language, Sarah is tested like never before.</p>
            <p>Through the warmth of true friendship, the encouragement of her family, and discovering the heritage of Deaf culture, Sarah embarks on a journey to claim her space in the world—not in spite of her difference, but with fierce, quiet strength because of it.</p>
          </div>
          <div style="background: var(--color-lavender-50); border: 1px solid var(--color-lavender-200); padding: 1.2rem; border-radius: var(--radius-md); margin: 1.5rem 0;">
            <p style="margin: 0; font-size: 0.95rem; color: var(--color-plum-900); font-weight: 600;">
              ✨ Publication Status: <strong>Coming Soon</strong>. Sign up to receive exclusive launch notices and chapter previews directly from Jesiira.
            </p>
          </div>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button onclick="document.querySelector('.modal-backdrop').classList.remove('active'); document.body.style.overflow=''; document.getElementById('newsletter').scrollIntoView({behavior: 'smooth'});" class="btn btn-primary btn-sm">
              Get Launch Updates
            </button>
          </div>
        </div>
      `;
      openModalWithContent(html);
    });
  });

  // 4. Merch Waitlist Modal Trigger
  const merchTriggers = document.querySelectorAll('[data-trigger-merch]');
  merchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const html = `
        <div class="merch-modal-view">
          <span class="badge badge-rose" style="margin-bottom: 1rem;">Official Merchandise</span>
          <h2 style="margin-bottom: 0.5rem;">Wear The Message</h2>
          <p style="color: var(--color-charcoal-600); margin-bottom: 1.5rem;">
            Our debut collection featuring premium plum hoodies, organic totes, ASL pins, and holographic stickers is currently in development!
          </p>
          <form id="merch-waitlist-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; color: var(--color-plum-900);">Your Name</label>
              <input type="text" required placeholder="Enter your name" class="form-control" style="background: #ffffff;" />
            </div>
            <div>
              <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; color: var(--color-plum-900);">Your Email</label>
              <input type="email" required placeholder="Enter your email" class="form-control" style="background: #ffffff;" />
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">
              Notify Me When Shop Opens
            </button>
          </form>
        </div>
      `;
      openModalWithContent(html);

      // Handle merch submit
      setTimeout(() => {
        const merchForm = document.getElementById('merch-waitlist-form');
        if (merchForm) {
          merchForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            closeModal();
            showToast("You're on the Merch Waitlist! We'll notify you first.");
          });
        }
      }, 50);
    });
  });

  // 5. Author Full Journey Modal
  const authorStoryBtn = document.getElementById('author-story-btn');
  if (authorStoryBtn) {
    authorStoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const html = `
        <div class="author-modal-view">
          <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 1.5rem;">
            <img src="assets/images/author-jesiira.jpg" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--color-lavender-200);" alt="Jesiira D" />
            <div>
              <h2 style="margin: 0; font-size: 1.8rem;">Jesiira D</h2>
              <span style="color: var(--color-rose-500); font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">Author • Advocate • Creator</span>
            </div>
          </div>
          <div style="line-height: 1.8; color: var(--color-charcoal-700); font-size: 1.02rem;">
            <p>Jesiira D was born with profound hearing loss and grew up navigating both hearing and Deaf spaces. Like so many Deaf children, she spent her early years trying to hide her devices behind curls and wishing she could blend in effortlessly.</p>
            <p>Everything changed when she discovered the power of community and American Sign Language. She learned that Deafness is not an obstacle to overcome, but an identity filled with cultural richness, deep visual intuition, and community strength.</p>
            <p>Driven by the lack of authentic Deaf characters in modern children's books, Jesiira created <em>The Deaf Girl</em>. Her mission is simple yet transformative: to ensure no Deaf child grows up feeling invisible, and to show every reader that what makes you different can also make you extraordinarily strong.</p>
          </div>
          <div style="display: flex; gap: 12px; margin-top: 2rem;">
            <a href="https://instagram.com/itz.siira" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              Follow @itz.siira
            </a>
            <button onclick="document.querySelector('.modal-backdrop').classList.remove('active'); document.body.style.overflow='';" class="btn btn-secondary btn-sm">
              Close
            </button>
          </div>
        </div>
      `;
      openModalWithContent(html);
    });
  }
}

/* ==========================================================================
   INTERACTIVE FORMS & VALIDATION
   ========================================================================== */
function initForms() {
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = newsletterForm.querySelector('input[type="text"]');
      const emailInput = newsletterForm.querySelector('input[type="email"]');

      if (!emailInput.value.trim()) return;

      showToast(`Welcome to the Journey, ${nameInput.value.trim() || 'friend'}! ✨`);
      newsletterForm.reset();
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#contact-name')?.value || 'Friend';
      showToast(`Thank you, ${name}! Your message was sent to Jesiira.`);
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION COMPONENT
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--color-lavender-200);">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

/* ==========================================================================
   VISUAL SOUNDWAVE PULSE (ACCESSIBLE AUDIO-FREE STORYTELLING)
   ========================================================================== */
function initAudioVisualizerSimulation() {
  const bars = document.querySelectorAll('.visual-rhythm-bar');
  if (!bars.length) return;

  setInterval(() => {
    if (document.body.classList.contains('reduced-motion')) return;
    bars.forEach(bar => {
      const height = Math.floor(Math.random() * 26) + 6;
      bar.style.height = `${height}px`;
    });
  }, 220);
}
