/* ==========================================================================
   ZIPI.GE: ბრაუზერის სკრიპტი. ბიბლიოთეკების გარეშე.

   ყველა ტექსტი, ფასი და ბმული გვერდებზე უკვე მზადაა (tools/build/site.js
   აწყობს). აქ მხოლოდ ინტერაქციაა: თემა, მობილური მენიუ, სლაიდშოუ,
   სორტირება, მოდელების შედარება, ფოტოების გალერეა და სრული ეკრანი.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var STORE_THEME = "zipi-theme";
  var STORE_CMP = "zipi-cmp";
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var fill = function (s, v) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); };

  /* --- მეხსიერება: გამორთულ localStorage-ზეც უნდა იმუშაოს ------------- */
  function remember(key, value) {
    try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function recall(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* --- თემა: ნაგულისხმევად სისტემას მიჰყვება ---------------------------- */
  var sysDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function markTheme() {
    var cur = document.documentElement.dataset.theme || (sysDark && !sysDark.matches ? "light" : "dark");
    $$("[data-theme-set]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.themeSet === cur)); });
  }
  function setTheme(mode) {
    if (mode === "light" || mode === "dark") { document.documentElement.dataset.theme = mode; remember(STORE_THEME, mode); }
    else delete document.documentElement.dataset.theme;
    markTheme();
  }
  if (sysDark) {
    if (sysDark.addEventListener) sysDark.addEventListener("change", markTheme);
    else if (sysDark.addListener) sysDark.addListener(markTheme);
  }

  /* --- შედარება ----------------------------------------------------------
     მონიშნული მოდელები ბრაუზერში ინახება, ამიტომ გვერდიდან გვერდზე გადასვლისას
     არ იკარგება. მონაცემები გვერდზეა: <script id="zipiCmp" type="application/json"> */
  var CMP = null, picks = [], trayNote = null;
  var wheelOf = function (id) { return CMP && CMP.w.filter(function (w) { return w.id === id; })[0]; };
  var picked = function (id) { return picks.indexOf(id) !== -1; };

  function loadPicks() {
    var raw = recall(STORE_CMP), list = [];
    try { list = JSON.parse(raw) || []; } catch (e) { list = []; }
    picks = list.filter(function (id) { return wheelOf(id); }).slice(0, CMP.max);
  }
  function togglePick(id) {
    if (picked(id)) picks = picks.filter(function (x) { return x !== id; });
    else if (picks.length < CMP.max) picks = picks.concat(id);
    else { flashTray(fill(CMP.s["cmp.max"], { n: CMP.max })); return; }
    remember(STORE_CMP, JSON.stringify(picks));
    syncPicks();
  }
  function syncPicks() {
    $$("[data-pick]").forEach(function (b) {
      if (b.classList.contains("tray__pick") || b.classList.contains("cmp__drop")) return;
      var on = picked(b.dataset.pick);
      b.setAttribute("aria-pressed", String(on));
      b.textContent = on ? CMP.s["cmp.added"] : CMP.s["cmp.add"];
    });
    renderTray();
    var dlg = $("#cmp");
    if (dlg && dlg.open) { if (picks.length < 2) dlg.close(); else renderCompare(); }
  }
  function renderTray() {
    var tray = $("#tray");
    if (!tray) return;
    tray.hidden = picks.length === 0;
    document.body.classList.toggle("has-tray", picks.length > 0);
    $("#trayPicks").innerHTML =
      '<span class="tray__label">' + esc(fill(CMP.s["cmp.tray"], { n: picks.length, m: CMP.max })) + "</span>" +
      picks.map(function (id) {
        var w = wheelOf(id);
        return '<button class="tray__pick" data-pick="' + id + '" aria-label="' + esc(fill(CMP.s["cmp.remove"], { x: w.b + " " + w.m })) + '">' +
          esc(w.m) + ' <span aria-hidden="true">✕</span></button>';
      }).join("");
    var go = $("#trayGo");
    go.disabled = picks.length < 2;
    go.textContent = picks.length < 2 ? CMP.s["cmp.needTwo"] : fill(CMP.s["cmp.go"], { n: picks.length });
  }
  function flashTray(msg) {
    var label = $(".tray__label");
    if (!label) return;
    label.textContent = msg;
    label.classList.add("tray__label--warn");
    clearTimeout(trayNote);
    trayNote = setTimeout(renderTray, 2200);
  }
  /* ცხრილი: .is-diff სტრიქონი, სადაც მოდელები განსხვავდება; .is-best საუკეთესო მნიშვნელობა */
  function renderCompare() {
    var list = picks.map(wheelOf);
    var onlyDiff = $("#cmpOnly").checked;
    var head = "<thead><tr><th></th>" + list.map(function (w) {
      return '<th scope="col"><a class="cmp__plate" href="' + w.u + '"><img src="' + w.i + '" alt=""></a>' +
        '<span class="card__brand">' + esc(w.b) + '</span><a class="cmp__name" href="' + w.u + '">' + esc(w.m) + "</a>" +
        '<button class="cmp__drop" data-pick="' + w.id + '">' + esc(CMP.s["cmp.removeShort"]) + "</button></th>";
    }).join("") + "</tr></thead>";
    var body = CMP.rows.map(function (r, ri) {
      var shown = list.map(function (w) { return w.v[ri]; });
      var diff = shown.some(function (s) { return s !== shown[0]; });
      if (onlyDiff && !diff) return "";
      var nums = r.b && diff ? list.map(function (w) { return w.n[ri]; }) : [];
      var known = nums.filter(function (n) { return n != null && n !== 0; });
      var top = known.length > 1 ? (r.b === "high" ? Math.max : Math.min).apply(null, known) : null;
      return '<tr class="' + (diff ? "is-diff" : "") + '"><th scope="row">' + esc(r.l) + "</th>" +
        list.map(function (w, i) {
          return '<td class="' + (top != null && nums[i] === top ? "is-best" : "") + '">' + esc(shown[i]) + "</td>";
        }).join("") + "</tr>";
    }).join("");
    var acts = "<tr><th></th>" + list.map(function (w) {
      return '<td><a class="btn btn--sm" href="' + esc(w.wa) + '" target="_blank" rel="noopener">' + esc(CMP.s["cta.waShort"]) + "</a></td>";
    }).join("") + "</tr>";
    $("#cmpBody").innerHTML = '<table class="cmp__table" style="--cols:' + list.length + '">' + head + "<tbody>" + body + acts + "</tbody></table>";
  }
  function openCompare() {
    if (picks.length < 2) return;
    renderCompare();
    $("#cmp").showModal();
  }

  /* --- სლაიდშოუ (მთავარი გვერდი) ------------------------------------------ */
  var flagIdx = 0, flagTimer = null, slides = [], dots = [];
  function showFlag(i) {
    if (!slides.length) return;
    flagIdx = (i + slides.length) % slides.length;
    slides.forEach(function (el, n) {
      var on = n === flagIdx;
      el.setAttribute("data-on", on ? "1" : "0");
      el.setAttribute("aria-hidden", String(!on));
      el.tabIndex = on ? 0 : -1;
    });
    dots.forEach(function (el, n) { el.setAttribute("aria-selected", String(n === flagIdx)); });
  }
  function autoFlag(on) {
    clearInterval(flagTimer);
    if (on && slides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flagTimer = setInterval(function () { showFlag(flagIdx + 1); }, 4500);
    }
  }
  function initFlag() {
    var stage = $("#flagStage");
    if (!stage) return;
    slides = $$(".flag__slide", stage);
    dots = $$("#flagDots .flag__dot");
    var flag = $(".flag");
    flag.addEventListener("mouseenter", function () { autoFlag(false); });
    flag.addEventListener("mouseleave", function () { autoFlag(true); });
    flag.addEventListener("focusin", function () { autoFlag(false); });

    /* ტელეფონზე: მარცხნივ გადასმა = შემდეგი, მარჯვნივ = წინა */
    var sx = null, sy = null, swiped = false;
    stage.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) { sx = null; return; }
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiped = false;
      autoFlag(false);
    }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) { swiped = true; showFlag(flagIdx + (dx < 0 ? 1 : -1)); }
      autoFlag(true);
    }, { passive: true });
    stage.addEventListener("touchcancel", function () { sx = null; autoFlag(true); }, { passive: true });

    /* კომპიუტერზე: მაუსით გადათრევა = swipe; გადათრევის შემდეგ ბმული არ იხსნება */
    var dx0 = null, dy0 = null, dragged = false;
    stage.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0 || e.target.closest(".flag__arrow")) return;
      dx0 = e.clientX; dy0 = e.clientY; dragged = false;
    });
    window.addEventListener("pointermove", function (e) {
      if (dx0 === null) return;
      if (Math.abs(e.clientX - dx0) > 8) { dragged = true; stage.classList.add("is-drag"); }
    });
    window.addEventListener("pointerup", function (e) {
      if (dx0 === null) return;
      var dx = e.clientX - dx0, dy = e.clientY - dy0;
      dx0 = null;
      stage.classList.remove("is-drag");
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) showFlag(flagIdx + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener("click", function (e) {
      if (!dragged && !swiped) return;
      dragged = false; swiped = false;
      e.stopPropagation(); e.preventDefault();
    }, true);
    stage.addEventListener("dragstart", function (e) { e.preventDefault(); });
    autoFlag(true);
  }

  /* --- სორტირება (კატალოგი) ---------------------------------------------- */
  function initSort() {
    var sel = $("#sort"), grid = $("#grid");
    if (!sel || !grid) return;
    var by = {
      "price-asc": function (a, b) { return a.dataset.price - b.dataset.price; },
      "price-desc": function (a, b) { return b.dataset.price - a.dataset.price; },
      "power-desc": function (a, b) { return b.dataset.power - a.dataset.power; },
      "range-desc": function (a, b) { return b.dataset.range - a.dataset.range; }
    };
    sel.addEventListener("change", function () {
      $$(".card", grid).sort(by[sel.value]).forEach(function (c) { grid.appendChild(c); });
    });
  }

  /* --- ქვეკატეგორიები (ნაწილები, აქსესუარები...): #ქვე/ქვე ფილტრავს -------- */
  function initSubcats() {
    var box = $(".subcats[data-root]");
    if (!box) return;
    var root = box.dataset.root;
    function apply() {
      var key = decodeURIComponent(location.hash.slice(1)) || root;
      if (key.split("/")[0] !== root) key = root;
      $$("[data-sub]", box).forEach(function (a) {
        a.setAttribute("aria-current", String(a.dataset.sub === key));
        /* ღრმა დონის რიგი მხოლოდ მაშინ ჩანს, როცა მისი მშობელია არჩეული */
      });
      $$(".chips", box).forEach(function (row) {
        var first = $("[data-sub]", row);
        var parent = first ? first.dataset.sub : root;
        row.hidden = !(key === parent || key.indexOf(parent + "/") === 0);
      });
      $$(".card[data-cat]").forEach(function (c) {
        var k = c.dataset.cat;
        c.hidden = !(k === key || k.indexOf(key + "/") === 0);
      });
    }
    window.addEventListener("hashchange", apply);
    apply();
  }

  /* --- ფოტოები და სრული ეკრანი (მოდელის გვერდი) --------------------------- */
  var thumbs = [], viewIdx = 0;
  function showPhoto(i) {
    if (!thumbs.length) return;
    viewIdx = (i + thumbs.length) % thumbs.length;
    var big = $("#pBig");
    if (big) { big.removeAttribute("srcset"); big.src = thumbs[viewIdx].dataset.src; }
    thumbs.forEach(function (b, n) { b.setAttribute("aria-current", String(n === viewIdx)); });
    var v = $("#viewer");
    if (v && v.open) {
      $("#viewerImg").src = thumbs[viewIdx].dataset.full;
      $("#viewerCount").textContent = (viewIdx + 1) + " / " + thumbs.length;
    }
  }
  function openView() {
    var v = $("#viewer");
    if (!v || !thumbs.length) return;
    $("#viewerImg").alt = ($("#pBig") || {}).alt || "";
    v.classList.toggle("viewer--one", thumbs.length < 2);
    v.showModal();
    showPhoto(viewIdx);
  }
  function initGallery() {
    thumbs = $$(".sheet__thumbs [data-thumb]");
    var v = $("#viewer");
    if (!v) return;
    v.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { showPhoto(viewIdx + 1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { showPhoto(viewIdx - 1); e.preventDefault(); }
    });
    var stage = $("#viewerStage"), x0 = null, y0 = null, swiped = false;
    stage.addEventListener("click", function (e) { if (e.target === stage && !swiped) v.close(); });
    stage.addEventListener("pointerdown", function (e) { if (e.button === 0) { x0 = e.clientX; y0 = e.clientY; swiped = false; } });
    stage.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0, dy = e.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) { swiped = true; showPhoto(viewIdx + (dx < 0 ? 1 : -1)); }
    });
    stage.addEventListener("pointercancel", function () { x0 = null; });
  }

  /* --- მოვლენები: ერთი listener მთელ დოკუმენტზე -------------------------- */
  document.addEventListener("click", function (e) {
    var hit = function (sel) { return e.target.closest(sel); };
    var el;
    if (CMP && (el = hit("[data-pick]"))) { togglePick(el.dataset.pick); return; }
    if (hit("[data-cmp-open]")) { openCompare(); return; }
    if (CMP && hit("[data-cmp-clear]")) { picks = []; remember(STORE_CMP, null); syncPicks(); return; }
    if ((el = hit("[data-flag-step]"))) { showFlag(flagIdx + Number(el.dataset.flagStep)); autoFlag(false); return; }
    if ((el = hit("[data-flag]"))) { showFlag(Number(el.dataset.flag)); autoFlag(true); return; }
    if ((el = hit("[data-theme-set]"))) { setTheme(el.dataset.themeSet); return; }
    if ((el = hit("[data-thumb]"))) { showPhoto(Number(el.dataset.thumb)); return; }
    if (hit("[data-view-open]")) { openView(); return; }
    if ((el = hit("[data-view-step]"))) { showPhoto(viewIdx + Number(el.dataset.viewStep)); return; }
    if ((el = hit("[data-close]"))) { el.closest("dialog").close(); return; }
    if ((el = hit("[data-nav-toggle]"))) {
      el.setAttribute("aria-expanded", String(el.closest(".nav__drop").classList.toggle("nav__drop--open")));
      return;
    }
    if ((el = hit("[data-sub-toggle]"))) {
      el.setAttribute("aria-expanded", String(el.closest(".nav__sub").classList.toggle("nav__sub--open")));
      return;
    }
    if (e.target.id === "burger") {
      var open = $("#nav").classList.toggle("nav--open");
      e.target.setAttribute("aria-expanded", String(open));
      navOpenY = window.pageYOffset;
    }
  });

  /* მობილური მენიუ: გვერდის ჩამოსქროლვისას თავისით იკეცება (30px-მდე რყევაზე არა) */
  var navOpenY = 0;
  window.addEventListener("scroll", function () {
    var nav = $("#nav");
    if (!nav || !nav.classList.contains("nav--open")) return;
    if (Math.abs(window.pageYOffset - navOpenY) < 30) return;
    nav.classList.remove("nav--open");
    $("#burger").setAttribute("aria-expanded", "false");
  }, { passive: true });

  function init() {
    setTheme(recall(STORE_THEME));
    $$("dialog").forEach(function (d) {
      d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
    });
    var data = $("#zipiCmp");
    if (data) {
      try { CMP = JSON.parse(data.textContent); } catch (e) { CMP = null; }
      if (CMP) { loadPicks(); syncPicks(); $("#cmpOnly").addEventListener("change", renderCompare); }
    }
    initFlag();
    initSort();
    initSubcats();
    initGallery();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
