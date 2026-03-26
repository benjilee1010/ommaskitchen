(function () {
  /** @type {ReturnType<typeof setTimeout> | null} */
  let heroCarouselIdleTimer = null;
  let heroCarouselIndex = 0;

  const HERO_CAROUSEL_IDLE_MS = 3000;

  /** @type {{ x: number; y: number }[]} */
  let heroPanPositions = [];

  const $ = (sel, root = document) => root.querySelector(sel);

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function heroSlideCopyFromData(slide) {
    const d =
      typeof HERO_COPY_DEFAULT !== "undefined"
        ? HERO_COPY_DEFAULT
        : {
            eyebrow: "Korean food made with love.",
            headline: "Order from Omma's Kitchen",
            lede: "",
          };
    return {
      eyebrow: slide.eyebrow ?? d.eyebrow,
      headline: slide.headline ?? d.headline,
      lede: slide.lede ?? d.lede,
    };
  }

  // --- Hero carousel (fresh rebuild) ---
  const HERO_TRANSITION_MS = 1450;
  const HERO_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

  function clearHeroIdleTimer() {
    if (heroCarouselIdleTimer) {
      clearTimeout(heroCarouselIdleTimer);
      heroCarouselIdleTimer = null;
    }
  }

  function applyHeroPan(index) {
    const imgs = document.querySelectorAll("#heroCarousel .hero-slide");
    const img = imgs[index];
    if (!img || typeof HERO_SLIDES === "undefined" || !HERO_SLIDES.length) return;
    const posIndex = index >= HERO_SLIDES.length ? 0 : index;
    const pos = heroPanPositions[posIndex] || { x: 50, y: 50 };
    img.style.objectFit = "cover";
    img.style.objectPosition = `${pos.x}% ${pos.y}%`;
  }

  function applyAllHeroPan() {
    const imgs = document.querySelectorAll("#heroCarousel .hero-slide");
    for (let i = 0; i < imgs.length; i++) applyHeroPan(i);
  }

  const els = {
    viewHome: $("#viewHome"),
    viewMenu: $("#viewMenu"),
    menuSections: $("#menuSections"),
    menuRestaurantName: $("#menuRestaurantName"),
    menuCuisine: $("#menuCuisine"),
    menuBlurb: $("#menuBlurb"),
    menuEta: $("#menuEta"),
    menuHeroBg: $("#menuHeroBg"),

    heroCta: $("#heroCta"),
    logoBtn: $("#logoBtn"),
    navMenu: $("#navMenu"),
    cartToggle: $("#cartToggle"),
    closeCart: $("#closeCart"),
    cartPanel: $("#cartPanel"),
    cartBackdrop: $("#cartBackdrop"),
    cartLines: $("#cartLines"),
    cartEmpty: $("#cartEmpty"),
    cartCount: $("#cartCount"),
    cartSubtotal: $("#cartSubtotal"),
    checkoutBtn: $("#checkoutBtn"),
    menuSectionNav: $("#menuSectionNav"),
    customizeModal: $("#customizeModal"),
    customizeBackdrop: $("#customizeBackdrop"),
    customizeClose: $("#customizeClose"),
    customizeCancel: $("#customizeCancel"),
    customizeForm: $("#customizeForm"),
    customizeTitle: $("#customizeTitle"),
    customizeDesc: $("#customizeDesc"),
    customizeLeaveOut: $("#customizeLeaveOut"),
    customizeLeaveOutFieldset: $("#customizeLeaveOutFieldset"),
    customizeLeaveOutHint: $("#customizeLeaveOutHint"),
    customizeAdd: $("#customizeAdd"),
    customizeAllergies: $("#customizeAllergies"),
    menuScrollRail: $("#menuScrollRail"),
    menuScrollThumb: $("#menuScrollThumb"),
  };

  const RID = RESTAURANT.id;

  /** @type {{ lineId: string; restaurantId: string; itemId: string; name: string; price: number; qty: number; omit: string[]; addNote: string; allergyNote: string }[]} */
  let cart = [];

  /** @type {string | null} */
  let customizeItemId = null;

  /** @type {HTMLElement | null} */
  let customizeFocusReturn = null;

  function newLineId() {
    return typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function formatMoney(n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
  }

  function layoutHeroCopyTrack() {
    const viewport = document.getElementById("heroCopyViewport");
    const track = document.getElementById("heroCopyTrack");
    const slides = document.querySelectorAll("#heroCopyTrack .hero-copy-slide");
    if (!viewport || !track || !slides.length) return 0;
    const w = viewport.offsetWidth;
    track.style.width = `${w * slides.length}px`;
    slides.forEach((el) => {
      el.style.width = `${w}px`;
    });
    return w;
  }

  /** Left column shows copy from slide 1 only; image carousel cycles independently. */
  function initHeroCopySlides() {
    const track = document.getElementById("heroCopyTrack");
    if (!track || typeof HERO_SLIDES === "undefined" || !HERO_SLIDES.length) return;
    track.innerHTML = "";
    const slide = HERO_SLIDES[0];
    const c = heroSlideCopyFromData(slide);
    const wrap = document.createElement("div");
    wrap.className = "hero-copy-slide";
    const pE = document.createElement("p");
    pE.className = "eyebrow";
    pE.textContent = c.eyebrow;
    const h1 = document.createElement("h1");
    h1.textContent = c.headline;
    const pL = document.createElement("p");
    pL.className = "lede";
    pL.textContent = c.lede;
    wrap.appendChild(pE);
    wrap.appendChild(h1);
    wrap.appendChild(pL);
    track.appendChild(wrap);
  }

  function layoutHeroTrack() {
    const viewport = document.querySelector("#heroCarousel .hero-carousel-viewport");
    const track = document.querySelector("#heroCarousel .hero-carousel-track");
    const frames = document.querySelectorAll("#heroCarousel .hero-slide-frame");
    if (!viewport || !track || !frames.length) return 0;
    const w = viewport.offsetWidth;
    track.style.width = `${w * frames.length}px`;
    frames.forEach((frame) => {
      frame.style.width = `${w}px`;
    });
    return w;
  }

  function heroSetTrackTransition(track, enabled) {
    if (!track) return;
    track.style.transition = enabled
      ? `transform ${HERO_TRANSITION_MS}ms ${HERO_EASE}`
      : "none";
  }

  function setHeroSlideIndex(idx) {
    heroCarouselIndex = idx;
    const imgTrack = document.querySelector("#heroCarousel .hero-carousel-track");
    const imgViewport = document.querySelector("#heroCarousel .hero-carousel-viewport");
    if (imgTrack && imgViewport) {
      const w = imgViewport.offsetWidth || layoutHeroTrack();
      imgTrack.style.transform = `translateX(${-idx * w}px)`;
    }
  }

  function initHeroCarousel() {
    initHeroCopySlides();
    const wrap = document.getElementById("heroCarousel");
    if (!wrap || typeof HERO_SLIDES === "undefined" || !HERO_SLIDES.length) return;
    wrap.innerHTML = "";
    heroPanPositions = HERO_SLIDES.map(() => ({ x: 50, y: 50 }));
    const viewport = document.createElement("div");
    viewport.className = "hero-carousel-viewport";
    const track = document.createElement("div");
    track.className = "hero-carousel-track";
    HERO_SLIDES.forEach((slide, i) => {
      const frame = document.createElement("div");
      frame.className = "hero-slide-frame";
      const img = document.createElement("img");
      img.className = "hero-slide";
      img.src = slide.src;
      img.alt = slide.alt;
      img.loading = i === 0 ? "eager" : "lazy";
      img.decoding = "async";
      const onImgReady = () => applyHeroPan(i);
      img.addEventListener("load", onImgReady);
      img.addEventListener("error", onImgReady);
      frame.appendChild(img);
      track.appendChild(frame);
      applyHeroPan(i);
    });
    const loopDupIdx = HERO_SLIDES.length;
    const firstSlide = HERO_SLIDES[0];
    const loopFrame = document.createElement("div");
    loopFrame.className = "hero-slide-frame";
    loopFrame.setAttribute("aria-hidden", "true");
    const loopImg = document.createElement("img");
    loopImg.className = "hero-slide";
    loopImg.src = firstSlide.src;
    loopImg.alt = "";
    loopImg.loading = "lazy";
    loopImg.decoding = "async";
    const onLoopReady = () => applyHeroPan(loopDupIdx);
    loopImg.addEventListener("load", onLoopReady);
    loopImg.addEventListener("error", onLoopReady);
    loopFrame.appendChild(loopImg);
    track.appendChild(loopFrame);
    applyHeroPan(loopDupIdx);
    viewport.appendChild(track);
    wrap.appendChild(viewport);
    layoutHeroCopyTrack();
    layoutHeroTrack();
    applyAllHeroPan();
    heroCarouselIndex = 0;
    setHeroSlideIndex(0);

    // Swipe / drag support
    let drag = null; // { startX, startTx, active }
    const getW = () =>
      document.querySelector("#heroCarousel .hero-carousel-viewport")?.offsetWidth ||
      layoutHeroTrack() ||
      1;
    heroSetTrackTransition(track, true);

    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      clearHeroIdleTimer();
      drag = {
        startX: e.clientX,
        startTx: -heroCarouselIndex * getW(),
        active: true,
      };
      heroSetTrackTransition(track, false);
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointermove", (e) => {
      if (!drag || !drag.active) return;
      const dx = e.clientX - drag.startX;
      track.style.transform = `translateX(${drag.startTx + dx}px)`;
    });

    function endDrag(e) {
      if (!drag || !drag.active) return;
      drag.active = false;
      heroSetTrackTransition(track, true);
      const w = getW();
      const dx = e.clientX - drag.startX;
      const threshold = Math.min(90, w * 0.18);
      const n = HERO_SLIDES.length;
      let next = heroCarouselIndex;
      if (dx <= -threshold) next = Math.min(heroCarouselIndex + 1, n);
      else if (dx >= threshold) next = Math.max(heroCarouselIndex - 1, 0);
      setHeroSlideIndex(next);
      drag = null;
      scheduleHeroCarouselIdle();
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
  }

  function jumpHeroCarouselToFirstWithoutTransition() {
    const track = document.querySelector("#heroCarousel .hero-carousel-track");
    const imgViewport = document.querySelector("#heroCarousel .hero-carousel-viewport");
    if (!track || !imgViewport) return;
    heroSetTrackTransition(track, false);
    heroCarouselIndex = 0;
    track.style.transform = "translateX(0px)";
    void track.offsetHeight;
    heroSetTrackTransition(track, true);
  }

  function scheduleHeroCarouselIdle() {
    clearHeroIdleTimer();
    heroCarouselIdleTimer = setTimeout(() => {
      heroCarouselIdleTimer = null;
      if (typeof HERO_SLIDES === "undefined" || HERO_SLIDES.length < 1) return;
      const n = HERO_SLIDES.length;
      const lastReal = n - 1;
      if (heroCarouselIndex === lastReal) {
        setHeroSlideIndex(n);
      } else {
        setHeroSlideIndex(heroCarouselIndex + 1);
      }
    }, HERO_CAROUSEL_IDLE_MS);
  }

  function heroCarouselTrackTransitionEnd(e) {
    if (!document.body.classList.contains("is-home")) return;
    if (e.propertyName !== "transform") return;
    const track = document.querySelector("#heroCarousel .hero-carousel-track");
    if (!track || e.target !== track) return;
    const n = typeof HERO_SLIDES !== "undefined" ? HERO_SLIDES.length : 0;
    if (n > 0 && heroCarouselIndex === n) {
      jumpHeroCarouselToFirstWithoutTransition();
    }
    scheduleHeroCarouselIdle();
  }

  function stopHeroCarousel() {
    // Stop only the timer; keep transition listener attached so carousel keeps working after drags.
    clearHeroIdleTimer();
  }

  function startHeroCarousel() {
    stopHeroCarousel();
    const slides = document.querySelectorAll("#heroCarousel .hero-slide");
    if (!slides.length) return;
    layoutHeroCopyTrack();
    layoutHeroTrack();
    heroCarouselIndex = 0;
    setHeroSlideIndex(0);
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = document.querySelector("#heroCarousel .hero-carousel-track");
    if (track && !track.dataset.heroBound) {
      track.dataset.heroBound = "1";
      track.addEventListener("transitionend", heroCarouselTrackTransitionEnd);
    }
    scheduleHeroCarouselIdle();
  }

  window.addEventListener("resize", () => {
    if (!document.body.classList.contains("is-home")) return;
    if (!document.querySelector("#heroCarousel .hero-slide")) return;
    layoutHeroCopyTrack();
    layoutHeroTrack();
    setHeroSlideIndex(heroCarouselIndex);
  });

  function showViews(which) {
    const map = { home: els.viewHome, menu: els.viewMenu };
    Object.entries(map).forEach(([key, el]) => {
      if (!el) return;
      el.classList.toggle("hidden", key !== which);
    });
    if (which === "menu") {
      els.navMenu?.setAttribute("aria-current", "page");
    } else {
      els.navMenu?.removeAttribute("aria-current");
    }
    document.documentElement.classList.toggle("home-mode", which === "home");
    document.body.classList.toggle("is-home", which === "home");
    stopHeroCarousel();
    if (which === "home") startHeroCarousel();
    syncMenuScrollRail();
  }

  function syncMenuScrollRail() {
    const rail = els.menuScrollRail;
    const thumb = els.menuScrollThumb;
    if (!rail || !thumb) return;

    const isMenu = !document.body.classList.contains("is-home");
    const doc = document.documentElement;
    const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const shouldShow = isMenu && maxScroll > 8;
    rail.classList.toggle("is-visible", shouldShow);
    if (!shouldShow) return;

    const railRect = rail.getBoundingClientRect();
    const railH = Math.max(1, railRect.height);
    const ratio = window.innerHeight / Math.max(doc.scrollHeight, 1);
    const thumbH = Math.max(44, Math.min(railH, railH * ratio));
    const p = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const top = (railH - thumbH) * p;
    thumb.style.height = `${thumbH}px`;
    thumb.style.transform = `translateY(${top}px)`;
  }

  function initMenuScrollRail() {
    const rail = els.menuScrollRail;
    const thumb = els.menuScrollThumb;
    if (!rail || !thumb) return;

    let drag = null; // { startY, startTop, maxTop }

    rail.addEventListener("pointerdown", (e) => {
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      if (maxScroll <= 0) return;

      const railRect = rail.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const thumbTop = thumbRect.top - railRect.top;
      const thumbH = thumbRect.height;
      const clickY = e.clientY - railRect.top;

      if (e.target !== thumb) {
        const targetTop = Math.max(0, Math.min(clickY - thumbH / 2, railRect.height - thumbH));
        const nextP = targetTop / Math.max(1, railRect.height - thumbH);
        window.scrollTo({ top: nextP * maxScroll, behavior: "auto" });
      }
    });

    thumb.addEventListener("pointerdown", (e) => {
      const railRect = rail.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      drag = {
        startY: e.clientY,
        startTop: thumbRect.top - railRect.top,
        maxTop: Math.max(1, railRect.height - thumbRect.height),
      };
      thumb.classList.add("is-dragging");
      thumb.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    thumb.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      if (maxScroll <= 0) return;
      const dy = e.clientY - drag.startY;
      const top = Math.max(0, Math.min(drag.startTop + dy, drag.maxTop));
      const p = top / drag.maxTop;
      thumb.style.transform = `translateY(${top}px)`;
      window.scrollTo({ top: p * maxScroll, behavior: "auto" });
    });

    const stopDrag = () => {
      if (!drag) return;
      drag = null;
      thumb.classList.remove("is-dragging");
    };
    thumb.addEventListener("pointerup", stopDrag);
    thumb.addEventListener("pointercancel", stopDrag);

    window.addEventListener("scroll", syncMenuScrollRail, { passive: true });
    window.addEventListener("resize", syncMenuScrollRail);
    syncMenuScrollRail();
  }

  function findMenuItem(itemId) {
    for (const sec of RESTAURANT.sections) {
      const item = sec.items.find((i) => i.id === itemId);
      if (item) return item;
    }
    return null;
  }

  function leaveOutOptionsFor(item) {
    if (item.leaveOut !== undefined) return item.leaveOut;
    return RESTAURANT.customizeDefaults.leaveOut;
  }

  function customizationKey(line) {
    return JSON.stringify({
      itemId: line.itemId,
      omit: [...line.omit].sort(),
      add: (line.addNote || "").trim(),
      allergies: (line.allergyNote || "").trim(),
    });
  }

  function linesMatchCustom(a, b) {
    return customizationKey(a) === customizationKey(b);
  }

  function formatCustomSummary(line) {
    const parts = [];
    if (line.omit && line.omit.length) parts.push(`Leave out: ${line.omit.join(", ")}`);
    const add = (line.addNote || "").trim();
    if (add) parts.push(`Add: ${add}`);
    const al = (line.allergyNote || "").trim();
    if (al) parts.push(`Notes: ${al}`);
    return parts.length ? parts.join(" · ") : "";
  }

  function sectionAnchorId(title) {
    return (
      "menu-" +
      title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );
  }

  function scrollToMenuSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function openCustomize(itemId) {
    const item = findMenuItem(itemId);
    if (!item || item.orderable === false) return;
    customizeFocusReturn = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    customizeItemId = itemId;
    els.customizeTitle.textContent = item.name;
    els.customizeDesc.textContent = item.description;
    els.customizeAdd.value = "";
    els.customizeAllergies.value = "";
    els.customizeLeaveOut.innerHTML = "";

    const opts = leaveOutOptionsFor(item);
    if (opts.length === 0) {
      els.customizeLeaveOutFieldset.hidden = true;
    } else {
      els.customizeLeaveOutFieldset.hidden = false;
      els.customizeLeaveOutHint.hidden = false;
      opts.forEach((labelText, idx) => {
        const id = `omit-${itemId}-${idx}`;
        const wrap = document.createElement("div");
        wrap.className = "customize-check";
        wrap.innerHTML = `<input type="checkbox" id="${id}" name="omit" value="${escapeAttr(labelText)}" />
          <label for="${id}">${escapeHtml(labelText)}</label>`;
        els.customizeLeaveOut.appendChild(wrap);
      });
    }

    els.customizeModal.hidden = false;
    els.customizeBackdrop.hidden = false;
    document.body.classList.add("customize-open");

    const first =
      els.customizeLeaveOut.querySelector("input") || els.customizeAdd;
    if (first && typeof first.focus === "function") first.focus();
  }

  function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function closeCustomize() {
    els.customizeModal.hidden = true;
    els.customizeBackdrop.hidden = true;
    document.body.classList.remove("customize-open");
    customizeItemId = null;
    if (customizeFocusReturn && typeof customizeFocusReturn.focus === "function") {
      customizeFocusReturn.focus();
    }
    customizeFocusReturn = null;
  }

  function buildMenu() {
    const r = RESTAURANT;
    const heroLabel = `Food at ${r.name}`;
    els.menuHeroBg.style.backgroundImage = `url("${encodeURI(r.image)}")`;
    els.menuHeroBg.setAttribute("aria-label", heroLabel);
    els.menuRestaurantName.textContent = r.name;
    els.menuCuisine.textContent = r.cuisine;
    els.menuBlurb.textContent = r.blurb;
    if (els.menuEta) els.menuEta.textContent = r.eta;
    document.documentElement.style.setProperty("--menu-accent", r.accent);

    els.menuSections.innerHTML = "";
    els.menuSectionNav.innerHTML = "";
    els.menuSections.style.setProperty("--item-accent", r.accent);

    r.sections.forEach((section) => {
      const anchorId = sectionAnchorId(section.title);
      const wrap = document.createElement("section");
      wrap.className = "menu-section" + (section.kbbq ? " menu-section--kbbq" : "");
      wrap.id = anchorId;
      const h = document.createElement("h3");
      h.textContent = section.title;
      wrap.appendChild(h);
      if (section.subtitle) {
        const note = document.createElement("p");
        note.className = "menu-section-note muted";
        note.textContent = section.subtitle;
        wrap.appendChild(note);
      }
      const list = document.createElement("div");
      list.className = "menu-items";

      section.items.forEach((item) => {
        const row = document.createElement("article");
        const canOrder = item.orderable !== false;
        row.className = "menu-item" + (canOrder ? "" : " menu-item--offline");
        row.style.setProperty("--item-accent", r.accent);
        const badgeHtml = item.badge ? `<span class="item-badge">${escapeHtml(item.badge)}</span>` : "";
        const actionsHtml = canOrder
          ? `<div class="menu-item-actions">
            <span class="price">${formatMoney(item.price)}</span>
            <div class="menu-item-btns">
              <button type="button" class="btn-customize" data-customize="${item.id}">Customize</button>
              <button type="button" class="add-btn" data-add="${item.id}">Add</button>
            </div>
          </div>`
          : `<div class="menu-item-actions menu-item-actions--readonly">
            <span class="price">${formatMoney(item.price)}</span>
            <p class="menu-item-in-person-only">In restaurant only</p>
          </div>`;
        row.innerHTML = `
          <div class="menu-item-text">
            ${badgeHtml}
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.description)}</p>
          </div>
          ${actionsHtml}
        `;
        if (canOrder) {
          row.querySelector("[data-add]").addEventListener("click", () => addToCartQuick(item.id));
          row.querySelector("[data-customize]").addEventListener("click", () => openCustomize(item.id));
        }
        list.appendChild(row);
      });

      wrap.appendChild(list);
      els.menuSections.appendChild(wrap);
    });

    r.sections.forEach((section) => {
      const anchorId = sectionAnchorId(section.title);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-jump-btn";
      btn.textContent = section.title;
      btn.setAttribute("aria-controls", anchorId);
      btn.addEventListener("click", () => scrollToMenuSection(anchorId));
      els.menuSectionNav.appendChild(btn);
    });
  }

  function goToMenu() {
    showViews("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function emptyCustomization() {
    return { omit: [], addNote: "", allergyNote: "" };
  }

  function addToCartQuick(itemId) {
    addOrMergeLine(itemId, emptyCustomization());
  }

  function addOrMergeLine(itemId, custom) {
    const item = findMenuItem(itemId);
    if (!item || item.orderable === false) return;

    const omit = custom.omit || [];
    const addNote = (custom.addNote || "").trim();
    const allergyNote = (custom.allergyNote || "").trim();

    const candidate = {
      lineId: newLineId(),
      restaurantId: RID,
      itemId,
      name: item.name,
      price: item.price,
      qty: 1,
      omit,
      addNote,
      allergyNote,
    };

    const existing = cart.find((l) => linesMatchCustom(l, candidate));
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push(candidate);
    }

    renderCart();
    if (!els.cartPanel.hidden) return;
    openCart();
  }

  function setLineQty(lineId, delta) {
    const line = cart.find((l) => l.lineId === lineId);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) {
      cart = cart.filter((l) => l.lineId !== lineId);
    }
    renderCart();
  }

  function cartTotals() {
    const count = cart.reduce((s, l) => s + l.qty, 0);
    const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
    return { count, subtotal };
  }

  function renderCart() {
    const { count, subtotal } = cartTotals();
    els.cartCount.textContent = String(count);
    els.cartSubtotal.textContent = formatMoney(subtotal);
    els.checkoutBtn.disabled = count === 0;
    els.cartEmpty.hidden = cart.length > 0;

    els.cartLines.innerHTML = "";
    cart.forEach((line) => {
      const summary = formatCustomSummary(line);
      const metaExtra = summary
        ? `<div class="cart-line-custom">${escapeHtml(summary)}</div>`
        : "";
      const li = document.createElement("li");
      li.className = "cart-line";
      li.innerHTML = `
        <div>
          <div class="cart-line-title">${escapeHtml(line.name)}</div>
          <div class="cart-line-meta">${formatMoney(line.price)} each</div>
          ${metaExtra}
        </div>
        <div class="cart-line-qty">
          <button type="button" class="qty-btn" data-dec="${line.lineId}" aria-label="${escapeAttr("Decrease " + line.name)}">−</button>
          <span>${line.qty}</span>
          <button type="button" class="qty-btn" data-inc="${line.lineId}" aria-label="${escapeAttr("Increase " + line.name)}">+</button>
        </div>
        <div class="cart-line-total">${formatMoney(line.price * line.qty)}</div>
      `;
      li.querySelector("[data-dec]").addEventListener("click", () => setLineQty(line.lineId, -1));
      li.querySelector("[data-inc]").addEventListener("click", () => setLineQty(line.lineId, 1));
      els.cartLines.appendChild(li);
    });
  }

  function openCart() {
    els.cartPanel.hidden = false;
    els.cartBackdrop.hidden = false;
    els.cartToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("cart-open");
  }

  function closeCart() {
    els.cartPanel.hidden = true;
    els.cartBackdrop.hidden = true;
    els.cartToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("cart-open");
  }

  els.customizeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!customizeItemId) return;
    const checks = els.customizeLeaveOut.querySelectorAll('input[name="omit"]:checked');
    const omit = Array.from(checks).map((input) => input.value);
    const addNote = els.customizeAdd.value;
    const allergyNote = els.customizeAllergies.value;
    addOrMergeLine(customizeItemId, { omit, addNote, allergyNote });
    closeCustomize();
  });

  els.customizeClose.addEventListener("click", closeCustomize);
  els.customizeCancel.addEventListener("click", closeCustomize);
  els.customizeBackdrop.addEventListener("click", closeCustomize);

  els.heroCta.addEventListener("click", goToMenu);
  els.navMenu?.addEventListener("click", goToMenu);

  els.logoBtn.addEventListener("click", () => {
    showViews("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  els.cartToggle.addEventListener("click", () => {
    if (els.cartPanel.hidden) openCart();
    else closeCart();
  });
  els.closeCart.addEventListener("click", closeCart);
  els.cartBackdrop.addEventListener("click", closeCart);

  els.checkoutBtn.addEventListener("click", () => {
    alert("This is a demo. No payment is processed. Thanks for clicking!");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!els.customizeModal.hidden) {
        closeCustomize();
        return;
      }
      if (!els.cartPanel.hidden) closeCart();
    }
  });

  initHeroCarousel();
  initMenuScrollRail();
  buildMenu();
  renderCart();
  showViews("home");
})();
