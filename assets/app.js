/* ==========================================================================
   MONO.GE — გვერდის ლოგიკა. ბიბლიოთეკების გარეშე.

   მონაცემები: data/catalog.js (window.CATALOG), ტექსტები: data/i18n.js.
   ამ ფაილში ხდება: ენა, თემა, ჩვენება, ფილტრი, სორტირება და ორი ფანჯარა.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.CATALOG;
  var WHEELS = DATA.wheels;
  var BRANDS = DATA.brands;
  var META = DATA.meta;
  var IMG = "assets/wheels/";
  /* ფოტოს მისამართი. window.PHOTOS-ის არსებობის შემთხვევაში (ერთფაილიანი
     დემო ვერსია) ფოტოები პირდაპირ ფაილშია ჩაშენებული. */
  var photo = function (file) { return (window.PHOTOS && window.PHOTOS[file]) || IMG + file; };
  var STORE_LANG = "mono-lang";
  var STORE_THEME = "mono-theme";

  /* TOP მოდელები: ორი ქალაქური და ორი ფლაგმანი */
  var TOP = ["inmotion-v14-pro", "kingsong-s22-pro", "nosfet-apex", "leaperkim-lynx-s"];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var brandOf = function (id) { return BRANDS.filter(function (b) { return b.id === id; })[0]; };

  /* --- მეხსიერება: გამორთულ localStorage-ზეც უნდა იმუშაოს ------------- */
  function remember(key, value) {
    try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function recall(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* --- ენა -------------------------------------------------------------- */
  var lang = recall(STORE_LANG) === "en" ? "en" : "ka";
  var nf = new Intl.NumberFormat(lang === "ka" ? "ka-GE" : "en-US");

  function t(key, vars) {
    var s = (window.I18N[lang] && window.I18N[lang][key]) || window.I18N.ka[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }
  var loc = function (obj) { return obj && (obj[lang] || obj.ka); };
  var price = function (n) { return nf.format(n) + " ₾"; };
  var monthly = function (n) {
    return nf.format(Math.round((n * META.installmentRate) / META.installmentMonths / 10) * 10) + " ₾";
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* სტატიკური ტექსტები: HTML-ში data-t="key" აქვს, აქედან ვავსებთ */
  function applyStatic() {
    document.documentElement.lang = t("html.lang");
    $$("[data-t]").forEach(function (el) { el.textContent = t(el.dataset.t); });
    $$("[data-t-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.dataset.tAria)); });
    $$("[data-t-title]").forEach(function (el) { el.title = t(el.dataset.tTitle); });
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    nf = new Intl.NumberFormat(lang === "ka" ? "ka-GE" : "en-US");
    remember(STORE_LANG, lang);
    applyStatic();
    render();
    if ($("#sheet").open) $("#sheet").close();
  }

  /* --- თემა: auto (სისტემა), light, dark -------------------------------- */
  function setTheme(mode) {
    if (mode === "auto") {
      delete document.documentElement.dataset.theme;
      remember(STORE_THEME, null);
    } else {
      document.documentElement.dataset.theme = mode;
      remember(STORE_THEME, mode);
    }
    $$("[data-theme-set]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.themeSet === mode));
    });
  }

  /* --- ბარათი ----------------------------------------------------------- */
  function cardHTML(w) {
    var b = brandOf(w.brand);
    var full = b.name + " " + w.model;
    return (
      '<article class="card">' +
        '<button class="card__plate" data-open="' + w.id + '" aria-label="' + esc(full) + '">' +
          (w.badge ? '<span class="badge">' + esc(t("badge." + w.badge)) + "</span>" : "") +
          '<img src="' + photo(w.images[0]) + '" alt="' + esc(full) + '" loading="lazy" decoding="async">' +
        "</button>" +
        '<div class="card__body">' +
          '<span class="card__brand">' + esc(b.name) + "</span>" +
          '<h3 class="card__name">' + esc(w.model) + "</h3>" +
          '<div class="specs">' +
            '<span class="spec">' + nf.format(w.specs.motorW) + " W</span>" +
            '<span class="spec">' + nf.format(w.specs.batteryWh) + " Wh</span>" +
            '<span class="spec">' + w.specs.topSpeedKmh + " " + t("unit.kmh") + "</span>" +
          "</div>" +
          '<span class="stock stock--' + w.stock + '">' + esc(t("stock." + w.stock)) + "</span>" +
          '<div class="card__price">' +
            '<div class="price">' + price(w.priceGel) + (w.oldPriceGel ? "<s>" + price(w.oldPriceGel) + "</s>" : "") + "</div>" +
            '<div class="price__mo">' + t("price.mo", { x: "<b>" + monthly(w.priceGel) + "</b>" }) + "</div>" +
            '<div class="card__acts">' +
              '<button class="btn btn--sm" data-open="' + w.id + '">' + t("cta.details") + "</button>" +
              '<button class="btn btn--sm btn--soft" data-call="' + esc(full) + '">' + t("cta.short") + "</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* --- ჰეროს ფლაგმანები ------------------------------------------------- */
  var flagIdx = 0;
  var flagTimer = null;
  var flagship = BRANDS.map(function (b) {
    return WHEELS.filter(function (w) { return w.brand === b.id; })
      .sort(function (x, y) { return y.priceGel - x.priceGel; })[0];
  });

  function buildFlag() {
    $("#flagStage").innerHTML = flagship.map(function (w, i) {
      var b = brandOf(w.brand);
      return (
        '<div class="flag__slide" data-on="' + (i === flagIdx ? 1 : 0) + '" role="tabpanel" aria-label="' + esc(b.name) + '">' +
          '<div class="flag__plate"><img src="' + photo(w.images[0]) + '" alt="' + esc(b.name + " " + w.model) + '"' + (i ? ' loading="lazy"' : "") + "></div>" +
          '<div class="flag__meta">' +
            "<div>" +
              '<div class="flag__brand">' + esc(b.name) + "</div>" +
              '<div class="flag__name">' + esc(w.model) + "</div>" +
            "</div>" +
            '<div class="flag__price">' + price(w.priceGel) + "<small>" + t("hero.flagship") + "</small></div>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    $("#flagDots").innerHTML = flagship.map(function (w, i) {
      return '<button class="flag__dot" role="tab" aria-selected="' + (i === flagIdx) + '" data-flag="' + i + '">' +
        esc(brandOf(w.brand).name) + "</button>";
    }).join("");
  }

  function showFlag(i) {
    flagIdx = (i + flagship.length) % flagship.length;
    $$("#flagStage .flag__slide").forEach(function (el, n) { el.setAttribute("data-on", n === flagIdx ? "1" : "0"); });
    $$("#flagDots .flag__dot").forEach(function (el, n) { el.setAttribute("aria-selected", String(n === flagIdx)); });
  }

  function autoFlag(on) {
    clearInterval(flagTimer);
    if (on && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flagTimer = setInterval(function () { showFlag(flagIdx + 1); }, 5500);
    }
  }

  /* --- ბრენდების ბენტო -------------------------------------------------- */
  function buildBrands() {
    $("#brandGrid").innerHTML = BRANDS.map(function (b) {
      var mine = WHEELS.filter(function (w) { return w.brand === b.id; });
      var min = Math.min.apply(null, mine.map(function (w) { return w.priceGel; }));
      /* ფილაზე ბრენდის ყველაზე ძვირი მოდელის ფოტოს ვდებთ */
      var star = mine.slice().sort(function (x, y) { return y.priceGel - x.priceGel; })[0];
      return (
        '<a class="tile rise" href="#catalog" data-jump="' + b.id + '">' +
          '<span class="tile__name">' + esc(b.name) + "</span>" +
          '<span class="tile__count">' + t("brands.models", { n: mine.length }) + "</span>" +
          '<span class="tile__tag">' + esc(loc(b.tagline)) + "</span>" +
          '<span class="tile__from">' + t("brands.from", { x: price(min) }) + "</span>" +
          '<span class="tile__shot"><img src="' + photo(star.images[0]) + '" alt="" loading="lazy"></span>' +
        "</a>"
      );
    }).join("");
  }

  /* --- ფილტრი და სორტირება ---------------------------------------------- */
  var filter = "all";

  function buildChips() {
    var all = [{ id: "all", name: t("cat.all") }].concat(BRANDS);
    $("#chips").innerHTML = all.map(function (b) {
      var label = b.id === "all" ? esc(b.name) : '<span class="lat">' + esc(b.name) + "</span>";
      return '<button class="chip" data-filter="' + b.id + '" aria-pressed="' + (b.id === filter) + '">' + label + "</button>";
    }).join("");
  }

  function renderGrid() {
    var by = {
      "price-asc": function (a, b) { return a.priceGel - b.priceGel; },
      "price-desc": function (a, b) { return b.priceGel - a.priceGel; },
      "power-desc": function (a, b) { return b.specs.motorW - a.specs.motorW; },
      "range-desc": function (a, b) { return b.specs.rangeKm - a.specs.rangeKm; }
    };
    var list = WHEELS
      .filter(function (w) { return filter === "all" || w.brand === filter; })
      .sort(by[$("#sort").value]);

    $("#grid").innerHTML = list.map(cardHTML).join("");
    $("#empty").hidden = list.length > 0;
    $$("#chips .chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.filter === filter)); });
    watchRise();
  }

  /* --- პროდუქტის ფანჯარა ------------------------------------------------ */
  function specRows(s) {
    return [
      ["spec.motor", nf.format(s.motorW) + " W"],
      ["spec.peak", s.peakW ? nf.format(s.peakW) + " W" : "—"],
      ["spec.battery", nf.format(s.batteryWh) + " Wh"],
      ["spec.voltage", s.voltage + " V"],
      ["spec.speed", s.topSpeedKmh + " " + t("unit.kmh")],
      ["spec.range", s.rangeKm + " " + t("unit.km")],
      ["spec.tire", s.tire],
      ["spec.susp", s.suspensionMm ? s.suspensionMm + " " + t("unit.mm") : t("spec.none")],
      ["spec.weight", s.weightKg + " " + t("unit.kg")]
    ];
  }

  function openSheet(id) {
    var w = WHEELS.filter(function (x) { return x.id === id; })[0];
    if (!w) return;
    var b = brandOf(w.brand);
    var full = b.name + " " + w.model;

    $("#sheetBody").innerHTML =
      '<div class="sheet__media">' +
        '<div class="sheet__big"><img id="sheetBig" src="' + photo(w.images[0]) + '" alt="' + esc(full) + '"></div>' +
        '<div class="sheet__thumbs">' +
          w.images.map(function (src, i) {
            return '<button data-thumb="' + photo(src) + '" aria-current="' + (i === 0) + '" aria-label="' + esc(t("sheet.photo", { n: i + 1 })) + '">' +
              '<img src="' + photo(src) + '" alt=""></button>';
          }).join("") +
        "</div>" +
      "</div>" +
      '<div class="sheet__info">' +
        '<span class="card__brand">' + esc(b.name) + "</span>" +
        '<h2 class="sheet__name">' + esc(w.model) + "</h2>" +
        '<span class="stock stock--' + w.stock + '">' + esc(t("stock." + w.stock)) + "</span>" +
        '<p class="sheet__blurb">' + esc(loc(w.blurb)) + "</p>" +
        '<div class="price">' + price(w.priceGel) + (w.oldPriceGel ? "<s>" + price(w.oldPriceGel) + "</s>" : "") + "</div>" +
        '<div class="price__mo">' + t("price.moLong", { x: "<b>" + monthly(w.priceGel) + "</b>", n: META.installmentMonths }) + "</div>" +
        '<table class="table"><tbody>' +
          specRows(w.specs).map(function (r) { return "<tr><th>" + t(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") +
        "</tbody></table>" +
        '<div class="sheet__acts">' +
          '<button class="btn" data-call="' + esc(full) + '">' + t("cta.call") + "</button>" +
          '<a class="btn btn--ghost" href="tel:+995500000000">' + t("cta.dial") + "</a>" +
        "</div>" +
        '<p class="note">' + t("sheet.note") + "</p>" +
      "</div>";

    $("#sheet").showModal();
  }

  /* --- ზარის ფორმა ------------------------------------------------------ */
  function openCall(about) {
    var form = $("#callForm");
    var done = $("#callDone");
    if (done) done.remove();
    form.hidden = false;
    $("#callAbout").textContent = about && about !== "true" && about !== "test"
      ? t("form.aboutTopic", { x: about })
      : t("form.about");
    $("#call").showModal();
    $("#cName").focus();
  }

  function validateCall() {
    var ok = true;
    [["#fName", "#cName", function (v) { return v.trim().length >= 2; }, "form.errName"],
     ["#fTel", "#cTel", function (v) { return v.replace(/\D/g, "").length >= 9; }, "form.errTel"]]
      .forEach(function (r) {
        var field = $(r[0]), good = r[2]($(r[1]).value);
        field.classList.toggle("field--bad", !good);
        $(".field__err", field).textContent = good ? "" : t(r[3]);
        if (!good) ok = false;
      });
    return ok;
  }

  /* --- გამოჩენის ანიმაცია ----------------------------------------------- */
  var io = null;
  function watchRise() {
    if (!("IntersectionObserver" in window)) {
      $$(".rise").forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (list) {
        list.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
    }
    $$(".rise:not(.is-in)").forEach(function (el) { io.observe(el); });
  }

  /* --- ჩვენება ---------------------------------------------------------- */
  function render() {
    buildFlag();
    buildBrands();
    buildChips();
    $("#topGrid").innerHTML = TOP.map(function (id) {
      return cardHTML(WHEELS.filter(function (w) { return w.id === id; })[0]);
    }).join("");
    renderGrid();
    $("#fromPrice").textContent = price(Math.min.apply(null, WHEELS.map(function (w) { return w.priceGel; })));
    watchRise();
  }

  /* --- მოვლენები: ერთი listener მთელ დოკუმენტზე ------------------------- */
  document.addEventListener("click", function (e) {
    var hit = function (sel) { return e.target.closest(sel); };
    var el;

    if ((el = hit("[data-open]"))) { openSheet(el.dataset.open); return; }
    if ((el = hit("[data-call]"))) { openCall(el.dataset.call); return; }
    if ((el = hit("[data-lang]"))) { setLang(el.dataset.lang); return; }
    if ((el = hit("[data-theme-set]"))) { setTheme(el.dataset.themeSet); return; }
    if ((el = hit("[data-flag]"))) { showFlag(Number(el.dataset.flag)); autoFlag(true); return; }
    if ((el = hit("[data-thumb]"))) {
      $("#sheetBig").src = el.dataset.thumb;
      $$("#sheetBody .sheet__thumbs button").forEach(function (b) { b.setAttribute("aria-current", String(b === el)); });
      return;
    }
    if ((el = hit("[data-filter]"))) { filter = el.dataset.filter; renderGrid(); return; }
    if ((el = hit("[data-jump]"))) { filter = el.dataset.jump; renderGrid(); return; }
    if ((el = hit("[data-close]"))) { el.closest("dialog").close(); return; }

    if (e.target.id === "burger") {
      var open = $("#nav").classList.toggle("nav--open");
      e.target.setAttribute("aria-expanded", String(open));
    }
  });

  $$("dialog").forEach(function (d) {
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  });

  $("#sort").addEventListener("change", renderGrid);
  $("#nav").addEventListener("click", function (e) {
    if (e.target.tagName === "A") $("#nav").classList.remove("nav--open");
  });
  $(".flag").addEventListener("mouseenter", function () { autoFlag(false); });
  $(".flag").addEventListener("mouseleave", function () { autoFlag(true); });
  $(".flag").addEventListener("focusin", function () { autoFlag(false); });

  $("#callForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateCall()) return;
    /* სერვერი ჯერ არ არის: ვაჩვენებთ დადასტურებას და ფორმას ვასუფთავებთ.
       README-ში წერია, სად უნდა ჩასვა ფორმის სერვისის მისამართი. */
    var name = $("#cName").value.trim();
    var done = document.createElement("div");
    done.id = "callDone";
    done.className = "callform done";
    done.innerHTML =
      '<p class="eyebrow">' + t("form.sent") + "</p>" +
      "<h3>" + esc(t("form.thanks", { x: name })) + "</h3>" +
      '<p class="note">' + t("form.urgent") + ' <a class="num" href="tel:+995500000000">+995 500 00 00 00</a></p>' +
      '<button class="btn btn--sm" type="button" data-close>' + t("cta.close") + "</button>";
    this.hidden = true;
    this.parentNode.appendChild(done);
    this.reset();
  });

  function init() {
    var saved = recall(STORE_THEME);
    setTheme(saved === "dark" || saved === "light" ? saved : "auto");
    applyStatic();
    render();
    autoFlag(true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
