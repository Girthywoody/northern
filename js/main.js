/* ===========================
   Northern Climate - Main JS
   =========================== */

(function () {
  'use strict';

  /* ---------- Sticky Nav Shadow ---------- */
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    window.addEventListener('scroll', function () {
      navWrap.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- Mobile Menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a:not(.mobile-services-toggle)').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---------- Mobile Services Accordion ---------- */
  const servicesToggle = document.querySelector('.mobile-services-toggle');
  const mobileSubmenu = document.querySelector('.mobile-submenu');

  if (servicesToggle && mobileSubmenu) {
    servicesToggle.addEventListener('click', function (e) {
      e.preventDefault();
      servicesToggle.classList.toggle('open');
      mobileSubmenu.classList.toggle('open');
    });
  }

  /* ---------- Desktop Dropdown (click support for touch) ---------- */
  const dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    dropdown.addEventListener('click', function (e) {
      if (window.innerWidth < 1024) return;
      const toggle = e.target.closest('.nav-dropdown-toggle');
      if (toggle) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  /* ---------- Footer Year ---------- */
  var yearEls = document.querySelectorAll('.js-year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Scroll-triggered Fade-in (Intersection Observer) ---------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var fadeEls = document.querySelectorAll('.fade-in');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Make everything visible immediately
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Animated Stat Counters ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      var eased = 1 - (1 - progress) * (1 - progress);
      var current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var counterEls = document.querySelectorAll('[data-count]');
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function (el) { counterObserver.observe(el); });
  } else {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      el.textContent = prefix + target.toLocaleString() + suffix;
    });
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact Form ---------- */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Gather form data
      var formData = new FormData(contactForm);
      var subject = 'New Quote Request from ' + (formData.get('firstName') || '') + ' ' + (formData.get('lastName') || '');
      var body = '';
      formData.forEach(function (value, key) {
        body += key + ': ' + value + '%0D%0A';
      });

      // Open mailto
      window.location.href = 'mailto:service@northernclimatesudbury.com?subject=' + encodeURIComponent(subject) + '&body=' + body;

      // Show success
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.add('show');
        setTimeout(function () {
          contactForm.style.display = '';
          contactForm.reset();
          formSuccess.classList.remove('show');
        }, 5000);
      }
    });
  }

  /* ---------- Quick Lead Form ---------- */
  var leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(leadForm);
      var subject = 'Quick Quote Request';
      var body = '';
      formData.forEach(function (value, key) {
        body += key + ': ' + value + '%0D%0A';
      });
      window.location.href = 'mailto:service@northernclimatesudbury.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
      leadForm.reset();
    });
  }

})();
