/* Mobile menu toggle, footer year, stat counters. Plain relative script — works from file:// */
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
  }
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Stat counter: <span data-count-to="1000000" data-count-prefix="$">$1,000,000</span>
     Counts up from 0 the first time it scrolls into view. The final value stays in the
     markup, so no-JS and reduced-motion visitors just see the number. */
  var counters = document.querySelectorAll('[data-count-to]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!counters.length || reduced || !('IntersectionObserver' in window)) return;

  var DURATION = 2200;
  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function format(el, n) {
    return (el.getAttribute('data-count-prefix') || '') + Math.round(n).toLocaleString('en-US');
  }
  function run(el) {
    var target = Number(el.getAttribute('data-count-to'));
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / DURATION, 1);
      el.textContent = format(el, target * easeOutExpo(t));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      run(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(function (el) {
    el.textContent = format(el, 0);
    io.observe(el);
  });
});
