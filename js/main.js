/* EmailJS (optional): fill the IDs below to send through EmailJS; leave any blank to fall back to mailto. */
var EMAILJS_PUBLIC_KEY        = '';
var EMAILJS_SERVICE_ID        = '';
var EMAILJS_CONTACT_TEMPLATE  = '';
var EMAILJS_LEAD_TEMPLATE     = '';

(function () {
  'use strict';

  var navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    window.addEventListener('scroll', function () {
      navWrap.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      var expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('a:not(.mobile-services-toggle)').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var servicesToggle = document.querySelector('.mobile-services-toggle');
  var mobileSubmenu = document.querySelector('.mobile-submenu');

  if (servicesToggle && mobileSubmenu) {
    servicesToggle.addEventListener('click', function (e) {
      e.preventDefault();
      servicesToggle.classList.toggle('open');
      mobileSubmenu.classList.toggle('open');
    });
  }

  var dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    dropdown.addEventListener('click', function (e) {
      if (window.innerWidth < 1024) return;
      var toggle = e.target.closest('.nav-dropdown-toggle');
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

  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(function (el) { fadeObserver.observe(el); });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  var marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack && !prefersReduced && 'IntersectionObserver' in window) {
    var marqueeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        marqueeTrack.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0 });
    marqueeObserver.observe(marqueeTrack);
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
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
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function (el) { counterObserver.observe(el); });
  } else {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      el.textContent = prefix + target.toLocaleString() + suffix;
    });
  }

  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  var scrollTopBtn = document.createElement('button');
  scrollTopBtn.type = 'button';
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="6 14 12 8 18 14"></polyline></svg>';
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', function () {
    scrollTopBtn.classList.toggle('scroll-top--visible', window.scrollY > 600);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  var EMAILJS_READY = false;
  function loadEmailJS(cb) {
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID) { cb(false); return; }
    if (window.emailjs) {
      try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch (e) {}
      EMAILJS_READY = true; cb(true); return;
    }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.async = true;
    s.onload = function () {
      try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); EMAILJS_READY = true; cb(true); }
      catch (e) { cb(false); }
    };
    s.onerror = function () { cb(false); };
    document.head.appendChild(s);
  }
  if (EMAILJS_PUBLIC_KEY) loadEmailJS(function () {});

  function showFormError(form, message) {
    var err = form.querySelector('.form-error');
    if (err) {
      err.innerHTML = '<i class="fas fa-exclamation-circle" aria-hidden="true"></i>' + message;
      err.classList.add('show');
    }
  }
  function hideFormError(form) {
    var err = form.querySelector('.form-error');
    if (err) err.classList.remove('show');
  }
  function sendMailto(form, subject) {
    var formData = new FormData(form);
    var body = '';
    formData.forEach(function (value, key) {
      if (key === '_gotcha') return;
      body += key + ': ' + value + '\n';
    });
    var mailto = 'mailto:service@northernclimatesudbury.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailto;
  }
  function honeypotTripped(form) {
    var hp = form.querySelector('[name="_gotcha"]');
    return hp && hp.value && hp.value.length > 0;
  }

  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      hideFormError(contactForm);
      if (honeypotTripped(contactForm)) return;

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      function done(success) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        if (success) {
          contactForm.reset();
          if (formSuccess) formSuccess.classList.add('show');
          setTimeout(function () { window.location.href = 'thank-you.html'; }, 1400);
        }
      }

      if (EMAILJS_READY && EMAILJS_CONTACT_TEMPLATE) {
        window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE, contactForm)
          .then(function () { done(true); })
          .catch(function () {
            showFormError(contactForm, 'We couldn\'t send your message. Opening your email client as a backup.');
            sendMailto(contactForm, 'Quote Request from ' + (contactForm.querySelector('[name="firstName"]') || {}).value);
            done(false);
          });
      } else {
        sendMailto(contactForm, 'Quote Request from ' + ((contactForm.querySelector('[name="firstName"]') || {}).value || 'website'));
        done(true);
      }
    });
  }

  var leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      hideFormError(leadForm);
      if (honeypotTripped(leadForm)) return;

      var submitBtn = leadForm.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      function done(success) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        if (success) {
          leadForm.reset();
          setTimeout(function () { window.location.href = 'thank-you.html'; }, 800);
        }
      }

      if (EMAILJS_READY && EMAILJS_LEAD_TEMPLATE) {
        window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_LEAD_TEMPLATE, leadForm)
          .then(function () { done(true); })
          .catch(function () {
            showFormError(leadForm, 'We couldn\'t send your request. Opening your email client as a backup.');
            sendMailto(leadForm, 'Quick Quote Request');
            done(false);
          });
      } else {
        sendMailto(leadForm, 'Quick Quote Request');
        done(true);
      }
    });
  }

})();
