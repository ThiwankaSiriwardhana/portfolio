// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Set current year
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // ===== Typing Effect =====
  const typedTextEl = document.getElementById('typedText');
  const phrases = [
    'ICT Technician',
    'Web Developer',
    'Software Developer',
    'Graphic Designer',
    'Database Administrator',
    'Network Engineer'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinksContainer = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== Scroll Reveal (Intersection Observer) =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.textContent.replace(/[0-9]/g, '');
    const duration = 1500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);
      const currentCount = Math.round(target * progress);

      el.textContent = currentCount + suffix;

      if (frame >= totalFrames) {
        el.textContent = target + suffix;
        clearInterval(counter);
      }
    }, frameDuration);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ===== Back to Top Button =====
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== Cursor Glow Effect =====
  const cursorGlow = document.getElementById('cursorGlow');

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ===== Contact Form Handler =====
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalHTML = submitBtn.innerHTML;

    // Simulate sending
    submitBtn.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Sending...
      </span>
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          Message Sent!
        </span>
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        // Re-init icons inside button
        lucide.createIcons();
      }, 3000);
    }, 1500);
  });

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== Optimized Scroll Handler =====
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavScroll();
        updateActiveLink();
        handleBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ===== Skill Cards Tilt Effect =====
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== Project Cards Parallax =====
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

      card.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Add spin animation for loading spinner
  const style = document.createElement('style');
  style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
});

// ===== Project Popup Gallery =====
(function () {
  const popupData = {
    design: {
      category: 'Graphic Design',
      title: 'Brand Identity Package',
      desc: 'Complete branding solution including logo design, restaurant menus, shoe branding, and thank-you cards.',
      images: ['design1.jpg', 'design2.jpg', 'design3.jpg'],
      alts: ['Restaurant Menu Design', 'Shoe Branding Design', 'Thank You Card Design']
    },
    webdev: {
      category: 'Web Development',
      title: 'Online Vehicle Rental Management System',
      desc: 'A fully responsive vehicle rental platform with booking management, user authentication, and admin dashboard.',
      images: ['webproject1.png'],
      alts: ['Online Vehicle Rental Management System — Home Page']
    }
  };

  const overlay    = document.getElementById('popupOverlay');
  const closeBtn   = document.getElementById('popupClose');
  const catEl      = document.getElementById('popupCategory');
  const titleEl    = document.getElementById('popupTitle');
  const descEl     = document.getElementById('popupDesc');
  const track      = document.getElementById('galleryTrack');
  const dotsEl     = document.getElementById('galleryDots');
  const prevBtn    = document.getElementById('galleryPrev');
  const nextBtn    = document.getElementById('galleryNext');

  let currentIndex = 0;
  let totalImages  = 0;

  function openPopup(key) {
    const data = popupData[key];
    if (!data) return;

    catEl.textContent   = data.category;
    titleEl.textContent = data.title;
    descEl.textContent  = data.desc;

    // Build gallery
    track.innerHTML = '';
    dotsEl.innerHTML = '';
    totalImages = data.images.length;
    currentIndex = 0;

    data.images.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = data.alts[i] || '';
      img.loading = 'lazy';
      track.appendChild(img);

      const dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Image ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    });

    // Hide arrows if only 1 image
    prevBtn.style.display = totalImages <= 1 ? 'none' : '';
    nextBtn.style.display = totalImages <= 1 ? 'none' : '';
    dotsEl.style.display  = totalImages <= 1 ? 'none' : '';

    updateGallery();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, totalImages - 1));
    updateGallery();
  }

  function updateGallery() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalImages - 1;
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')      closePopup();
    if (e.key === 'ArrowLeft')   goTo(currentIndex - 1);
    if (e.key === 'ArrowRight')  goTo(currentIndex + 1);
  });

  // Attach click to trigger cards
  document.querySelectorAll('.popup-trigger').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't fire if user clicked a real link inside card
      if (e.target.closest('a')) return;
      const key = card.getAttribute('data-popup');
      openPopup(key);
    });
  });
})();
