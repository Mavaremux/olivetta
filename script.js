const body = document.body;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.main-nav a');

function setNav(open) {
  body.classList.toggle('nav-open', open);
  toggle?.setAttribute('aria-expanded', String(open));
  toggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

toggle?.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
navLinks.forEach(link => link.addEventListener('click', () => setNav(false)));

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 130);
}, { passive: true });

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}


// ===================================
// MENÚ ESPECIAL — INTERACTIVIDAD Y SELECCIÓN
// ===================================
const menuState = {
  entrada: null,
  plato: null,
  postre: null,
  bebida: null
};

const menuSection = document.getElementById('menu');
const stickyBar = document.getElementById('me-sticky-bar');

// Sticky elements
const stickyValEntrada = document.getElementById('sticky-val-entrada');
const stickyValPlato = document.getElementById('sticky-val-plato');
const stickyValPostre = document.getElementById('sticky-val-postre');
const stickyValBebida = document.getElementById('sticky-val-bebida');
const stickyItemEntrada = document.getElementById('sticky-sel-entrada');
const stickyItemPlato = document.getElementById('sticky-sel-plato');
const stickyItemPostre = document.getElementById('sticky-sel-postre');
const stickyItemBebida = document.getElementById('sticky-sel-bebida');
const stickyWaBtn = document.getElementById('me-sticky-wa');
const stickyBtnLabel = document.getElementById('me-sticky-btn-label');

// In-section footer elements
const footerValEntrada = document.getElementById('footer-summary-entrada');
const footerValPlato = document.getElementById('footer-summary-plato');
const footerValPostre = document.getElementById('footer-summary-postre');
const footerValBebida = document.getElementById('footer-summary-bebida');
const footerWaBtn = document.getElementById('me-footer-wa');
const footerBtnText = document.getElementById('me-footer-btn-text');
const heroWaBtn = document.getElementById('me-hero-wa');

// Category badges
const badgeEntrada = document.getElementById('badge-entrada-status');
const badgePlato = document.getElementById('badge-plato-status');
const badgePostre = document.getElementById('badge-postre-status');
const badgeBebida = document.getElementById('badge-bebida-status');

// Category quick nav chips
const chipStatusEntrada = document.getElementById('chip-status-entrada');
const chipStatusPlato = document.getElementById('chip-status-plato');
const chipStatusPostre = document.getElementById('chip-status-postre');
const chipStatusBebida = document.getElementById('chip-status-bebida');

const categoryNavItems = [
  { id: 'cat-entrada', chip: document.getElementById('chip-entrada') },
  { id: 'cat-platos', chip: document.getElementById('chip-platos') },
  { id: 'cat-postres', chip: document.getElementById('chip-postres') },
  { id: 'cat-bebidas', chip: document.getElementById('chip-bebidas') }
];

function buildWhatsAppMessage() {
  const hasEntrada = Boolean(menuState.entrada);
  const hasPlato = Boolean(menuState.plato);
  const hasPostre = Boolean(menuState.postre);
  const hasBebida = Boolean(menuState.bebida);
  const hasAnySelection = hasEntrada || hasPlato || hasPostre || hasBebida;

  let msg = `Hola Olivetta, quisiera hacer un pedido:\n\n`;
  
  if (hasEntrada) {
    msg += `• Entrada: ${menuState.entrada}\n`;
  }
  if (hasPlato) {
    msg += `• Plato Fuerte: ${menuState.plato}\n`;
  }
  if (hasPostre) {
    msg += `• Postre: ${menuState.postre}\n`;
  }
  if (hasBebida) {
    msg += `• Bebida: ${menuState.bebida}\n`;
  }
  
  if (!hasAnySelection) {
    msg += `• (Sin selección aún)\n`;
  }
  
  msg += `\nQuedo atento/a para confirmar. ¡Muchas gracias!`;
  return `https://wa.me/584248445789?text=${encodeURIComponent(msg)}`;
}

