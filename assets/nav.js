/* Mobile menu toggle, footer year, Giveback effects and stat counters.
   Plain relative script — works from file://. Each block only runs if its markup is on the page. */
document.addEventListener('DOMContentLoaded', function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* Word roll (performativeUI "WordRoll"): <span data-word-roll> holding .word-roll__word spans,
     the first marked .is-active. Every 2.2s the active word rolls up and the next rolls in.
     With reduced motion the first word just stays put. */
  document.querySelectorAll('[data-word-roll]').forEach(function (roll) {
    var words = roll.querySelectorAll('.word-roll__word');
    if (words.length < 2 || reduced) return;
    var i = 0;
    setInterval(function () {
      words.forEach(function (w) { w.classList.remove('is-past'); });
      words[i].classList.remove('is-active');
      words[i].classList.add('is-past');
      i = (i + 1) % words.length;
      words[i].classList.add('is-active');
    }, 2200);
  });

  /* Stat counter: <span data-count-to="1000000" data-count-prefix="$">$1,000,000</span>
     Counts up from 0 the first time it scrolls into view. The final value stays in the
     markup, so no-JS and reduced-motion visitors just see the number. */
  var counters = document.querySelectorAll('[data-count-to]');
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
