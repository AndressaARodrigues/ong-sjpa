/* =========================================================
   SJPA — Landing page · interações e animações
   JavaScript puro (sem bibliotecas)
   ========================================================= */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Toast (aviso flutuante) ---------- */
  const toast = $('#toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3600);
  }

  /* ---------- Cabeçalho: sombra ao rolar + botão "voltar ao topo" ---------- */
  const header = $('#header');
  const toTop = $('#to-top');
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    toTop.classList.toggle('is-visible', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const nav = $('#nav');
  const menuToggle = $('#menu-toggle');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('.nav__link').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });

  /* ---------- Link ativo no menu conforme a seção visível ---------- */
  const navLinks = $$('.nav__link');
  // inclui o topo (#inicio): quando ele está no meio da tela, nenhum link fica ativo
  const sections = [$('#inicio'), ...navLinks.map((l) => $(l.getAttribute('href')))].filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Contadores animados ---------- */
  const formatNumber = (n) => n.toLocaleString('pt-BR');
  function animateCount(el) {
    const target = Number(el.dataset.count);
    if (prefersReducedMotion) { el.textContent = formatNumber(target); return; }
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = formatNumber(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Revelar elementos ao rolar + contadores + barra de progresso ---------- */
  const revealEls = $$('[data-reveal]');
  const counters = $$('[data-count]');
  const progressBars = $$('[data-progress]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.hasAttribute('data-reveal')) el.classList.add('is-visible');
        if (el.hasAttribute('data-count')) animateCount(el);
        if (el.hasAttribute('data-progress')) el.style.width = el.dataset.progress + '%';
        obs.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    counters.forEach((el) => { el.textContent = '0'; });
    [...revealEls, ...counters, ...progressBars].forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    progressBars.forEach((el) => { el.style.width = el.dataset.progress + '%'; });
  }

  /* ---------- Carrossel de animais + filtro ---------- */
  const carousel = $('#carousel');
  const prevBtn = $('#carousel-prev');
  const nextBtn = $('#carousel-next');
  const cards = $$('.pet-card', carousel);

  function cardStep() {
    const first = cards.find((c) => !c.classList.contains('is-hidden'));
    if (!first) return carousel.clientWidth;
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 24;
    return first.getBoundingClientRect().width + gap;
  }
  function updateCarouselButtons() {
    const max = carousel.scrollWidth - carousel.clientWidth - 2;
    prevBtn.disabled = carousel.scrollLeft <= 2;
    nextBtn.disabled = carousel.scrollLeft >= max;
  }
  prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => carousel.scrollBy({ left: cardStep(), behavior: 'smooth' }));
  carousel.addEventListener('scroll', updateCarouselButtons, { passive: true });
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); nextBtn.click(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevBtn.click(); }
  });
  window.addEventListener('resize', updateCarouselButtons);
  updateCarouselButtons();

  $$('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      $$('.chip').forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      cards.forEach((card, i) => {
        const show = filter === 'todos' || card.dataset.type === filter;
        card.classList.toggle('is-hidden', !show);
        card.classList.remove('is-entering');
        if (show) {
          void card.offsetWidth; // reinicia a animação
          card.style.animationDelay = (i * 0.05) + 's';
          card.classList.add('is-entering');
        }
      });
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
      setTimeout(updateCarouselButtons, 400);
    });
  });

  /* ---------- Modal "Conheça minha história" ---------- */
  const modal = $('#pet-modal');
  const modalImg = $('#modal-img');
  let currentPet = '';

  function openPet(card) {
    const d = card.dataset;
    currentPet = `${d.article || ''} ${d.name}`.trim(); // ex.: "a Flor", "o Thor"
    modalImg.src = d.img;
    modalImg.alt = card.querySelector('img').alt;
    modalImg.style.objectPosition = d.pos || '50% 50%';
    modalImg.parentElement.classList.remove('img-fallback');
    $('#modal-name').textContent = d.name;
    $('#modal-info').textContent = d.info;
    $('#modal-story').textContent = d.story;
    const tags = $('#modal-tags');
    tags.innerHTML = '';
    (d.tags || '').split('|').filter(Boolean).forEach((t) => {
      const li = document.createElement('li');
      li.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>';
      li.append(t);
      tags.append(li);
    });
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  }
  function closeModal() {
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
  }

  $$('.js-open-pet').forEach((btn) => btn.addEventListener('click', () => openPet(btn.closest('.pet-card'))));
  $('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); }); // clique fora do card

  /* Preenche o formulário de contato com um assunto (e mensagem opcional) */
  function prefillContact(subject, message) {
    const select = $('#f-assunto');
    const option = Array.from(select.options).find((o) => o.text === subject);
    if (option) select.value = option.value;
    if (message) $('#f-msg').value = message;
    $('#contato').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setTimeout(() => $('#f-nome').focus({ preventScroll: true }), 700);
  }

  $('#modal-adopt').addEventListener('click', () => {
    closeModal();
    prefillContact('Adoção', `Olá! Tenho interesse em adotar ${currentPet}. Como posso seguir com o processo?`);
  });

  $$('[data-subject]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      prefillContact(link.dataset.subject);
    });
  });

  /* ---------- Kits de doação → destaca o bloco do Pix ---------- */
  const pixPanel = $('#pix');
  const pixChosen = $('#pix-chosen');
  $$('.js-kit').forEach((btn) => {
    btn.addEventListener('click', () => {
      pixChosen.textContent = `Você escolheu o ${btn.dataset.kit}. Faça um Pix de R$ ${btn.dataset.value} — obrigado por ajudar!`;
      pixChosen.hidden = false;
      pixPanel.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      pixPanel.classList.remove('is-highlight');
      void pixPanel.offsetWidth;
      pixPanel.classList.add('is-highlight');
    });
  });

  /* ---------- Copiar CNPJ ---------- */
  $('#copy-cnpj').addEventListener('click', async () => {
    const value = $('#cnpj').textContent.trim();
    try {
      await navigator.clipboard.writeText(value);
      showToast('CNPJ copiado: ' + value);
    } catch (err) {
      showToast('Não foi possível copiar. CNPJ: ' + value);
    }
  });

  /* ---------- Formulário de contato (validação no navegador) ---------- */
  const form = $('#contact-form');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(field) {
    const wrapper = field.closest('.field');
    const error = wrapper.querySelector('.field__error');
    let message = '';
    const value = field.value.trim();
    if (field.required && !value) message = 'Preencha este campo.';
    else if (field.type === 'email' && !emailPattern.test(value)) message = 'Digite um e-mail válido.';
    wrapper.classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message;
    return !message;
  }

  $$('input[required], textarea[required]', form).forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.field').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = $$('input[required], textarea[required]', form);
    const results = fields.map(validateField);
    if (results.every(Boolean)) {
      showToast('Mensagem validada! (protótipo — o envio ainda não está conectado)');
      form.reset();
    } else {
      const firstError = fields[results.indexOf(false)];
      firstError.focus();
    }
  });

  /* ---------- Fotos: mostra um fundo com patinha se a imagem não carregar ---------- */
  $$('img').forEach((img) => {
    const fallback = () => img.parentElement.classList.add('img-fallback');
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fallback();
    img.addEventListener('error', fallback);
  });

  /* ---------- Ano atual no rodapé ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