function updateMenuUI() {
  const hasEntrada = Boolean(menuState.entrada);
  const hasPlato = Boolean(menuState.plato);
  const hasPostre = Boolean(menuState.postre);
  const hasBebida = Boolean(menuState.bebida);
  const hasAnySelection = hasEntrada || hasPlato || hasPostre || hasBebida;
  const isComplete = hasAnySelection;

  // 1. Update sticky bar texts
  if (stickyValEntrada && stickyItemEntrada) {
    if (menuState.entrada) {
      stickyValEntrada.textContent = menuState.entrada;
      stickyItemEntrada.classList.add('has-value');
      stickyItemEntrada.classList.remove('is-empty');
    } else {
      stickyValEntrada.textContent = 'Selecciona tu entrada';
      stickyItemEntrada.classList.remove('has-value');
      stickyItemEntrada.classList.add('is-empty');
      stickyItemEntrada.style.display = 'inline-flex';
    }
  }
  if (stickyValPlato) {
    stickyValPlato.textContent = menuState.plato ? menuState.plato : 'Selecciona tu plato';
    stickyValPlato.classList.toggle('is-empty', !hasPlato);
    stickyItemPlato?.classList.toggle('has-value', hasPlato);
  }
  if (stickyValPostre) {
    stickyValPostre.textContent = menuState.postre ? menuState.postre : 'Selecciona tu postre';
    stickyValPostre.classList.toggle('is-empty', !hasPostre);
    stickyItemPostre?.classList.toggle('has-value', hasPostre);
  }
  if (stickyValBebida && stickyItemBebida) {
    if (menuState.bebida) {
      stickyValBebida.textContent = menuState.bebida;
      stickyItemBebida.classList.add('has-value');
      stickyItemBebida.classList.remove('is-empty');
    } else {
      stickyValBebida.textContent = 'Selecciona tu bebida';
      stickyItemBebida.classList.remove('has-value');
      stickyItemBebida.classList.add('is-empty');
      stickyItemBebida.style.display = 'inline-flex';
    }
  }

  // 2. Update footer summary texts
  if (footerValEntrada) {
    footerValEntrada.innerHTML = hasEntrada
      ? `🫒 Entrada: <strong>${menuState.entrada}</strong>`
      : `🫒 Entrada: <em>Sin seleccionar</em>`;
    footerValEntrada.classList.toggle('is-active', hasEntrada);
  }
  if (footerValPlato) {
    footerValPlato.innerHTML = hasPlato
      ? `🍝 Plato: <strong>${menuState.plato}</strong>`
      : `🍝 Plato: <em>Sin seleccionar</em>`;
    footerValPlato.classList.toggle('is-active', hasPlato);
  }
  if (footerValPostre) {
    footerValPostre.innerHTML = hasPostre
      ? `🍮 Postre: <strong>${menuState.postre}</strong>`
      : `🍮 Postre: <em>Sin seleccionar</em>`;
    footerValPostre.classList.toggle('is-active', hasPostre);
  }
  if (footerValBebida) {
    footerValBebida.innerHTML = menuState.bebida
      ? `🥤 Bebida: <strong>${menuState.bebida}</strong>`
      : `🥤 Bebida: <em>Sin seleccionar</em>`;
    footerValBebida.classList.toggle('is-active', Boolean(menuState.bebida));
  }

  // 3. Update category badges
  if (badgeEntrada) {
    badgeEntrada.textContent = hasEntrada ? '✓ SELECCIONADO' : 'Opcional';
    badgeEntrada.classList.toggle('is-completed', hasEntrada);
  }
  }
  if (badgePlato) {
    badgePlato.textContent = hasPlato ? '✓ SELECCIONADO' : 'Opcional';
    badgePlato.classList.toggle('is-completed', hasPlato);
  }
  if (badgePostre) {
    badgePostre.textContent = hasPostre ? '✓ SELECCIONADO' : 'Opcional';
    badgePostre.classList.toggle('is-completed', hasPostre);
  }
  if (badgeBebida) {
    badgeBebida.textContent = menuState.bebida ? '✓ SELECCIONADO' : 'Opcional';
    badgeBebida.classList.toggle('is-completed', Boolean(menuState.bebida));
  }

  // 4. Update nav chip statuses
  if (chipStatusEntrada) {
    chipStatusEntrada.textContent = hasEntrada ? '✓ Listo' : 'Opcional';
    chipStatusEntrada.classList.toggle('is-ready', hasEntrada);
  }
  if (chipStatusPlato) {
    chipStatusPlato.textContent = hasPlato ? '✓ Listo' : 'Opcional';
    chipStatusPlato.classList.toggle('is-ready', hasPlato);
  }
  if (chipStatusPostre) {
    chipStatusPostre.textContent = hasPostre ? '✓ Listo' : 'Opcional';
    chipStatusPostre.classList.toggle('is-ready', hasPostre);
  }
  if (chipStatusBebida) {
    chipStatusBebida.textContent = menuState.bebida ? '✓ Listo' : 'Opcional';
    chipStatusBebida.classList.toggle('is-ready', Boolean(menuState.bebida));
  }

  // 5. Update WhatsApp links and validation state
  let ctaText = 'Pedir por WhatsApp';
  let shortCtaText = 'Pedir por WhatsApp';

  if (!hasAnySelection) {
    ctaText = 'Selecciona al menos un ítem para pedir';
    shortCtaText = 'Elige algo';
  }

  const waUrl = isComplete ? buildWhatsAppMessage() : '#';

  // Update sticky CTA
  if (stickyWaBtn) {
    stickyWaBtn.classList.toggle('is-disabled', !isComplete);
    stickyWaBtn.setAttribute('aria-disabled', String(!isComplete));
    stickyWaBtn.href = waUrl;
    if (stickyBtnLabel) stickyBtnLabel.textContent = shortCtaText;
  }

  // Update footer CTA
  if (footerWaBtn) {
    footerWaBtn.classList.toggle('is-disabled', !isComplete);
    footerWaBtn.setAttribute('aria-disabled', String(!isComplete));
    footerWaBtn.href = waUrl;
    if (footerBtnText) footerBtnText.textContent = ctaText;
  }

  // Update hero CTA
  if (heroWaBtn) {
    heroWaBtn.classList.toggle('is-disabled', !isComplete);
    heroWaBtn.setAttribute('aria-disabled', String(!isComplete));
    heroWaBtn.href = waUrl;
  }
}

