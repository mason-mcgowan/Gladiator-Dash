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

  /* Scope reveal (performativeUI "Goldeneye", made square):
     <div data-scope data-scope-pattern="WORDS · "> with a base layer, a [data-scope-lens] layer
     and an optional [data-scope-reticle]. The lens is clipped to a square that follows the mouse.
     Touch screens never get the lens, so the base layer alone has to read on its own. */
  document.querySelectorAll('[data-scope]').forEach(function (field) {
    var phrase = field.getAttribute('data-scope-pattern') || '';
    field.querySelectorAll('[data-scope-rows]').forEach(function (box) {
      var line = new Array(16).join(phrase);
      for (var i = 0; i < 28; i++) {
        var row = document.createElement('span');
        row.textContent = line;
        box.appendChild(row);
      }
    });

    var lens = field.querySelector('[data-scope-lens]');
    var reticle = field.querySelector('[data-scope-reticle]');
    if (!lens || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    field.classList.add('is-scoped');

    var PARKED = 'polygon(0 0, 0 0, 0 0, 0 0)';
    var x = 0, y = 0, frame = 0;
    function draw() {
      frame = 0;
      var half = Math.min(170, field.clientHeight * 0.36);
      var l = x - half, t = y - half, r = x + half, b = y + half;
      lens.style.clipPath = 'polygon(' + l + 'px ' + t + 'px, ' + r + 'px ' + t + 'px, ' +
        r + 'px ' + b + 'px, ' + l + 'px ' + b + 'px)';
      if (reticle) {
        reticle.style.width = reticle.style.height = (half * 2) + 'px';
        reticle.style.transform = 'translate(' + l + 'px, ' + t + 'px)';
      }
    }
    function park() {
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      lens.style.clipPath = PARKED;
    }
    field.addEventListener('pointermove', function (e) {
      var rect = field.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(draw);
    });
    field.addEventListener('pointerleave', park);
    field.addEventListener('pointercancel', park);
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
