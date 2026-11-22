/* ==========================================================================
   ZIPI.GE: საიტის ამწყობი (generator).

   data/catalog.js-იდან, data/i18n.js-იდან და content/-იდან აწყობს ყველა გვერდს
   მზა HTML-ად, ორ ენაზე: ქართული საიტის ძირშია, ინგლისური /en/-ში. გვერდზე
   ტექსტი, ფასები და მახასიათებლები JavaScript-ის გარეშეც ჩანს, ამიტომ მათ
   Google-იც და ხელოვნური ინტელექტის საძიებოებიც კითხულობენ.

   ეს ფაილი არაფერს წერს დისკზე: ZB.build(input) აბრუნებს { "/გზა": "შიგთავსი" }.
   დისკზე წერს tools/build.mjs (Node, GitHub Actions-ში ყოველ push-ზე).
   ========================================================================== */
(function (G) {
  "use strict";

  var SITE = "https://zipi.ge";

  /* გვერდების მისამართები. ქართულს ლათინური ტრანსლიტერაცია აქვს, რომ ბმული
     ყველგან სწორად იკითხებოდეს და საკვანძო სიტყვაც ჰქონდეს. */
  var ROUTES = {
    ka: {
      home: "/", wheels: "/monoborblebi/", service: "/servisi/", about: "/chven-shesakheb/",
      contact: "/kontakti/", tips: "/rchevebi/", guide: "/ra-aris-monoborbali/",
      cats: { parts: "/natsilebi/", accessories: "/aksesuarebi/", protection: "/damtsavebi/", print3d: "/3d-bechdva/" }
    },
    en: {
      home: "/en/", wheels: "/en/electric-unicycles/", service: "/en/service/", about: "/en/about/",
      contact: "/en/contact/", tips: "/en/tips/", guide: "/en/what-is-an-electric-unicycle/",
      cats: { parts: "/en/parts/", accessories: "/en/accessories/", protection: "/en/protective-gear/", print3d: "/en/3d-printing/" }
    }
  };
  var LANGS = ["ka", "en"];

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var fill = function (s, v) {
    return String(s).replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; });
  };
  /* JSON <script>-ის შიგნით: "</" ვერ დახურავს ტეგს */
  var json = function (o) { return JSON.stringify(o).replace(/</g, "\\u003c"); };

  /* --- ხატულები ---------------------------------------------------------- */
  var SHIELD = '<svg class="shield" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" ' +
    'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"/><path d="M8.6 12.2l2.4 2.4 4.4-4.8"/></svg>';
  var ICON_PATHS = {
    wheel: '<circle cx="12" cy="14" r="6.5"/><circle cx="12" cy="14" r="2"/><path d="M8.5 7.5V4h7v3.5"/>',
    wrench: '<path d="M14.5 4.5a4.5 4.5 0 0 0-5.4 5.9L3.5 16l4.5 4.5 5.6-5.6a4.5 4.5 0 0 0 5.9-5.4l-2.8 2.8-3.2-.8-.8-3.2z"/>',
    bag: '<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    shield: '<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"/>',
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>'
  };
  var ICON_OF = { wheels: "wheel", parts: "wrench", accessories: "bag", protection: "shield", print3d: "cube" };
  function icon(id) {
    var p = ICON_PATHS[ICON_OF[id]];
    return p ? '<svg class="ico" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>" : "";
  }

  /* ======================================================================== */
  function build(input) {
    var C = input.catalog, I18N = input.i18n;
    var META = C.meta, BRANDS = C.brands, WHEELS = C.wheels;
    var TREE = C.categories || [], EXTRAS = C.extras || [];
    var TIPS = input.tips || [];          /* [{slug, ka:{title,desc,body}, en:{...}}] */
    var GUIDE = input.guide || {};        /* { ka: html, en: html } */
    var VER = input.versions || {};       /* { css, js }: ქეშის გასაახლებლად */
    var TODAY = input.today || "";        /* YYYY-MM-DD */
    var IMGSET = {};
    (input.images || []).forEach(function (n) { IMGSET[n] = true; });

    var files = {};
    var sitemap = [];                     /* [{ka, en, images:[...], lastmod}] */

    var brandOf = function (id) { return BRANDS.filter(function (b) { return b.id === id; })[0]; };
    var fullName = function (w) { return brandOf(w.brand).name + " " + w.model; };
    var byPrice = WHEELS.slice().sort(function (a, b) { return a.priceGel - b.priceGel; });
    var range = function (f) {
      var v = WHEELS.map(f).filter(function (x) { return x != null; });
      return [Math.min.apply(null, v), Math.max.apply(null, v)];
    };
    var PR = range(function (w) { return w.priceGel; });
    var SP = range(function (w) { return w.specs.topSpeedKmh; });
    var RG = range(function (w) { return w.specs.rangeKm; });
    var PHONE = "+" + META.whatsapp;
    var phoneShow = PHONE.replace(/^\+995(\d{3})(\d{2})(\d{2})(\d{2})$/, "+995 $1 $2 $3 $4");
    var HOURS = (META.hoursOpen || "12:00") + "-" + (META.hoursClose || "22:00");

    /* --- ფოტოები: შემცირებული ვერსიები (assets/img/), თუ აწყობისას შეიქმნა ---
       480 ბარათისთვის, 1000 მოდელის გვერდისთვის, 1600 სრული ეკრანისთვის,
       og.jpg ბმულის გაზიარებისთვის (WhatsApp, Facebook). თუ ვერსია არ არსებობს,
       ორიგინალს ვიყენებთ. */
    var stem = function (f) { return f.replace(/\.[^.]+$/, ""); };
    function img(file, size) {
      var v = stem(file) + "-" + size + (size === "og" ? ".jpg" : ".webp");
      return IMGSET[v] ? "/assets/img/" + v : "/assets/wheels/" + file;
    }
    function srcset(file) {
      var a = stem(file) + "-480.webp", b = stem(file) + "-1000.webp";
      return IMGSET[a] && IMGSET[b] ? "/assets/img/" + a + " 480w, /assets/img/" + b + " 1000w" : "";
    }
    function picture(file, alt, sizes, extra) {
      var ss = srcset(file);
      return '<img src="' + img(file, 1000) + '"' + (ss ? ' srcset="' + ss + '" sizes="' + sizes + '"' : "") +
        ' alt="' + esc(alt) + '"' + (extra || "") + ">";
    }

    /* --- ენის დამხმარე ---------------------------------------------------- */
    function mk(lang) {
      var D = I18N[lang] || {}, K = I18N.ka;
      var nf = new Intl.NumberFormat(lang === "ka" ? "ka-GE" : "en-US");
      var L = { lang: lang, other: lang === "ka" ? "en" : "ka", r: ROUTES[lang] };
      L.num = function (n) { return nf.format(n); };
      L.price = function (n) { return nf.format(n) + " ₾"; };
      L.stats = {
        from: L.price(PR[0]), to: L.price(PR[1]), n: WHEELS.length,
        smin: SP[0], smax: SP[1], rmin: RG[0], rmax: RG[1]
      };
      L.t = function (k, v) {
        var s = D[k] != null ? D[k] : K[k] != null ? K[k] : k;
        return fill(s, Object.assign({}, L.stats, v || {}));
      };
      L.loc = function (o) { return o && (o[lang] || o.ka); };
      L.wa = function (topic) {
        var text = topic ? L.t("wa.model", { x: topic }) : L.t("wa.hello");
        return "https://wa.me/" + META.whatsapp + "?text=" + encodeURIComponent(text);
      };
      return L;
    }

    /* --- მისამართები ----------------------------------------------------- */
    var U = {
      wheels: function (lang) { return ROUTES[lang].wheels; },
      brand: function (lang, b) { return ROUTES[lang].wheels + b.id + "/"; },
      product: function (lang, w) { return ROUTES[lang].wheels + w.id + "/"; },
      cat: function (lang, id) { return ROUTES[lang].cats[id] || (lang === "en" ? "/en/" : "/") + id + "/"; },
      tip: function (lang, slug) { return ROUTES[lang].tips + slug + "/"; }
    };
    var abs = function (p) { return SITE + p; };

    /* ===================================================================== */
    /* ნაწილები                                                               */
    /* ===================================================================== */
    /* ტექსტში ნახსენები ტელეფონის ნომერი (ნებისმიერი დაშორებით, მაგ. +995 598 66 61 11
       ან +995 598 666 111) ზარის ბმულად იქცევა, "მოგვწერე WhatsApp-ზე" კი WhatsApp-ის
       ბმულად. უკვე არსებულ ბმულებს და ტეგების ატრიბუტებს არ ეხება. */
    var PHONE_RE = new RegExp("\\+?" + String(META.whatsapp).split("").join("[\\s\\u00a0-]*"), "g");
    var WA_RE = { ka: /მოგვწერე WhatsApp-ზე/g, en: /message us on WhatsApp/gi };
    function linkify(L, html) {
      return html.split(/(<a\b[\s\S]*?<\/a>|<[^>]+>)/).map(function (part, i) {
        if (i % 2) return part;
        return part
          .replace(PHONE_RE, function (m) { return '<a class="tel-inline num" href="tel:' + PHONE + '">' + m + "</a>"; })
          .replace(WA_RE[L.lang] || WA_RE.ka, function (m) {
            return '<a class="wa-inline" href="' + esc(L.wa()) + '" target="_blank" rel="noopener">' + m + "</a>";
          });
      }).join("");
    }

    function waLink(L, topic, cls, label) {
      return '<a class="' + cls + '" href="' + esc(L.wa(topic)) + '" target="_blank" rel="noopener">' + label + "</a>";
    }

    function crumbs(L, list) {
      /* list: [[სახელი, მისამართი], ..., [ბოლო სახელი]] */
      var html = list.map(function (c, i) {
        return i < list.length - 1 ? '<a href="' + c[1] + '">' + esc(c[0]) + "</a>" : '<span aria-current="page">' + esc(c[0]) + "</span>";
      }).join(" / ");
      return '<nav class="crumbs" aria-label="' + esc(L.t("crumbs.label")) + '">' + html + "</nav>";
    }
    function crumbsLd(list) {
      return {
        "@type": "BreadcrumbList",
        itemListElement: list.map(function (c, i) {
          var item = { "@type": "ListItem", position: i + 1, name: c[0] };
          if (c[1]) item.item = abs(c[1]);
          return item;
        })
      };
    }

    /* ჰედერის კატალოგის სია: ყველა ბმული ნამდვილი გვერდია */
    function navLink(href, label, popup, ico) {
      var lat = /^[\x20-\x7E]+$/.test(label);
      return '<a href="' + href + '"' + (lat ? ' class="nav__lat"' : "") + (popup ? ' aria-haspopup="true"' : "") + ">" +
        (ico || "") + '<span class="nav__label">' + esc(label) + "</span></a>";
    }
    function navNode(href, label, inner, ico) {
      return '<div class="nav__sub"><div class="nav__row">' + navLink(href, label, true, ico) +
        '<button class="nav__toggle" data-sub-toggle aria-expanded="false" aria-label="' + esc(label) + '">▾</button>' +
        '</div><div class="nav__submenu">' + inner + "</div></div>";
    }
    function navTree(L, n, p) {
      var href = U.cat(L.lang, p[0]) + (p.length > 1 ? "#" + p.slice(1).join("/") : "");
      var ico = p.length === 1 ? icon(n.id) : "";
      if (!n.children || !n.children.length) return navLink(href, L.loc(n.name), false, ico);
      return navNode(href, L.loc(n.name), n.children.map(function (ch) { return navTree(L, ch, p.concat(ch.id)); }).join(""), ico);
    }

    function header(L, cur, alt) {
      var r = L.r;
      var item = function (key, href) {
        return '<a href="' + href + '"' + (cur === key ? ' aria-current="page"' : "") + ">" + esc(L.t("nav." + key)) + "</a>";
      };
      var wheels = navNode(r.wheels, L.t("cat.wheels"),
        BRANDS.map(function (b) { return navLink(U.brand(L.lang, b), b.name); }).join(""), icon("wheels"));
      var menu = wheels + TREE.map(function (n) { return navTree(L, n, [n.id]); }).join("");
      var langLink = function (lg, href) {
        return '<a href="' + href + '" hreflang="' + lg + '" lang="' + lg + '"' + (lg === L.lang ? ' aria-current="true"' : "") + ">" +
          esc(L.t("lang." + lg)) + "</a>";
      };
      var hrefs = {}; hrefs[L.lang] = alt.self; hrefs[L.other] = alt.other;
      return (
        '<a class="skip" href="#main">' + esc(L.t("skip")) + "</a>\n" +
        '<header class="top">\n  <div class="wrap top__in">\n' +
        '    <a class="logo" href="' + r.home + '" aria-label="ZIPI.GE">' +
        '<span class="logo__mark">ZIPI<span>.GE</span></span><span class="logo__sub">' + esc(L.t("logo.sub")) + "</span></a>\n" +
        '    <button class="top__burger" id="burger" aria-expanded="false" aria-controls="nav" aria-label="' + esc(L.t("nav.menu")) + '">☰</button>\n' +
        '    <nav class="nav" id="nav">\n' +
        "      " + item("home", r.home) + "\n" +
        '      <div class="nav__drop">' +
        '<a href="' + r.wheels + '" aria-haspopup="true"' + (cur === "catalog" ? ' aria-current="page"' : "") + ">" + esc(L.t("nav.catalog")) + "</a>" +
        '<button class="nav__toggle" data-nav-toggle aria-expanded="false" aria-controls="navCats" aria-label="' + esc(L.t("nav.catalogMenu")) + '">▾</button>' +
        '<div class="nav__menu" id="navCats">' + menu + "</div></div>\n" +
        "      " + item("service", r.service) + "\n" +
        "      " + item("tips", r.tips) + "\n" +
        "      " + item("about", r.about) + "\n" +
        "      " + item("contact", r.contact) + "\n" +
        "    </nav>\n" +
        '    <div class="seg seg--lang" aria-label="' + esc(L.t("lang.label")) + '">' + langLink("ka", hrefs.ka) + langLink("en", hrefs.en) + "</div>\n" +
        '    <div class="seg seg--theme" aria-label="' + esc(L.t("theme.label")) + '">' +
        '<button data-theme-set="light" aria-pressed="false" title="' + esc(L.t("theme.light")) + '">☀</button>' +
        '<button data-theme-set="dark" aria-pressed="false" title="' + esc(L.t("theme.dark")) + '">☾</button></div>\n' +
        "    " + waLink(L, null, "btn btn--sm", esc(L.t("cta.waShort"))) + "\n" +
        "  </div>\n</header>\n"
      );
    }

    function footer(L) {
      var r = L.r;
      var li = function (href, label, lat) { return '<li><a href="' + href + '"' + (lat ? ' class="lat"' : "") + ">" + esc(label) + "</a></li>"; };
      return (
        '<footer class="foot">\n  <div class="wrap">\n    <div class="foot__in">\n' +
        '      <div><a class="logo" href="' + r.home + '"><span class="logo__mark">ZIPI<span>.GE</span></span>' +
        '<span class="logo__sub">' + esc(L.t("logo.sub")) + "</span></a>" +
        '<p class="foot__blurb">' + esc(L.t("foot.blurb")) + "</p></div>\n" +
        '      <div><h2 class="foot__h">' + esc(L.t("foot.catalog")) + "</h2><ul>" +
          li(r.wheels, L.t("cat.wheels")) +
          BRANDS.map(function (b) { return li(U.brand(L.lang, b), b.name, true); }).join("") +
          TREE.map(function (n) { return li(U.cat(L.lang, n.id), L.loc(n.name)); }).join("") +
        "</ul></div>\n" +
        '      <div><h2 class="foot__h">' + esc(L.t("foot.models")) + "</h2><ul>" +
          byPrice.map(function (w) { return li(U.product(L.lang, w), fullName(w), true); }).join("") +
        "</ul></div>\n" +
        '      <div><h2 class="foot__h">' + esc(L.t("foot.shop")) + "</h2><ul>" +
          li(r.service, L.t("svc.eyebrow")) + li(r.guide, L.t("nav.guide")) + li(r.tips, L.t("nav.tips")) +
          li(r.about, L.t("nav.about")) + li(r.contact, L.t("nav.contact")) +
        "</ul></div>\n" +
        '      <div><h2 class="foot__h">' + esc(L.t("foot.contact")) + "</h2><ul>" +
          '<li><a class="num" href="tel:' + PHONE + '">' + phoneShow + "</a></li>" +
          "<li>" + waLink(L, null, "", "WhatsApp") + "</li>" +
          "<li>" + esc(L.t("contact.addressValue")) + "</li>" +
          '<li class="num">' + HOURS + "</li>" +
        "</ul></div>\n" +
        '    </div>\n    <div class="foot__bar"><span>© <span class="num">' + TODAY.slice(0, 4) + "</span> ZIPI.GE</span></div>\n" +
        "  </div>\n</footer>\n"
      );
    }

    /* --- მოდელის ბარათი --------------------------------------------------- */
    function card(L, w, h) {
      var b = brandOf(w.brand), full = fullName(w), url = U.product(L.lang, w), s = w.specs;
      h = h || "h3";
      return (
        '<article class="card" data-id="' + w.id + '" data-brand="' + w.brand + '" data-price="' + w.priceGel +
          '" data-power="' + s.motorW + '" data-range="' + s.rangeKm + '">' +
          '<a class="card__plate" href="' + url + '" tabindex="-1" aria-hidden="true">' +
            picture(w.images[0], full, "(max-width: 600px) 90vw, 300px", ' loading="lazy" decoding="async"') + "</a>" +
          '<button class="pick" data-pick="' + w.id + '" aria-pressed="false">' + esc(L.t("cmp.add")) + "</button>" +
          '<div class="card__body">' +
            '<span class="card__brand">' + esc(b.name) + "</span>" +
            /* ბრენდი უკვე წერია ზემოთ; სათაურში სრული სახელი რჩება ძიებისთვის, ეკრანზე მხოლოდ მოდელი ჩანს */
            "<" + h + ' class="card__name"><a href="' + url + '"><span class="sr-only">' + esc(b.name) + " </span>" + esc(w.model) + "</a></" + h + ">" +
            '<div class="specs">' +
              '<span class="spec">' + L.num(s.motorW) + " W</span>" +
              '<span class="spec">' + L.num(s.batteryWh) + " Wh</span>" +
              '<span class="spec">' + s.topSpeedKmh + " " + esc(L.t("unit.kmh")) + "</span>" +
            "</div>" +
            '<div class="card__tags">' +
              '<span class="stock stock--ask">' + esc(L.t("stock.ask")) + "</span>" +
              '<span class="warr">' + SHIELD + esc(L.t("warranty.short", { n: META.warrantyMonths })) + "</span>" +
            "</div>" +
            '<div class="card__price">' +
              '<div class="price">' + L.price(w.priceGel) + (w.oldPriceGel ? "<s>" + L.price(w.oldPriceGel) + "</s>" : "") + "</div>" +
              '<div class="card__acts">' +
                '<a class="btn btn--sm" href="' + url + '">' + esc(L.t("cta.details")) + "</a>" +
                waLink(L, full, "btn btn--sm btn--soft", esc(L.t("cta.waShort"))) +
              "</div>" +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }

    function extraCard(L, x) {
      var name = L.loc(x.name);
      return (
        '<article class="card" data-cat="' + esc(x.cat || "") + '">' +
          '<div class="card__plate">' + (x.images && x.images[0] ? picture(x.images[0], name, "(max-width: 600px) 90vw, 300px", ' loading="lazy" decoding="async"') : "") + "</div>" +
          '<div class="card__body">' +
            '<h2 class="card__name">' + esc(name) + "</h2>" +
            (x.blurb ? '<p class="sheet__blurb">' + esc(L.loc(x.blurb)) + "</p>" : "") +
            '<div class="card__price">' +
              (x.priceGel != null ? '<div class="price">' + L.price(x.priceGel) + "</div>" : "") +
              '<div class="card__acts">' + waLink(L, name, "btn btn--sm", esc(L.t("cta.waShort"))) + "</div>" +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }

    /* კატალოგის მთავარი განყოფილებები (ღილაკები) */
    function catChips(L, cur) {
      var chip = function (id, href, label) {
        return '<a class="chip" href="' + href + '"' + (id === cur ? ' aria-current="page"' : "") + ">" + icon(id) + esc(label) + "</a>";
      };
      return '<nav class="cats" aria-label="' + esc(L.t("nav.catalogMenu")) + '">' +
        chip("wheels", L.r.wheels, L.t("cat.wheels")) +
        TREE.map(function (n) { return chip(n.id, U.cat(L.lang, n.id), L.loc(n.name)); }).join("") + "</nav>";
    }

    /* --- მახასიათებლების სტრიქონები (გვერდიც და შედარებაც) ---------------- */
    function rows(L) {
      var dash = "—";
      var unit = function (v, u) { return v == null ? dash : L.num(v) + " " + u; };
      /* "2.5-3" -> "2,5–3 სთ" (ენის მიხედვით) */
      var hours = function (s) {
        return "~" + String(s).split("-").map(function (x) { return L.num(Number(x)); }).join("–") + " " + L.t("unit.h");
      };
      return [
        { k: "spec.price", onlyCmp: true, best: "low", num: function (w) { return w.priceGel; }, show: function (w) { return L.price(w.priceGel); } },
        { k: "spec.motor", best: "high", num: function (w) { return w.specs.motorW; }, show: function (w) { return unit(w.specs.motorW, "W"); }, code: "WTT", v: function (w) { return w.specs.motorW; } },
        { k: "spec.peak", best: "high", num: function (w) { return w.specs.peakW; }, show: function (w) { return unit(w.specs.peakW, "W"); }, code: "WTT", v: function (w) { return w.specs.peakW; } },
        { k: "spec.battery", best: "high", num: function (w) { return w.specs.batteryWh; }, show: function (w) { return unit(w.specs.batteryWh, "Wh"); }, code: "WHR", v: function (w) { return w.specs.batteryWh; } },
        { k: "spec.voltage", best: "high", num: function (w) { return w.specs.voltage; }, show: function (w) { return unit(w.specs.voltage, "V"); }, code: "VLT", v: function (w) { return w.specs.voltage; } },
        { k: "spec.cells", best: null, show: function (w) { return w.specs.cells || dash; }, v: function (w) { return w.specs.cells; } },
        { k: "spec.speed", best: "high", num: function (w) { return w.specs.topSpeedKmh; }, show: function (w) { return unit(w.specs.topSpeedKmh, L.t("unit.kmh")); }, code: "KMH", v: function (w) { return w.specs.topSpeedKmh; } },
        { k: "spec.range", best: "high", num: function (w) { return w.specs.rangeKm; }, show: function (w) { return unit(w.specs.rangeKm, L.t("unit.km")); }, code: "KMT", v: function (w) { return w.specs.rangeKm; } },
        { k: "spec.tire", best: null, show: function (w) { return w.specs.tire || dash; }, v: function (w) { return w.specs.tire; } },
        { k: "spec.susp", best: "high", num: function (w) { return w.specs.suspensionMm; },
          show: function (w) { return w.specs.suspensionMm ? unit(w.specs.suspensionMm, L.t("unit.mm")) : L.t("spec.none"); }, code: "MMT", v: function (w) { return w.specs.suspensionMm || null; } },
        { k: "spec.suspType", best: null, show: function (w) { return w.specs.suspType ? L.t("susp." + w.specs.suspType) : dash; }, v: function (w) { return w.specs.suspType ? L.t("susp." + w.specs.suspType) : null; } },
        { k: "spec.weight", best: "low", num: function (w) { return w.specs.weightKg; }, show: function (w) { return unit(w.specs.weightKg, L.t("unit.kg")); }, code: "KGM", v: function (w) { return w.specs.weightKg; } },
        { k: "spec.charger", best: "high", num: function (w) { return w.specs.chargerA; }, show: function (w) { return unit(w.specs.chargerA, "A"); }, code: "AMP", v: function (w) { return w.specs.chargerA; } },
        /* დატენვის დრო ქარხნული დამტენით, და მაქსიმალური რეკომენდებული დენით */
        { k: "spec.chargeTime", best: null, show: function (w) { return w.specs.chargeH ? hours(w.specs.chargeH) : dash; },
          v: function (w) { return w.specs.chargeH ? hours(w.specs.chargeH) : null; } },
        { k: "spec.fastCharge", best: null,
          show: function (w) { return w.specs.fastA ? w.specs.fastA + " A · " + hours(w.specs.fastH) : dash; },
          v: function (w) { return w.specs.fastA ? w.specs.fastA + " A, " + hours(w.specs.fastH) : null; } },
        { k: "spec.load", best: "high", num: function (w) { return w.specs.maxLoadKg; }, show: function (w) { return unit(w.specs.maxLoadKg, L.t("unit.kg")); }, code: "KGM", v: function (w) { return w.specs.maxLoadKg; } },
        { k: "spec.climb", best: "high", num: function (w) { return w.specs.climbDeg; }, show: function (w) { return w.specs.climbDeg == null ? dash : w.specs.climbDeg + "°"; }, code: "DD", v: function (w) { return w.specs.climbDeg; } },
        { k: "spec.ip", best: null, show: function (w) { return w.specs.ip || dash; }, v: function (w) { return w.specs.ip; } },
        { k: "spec.warranty", best: null, show: function () { return L.t("warranty.long", { n: META.warrantyMonths }); } }
      ];
    }

    /* შედარებისთვის საჭირო მონაცემები: app.js ამას კითხულობს */
    function cmpData(L) {
      var R = rows(L);
      var s = {};
      ["cmp.add", "cmp.added", "cmp.tray", "cmp.max", "cmp.remove", "cmp.removeShort", "cmp.needTwo", "cmp.go", "cta.waShort"]
        .forEach(function (k) { s[k] = L.t(k, { n: "{n}", m: "{m}", x: "{x}" }); });
      return {
        max: 4, s: s,
        rows: R.map(function (r) { return { l: L.t(r.k), b: r.best || "" }; }),
        w: WHEELS.map(function (w) {
          return {
            id: w.id, b: brandOf(w.brand).name, m: w.model, u: U.product(L.lang, w), i: img(w.images[0], 480),
            wa: L.wa(fullName(w)),
            v: R.map(function (r) { return r.show(w); }),
            n: R.map(function (r) { return r.best && r.num ? r.num(w) : null; })
          };
        })
      };
    }

    function trayAndCmp(L) {
      return (
        '<div class="tray" id="tray" hidden><div class="tray__in"><div class="tray__picks" id="trayPicks"></div>' +
        '<div class="tray__acts"><button class="btn btn--sm btn--ghost" data-cmp-clear>' + esc(L.t("cmp.clear")) + "</button>" +
        '<button class="btn btn--sm" id="trayGo" data-cmp-open>' + esc(L.t("cmp.eyebrow")) + "</button></div></div></div>\n" +
        '<dialog id="cmp" class="cmp" aria-labelledby="cmpTitle">' +
        '<button class="sheet__x" data-close aria-label="' + esc(L.t("cta.close")) + '">✕</button>' +
        '<div class="cmp__head"><p class="eyebrow">' + esc(L.t("cmp.eyebrow")) + "</p>" +
        '<h2 id="cmpTitle">' + esc(L.t("cmp.title")) + "</h2>" +
        '<label class="cmp__only"><input type="checkbox" id="cmpOnly"><span>' + esc(L.t("cmp.only")) + "</span></label>" +
        '<p class="note">' + esc(L.t("cmp.legend")) + "</p></div>" +
        '<div class="cmp__scroll" id="cmpBody"></div></dialog>\n' +
        '<script type="application/json" id="zipiCmp">' + json(cmpData(L)) + "</script>\n"
      );
    }

    /* --- სტრუქტურირებული მონაცემები (schema.org, JSON-LD) ---------------- */
    function storeLd(L) {
      var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      var hours = { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: META.hoursOpen || "12:00", closes: META.hoursClose || "22:00" };
      return {
        "@type": "Store",
        "@id": SITE + "/#store",
        name: "ZIPI.GE",
        alternateName: ["ZIPI", "ზიპი"],
        description: L.t("seo.home.desc"),
        url: SITE + "/",
        logo: SITE + "/assets/icons/logo-512.png",
        image: SITE + "/assets/icons/logo-512.png",
        telephone: PHONE,
        priceRange: L.price(PR[0]) + " - " + L.price(PR[1]),
        currenciesAccepted: "GEL",
        address: { "@type": "PostalAddress", addressLocality: "Tbilisi", addressCountry: "GE" },
        areaServed: { "@type": "Country", name: "Georgia" },
        contactPoint: {
          "@type": "ContactPoint", telephone: PHONE, contactType: "sales",
          availableLanguage: ["ka", "en"], hoursAvailable: hours
        },
        knowsAbout: ["electric unicycle", "EUC", "monowheel", "e-unicycle", "ელექტრო მონობორბალი", "მონობორბალი",
          "მონოციკლი", "მონოვილი", "ცალბორბალა", "ელექტრო ბორბალი", "უნიციკლი", "ელექტრო უნიციკლი", "моноколесо",
          "electric unicycle Tbilisi"].concat(BRANDS.map(function (b) { return b.name; })),
        brand: BRANDS.map(function (b) { return { "@type": "Brand", name: b.name }; })
      };
    }
    function websiteLd(L) {
      return { "@type": "WebSite", "@id": SITE + "/#website", url: SITE + "/", name: "ZIPI.GE", inLanguage: L.lang, publisher: { "@id": SITE + "/#store" } };
    }
    function nextYearDate() {
      var y = Number(TODAY.slice(0, 4)) || 2026;
      return (y + 1) + TODAY.slice(4);
    }
    function productLd(L, w) {
      var url = abs(U.product(L.lang, w));
      var avail = w.availability || META.availability;
      var offer = {
        "@type": "Offer",
        url: url,
        price: String(w.priceGel),
        priceCurrency: "GEL",
        priceValidUntil: nextYearDate(),
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": SITE + "/#store" },
        areaServed: { "@type": "Country", name: "Georgia" },
        warranty: {
          "@type": "WarrantyPromise",
          durationOfWarranty: { "@type": "QuantitativeValue", value: META.warrantyMonths, unitCode: "MON" }
        }
      };
      if (avail) offer.availability = "https://schema.org/" + avail;
      return {
        "@type": "Product",
        "@id": url + "#product",
        name: fullName(w),
        alternateName: fullName(w) + " " + L.t("product.kind").toLowerCase(),
        description: L.loc(w.blurb),
        image: w.images.slice(0, 6).map(function (f, i) { return abs(i ? img(f, 1000) : img(f, "og")); }),
        brand: { "@type": "Brand", name: brandOf(w.brand).name },
        model: w.model,
        sku: w.id,
        category: L.t("product.kind"),
        weight: w.specs.weightKg != null ? { "@type": "QuantitativeValue", value: w.specs.weightKg, unitCode: "KGM" } : undefined,
        additionalProperty: rows(L).filter(function (r) { return r.v && r.v(w) != null; }).map(function (r) {
          var p = { "@type": "PropertyValue", name: L.t(r.k), value: r.v(w) };
          if (r.code) p.unitCode = r.code;
          return p;
        }),
        offers: offer
      };
    }
    function itemListLd(L, list) {
      return {
        "@type": "ItemList",
        itemListElement: list.map(function (w, i) {
          return { "@type": "ListItem", position: i + 1, url: abs(U.product(L.lang, w)), name: fullName(w) };
        })
      };
    }
    function ldScript(L, nodes) {
      var graph = [storeLd(L), websiteLd(L)].concat(nodes || []);
      return '<script type="application/ld+json">' + json({ "@context": "https://schema.org", "@graph": graph }) + "</script>\n";
    }

    /* --- გვერდის ჩარჩო ---------------------------------------------------- */
    function page(L, o) {
      /* o: path, alt (მეორე ენის მისამართი), title, desc, cur, body, ld[], og (ფოტო),
            ogType, noindex, cmp, viewer, preload, headExtra, sitemapImages */
      var other = o.alt;
      var paths = {}; paths[L.lang] = o.path; paths[L.other] = other;
      var ogImg = abs(o.og || "/assets/icons/og.png");
      var robots = o.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1";
      var html =
        "<!doctype html>\n" +
        '<html lang="' + L.lang + '">\n<head>\n' +
        '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        "<title>" + esc(o.title) + "</title>\n" +
        '<meta name="description" content="' + esc(o.desc) + '">\n' +
        '<meta name="robots" content="' + robots + '">\n' +
        '<link rel="canonical" href="' + abs(o.path) + '">\n' +
        (other ? '<link rel="alternate" hreflang="ka" href="' + abs(paths.ka) + '">\n' +
          '<link rel="alternate" hreflang="en" href="' + abs(paths.en) + '">\n' +
          '<link rel="alternate" hreflang="x-default" href="' + abs(paths.ka) + '">\n' : "") +
        '<meta property="og:site_name" content="ZIPI.GE">\n' +
        '<meta property="og:title" content="' + esc(o.title) + '">\n' +
        '<meta property="og:description" content="' + esc(o.desc) + '">\n' +
        '<meta property="og:type" content="' + (o.ogType || "website") + '">\n' +
        '<meta property="og:url" content="' + abs(o.path) + '">\n' +
        '<meta property="og:image" content="' + ogImg + '">\n' +
        '<meta property="og:locale" content="' + (L.lang === "ka" ? "ka_GE" : "en_US") + '">\n' +
        '<meta property="og:locale:alternate" content="' + (L.lang === "ka" ? "en_US" : "ka_GE") + '">\n' +
        '<meta name="twitter:card" content="summary_large_image">\n' +
        '<meta name="color-scheme" content="dark light">\n' +
        '<meta name="theme-color" content="#0c0d10">\n' +
        '<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n' +
        '<link rel="icon" href="/favicon.ico" sizes="32x32">\n' +
        '<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">\n' +
        '<link rel="manifest" href="/site.webmanifest">\n' +
        /* შრიფტები გვერდის ჩვენებას არ აჩერებს: ჯერ სისტემური შრიფტით ჩანს, მერე იცვლება */
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&amp;family=Noto+Sans+Georgian:wght@400;600;700&amp;display=swap" media="print" onload="this.media=\'all\'">\n' +
        '<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&amp;family=Noto+Sans+Georgian:wght@400;600;700&amp;display=swap"></noscript>\n' +
        '<link rel="stylesheet" href="/assets/styles.css?v=' + (VER.css || "1") + '">\n' +
        (o.preload ? '<link rel="preload" as="image" href="' + o.preload.href + '"' +
          (o.preload.srcset ? ' imagesrcset="' + o.preload.srcset + '" imagesizes="' + o.preload.sizes + '"' : "") + ' fetchpriority="high">\n' : "") +
        /* თემა: ვსვამთ ჩვენებამდე, რომ გვერდი არასწორი ფერით არ აციმციმდეს */
        '<script>try{var t=localStorage.getItem("zipi-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}</script>\n' +
        (o.headExtra || "") +
        ldScript(L, o.ld) +
        '<script src="/assets/app.js?v=' + (VER.js || "1") + '" defer></script>\n' +
        "</head>\n<body>\n" +
        header(L, o.cur, { self: o.path, other: other || L.r.home.replace(/^\/(en\/)?/, L.other === "en" ? "/en/" : "/") }) +
        '<main id="main">\n' + linkify(L, o.body) + "\n</main>\n" +
        footer(L) +
        (o.cmp ? trayAndCmp(L) : "") +
        (o.viewer ? viewerDialog(L) : "") +
        "</body>\n</html>\n";
      files[o.path + (/\/$/.test(o.path) ? "index.html" : "")] = html;
      return html;
    }

    function addSitemap(key, pathsByLang, extra) {
      sitemap.push(Object.assign({ key: key, ka: pathsByLang.ka, en: pathsByLang.en }, extra || {}));
    }

    /* ===================================================================== */
    /* გვერდები                                                              */
    /* ===================================================================== */

    /* --- მთავარი ---------------------------------------------------------- */
    function homePage(L) {
      var first = byPrice[0];
      var slides = byPrice.map(function (w, i) {
        var b = brandOf(w.brand), s = w.specs;
        return (
          '<a class="flag__slide" href="' + U.product(L.lang, w) + '" data-on="' + (i ? 0 : 1) + '" draggable="false"' +
            ' role="tabpanel" aria-label="' + esc(fullName(w)) + '"' + (i ? ' aria-hidden="true" tabindex="-1"' : "") + ">" +
            '<span class="flag__plate">' +
              picture(w.images[0], fullName(w), "(max-width: 900px) 92vw, 600px",
                ' draggable="false"' + (i ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"')) +
              '<span class="flag__hint" aria-hidden="true">' + esc(L.t("flag.hint")) + " →</span></span>" +
            '<span class="flag__meta"><span>' +
              '<span class="flag__brand">' + esc(b.name) + "</span>" +
              '<span class="flag__name">' + esc(w.model) + "</span>" +
              '<span class="specs flag__specs">' +
                '<span class="spec">' + L.num(s.motorW) + " W</span>" +
                '<span class="spec">' + L.num(s.batteryWh) + " Wh</span>" +
                '<span class="spec">' + s.topSpeedKmh + " " + esc(L.t("unit.kmh")) + "</span>" +
                '<span class="spec">' + s.rangeKm + " " + esc(L.t("unit.km")) + "</span>" +
              "</span></span>" +
              '<span class="flag__price">' + L.price(w.priceGel) + "</span>" +
            "</span></a>"
        );
      }).join("");
      var dots = byPrice.map(function (w, i) {
        return '<button class="flag__dot" role="tab" aria-selected="' + (i === 0) + '" data-flag="' + i + '" aria-label="' + esc(fullName(w)) + '" title="' + esc(fullName(w)) + '"></button>';
      }).join("");

      var tips = TIPS.slice(0, 3).map(function (tp, i) { return tipCard(L, tp, i); }).join("");

      var body =
        '<section class="hero" id="hero">\n<div class="wrap hero__in">\n<div class="hero__copy">\n' +
        '<h1><span class="hero__kicker">' + esc(L.t("home.kicker")) + "</span><em>" + esc(L.t("hero.h1b")) + "</em> <span>" + esc(L.t("hero.h1c")) + "</span></h1>\n" +
        '<p class="lead">' + esc(L.t("hero.lead")) + "</p>\n</div>\n" +
        '<div class="flag">\n<div class="flag__stage" id="flagStage">' + slides +
        '<button class="flag__arrow flag__arrow--prev" data-flag-step="-1" aria-label="' + esc(L.t("flag.prev")) + '">‹</button>' +
        '<button class="flag__arrow flag__arrow--next" data-flag-step="1" aria-label="' + esc(L.t("flag.next")) + '">›</button>' +
        '</div>\n<div class="flag__dots" id="flagDots" role="tablist">' + dots + "</div>\n</div>\n</div>\n</section>\n" +

        '<section class="sec" id="catalog">\n<div class="wrap">\n' +
        '<div class="sec__head"><div><p class="eyebrow">' + esc(L.t("cat.eyebrow")) + "</p><h2>" + esc(L.t("cat.h2")) + "</h2></div></div>\n" +
        catChips(L, "wheels") + "\n" +
        '<div class="grid">' + byPrice.map(function (w) { return card(L, w, "h3"); }).join("") + "</div>\n" +
        "</div>\n</section>\n" +

        '<section class="sec" id="guide">\n<div class="wrap">\n<div class="intro panel">\n' +
        '<p class="eyebrow">' + esc(L.t("home.introEyebrow")) + "</p>\n" +
        "<h2>" + esc(L.t("home.introTitle")) + "</h2>\n" +
        /* გზამკვლევის პირველი აბზაცი პირდაპირ სტატიიდან (content/guide.*.html), სრული ტექსტი ღილაკით */
        '<p class="lead">' + guideLead(L) + "</p>\n" +
        '<a class="btn btn--ghost" href="' + L.r.guide + '">' + esc(L.t("home.introMore")) + "</a>\n" +
        "</div>\n</div>\n</section>\n" +

        '<section class="sec" id="service">\n<div class="wrap">\n<div class="sec__head"><div>' +
        '<p class="eyebrow">' + esc(L.t("svc.eyebrow")) + "</p><h2>" + esc(L.t("svc.h2")) + "</h2></div>" +
        '<p class="lead">' + esc(L.t("svc.lead")) + "</p></div>\n" +
        '<a class="btn btn--ghost" href="' + L.r.service + '">' + esc(L.t("svc.eyebrow")) + " →</a>\n" +
        "</div>\n</section>\n" +

        (tips ? '<section class="sec" id="tips">\n<div class="wrap">\n<div class="sec__head"><div>' +
          '<p class="eyebrow">' + esc(L.t("home.tipsEyebrow")) + "</p><h2>" + esc(L.t("home.tipsH2")) + "</h2></div>" +
          '<a class="btn btn--ghost" href="' + L.r.tips + '">' + esc(L.t("home.tipsMore")) + " →</a></div>\n" +
          '<div class="tips-grid">' + tips + "</div>\n</div>\n</section>\n" : "");

      /* ძველი ბმულები (index.html?model=..., ?brand=..., ?cat=...) ახალ გვერდზე გადადის */
      var legacy = {};
      WHEELS.forEach(function (w) { legacy["model:" + w.id] = U.product(L.lang, w); });
      BRANDS.forEach(function (b) { legacy["brand:" + b.id] = U.brand(L.lang, b); });
      legacy["cat:wheels"] = L.r.wheels;
      TREE.forEach(function (n) { legacy["cat:" + n.id] = U.cat(L.lang, n.id); });
      var redirect = '<script>(function(){var m=/[?&](model|brand|cat)=([^&#]+)/.exec(location.search);if(!m)return;' +
        "var u=" + json(legacy) + "[m[1]+\":\"+decodeURIComponent(m[2]).split(\"/\")[0]];if(u)location.replace(u)})()</script>\n";

      page(L, {
        path: L.r.home, alt: ROUTES[L.other].home, cur: "home",
        title: L.t("seo.home.title"), desc: L.t("seo.home.desc"),
        body: body, cmp: true, og: img(first.images[0], "og"),
        preload: { href: img(first.images[0], 1000), srcset: srcset(first.images[0]), sizes: "(max-width: 900px) 92vw, 600px" },
        headExtra: L.lang === "ka" ? redirect : "",
        ld: [itemListLd(L, byPrice)]
      });
    }

    /* --- კატალოგი და ბრენდის გვერდი ------------------------------------- */
    function catalogPage(L, brand) {
      var list = byPrice.filter(function (w) { return !brand || w.brand === brand.id; });
      var path = brand ? U.brand(L.lang, brand) : L.r.wheels;
      var alt = brand ? U.brand(L.other, brand) : ROUTES[L.other].wheels;
      var cr = [[L.t("nav.home"), L.r.home], [L.t("cat.wheels"), L.r.wheels]];
      if (brand) cr.push([brand.name]); else cr[1] = [L.t("cat.wheels")];
      var h1 = brand ? L.t("brand.h1", { x: brand.name }) : L.t("catalog.h1");
      var lead = brand ? L.loc(brand.blurb) : L.t("catalog.lead");
      var chips = [{ id: "", name: L.t("cat.all"), href: L.r.wheels }].concat(BRANDS.map(function (b) {
        return { id: b.id, name: b.name, href: U.brand(L.lang, b), lat: true };
      })).map(function (c) {
        var on = brand ? c.id === brand.id : c.id === "";
        return '<a class="chip" href="' + c.href + '"' + (on ? ' aria-current="page"' : "") + ">" +
          (c.lat ? '<span class="lat">' + esc(c.name) + "</span>" : esc(c.name)) + "</a>";
      }).join("");
      var sel = [["price-asc", "sort.priceAsc"], ["price-desc", "sort.priceDesc"], ["power-desc", "sort.powerDesc"], ["range-desc", "sort.rangeDesc"]]
        .map(function (o) { return '<option value="' + o[0] + '">' + esc(L.t(o[1])) + "</option>"; }).join("");

      var body =
        '<section class="sec page">\n<div class="wrap">\n' + crumbs(L, cr) + "\n" +
        '<div class="sec__head"><div><p class="eyebrow">' + esc(L.t("cat.eyebrow")) + "</p><h1>" + esc(h1) + "</h1>" +
        '<p class="lead">' + esc(lead) + "</p></div></div>\n" +
        catChips(L, "wheels") + "\n" +
        '<div class="tools"><nav class="chips" aria-label="' + esc(L.t("cat.all")) + '">' + chips + "</nav>" +
        '<label class="sort"><span>' + esc(L.t("cat.sort")) + '</span><select id="sort">' + sel + "</select></label></div>\n" +
        '<div class="grid" id="grid">' + list.map(function (w) { return card(L, w, "h2"); }).join("") + "</div>\n" +
        '<div class="help panel"><h2>' + esc(L.t("catalog.help")) + "</h2>" +
        '<div class="hero__cta"><a class="btn btn--ghost" href="' + U.tip(L.lang, "choosing-a-model") + '">' +
        esc(tipTitle(L, "choosing-a-model") || L.t("nav.tips")) + " →</a>" +
        '<a class="btn btn--ghost" href="' + L.r.guide + '">' + esc(L.t("nav.guide")) + " →</a>" +
        waLink(L, null, "btn", esc(L.t("cta.wa"))) + "</div></div>\n" +
        "</div>\n</section>\n";

      page(L, {
        path: path, alt: alt, cur: "catalog",
        title: brand ? L.t("seo.brand.title", { x: brand.name }) : L.t("seo.catalog.title"),
        desc: brand
          ? L.t("seo.brand.desc", { x: brand.name, models: list.map(function (w) { return w.model; }).join(", "), from: L.price(list[0].priceGel) })
          : L.t("seo.catalog.desc"),
        body: body, cmp: true, og: img(list[0].images[0], "og"),
        ld: [{ "@type": "CollectionPage", "@id": abs(path), name: h1, url: abs(path), inLanguage: L.lang, isPartOf: { "@id": SITE + "/#website" } },
          crumbsLd(cr), itemListLd(L, list)]
      });
      var p = {}; p[L.lang] = path; p[L.other] = alt;
      if (L.lang === "ka") addSitemap(brand ? "brand:" + brand.id : "wheels", p, { lastmod: META.updated });
    }

    /* --- მოდელის გვერდი --------------------------------------------------- */
    function productPage(L, w) {
      var b = brandOf(w.brand), full = fullName(w), s = w.specs;
      var path = U.product(L.lang, w), alt = U.product(L.other, w);
      var feats = L.loc(w.features) || [];
      var cr = [[L.t("nav.home"), L.r.home], [L.t("cat.wheels"), L.r.wheels], [b.name, U.brand(L.lang, b)], [w.model]];
      var thumbs = w.images.map(function (f, i) {
        return '<button data-thumb="' + i + '" data-src="' + img(f, 1000) + '" data-full="' + img(f, 1600) + '" aria-current="' + (i === 0) +
          '" aria-label="' + esc(L.t("sheet.photo", { n: i + 1 })) + '"><img src="' + img(f, 480) + '" alt="" loading="lazy" decoding="async"></button>';
      }).join("");
      var others = byPrice.filter(function (x) { return x.id !== w.id; })
        .sort(function (a, c) { return Math.abs(a.priceGel - w.priceGel) - Math.abs(c.priceGel - w.priceGel); }).slice(0, 3)
        .sort(function (a, c) { return a.priceGel - c.priceGel; });
      var table = rows(L).filter(function (r) { return !r.onlyCmp; })
        .map(function (r) { return '<tr><th scope="row">' + esc(L.t(r.k)) + "</th><td>" + esc(r.show(w)) + "</td></tr>"; }).join("");

      var body =
        '<section class="sec page">\n<div class="wrap">\n' + crumbs(L, cr) + "\n" +
        '<article class="product">\n<div class="sheet">\n' +
        '<div class="sheet__media">' +
          '<div class="sheet__big"><button class="sheet__zoom" data-view-open aria-label="' + esc(L.t("viewer.open")) + '">' +
            picture(w.images[0], full, "(max-width: 820px) 92vw, 620px", ' id="pBig" fetchpriority="high"') + "</button>" +
            '<button class="sheet__full" data-view-open aria-hidden="true" tabindex="-1">⤢</button>' +
            /* ისრები: ფოტოებს შორის გადასვლა სრული ეკრანის გარეშეც */
            (w.images.length > 1
              ? '<button class="sheet__arrow sheet__arrow--prev" data-photo-step="-1" aria-label="' + esc(L.t("viewer.prev")) + '">‹</button>' +
                '<button class="sheet__arrow sheet__arrow--next" data-photo-step="1" aria-label="' + esc(L.t("viewer.next")) + '">›</button>'
              : "") +
          "</div>" +
          '<div class="sheet__thumbs">' + thumbs + "</div>" +
        "</div>\n" +
        '<div class="sheet__info">' +
          '<a class="card__brand" href="' + U.brand(L.lang, b) + '">' + esc(b.name) + "</a>" +
          '<h1 class="sheet__name">' + esc(full) + "</h1>" +
          '<p class="product__kind">' + esc(L.t("product.kind")) + "</p>" +
          '<div class="card__tags"><span class="stock stock--ask">' + esc(L.t("stock.ask")) + "</span>" +
            '<span class="warr">' + SHIELD + esc(L.t("warranty.short", { n: META.warrantyMonths })) + "</span></div>" +
          '<div class="price product__price">' + L.price(w.priceGel) + (w.oldPriceGel ? "<s>" + L.price(w.oldPriceGel) + "</s>" : "") + "</div>" +
          '<div class="specs">' +
            '<span class="spec">' + L.num(s.motorW) + " W</span>" +
            '<span class="spec">' + L.num(s.batteryWh) + " Wh</span>" +
            '<span class="spec">' + s.topSpeedKmh + " " + esc(L.t("unit.kmh")) + "</span>" +
            '<span class="spec">' + s.rangeKm + " " + esc(L.t("unit.km")) + "</span>" +
            (s.weightKg != null ? '<span class="spec">' + L.num(s.weightKg) + " " + esc(L.t("unit.kg")) + "</span>" : "") +
          "</div>" +
          '<div class="sheet__acts">' + waLink(L, full, "btn", esc(L.t("cta.wa"))) +
            '<button class="btn btn--ghost" data-pick="' + w.id + '" aria-pressed="false">' + esc(L.t("cmp.add")) + "</button></div>" +
          '<div class="guar"><span class="guar__icon">' + SHIELD + "</span><div>" +
            '<strong class="guar__t">' + esc(L.t("warranty.title", { n: META.warrantyMonths })) + "</strong>" +
            '<p class="guar__p">' + esc(L.t("warranty.body")) + "</p></div></div>" +
          '<h2 class="sheet__h">' + esc(L.t("sheet.about")) + "</h2>" +
          '<p class="sheet__blurb">' + esc(L.loc(w.blurb)) + "</p>" +
          (feats.length ? '<h2 class="sheet__h">' + esc(L.t("sheet.feats")) + "</h2>" +
            '<ul class="feats">' + feats.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" : "") +
          '<h2 class="sheet__h">' + esc(L.t("sheet.specs")) + "</h2>" +
          '<table class="table"><tbody>' + table + "</tbody></table>" +
          '<p class="note">' + esc(L.t("sheet.note")) + "</p>" +
        "</div>\n</div>\n</article>\n" +
        '<section class="others"><h2>' + esc(L.t("product.others")) + "</h2>" +
        '<div class="grid">' + others.map(function (x) { return card(L, x, "h3"); }).join("") + "</div></section>\n" +
        "</div>\n</section>\n";

      page(L, {
        path: path, alt: alt, cur: "catalog",
        title: L.t("seo.product.title", { x: full, p: L.price(w.priceGel) }),
        desc: L.t("seo.product.desc", {
          x: full, motor: L.num(s.motorW), wh: L.num(s.batteryWh), speed: s.topSpeedKmh, range: s.rangeKm,
          kg: s.weightKg != null ? L.num(s.weightKg) : "—", p: L.price(w.priceGel)
        }),
        body: body, cmp: true, viewer: true, ogType: "product", og: img(w.images[0], "og"),
        preload: { href: img(w.images[0], 1000), srcset: srcset(w.images[0]), sizes: "(max-width: 820px) 92vw, 620px" },
        headExtra:
          '<meta property="product:price:amount" content="' + w.priceGel + '">\n' +
          '<meta property="product:price:currency" content="GEL">\n',
        ld: [productLd(L, w), crumbsLd(cr)]
      });
      var p = {}; p[L.lang] = path; p[L.other] = alt;
      if (L.lang === "ka") addSitemap("product:" + w.id, p, {
        lastmod: META.updated,
        images: w.images.map(function (f) { return abs(img(f, 1000)); })
      });
    }

    function viewerDialog(L) {
      return (
        '<dialog id="viewer" class="viewer">' +
        '<button class="sheet__x" data-close aria-label="' + esc(L.t("cta.close")) + '">✕</button>' +
        '<div class="viewer__stage" id="viewerStage"><img id="viewerImg" src="data:," alt=""></div>' +
        '<button class="viewer__arrow viewer__arrow--prev" data-view-step="-1" aria-label="' + esc(L.t("viewer.prev")) + '">‹</button>' +
        '<button class="viewer__arrow viewer__arrow--next" data-view-step="1" aria-label="' + esc(L.t("viewer.next")) + '">›</button>' +
        '<div class="viewer__count" id="viewerCount"></div></dialog>\n'
      );
    }

    /* --- ნაწილები, აქსესუარები, დამცავები, 3D ბეჭდვა ---------------------- */
    function categoryPage(L, n) {
      var path = U.cat(L.lang, n.id), alt = U.cat(L.other, n.id);
      var name = L.loc(n.name);
      var items = EXTRAS.filter(function (x) { var c = String(x.cat || ""); return c === n.id || c.indexOf(n.id + "/") === 0; });
      var cr = [[L.t("nav.home"), L.r.home], [L.t("nav.catalog"), L.r.wheels], [name]];
      /* ქვეკატეგორიები: ბმული #ქვე/ქვე. app.js ფილტრავს, JavaScript-ის გარეშე ყველაფერი ჩანს */
      function sub(node, p, depth) {
        if (!node.children || !node.children.length) return "";
        return '<div class="chips" role="group">' +
          '<a class="chip" href="#' + p.join("/") + '" data-sub="' + p.join("/") + '">' + esc(L.t("cat.all")) + "</a>" +
          node.children.map(function (ch) {
            var q = p.concat(ch.id), label = L.loc(ch.name);
            return '<a class="chip" href="#' + q.join("/") + '" data-sub="' + q.join("/") + '">' +
              (/^[\x20-\x7E]+$/.test(label) ? '<span class="lat">' + esc(label) + "</span>" : esc(label)) + "</a>";
          }).join("") + "</div>" +
          node.children.map(function (ch) { return sub(ch, p.concat(ch.id), depth + 1); }).join("");
      }
      var body =
        '<section class="sec page">\n<div class="wrap">\n' + crumbs(L, cr) + "\n" +
        '<div class="sec__head"><div><p class="eyebrow">' + esc(L.t("cat.eyebrow")) + "</p><h1>" + esc(name) + "</h1>" +
        '<p class="lead">' + esc(L.t("cat.lead", { x: name })) + "</p></div></div>\n" +
        catChips(L, n.id) + "\n" +
        '<div class="subcats" data-root="' + n.id + '">' + sub(n, [n.id], 0) + "</div>\n" +
        (items.length
          ? '<div class="grid" id="grid">' + items.map(function (x) { return extraCard(L, x); }).join("") + "</div>\n"
          : '<div class="empty soon"><p>' + esc(L.t("cat.soon")) + "</p>" + waLink(L, name, "btn btn--sm", esc(L.t("cta.wa"))) + "</div>\n") +
        "</div>\n</section>\n";
      page(L, {
        path: path, alt: alt, cur: "catalog", noindex: !items.length,
        title: L.t("seo.cat.title", { x: name }), desc: L.t("seo.cat.desc", { x: name }),
        body: body, ld: [crumbsLd(cr)]
      });
      var p = {}; p[L.lang] = path; p[L.other] = alt;
      if (L.lang === "ka" && items.length) addSitemap("cat:" + n.id, p, { lastmod: META.updated });
    }

    /* --- სერვისი ----------------------------------------------------------- */
    function contactButtons(L) {
      return '<div class="hero__cta">' + waLink(L, null, "btn", esc(L.t("cta.wa"))) +
        '<a class="btn btn--ghost" href="tel:' + PHONE + '">' + esc(L.t("contact.call")) + ' <span class="num">' + phoneShow + "</span></a></div>";
    }
    function servicePage(L) {
      var cr = [[L.t("nav.home"), L.r.home], [L.t("svc.eyebrow")]];
      var body =
        '<section class="sec page">\n<div class="wrap narrow">\n' + crumbs(L, cr) + "\n" +
        '<div class="sec__head"><div><p class="eyebrow">' + esc(L.t("svc.eyebrow")) + "</p><h1>" + esc(L.t("svc.h2")) + "</h1>" +
        '<p class="lead">' + esc(L.t("svc.lead")) + "</p></div></div>\n" +
        '<div class="guar guar--lg"><span class="guar__icon">' + SHIELD + "</span><div>" +
        '<h2 class="guar__t">' + esc(L.t("warranty.title", { n: META.warrantyMonths })) + "</h2>" +
        '<p class="guar__p">' + esc(L.t("warranty.body")) + "</p></div></div>\n" +
        '<div class="panel cta-panel"><p>' + esc(L.t("service.cta")) + "</p>" + contactButtons(L) + "</div>\n" +
        "</div>\n</section>\n";
      simple(L, "service", cr, body, L.t("seo.service.title"), L.t("seo.service.desc"), [{
        "@type": "Service", name: L.t("svc.eyebrow"), serviceType: L.t("seo.service.title").split("|")[0].trim(),
        provider: { "@id": SITE + "/#store" }, areaServed: { "@type": "City", name: "Tbilisi" }, description: L.t("seo.service.desc")
      }]);
    }

    /* --- ჩვენ შესახებ ------------------------------------------------------- */
    function aboutPage(L) {
      var cr = [[L.t("nav.home"), L.r.home], [L.t("nav.about")]];
      var tiles = BRANDS.map(function (b) {
        var list = byPrice.filter(function (w) { return w.brand === b.id; });
        if (!list.length) return "";
        return '<a class="tile" href="' + U.brand(L.lang, b) + '">' +
          '<span class="tile__name">' + esc(b.name) + "</span>" +
          '<span class="tile__tag">' + esc(L.loc(b.tagline)) + "</span>" +
          '<span class="tile__count">' + esc(L.t("about.brandModels", { n: list.length, from: L.price(list[0].priceGel) })) + "</span>" +
          '<span class="tile__from">' + list.map(function (w) { return esc(w.model); }).join(" · ") + "</span>" +
          '<span class="tile__shot"><img src="' + img(list[list.length - 1].images[0], 480) + '" alt="" loading="lazy" decoding="async"></span></a>';
      }).join("");
      var body =
        '<section class="sec page">\n<div class="wrap">\n' + crumbs(L, cr) + "\n" +
        '<div class="sec__head"><div><p class="eyebrow">' + esc(L.t("about.eyebrow")) + "</p><h1>" + esc(L.t("about.h2")) + "</h1>" +
        '<p class="lead">' + esc(L.t("about.p1")) + "</p></div></div>\n" +
        "<h2 class=\"sub-h\">" + esc(L.t("about.brandsH2")) + "</h2>\n" +
        '<div class="bento">' + tiles + "</div>\n" +
        '<div class="panel cta-panel">' + contactButtons(L) + "</div>\n" +
        "</div>\n</section>\n";
      simple(L, "about", cr, body, L.t("seo.about.title"), L.t("seo.about.desc"),
        [{ "@type": "AboutPage", name: L.t("about.h2"), url: abs(L.r.about), about: { "@id": SITE + "/#store" } }]);
    }

    /* --- კონტაქტი ----------------------------------------------------------- */
    function contactPage(L) {
      var cr = [[L.t("nav.home"), L.r.home], [L.t("nav.contact")]];
      var body =
        '<section class="sec page">\n<div class="wrap narrow">\n' + crumbs(L, cr) + "\n" +
        '<div class="sec__head"><div><p class="eyebrow">' + esc(L.t("contact.eyebrow")) + "</p><h1>" + esc(L.t("contact.h1")) + "</h1>" +
        '<p class="lead">' + esc(L.t("contact.lead")) + "</p></div></div>\n" +
        '<div class="panel" id="contact"><dl class="facts">' +
        '<div class="fact"><dt>' + esc(L.t("contact.phone")) + '</dt><dd class="num"><a href="tel:' + PHONE + '">' + phoneShow + "</a></dd></div>" +
        '<div class="fact"><dt>' + esc(L.t("contact.address")) + "</dt><dd>" + esc(L.t("contact.addressValue")) + "</dd></div>" +
        '<div class="fact"><dt>' + esc(L.t("contact.hours")) + '</dt><dd class="num">' + HOURS + "</dd></div>" +
        "</dl>" + contactButtons(L) + "</div>\n" +
        "</div>\n</section>\n";
      simple(L, "contact", cr, body, L.t("seo.contact.title"), L.t("seo.contact.desc"),
        [{ "@type": "ContactPage", name: L.t("contact.h1"), url: abs(L.r.contact), about: { "@id": SITE + "/#store" } }]);
    }

    function simple(L, key, cr, body, title, desc, ld) {
      page(L, { path: L.r[key], alt: ROUTES[L.other][key], cur: key, title: title, desc: desc, body: body, ld: (ld || []).concat([crumbsLd(cr)]) });
      var p = {}; p[L.lang] = L.r[key]; p[L.other] = ROUTES[L.other][key];
      if (L.lang === "ka") addSitemap(key, p);
    }

    /* --- გზამკვლევი: რა არის მონობორბალი + ხშირი კითხვები --------------- */
    function contentLinks(L, html) {
      /* {{url:...}} და {{...}} ჩანაცვლება content/ ფაილებში */
      var table =
        '<div class="tbl"><table><thead><tr><th>' + esc(L.t("foot.models")) + "</th><th>" + esc(L.t("spec.price")) + "</th><th>" +
        esc(L.t("spec.speed")) + "</th><th>" + esc(L.t("spec.range")) + "</th></tr></thead><tbody>" +
        byPrice.map(function (w) {
          return '<tr><th><a href="' + U.product(L.lang, w) + '">' + esc(fullName(w)) + "</a></th><td>" + L.price(w.priceGel) + "</td><td>" +
            w.specs.topSpeedKmh + " " + esc(L.t("unit.kmh")) + "</td><td>" + w.specs.rangeKm + " " + esc(L.t("unit.km")) + "</td></tr>";
        }).join("") + "</tbody></table></div>";
      return html
        .replace(/<!--[\s\S]*?-->\s*/g, "")
        .replace(/\{\{models\}\}/g, table)
        .replace(/\{\{url:([a-z0-9:-]+)\}\}/g, function (m, k) {
          var p = k.split(":");
          if (p[0] === "tip") return U.tip(L.lang, p[1]);
          if (p[0] === "model") { var w = WHEELS.filter(function (x) { return x.id === p[1]; })[0]; return w ? U.product(L.lang, w) : L.r.wheels; }
          return L.r[p[0]] || L.r.home;
        })
        .replace(/\{\{(\w+)\}\}/g, function (m, k) { return L.stats[k] != null ? esc(L.stats[k]) : m; })
        /* ძველი ბმულები რჩევებში (../index.html?model=...) */
        .replace(/(?:\.\.\/)?index\.html\?model=([a-z0-9-]+)(?:#catalog)?/g, function (m, id) {
          var w = WHEELS.filter(function (x) { return x.id === id; })[0];
          return w ? U.product(L.lang, w) : L.r.wheels;
        })
        .replace(/(?:\.\.\/)?index\.html\?cat=wheels(?:#catalog)?/g, L.r.wheels)
        .replace(/href="https:\/\/wa\.me\/\d+"/g, 'href="' + esc(L.wa()) + '"');
    }

    function guideLead(L) {
      var html = (GUIDE[L.lang] || GUIDE.ka || "").replace(/<!--[\s\S]*?-->/g, "");
      var m = /<p>([\s\S]*?)<\/p>/.exec(html);
      return m ? m[1].trim() : "";
    }

    function faqItems(L) {
      var out = [];
      for (var i = 1; i < 30; i++) {
        var q = L.t("faq." + i + "q");
        if (q === "faq." + i + "q") break;
        out.push({ q: q, a: L.t("faq." + i + "a") });
      }
      return out;
    }

    function guidePage(L) {
      var cr = [[L.t("nav.home"), L.r.home], [L.t("nav.guide")]];
      var faq = faqItems(L);
      var body =
        '<section class="sec page">\n<div class="wrap">\n<div class="prose">' + crumbs(L, cr) + "</div>\n" +
        '<article class="prose">\n<p class="eyebrow">' + esc(L.t("guide.eyebrow")) + "</p>\n" +
        "<h1>" + esc(L.t("home.introH2")) + "</h1>\n" +
        contentLinks(L, GUIDE[L.lang] || GUIDE.ka || "") + "\n" +
        "<h2>" + esc(L.t("guide.faqH2")) + "</h2>\n" +
        '<div class="faq">' + faq.map(function (f) {
          return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
        }).join("") + "</div>\n</article>\n" +
        '<div class="tip-cta"><p>' + esc(L.t("tips.cta")) + "</p>" + waLink(L, null, "btn btn--sm", esc(L.t("cta.wa"))) + "</div>\n" +
        "</div>\n</section>\n";
      simple(L, "guide", cr, body, L.t("seo.guide.title"), L.t("seo.guide.desc"), [
        {
          "@type": "Article", headline: L.t("home.introH2"), description: L.t("seo.guide.desc"), inLanguage: L.lang,
          url: abs(L.r.guide), mainEntityOfPage: abs(L.r.guide),
          author: { "@id": SITE + "/#store" }, publisher: { "@id": SITE + "/#store" },
          image: abs(img(byPrice[0].images[0], "og")),
          about: ["electric unicycle", "EUC", "monowheel", "მონობორბალი", "მონოციკლი", "მონოვილი", "ცალბორბალა"]
        },
        {
          "@type": "FAQPage",
          mainEntity: faq.map(function (f) {
            return { "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } };
          })
        }
      ]);
    }

    /* --- რჩევები -------------------------------------------------------- */
    function tipTitle(L, slug) {
      var tp = TIPS.filter(function (x) { return x.slug === slug; })[0];
      return tp ? tp[L.lang].title : "";
    }
    function tipCard(L, tp, i) {
      var d = tp[L.lang];
      return '<a class="tip-card" href="' + U.tip(L.lang, tp.slug) + '"><span class="tip-card__n">' + (i < 9 ? "0" : "") + (i + 1) + "</span>" +
        "<h3>" + esc(d.title) + "</h3><p>" + esc(d.desc) + '</p><span class="tip-card__more">' + esc(L.t("tips.read")) + " →</span></a>";
    }
    function tipsPages(L) {
      var cr = [[L.t("nav.home"), L.r.home], [L.t("nav.tips")]];
      var list =
        '<section class="sec page">\n<div class="wrap">\n' + crumbs(L, cr) + "\n" +
        '<div class="tips-head"><p class="eyebrow">' + esc(L.t("tips.eyebrow")) + "</p><h1>" + esc(L.t("tips.h1")) + "</h1>" +
        '<p class="lead">' + esc(L.t("tips.lead")) + "</p></div>\n" +
        '<div class="tips-grid">' + TIPS.map(function (tp, i) { return tipCard(L, tp, i); }).join("") + "</div>\n" +
        "</div>\n</section>\n";
      simple(L, "tips", cr, list, L.t("seo.tips.title"), L.t("seo.tips.desc"),
        [{ "@type": "CollectionPage", name: L.t("tips.h1"), url: abs(L.r.tips), inLanguage: L.lang }]);

      TIPS.forEach(function (tp) {
        var d = tp[L.lang];
        var path = U.tip(L.lang, tp.slug), alt = U.tip(L.other, tp.slug);
        var acr = [[L.t("nav.home"), L.r.home], [L.t("nav.tips"), L.r.tips], [d.title]];
        var more = TIPS.filter(function (x) { return x.slug !== tp.slug; }).map(function (x) {
          return '<li><a href="' + U.tip(L.lang, x.slug) + '">' + esc(x[L.lang].title) + "</a></li>";
        }).join("");
        var body =
          '<section class="sec page">\n<div class="wrap">\n<div class="prose">' + crumbs(L, acr) + "</div>\n" +
          '<article class="prose">\n<h1>' + esc(d.title) + '</h1>\n<p class="lead">' + esc(d.desc) + "</p>\n" +
          contentLinks(L, d.body) + "\n</article>\n" +
          '<div class="tip-cta"><p>' + esc(L.t("tips.cta")) + "</p>" + waLink(L, null, "btn btn--sm", esc(L.t("cta.wa"))) + "</div>\n" +
          '<section class="tip-more"><h2>' + esc(L.t("tips.more")) + "</h2><ul>" + more + "</ul></section>\n" +
          "</div>\n</section>\n";
        page(L, {
          path: path, alt: alt, cur: "tips", title: d.title + " | ZIPI.GE", desc: d.desc, ogType: "article", body: body,
          ld: [{
            "@type": "Article", headline: d.title, description: d.desc, inLanguage: L.lang, url: abs(path), mainEntityOfPage: abs(path),
            author: { "@id": SITE + "/#store" }, publisher: { "@id": SITE + "/#store" }
          }, crumbsLd(acr)]
        });
        var p = {}; p[L.lang] = path; p[L.other] = alt;
        if (L.lang === "ka") addSitemap("tip:" + tp.slug, p);
      });
    }

    /* --- 404 -------------------------------------------------------------- */
    function notFound() {
      var L = mk("ka"), E = mk("en");
      var body =
        '<section class="sec page">\n<div class="wrap narrow">\n' +
        '<div class="sec__head"><div><p class="eyebrow">404</p><h1>' + esc(L.t("nf.h1")) + "</h1>" +
        '<p class="lead">' + esc(L.t("nf.lead")) + '</p><p class="lead" lang="en">' + esc(E.t("nf.h1")) + ". " + esc(E.t("nf.lead")) + "</p></div></div>\n" +
        '<div class="hero__cta"><a class="btn" href="/">' + esc(L.t("nav.home")) + '</a><a class="btn btn--ghost" href="' + L.r.wheels + '">' +
        esc(L.t("cat.wheels")) + '</a><a class="btn btn--ghost" href="/en/" lang="en">English</a></div>\n' +
        "</div>\n</section>\n";
      page(L, { path: "/404.html", alt: "/en/", cur: "", title: L.t("nf.h1") + " | ZIPI.GE", desc: L.t("nf.lead"), body: body, noindex: true });
    }

    /* --- ძველი მისამართები: tips/*.html -> /rchevebi/... ------------------ */
    function redirectStub(from, to) {
      files[from] =
        '<!doctype html>\n<html lang="ka"><head><meta charset="utf-8"><title>ZIPI.GE</title>' +
        '<meta name="robots" content="noindex"><link rel="canonical" href="' + abs(to) + '">' +
        '<meta http-equiv="refresh" content="0; url=' + to + '"></head>' +
        '<body><a href="' + to + '">' + abs(to) + "</a></body></html>\n";
    }

    /* ===================================================================== */
    /* აწყობა                                                               */
    /* ===================================================================== */
    LANGS.forEach(function (lang) {
      var L = mk(lang);
      homePage(L);
      catalogPage(L, null);
      BRANDS.forEach(function (b) { if (WHEELS.some(function (w) { return w.brand === b.id; })) catalogPage(L, b); });
      WHEELS.forEach(function (w) { productPage(L, w); });
      TREE.forEach(function (n) { categoryPage(L, n); });
      servicePage(L);
      aboutPage(L);
      contactPage(L);
      guidePage(L);
      tipsPages(L);
    });
    var homeP = {}; homeP.ka = ROUTES.ka.home; homeP.en = ROUTES.en.home;
    sitemap.unshift({ key: "home", ka: homeP.ka, en: homeP.en, lastmod: META.updated });
    notFound();
    redirectStub("/tips/index.html", ROUTES.ka.tips);
    TIPS.forEach(function (tp) { redirectStub("/tips/" + tp.slug + ".html", U.tip("ka", tp.slug)); });

    /* --- sitemap.xml: ყოველი გვერდი ორივე ენაზე, ერთმანეთის ბმულებით ------- */
    var sm = ['<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'];
    sitemap.forEach(function (e) {
      LANGS.forEach(function (lang) {
        sm.push("  <url>");
        sm.push("    <loc>" + abs(e[lang]) + "</loc>");
        if (e.lastmod) sm.push("    <lastmod>" + e.lastmod + "</lastmod>");
        LANGS.forEach(function (lg) { sm.push('    <xhtml:link rel="alternate" hreflang="' + lg + '" href="' + abs(e[lg]) + '"/>'); });
        sm.push('    <xhtml:link rel="alternate" hreflang="x-default" href="' + abs(e.ka) + '"/>');
        (e.images || []).forEach(function (u) { sm.push("    <image:image><image:loc>" + esc(u) + "</image:loc></image:image>"); });
        sm.push("  </url>");
      });
    });
    sm.push("</urlset>");
    files["/sitemap.xml"] = sm.join("\n") + "\n";

    /* --- robots.txt: ყველა საძიებოს და AI-ს ღია ---------------------------- */
    files["/robots.txt"] = [
      "# ZIPI.GE: ყველა გვერდი ღიაა საძიებოებისთვის და ხელოვნური ინტელექტის ასისტენტებისთვის.",
      "User-agent: *", "Allow: /", "",
      "# AI ასისტენტები და მათი საძიებოები (ცალკე ჩამოწერილია, რომ ცხადი იყოს)",
      ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot",
        "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot", "YandexBot", "DuckDuckBot", "CCBot"]
        .map(function (b) { return "User-agent: " + b; }).join("\n"),
      "Allow: /", "",
      "Sitemap: " + SITE + "/sitemap.xml", ""
    ].join("\n");

    /* --- llms.txt: მოკლე აღწერა ხელოვნური ინტელექტისთვის (Markdown) -------- */
    var K = mk("ka"), E = mk("en");
    var md = [];
    md.push("# ZIPI.GE");
    md.push("");
    md.push("> " + E.t("seo.home.desc"));
    md.push("> " + K.t("seo.home.desc"));
    md.push("");
    md.push("ZIPI.GE is an electric unicycle (EUC, monowheel; Georgian: ელექტრო მონობორბალი, მონოციკლი, მონოვილი, ცალბორბალა; Russian: моноколесо) shop in Tbilisi, Georgia. " +
      "It sells " + BRANDS.map(function (b) { return b.name; }).join(", ") + " wheels, with service and parts. Prices are in Georgian lari (GEL, ₾).");
    md.push("");
    md.push("- Phone / WhatsApp: " + phoneShow + " (https://wa.me/" + META.whatsapp + ")");
    md.push("- Contact hours: " + HOURS + ", every day");
    md.push("- Location: Tbilisi, Georgia");
    md.push("- Warranty: " + META.warrantyMonths + " months on the motor, the controller and the battery cells, on every model");
    md.push("- Prices last checked: " + META.updated);
    md.push("");
    md.push("## Electric unicycles and prices");
    md.push("");
    byPrice.forEach(function (w) {
      var s = w.specs;
      md.push("- [" + fullName(w) + "](" + abs(U.product("en", w)) + "): " + E.price(w.priceGel).replace(" ₾", " GEL") + ". " +
        E.num(s.motorW) + " W motor" + (s.peakW ? " (" + E.num(s.peakW) + " W peak)" : "") + ", " + E.num(s.batteryWh) + " Wh, " + s.voltage + " V, top speed " +
        s.topSpeedKmh + " km/h, range up to " + s.rangeKm + " km, " + (s.weightKg != null ? s.weightKg + " kg, " : "") +
        (s.suspensionMm ? s.suspensionMm + " mm suspension, " : "") + "tyre " + s.tire +
        (s.chargeH ? ". Charging: ~" + s.chargeH + " h with the included " + s.chargerA + " A charger" + (s.fastA && s.fastA !== s.chargerA ? ", ~" + s.fastH + " h at the max. recommended " + s.fastA + " A" : "") : "") + ". Georgian page: " + abs(U.product("ka", w)));
    });
    md.push("");
    md.push("## Pages");
    md.push("");
    [["Catalogue", "wheels"], ["What is an electric unicycle (guide + FAQ)", "guide"], ["Service and warranty", "service"],
      ["Tips for riders", "tips"], ["About", "about"], ["Contact", "contact"]].forEach(function (p) {
      md.push("- " + p[0] + ": " + abs(ROUTES.en[p[1]]) + " (Georgian: " + abs(ROUTES.ka[p[1]]) + ")");
    });
    md.push("");
    md.push("## FAQ");
    md.push("");
    faqItems(E).forEach(function (f) { md.push("**" + f.q + "**  "); md.push(f.a); md.push(""); });
    faqItems(K).forEach(function (f) { md.push("**" + f.q + "**  "); md.push(f.a); md.push(""); });
    files["/llms.txt"] = md.join("\n");

    /* --- ვებ-აპის მანიფესტი (ტელეფონის მთავარ ეკრანზე დამატებისთვის) ------ */
    files["/site.webmanifest"] = JSON.stringify({
      name: "ZIPI.GE", short_name: "ZIPI.GE", lang: "ka", start_url: "/", display: "browser",
      background_color: "#0c0d10", theme_color: "#0c0d10",
      icons: [{ src: "/assets/icons/logo-512.png", sizes: "512x512", type: "image/png" }]
    }, null, 2) + "\n";

    return files;
  }

  G.ZB = { build: build, ROUTES: ROUTES, SITE: SITE };
})(typeof globalThis !== "undefined" ? globalThis : this);
