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


// Menú Especial — staggered item animation on scroll
if ('IntersectionObserver' in window) {
  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.me-item');
        items.forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(14px)';
          setTimeout(() => {
            item.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.22,.7,.22,1)';
            item.style.opacity = '1';
            item.style.transform = 'none';
          }, 60 * i);
        });
        catObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.me-cat').forEach(cat => catObserver.observe(cat));
}


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