// Attach radio listeners
document.querySelectorAll('input[type="radio"][name="plato_fuerte"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    menuState.plato = e.target.value;
    document.querySelectorAll('input[name="plato_fuerte"]').forEach(r => {
      r.closest('.me-dish-card')?.classList.toggle('is-selected', r.checked);
    });
    updateMenuUI();
  });
});

document.querySelectorAll('input[type="radio"][name="postre"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    menuState.postre = e.target.value;
    document.querySelectorAll('input[name="postre"]').forEach(r => {
      r.closest('.me-dish-card')?.classList.toggle('is-selected', r.checked);
    });
    updateMenuUI();
  });
});

document.querySelectorAll('input[type="radio"][name="bebida"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    menuState.bebida = e.target.value;
    document.querySelectorAll('input[name="bebida"]').forEach(r => {
      r.closest('.me-dish-card')?.classList.toggle('is-selected', r.checked);
    });
    updateMenuUI();
  });
});

// Checkbox listener for Entrada
document.querySelectorAll('input[type="checkbox"][name="entrada"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    menuState.entrada = e.target.checked ? e.target.value : null;
    e.target.closest('.me-dish-card')?.classList.toggle('is-selected', e.target.checked);
    updateMenuUI();
  });
});

// Prevent clicking disabled WhatsApp buttons and guide user smoothly
  [stickyWaBtn, footerWaBtn, heroWaBtn].forEach(btn => {
    btn?.addEventListener('click', (e) => {
      if (btn.classList.contains('is-disabled') || btn.getAttribute('aria-disabled') === 'true') {
        e.preventDefault();
        // Scroll smoothly to menu section
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

// Sticky bar visibility controller
function handleStickyBarScroll() {
  if (!menuSection || !stickyBar) return;
  const menuRect = menuSection.getBoundingClientRect();
  const footer = document.querySelector('.site-footer');
  const footerRect = footer ? footer.getBoundingClientRect() : null;

  // Show bar when user reaches menu section
  const inView = menuRect.top <= window.innerHeight * 0.7 && menuRect.bottom >= 100;
  const hittingFooter = footerRect ? footerRect.top <= window.innerHeight - 20 : false;

  if (inView && !hittingFooter) {
    stickyBar.classList.add('is-visible');
    document.body.classList.add('has-sticky-active');
  } else {
    stickyBar.classList.remove('is-visible');
    document.body.classList.remove('has-sticky-active');
  }
}

// Category Navigation ScrollSpy (sync active chip as user scrolls)
function handleCategoryNavScrollSpy() {
  const triggerOffset = 180;
  let activeChip = null;

  for (const item of categoryNavItems) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= triggerOffset && rect.bottom > triggerOffset - 50) {
      activeChip = item.chip;
      break;
    }
  }

  if (!activeChip && categoryNavItems[0]?.chip) {
    const firstEl = document.getElementById(categoryNavItems[0].id);
    if (firstEl && firstEl.getBoundingClientRect().top > triggerOffset) {
      activeChip = categoryNavItems[0].chip;
    }
  }

  if (activeChip) {
    categoryNavItems.forEach(item => {
      item.chip?.classList.toggle('is-active', item.chip === activeChip);
    });
  }
}

window.addEventListener('scroll', handleStickyBarScroll, { passive: true });
window.addEventListener('resize', handleStickyBarScroll, { passive: true });
window.addEventListener('scroll', handleCategoryNavScrollSpy, { passive: true });

// Initial setup
updateMenuUI();
handleStickyBarScroll();
handleCategoryNavScrollSpy();


const dateInput = document.getElementById('date');
if (dateInput) {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000).toISOString().slice(0,10);
  dateInput.min = local;
}

const reservationForm = document.getElementById('reservation-form');
reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const name = document.getElementById('name').value.trim();
  const guests = document.getElementById('guests').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const occasion = document.getElementById('occasion').value;
  const notes = document.getElementById('notes').value.trim();

  const [year, month, day] = date.split('-');
  const prettyDate = `${day}/${month}/${year}`;
  let message = `Hola Olivetta, quisiera solicitar una reserva.%0A%0A` +
    `Nombre: ${encodeURIComponent(name)}%0A` +
    `Personas: ${encodeURIComponent(guests)}%0A` +
    `Fecha: ${prettyDate}%0A` +
    `Hora: ${encodeURIComponent(time)}`;

  if (occasion) message += `%0AOcasión: ${encodeURIComponent(occasion)}`;
  if (notes) message += `%0AComentario: ${encodeURIComponent(notes)}`;
  message += `%0A%0AQuedo atento/a a la confirmación. Gracias.`;

  window.open(`https://wa.me/584248445789?text=${message}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
