/* ============ Preloader ============ */
(function () {
  var preloader = document.getElementById("preloader");
  var flap = document.getElementById("flap");
  var seal = document.getElementById("seal");
  var letter = document.getElementById("letter");

  // confetti hearts inside preloader
  var confetti = document.getElementById("confetti");
  var heartSvg = '<svg class="heart" viewBox="0 0 32 30"><path d="M16 27S3 18.5 3 10.5C3 6 6.5 3 10 3c2.5 0 4.5 1.5 6 4 1.5-2.5 3.5-4 6-4 3.5 0 7 3 7 7.5C29 18.5 16 27 16 27z"/></svg>';
  if (confetti) {
    for (var i = 0; i < 18; i++) {
      var wrap = document.createElement("div");
      wrap.innerHTML = heartSvg;
      var el = wrap.firstChild;
      var size = 10 + (i % 5) * 5;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = ((i * 11 + 7) % 100) + "%";
      el.style.bottom = "-" + (20 + (i % 4) * 10) + "px";
      el.style.animationDelay = ((i % 9) * 0.25) + "s";
      el.style.animationDuration = (6 + (i % 5)) + "s";
      if (i % 4 === 0) el.style.color = "var(--red-deep)";
      confetti.appendChild(el);
    }
  }

  if (flap && seal && letter) {
    setTimeout(function () {
      flap.classList.add("opened");
      seal.classList.add("opened");
      letter.classList.add("opened");
    }, 900);
  }
  
  if (preloader) {
    setTimeout(function () { preloader.classList.add("hide"); }, 3000);
    setTimeout(function () { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 3600);
  }
})();

/* ============ Floating background hearts ============ */
(function () {
  var container = document.getElementById("floating-hearts");
  if (!container) return;
  var heartSvg = '<svg class="heart" viewBox="0 0 32 30"><path d="M16 27S3 18.5 3 10.5C3 6 6.5 3 10 3c2.5 0 4.5 1.5 6 4 1.5-2.5 3.5-4 6-4 3.5 0 7 3 7 7.5C29 18.5 16 27 16 27z"/></svg>';
  for (var i = 0; i < 12; i++) {
    var wrap = document.createElement("div");
    wrap.innerHTML = heartSvg;
    var el = wrap.firstChild;
    var size = 14 + (i % 4) * 6;
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.left = ((i * 8.7) % 100) + "%";
    el.style.animationDelay = ((i * 0.7) % 8) + "s";
    el.style.animationDuration = (8 + (i % 5)) + "s";
    container.appendChild(el);
  }
})();

/* ============ Calendar (June 2026) ============ */
(function () {
  var cal = document.getElementById("calendar");
  if (!cal) return;
  var html = '<div class="cal-title">June 2026</div><div class="cal-grid">';
  var weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  for (var i = 0; i < 7; i++) html += '<div class="cal-weekday">' + weekdays[i] + '</div>';
  var startOffset = 1; // Jun 1, 2026 = Monday (Sun=0)
  for (var s = 0; s < startOffset; s++) html += '<div class="cal-cell"></div>';
  for (var d = 1; d <= 30; d++) {
    if (d === 2) html += '<div class="cal-cell highlight"><span>2</span></div>';
    else html += '<div class="cal-cell"><span>' + d + '</span></div>';
  }
  html += '</div>';
  cal.innerHTML = html;
})();

/* ============ Countdown ============ */
(function () {
  var target = new Date("2026-06-02T17:00:00").getTime();
  var node = document.getElementById("countdown");
  if (!node) return;

  function tick() {
    var diff = Math.max(0, target - Date.now());
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff / 3600000) % 24);
    var m = Math.floor((diff / 60000) % 60);
    var s = Math.floor((diff / 1000) % 60);
    var items = [
      { v: d, l: "days" },
      { v: h, l: "hours" },
      { v: m, l: "minutes" },
      { v: s, l: "seconds" }
    ];
    var html = "";
    for (var i = 0; i < items.length; i++) {
      var v = String(items[i].v).padStart(2, "0");
      html += '<div class="cd-cell"><div class="cd-num">' + v + '</div><div class="cd-lbl">' + items[i].l + '</div></div>';
    }
    node.innerHTML = html;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ============ Toast ============ */
function showToast(message) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(function () { t.classList.remove("show"); }, 3500);
}

/* ============ RSVP + Message form ============ */
var rsvpBtn = document.getElementById("rsvp-btn");
if (rsvpBtn) {
  rsvpBtn.addEventListener("click", function () {
    showToast("Yay! We can't wait to see you 💖");
  });
}

var msgForm = document.getElementById("msg-form");
if (msgForm) {
  msgForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var msgInput = document.getElementById("msg");
    var nameInput = document.getElementById("name");
    var msg = msgInput ? msgInput.value.trim() : "";
    if (!msg) return;
    showToast("Thank you for the sweet words! 💕");
    if (msgInput) msgInput.value = "";
    if (nameInput) nameInput.value = "";
  });
}

/* ============ Music Player ============ */
(function () {
  var audio = document.getElementById("bg-music");
  var btn = document.getElementById("music-control");
  if (!audio || !btn) return;

  var playIcon = btn.querySelector(".play-icon");
  var pauseIcon = btn.querySelector(".pause-icon");
  var hasInteracted = false;

  function removeInteractionListeners() {
    var events = ["click", "touchstart", "keydown", "mousedown", "scroll"];
    events.forEach(function(e) {
      window.removeEventListener(e, startOnInteraction, true);
    });
  }

  function startOnInteraction(e) {
    if (!hasInteracted) {
      // If clicking the button itself, let the button's listener handle it
      if (e && e.target && btn.contains(e.target)) return;

      hasInteracted = true;
      if (audio.paused) {
        audio.play().then(function() {
          btn.classList.add("playing");
          playIcon.style.display = "none";
          pauseIcon.style.display = "block";
          removeInteractionListeners();
        }).catch(function(err) {
          console.log("Autoplay blocked:", err);
          hasInteracted = false; // Reset to try again
        });
      } else {
        removeInteractionListeners();
      }
    }
  }

  function toggleMusic() {
    if (!hasInteracted) {
      hasInteracted = true;
      removeInteractionListeners();
    }
    if (audio.paused) {
      audio.play().then(function() {
        btn.classList.add("playing");
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      }).catch(function(err) {
        console.log("Play failed:", err);
      });
    } else {
      audio.pause();
      btn.classList.remove("playing");
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    }
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMusic();
  });

  var interactionEvents = ["click", "touchstart", "keydown", "mousedown", "scroll"];
  interactionEvents.forEach(function(e) {
    window.addEventListener(e, startOnInteraction, true);
  });
})();
