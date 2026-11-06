/* ==========================================================================
   ZIPI.GE: გვერდის ლოგიკა. ბიბლიოთეკების გარეშე.

   მონაცემები: data/catalog.js (window.CATALOG), ტექსტები: data/i18n.js.
   ამ ფაილში ხდება: ენა, თემა, ჩვენება, ფილტრი, სორტირება, WhatsApp-ის
   ბმულები, პროდუქტის ფანჯარა და მოდელების შედარება.
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
  var STORE_LANG = "zipi-lang";
  var STORE_THEME = "zipi-theme";

  /* TOP მოდელები: ორი ქალაქური და ორი ფლაგმანი */
  var TOP = ["nosfet-aero", "nosfet-aeon", "nosfet-apex", "leaperkim-sherman-p"];

  /* შედარებაში ერთდროულად მაქსიმუმ ამდენი მოდელი ეტევა: მეტი ტელეფონზე
     უკვე წაუკითხავი ხდება */
  var CMP_MAX = 4;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var brandOf = function (id) { return BRANDS.filter(function (b) { return b.id === id; })[0]; };
  var wheelOf = function (id) { return WHEELS.filter(function (w) { return w.id === id; })[0]; };
  var fullName = function (w) { return brandOf(w.brand).name + " " + w.model; };

  /* --- მეხსიერება: გამორთულ localStorage-ზეც უნდა იმუშაოს ------------- */
  function remember(key, value) {
    try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function recall(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* --- ენა: ნაგულისხმევად ქართული; ინგლისური მხოლოდ ვიზიტორის არჩევით -- */
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

  /* --- WhatsApp ----------------------------------------------------------
     ზარის ფორმის ნაცვლად ყველა ღილაკი WhatsApp-ის ჩატს ხსნის, უკვე
     შევსებული შეტყობინებით: ზოგადი მისალმება, ტესტ-სვლა ან კონკრეტული
     მოდელი. ნომერი catalog.js-ის meta.whatsapp-შია (მხოლოდ ციფრები). */
  function waHref(topic) {
    var text = topic === "test" ? t("wa.test")
      : topic ? t("wa.model", { x: topic })
      : t("wa.hello");
    return "https://wa.me/" + META.whatsapp + "?text=" + encodeURIComponent(text);
  }
  var waAttrs = function (topic) {
    return 'href="' + esc(waHref(topic)) + '" target="_blank" rel="noopener"';
  };

  /* სტატიკური ტექსტები: HTML-ში data-t="key" აქვს, აქედან ვავსებთ */
  function applyStatic() {
    document.documentElement.lang = t("html.lang");
    $$("[data-t]").forEach(function (el) { el.textContent = t(el.dataset.t); });
    $$("[data-t-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.dataset.tAria)); });
    $$("[data-t-title]").forEach(function (el) { el.title = t(el.dataset.tTitle); });
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    /* HTML-ში მდგარ WhatsApp ბმულებს შეტყობინებას არჩეულ ენაზე ვუწერთ */
    $$("a[data-wa]").forEach(function (a) { a.href = waHref(a.dataset.wa); });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    nf = new Intl.NumberFormat(lang === "ka" ? "ka-GE" : "en-US");
    remember(STORE_LANG, lang);
    applyStatic();
    render();
    if ($("#sheet").open) $("#sheet").close();
    if ($("#cmp").open) renderCompare();
  }

  /* --- თემა: dark (ნაგულისხმევი), light, auto (სისტემა) -----------------
     არჩევანი ყოველთვის ინახება, "auto"-ც, რადგან ცარიელი მეხსიერება
     ახლა "მუქს" ნიშნავს და არა "სისტემურს". */
  function setTheme(mode) {
    if (mode === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = mode;
    remember(STORE_THEME, mode);
    $$("[data-theme-set]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.themeSet === mode));
    });
  }

  /* --- შედარების მდგომარეობა ------------------------------------------- */
  var picks = [];
  var picked = function (id) { return picks.indexOf(id) !== -1; };

  function togglePick(id) {
    if (picked(id)) picks = picks.filter(function (x) { return x !== id; });
    else if (picks.length < CMP_MAX) picks = picks.concat(id);
    else { flashTray(t("cmp.max", { n: CMP_MAX })); return; }
    syncPicks();
  }

  /* ყველა ადგილას, სადაც შედარების ღილაკი ჩანს, მდგომარეობას ვაახლებთ
     მთლიანი გადახატვის გარეშე, რომ ბარათების ანიმაცია არ თავიდან დაიწყოს */
  function syncPicks() {
    $$("[data-pick]").forEach(function (b) {
      var on = picked(b.dataset.pick);
      b.setAttribute("aria-pressed", String(on));
      b.textContent = on ? t("cmp.added") : t("cmp.add");
    });
    renderTray();
    if ($("#cmp").open) {
      if (picks.length < 2) $("#cmp").close();
      else renderCompare();
    }
  }

  /* --- ბარათი ----------------------------------------------------------- */
  function cardHTML(w) {
    var b = brandOf(w.brand);
    var full = fullName(w);
    return (
      '<article class="card">' +
        '<button class="card__plate" data-open="' + w.id + '" aria-label="' + esc(full) + '">' +
          (w.badge ? '<span class="badge">' + esc(t("badge." + w.badge)) + "</span>" : "") +
          '<img src="' + photo(w.images[0]) + '" alt="' + esc(full) + '" loading="lazy" decoding="async">' +
        "</button>" +
        /* შედარების ღილაკი ფოტოს კუთხეშია, მაგრამ ფოტოს ღილაკის გარეთ:
           ღილაკი ღილაკში HTML-ში დაუშვებელია */
        '<button class="pick" data-pick="' + w.id + '" aria-pressed="' + picked(w.id) + '">' +
          (picked(w.id) ? t("cmp.added") : t("cmp.add")) + "</button>" +
        '<div class="card__body">' +
          '<span class="card__brand">' + esc(b.name) + "</span>" +
          '<h3 class="card__name">' + esc(w.model) + "</h3>" +
          '<div class="specs">' +
            '<span class="spec">' + nf.format(w.specs.motorW) + " W</span>" +
            '<span class="spec">' + nf.format(w.specs.batteryWh) + " Wh</span>" +
            '<span class="spec">' + w.specs.topSpeedKmh + " " + t("unit.kmh") + "</span>" +
          "</div>" +
          '<div class="card__tags">' +
            '<span class="stock stock--' + w.stock + '">' + esc(t("stock." + w.stock)) + "</span>" +
            '<span class="warr">' + esc(t("warranty.short", { n: META.warrantyMonths })) + "</span>" +
          "</div>" +
          '<div class="card__price">' +
            '<div class="price">' + price(w.priceGel) + (w.oldPriceGel ? "<s>" + price(w.oldPriceGel) + "</s>" : "") + "</div>" +
            '<div class="price__mo">' + t("price.mo", { x: "<b>" + monthly(w.priceGel) + "</b>" }) + "</div>" +
            '<div class="card__acts">' +
              '<button class="btn btn--sm" data-open="' + w.id + '">' + t("cta.details") + "</button>" +
              '<a class="btn btn--sm btn--soft" ' + waAttrs(full) + ">" + t("cta.waShort") + "</a>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* --- ჰეროს ფლაგმანები: თითო ბრენდის ყველაზე ძვირი მოდელი ------------- */
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
          '<div class="flag__plate"><img src="' + photo(w.images[0]) + '" alt="' + esc(fullName(w)) + '"' + (i ? ' loading="lazy"' : "") + "></div>" +
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

  /* --- მახასიათებლების სტრიქონები ---------------------------------------
     ერთი სია ემსახურება პროდუქტის ფანჯარასაც და შედარების ცხრილსაც.
     num: რიცხვი, რომლითაც "საუკეთესოს" ვარჩევთ (null = შედარებაში არ მონაწილეობს)
     show: ეკრანზე გამოსაჩენი ტექსტი
     best: "high": მეტი სჯობს, "low": ნაკლები სჯობს, null: მხოლოდ ტექსტია
     onlyCmp: მხოლოდ შედარების ცხრილში ჩანს (ფასი ფანჯარაში ისედაც დიდად წერია) */
  var dash = "—";
  var unit = function (v, u) { return v == null ? dash : nf.format(v) + " " + u; };

  function rows() {
    return [
      { k: "spec.price", onlyCmp: true, best: "low", num: function (w) { return w.priceGel; }, show: function (w) { return price(w.priceGel); } },
      { k: "spec.motor", best: "high", num: function (w) { return w.specs.motorW; }, show: function (w) { return unit(w.specs.motorW, "W"); } },
      { k: "spec.peak", best: "high", num: function (w) { return w.specs.peakW; }, show: function (w) { return unit(w.specs.peakW, "W"); } },
      { k: "spec.battery", best: "high", num: function (w) { return w.specs.batteryWh; }, show: function (w) { return unit(w.specs.batteryWh, "Wh"); } },
      { k: "spec.voltage", best: "high", num: function (w) { return w.specs.voltage; }, show: function (w) { return unit(w.specs.voltage, "V"); } },
      { k: "spec.cells", best: null, show: function (w) { return w.specs.cells || dash; } },
      { k: "spec.speed", best: "high", num: function (w) { return w.specs.topSpeedKmh; }, show: function (w) { return unit(w.specs.topSpeedKmh, t("unit.kmh")); } },
      { k: "spec.range", best: "high", num: function (w) { return w.specs.rangeKm; }, show: function (w) { return unit(w.specs.rangeKm, t("unit.km")); } },
      { k: "spec.tire", best: null, show: function (w) { return w.specs.tire || dash; } },
      { k: "spec.susp", best: "high", num: function (w) { return w.specs.suspensionMm; },
        show: function (w) { return w.specs.suspensionMm ? unit(w.specs.suspensionMm, t("unit.mm")) : t("spec.none"); } },
      { k: "spec.suspType", best: null, show: function (w) { return w.specs.suspType ? t("susp." + w.specs.suspType) : dash; } },
      { k: "spec.weight", best: "low", num: function (w) { return w.specs.weightKg; }, show: function (w) { return unit(w.specs.weightKg, t("unit.kg")); } },
      { k: "spec.charger", best: "high", num: function (w) { return w.specs.chargerA; }, show: function (w) { return unit(w.specs.chargerA, "A"); } },
      { k: "spec.load", best: "high", num: function (w) { return w.specs.maxLoadKg; }, show: function (w) { return unit(w.specs.maxLoadKg, t("unit.kg")); } },
      { k: "spec.climb", best: "high", num: function (w) { return w.specs.climbDeg; }, show: function (w) { return w.specs.climbDeg == null ? dash : w.specs.climbDeg + "°"; } },
      { k: "spec.ip", best: null, show: function (w) { return w.specs.ip || dash; } },
      { k: "spec.warranty", best: null, show: function () { return t("warranty.long", { n: META.warrantyMonths }); } }
    ];
  }

  /* --- პროდუქტის ფანჯარა ------------------------------------------------ */
  function openSheet(id) {
    var w = wheelOf(id);
    if (!w) return;
    var b = brandOf(w.brand);
    var full = fullName(w);
    var feats = loc(w.features) || [];

    $("#sheetBody").innerHTML =
      '<div class="sheet__media">' +
        '<div class="sheet__big"><img id="sheetBig" src="' + photo(w.images[0]) + '" alt="' + esc(full) + '"></div>' +
        '<div class="sheet__thumbs">' +
          w.images.map(function (src, i) {
            return '<button data-thumb="' + photo(src) + '" aria-current="' + (i === 0) + '" aria-label="' + esc(t("sheet.photo", { n: i + 1 })) + '">' +
              '<img src="' + photo(src) + '" alt=""></button>';
          }).join("") +
        "</div>" +
        (feats.length
          ? '<ul class="feats">' + feats.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>"
          : "") +
      "</div>" +
      '<div class="sheet__info">' +
        '<span class="card__brand">' + esc(b.name) + "</span>" +
        '<h2 class="sheet__name">' + esc(w.model) + "</h2>" +
        '<div class="card__tags">' +
          '<span class="stock stock--' + w.stock + '">' + esc(t("stock." + w.stock)) + "</span>" +
          '<span class="warr">' + esc(t("warranty.short", { n: META.warrantyMonths })) + "</span>" +
        "</div>" +
        '<p class="sheet__blurb">' + esc(loc(w.blurb)) + "</p>" +
        '<div class="price">' + price(w.priceGel) + (w.oldPriceGel ? "<s>" + price(w.oldPriceGel) + "</s>" : "") + "</div>" +
        '<div class="price__mo">' + t("price.moLong", { x: "<b>" + monthly(w.priceGel) + "</b>", n: META.installmentMonths }) + "</div>" +
        '<table class="table"><tbody>' +
          rows().filter(function (r) { return !r.onlyCmp; })
            .map(function (r) { return "<tr><th>" + t(r.k) + "</th><td>" + esc(r.show(w)) + "</td></tr>"; }).join("") +
        "</tbody></table>" +
        '<div class="sheet__acts">' +
          '<a class="btn" ' + waAttrs(full) + ">" + t("cta.wa") + "</a>" +
          '<button class="btn btn--ghost" data-pick="' + w.id + '" aria-pressed="' + picked(w.id) + '">' +
            (picked(w.id) ? t("cmp.added") : t("cmp.add")) + "</button>" +
        "</div>" +
        '<p class="note">' + t("sheet.note") + "</p>" +
      "</div>";

    $("#sheet").showModal();
  }

  /* --- შედარების ზოლი (ეკრანის ქვემოთ) -------------------------------- */
  var trayNote = null;

  function renderTray() {
    var tray = $("#tray");
    tray.hidden = picks.length === 0;
    document.body.classList.toggle("has-tray", picks.length > 0);
    $("#trayPicks").innerHTML =
      '<span class="tray__label">' + esc(t("cmp.tray", { n: picks.length, m: CMP_MAX })) + "</span>" +
      picks.map(function (id) {
        var w = wheelOf(id);
        return '<button class="tray__pick" data-pick="' + id + '" aria-pressed="true" aria-label="' +
          esc(t("cmp.remove", { x: fullName(w) })) + '">' + esc(w.model) + ' <span aria-hidden="true">✕</span></button>';
      }).join("");
    var go = $("#trayGo");
    go.disabled = picks.length < 2;
    go.textContent = picks.length < 2 ? t("cmp.needTwo") : t("cmp.go", { n: picks.length });
  }

  /* ზღვარს რომ გადააჭარბებს, ზოლში მოკლე შენიშვნას ვაჩვენებთ */
  function flashTray(msg) {
    var label = $(".tray__label");
    if (!label) return;
    label.textContent = msg;
    label.classList.add("tray__label--warn");
    clearTimeout(trayNote);
    trayNote = setTimeout(renderTray, 2200);
  }

  /* --- შედარების ცხრილი ------------------------------------------------
     ორი ტიპის მონიშვნა:
       1) სტრიქონი .is-diff: მოდელებს ამ მახასიათებელში სხვადასხვა მნიშვნელობა აქვთ;
       2) უჯრა .is-best: საუკეთესო მნიშვნელობა ამ სტრიქონში (მაგ. ყველაზე
          მსუბუქი, ყველაზე დიდი ბატარეა). თუ ყველა ტოლია, საუკეთესოს არ ვნიშნავთ. */
  function renderCompare() {
    var list = picks.map(wheelOf);
    var onlyDiff = $("#cmpOnly").checked;

    var head =
      "<thead><tr><th></th>" +
        list.map(function (w) {
          return '<th scope="col">' +
            '<div class="cmp__plate"><img src="' + photo(w.images[0]) + '" alt=""></div>' +
            '<span class="card__brand">' + esc(brandOf(w.brand).name) + "</span>" +
            '<span class="cmp__name">' + esc(w.model) + "</span>" +
            '<button class="cmp__drop" data-pick="' + w.id + '" aria-pressed="true">' + t("cmp.removeShort") + "</button>" +
          "</th>";
        }).join("") +
      "</tr></thead>";

    var body = rows().map(function (r) {
      var shown = list.map(r.show);
      var diff = shown.some(function (s) { return s !== shown[0]; });
      if (onlyDiff && !diff) return "";

      /* საუკეთესო მნიშვნელობა: მხოლოდ რიცხვით სტრიქონებში და მხოლოდ მაშინ,
         როცა მოდელები მართლა განსხვავდება */
      var nums = r.best && diff ? list.map(r.num) : [];
      var known = nums.filter(function (n) { return n != null && n !== 0; });
      var top = known.length > 1
        ? (r.best === "high" ? Math.max : Math.min).apply(null, known)
        : null;

      return '<tr class="' + (diff ? "is-diff" : "") + '"><th scope="row">' + t(r.k) + "</th>" +
        list.map(function (w, i) {
          var best = top != null && nums[i] === top;
          return '<td class="' + (best ? "is-best" : "") + '">' + esc(shown[i]) + "</td>";
        }).join("") +
      "</tr>";
    }).join("");

    var acts =
      "<tr><th></th>" +
        list.map(function (w) {
          return '<td><a class="btn btn--sm" ' + waAttrs(fullName(w)) + ">" + t("cta.waShort") + "</a></td>";
        }).join("") +
      "</tr>";

    $("#cmpBody").innerHTML =
      '<table class="cmp__table" style="--cols:' + list.length + '">' + head + "<tbody>" + body + acts + "</tbody></table>";
  }

  function openCompare() {
    if (picks.length < 2) return;
    if ($("#sheet").open) $("#sheet").close();
    renderCompare();
    $("#cmp").showModal();
  }

  /* --- ვიდეო ------------------------------------------------------------ */
  /* პლეერი მხოლოდ დაწკაპუნებაზე ჩნდება: სანამ არ დააჭერ, YouTube-სთან
     კავშირი არ იხსნება და გვერდი მალე იტვირთება. */
  function playVideo(id) {
    var frame = document.getElementById("videoFrame");
    if (!frame || !/^[\w-]{6,20}$/.test(id)) return;
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0&hl=' + lang + '" title="' + esc(t("video.name")) +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" ' +
      'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
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
    $("#topGrid").innerHTML = TOP.map(wheelOf).filter(Boolean).map(cardHTML).join("");
    renderGrid();
    renderTray();
    $("#modelCount").textContent = WHEELS.length;
    $("#fromPrice").textContent = price(Math.min.apply(null, WHEELS.map(function (w) { return w.priceGel; })));
    watchRise();
  }

  /* --- მოვლენები: ერთი listener მთელ დოკუმენტზე ------------------------- */
  document.addEventListener("click", function (e) {
    var hit = function (sel) { return e.target.closest(sel); };
    var el;

    if ((el = hit("[data-pick]"))) { togglePick(el.dataset.pick); return; }
    if (hit("[data-cmp-open]")) { openCompare(); return; }
    if (hit("[data-cmp-clear]")) { picks = []; syncPicks(); return; }
    if ((el = hit("[data-open]"))) { openSheet(el.dataset.open); return; }
    if ((el = hit("[data-lang]"))) { setLang(el.dataset.lang); return; }
    if ((el = hit("[data-theme-set]"))) { setTheme(el.dataset.themeSet); return; }
    if ((el = hit("[data-flag]"))) { showFlag(Number(el.dataset.flag)); autoFlag(true); return; }
    if ((el = hit("[data-thumb]"))) {
      $("#sheetBig").src = el.dataset.thumb;
      $$("#sheetBody .sheet__thumbs button").forEach(function (b) { b.setAttribute("aria-current", String(b === el)); });
      return;
    }
    if ((el = hit("[data-video]"))) { playVideo(el.dataset.video); return; }
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
  $("#cmpOnly").addEventListener("change", renderCompare);
  $("#nav").addEventListener("click", function (e) {
    if (e.target.tagName === "A") $("#nav").classList.remove("nav--open");
  });
  $(".flag").addEventListener("mouseenter", function () { autoFlag(false); });
  $(".flag").addEventListener("mouseleave", function () { autoFlag(true); });
  $(".flag").addEventListener("focusin", function () { autoFlag(false); });

  function init() {
    /* შენახული არჩევანი თუ არ არის (ან უცნობია), მუქი თემა რჩება */
    var saved = recall(STORE_THEME);
    setTheme(saved === "light" || saved === "auto" ? saved : "dark");
    applyStatic();
    render();
    autoFlag(true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
