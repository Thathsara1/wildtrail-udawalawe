/* ==========================================================
   WILDTRAIL UDAWALAWE — CONFIG (edit these for your business)
   ========================================================== */
const CONFIG = {
  whatsappNumber: "94762793140", // international format, no + or spaces
  businessName: "WildTrail Udawalawe"
};

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- LOADER ---------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 900);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 2500);

  /* ---------------- CUSTOM CURSOR ---------------- */
  const cursorDot = document.getElementById('cursorDot');
  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      cursorDot.classList.add('active');
    });
    document.querySelectorAll('a, button, .type-card, .mason-item, .wild-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('grow'));
    });
  }

  /* ---------------- NAV SCROLL STATE ---------------- */
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- MOBILE MENU ---------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }));
  document.getElementById('mobileBookBtn').addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    openModal();
  });

  /* ---------------- SEARCH TOGGLE ---------------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchClose = document.getElementById('searchClose');
  searchToggle.addEventListener('click', () => searchPanel.classList.toggle('open'));
  searchClose.addEventListener('click', () => searchPanel.classList.remove('open'));

  /* ---------------- SCROLL REVEAL (IntersectionObserver) ---------------- */
  const revealEls = document.querySelectorAll('.reveal-up, .timeline-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    revealObserver.observe(el);
  });

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const counters = document.querySelectorAll('.stat-block-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- TYPE SELECTOR CARDS ---------------- */
  const typeCards = document.querySelectorAll('.type-card');
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('safari').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' }), 350);
    });
  });

  /* ---------------- SAFARI CAROUSEL ---------------- */
  const cards = Array.from(document.querySelectorAll('.safari-card'));
  let current = 0;

  function renderCarousel() {
    cards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next', 'hidden-card');
      if (i === current) card.classList.add('active');
      else if (i === (current - 1 + cards.length) % cards.length) card.classList.add('prev');
      else if (i === (current + 1) % cards.length) card.classList.add('next');
      else card.classList.add('hidden-card');
    });
  }
  renderCarousel();

  document.getElementById('carouselPrev').addEventListener('click', () => {
    current = (current - 1 + cards.length) % cards.length;
    renderCarousel();
  });
  document.getElementById('carouselNext').addEventListener('click', () => {
    current = (current + 1) % cards.length;
    renderCarousel();
  });

  /* ---------------- REVIEW SLIDER ---------------- */
  const reviewCards = Array.from(document.querySelectorAll('.review-card'));
  let reviewIndex = 0;
  function renderReviews() {
    reviewCards.forEach((c, i) => c.classList.toggle('active', i === reviewIndex));
  }
  renderReviews();

  document.getElementById('reviewPrev').addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviewCards.length) % reviewCards.length;
    renderReviews();
  });
  document.getElementById('reviewNext').addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviewCards.length;
    renderReviews();
  });
  // auto-advance
  setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviewCards.length;
    renderReviews();
  }, 6000);

  /* ---------------- BOOKING MODAL ---------------- */
  const modalBackdrop = document.getElementById('modalBackdrop');
  function openModal() { modalBackdrop.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modalBackdrop.classList.remove('open'); document.body.style.overflow = ''; }

  document.getElementById('bookNavBtn').addEventListener('click', openModal);
  document.getElementById('bookHeroBtn').addEventListener('click', openModal);
  document.getElementById('openBookingBtn').addEventListener('click', openModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------------- WHATSAPP BOOKING FORM ---------------- */
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const name = data.get('name');
    const whatsapp = data.get('whatsapp');
    const date = data.get('date');
    const guests = data.get('guests');
    const type = data.get('type');
    const pickup = data.get('pickup') || 'Not specified';
    const message = data.get('message') || 'None';

    const text =
`Hello ${CONFIG.businessName}! I'd like to book a safari.

Name: ${name}
WhatsApp: ${whatsapp}
Date: ${date}
Guests: ${guests}
Safari type: ${type}
Pickup location: ${pickup}
Message: ${message}`;

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    closeModal();
    bookingForm.reset();
  });

  /* ---------------- PLAY BUTTON (placeholder demo action) ---------------- */
  document.getElementById('playBtn').addEventListener('click', () => {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------- HERO PARALLAX (subtle) ---------------- */
  const heroBg = document.getElementById('heroBg');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }
  }, { passive: true });

});
