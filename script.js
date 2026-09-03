/* ===========================================================
   PONTEROSSO — script.js (JavaScript Vanilla, sin librerías)
=========================================================== */

/* ===================== SPA: NAVEGACIÓN POR PESTAÑAS ===================== */
const panels = document.querySelectorAll('.tab-panel');
const tabButtons = document.querySelectorAll('.tab-btn');
const navToggle = document.getElementById('nav-toggle');
const tabsNav = document.getElementById('tabs-nav');

function showTab(name){
  panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  tabsNav.classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', () => showTab(el.dataset.tab));
});
document.querySelectorAll('[data-tab-link]').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); showTab(el.dataset.tabLink); });
});
navToggle.addEventListener('click', () => tabsNav.classList.toggle('open'));

/* ===================== HERO SLIDER ===================== */
/* Fotografía real del local provista por el cliente. Se usa como única imagen confirmada;
   si el negocio entrega más fotos reales de producto/ambiente, agregar aquí como slides adicionales. */
const HERO_IMAGES = [
  { src: 'assets/hero.png', alt: 'Fachada con mural de Ponterosso en Ñuñoa' }
];
const slidesWrap = document.getElementById('hero-slides');
const dotsWrap = document.getElementById('hero-dots');
HERO_IMAGES.forEach((img, i) => {
  const div = document.createElement('div');
  div.className = 'hero-slide' + (i === 0 ? ' active' : '');
  div.style.backgroundImage = `url('${img.src}')`;
  div.setAttribute('role', 'img');
  div.setAttribute('aria-label', img.alt);
  slidesWrap.appendChild(div);
  if (HERO_IMAGES.length > 1) {
    const dot = document.createElement('span');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dotsWrap.appendChild(dot);
  }
});
if (HERO_IMAGES.length > 1) {
  let heroIndex = 0;
  const slideEls = slidesWrap.querySelectorAll('.hero-slide');
  const dotEls = dotsWrap.querySelectorAll('.hero-dot');
  setInterval(() => {
    slideEls[heroIndex].classList.remove('active');
    dotEls[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % slideEls.length;
    slideEls[heroIndex].classList.add('active');
    dotEls[heroIndex].classList.add('active');
  }, 5000);
}

/* ===================== DATOS REALES DE LA CARTA ===================== */
/* Fuente: pizarra "Cafetería Ponterosso" (única sección con precios impresos en el material entregado). */
const ICONS = {
  cafeteria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/></svg>',
  pasteleria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 20h16M6 20V11a6 6 0 0 1 12 0v9M9 11h6"/></svg>',
  heladeria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 10a4 4 0 1 1 8 0z"/><path d="M9 10l3 11 3-11"/></svg>',
  sandwiches: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 12h18M4 12l1-4h14l1 4M4 12l1 4h14l1-4"/></svg>'
};

const MENU = [
  {id:'c1', cat:'cafeteria', name:'Espresso', desc:'Simple o doble.', price:2190, note:'Doble $3.290'},
  {id:'c2', cat:'cafeteria', name:'Americano', desc:'Simple o doble.', price:2990, note:'Doble $3.990'},
  {id:'c3', cat:'cafeteria', name:'Cortado', desc:'Simple o doble.', price:3290, note:'Doble $4.290'},
  {id:'c4', cat:'cafeteria', name:'Capuccino', desc:'Simple o doble.', price:3990, note:'Doble $4.500'},
  {id:'c5', cat:'cafeteria', name:'Latte sabores', desc:'Vainilla, avellana o caramelo.', price:3990, note:'Doble $4.500'},
  {id:'c6', cat:'cafeteria', name:'Mokaccino', desc:'Espresso, chocolate y leche vaporizada.', price:3990, note:'Doble $4.500'},
  {id:'c7', cat:'cafeteria', name:'Café vienés con crema', desc:'Café con crema batida.', price:4990},
  {id:'c8', cat:'cafeteria', name:'Chocolate caliente', desc:'Chocolate caliente clásico.', price:3990},
  {id:'c9', cat:'cafeteria', name:'Té / Chai / variedades', desc:'Selección de té e infusiones.', price:2990},

  {id:'p1', cat:'pasteleria', name:'Torta variedades', desc:'Selección de tortas de la casa.', price:0, note:'Precio a confirmar'},
  {id:'p2', cat:'pasteleria', name:'Kuchen · Pie', desc:'Según disponibilidad del día.', price:0, note:'Precio a confirmar'},
  {id:'p3', cat:'pasteleria', name:'Cheesecake', desc:'Clásico, receta de la casa.', price:0, note:'Precio a confirmar'},
  {id:'p4', cat:'pasteleria', name:'Media luna rellena', desc:'Bollería recién horneada.', price:0, note:'Precio a confirmar'},
  {id:'p5', cat:'pasteleria', name:'Muffin chocolate-Nutella', desc:'Muffin relleno.', price:0, note:'Precio a confirmar'},
  {id:'p6', cat:'pasteleria', name:'Brownie', desc:'Con o sin nuez, según el día.', price:0, note:'Precio a confirmar'},
  {id:'p7', cat:'pasteleria', name:'Churros', desc:'Recién hechos.', price:0, note:'Precio a confirmar'},

  {id:'h1', cat:'heladeria', name:'Helado artesanal', desc:'Simple o doble, sabores de temporada.', price:0, note:'Precio a confirmar'},
  {id:'h2', cat:'heladeria', name:'Helado 1/2 y 1 litro', desc:'Para llevar a la casa.', price:0, note:'Precio a confirmar'},
  {id:'h3', cat:'heladeria', name:'Café helado', desc:'Especialidad helada de la casa.', price:0, note:'Precio a confirmar'},
  {id:'h4', cat:'heladeria', name:'Copa helado', desc:'Armada, para compartir o no.', price:0, note:'Precio a confirmar'},

  {id:'s1', cat:'sandwiches', name:'Paila de huevos', desc:'Con jamón, queso y tocino.', price:0, note:'Precio a confirmar'},
  {id:'s2', cat:'sandwiches', name:'Croissant palta pollo', desc:'Croissant horneado, mencionado en reseñas.', price:0, note:'Precio a confirmar'},
  {id:'s3', cat:'sandwiches', name:'Mechada queso / Italiana', desc:'A elección del pan.', price:0, note:'Precio a confirmar'},
  {id:'s4', cat:'sandwiches', name:'Ave palta', desc:'Clásico de la casa.', price:0, note:'Precio a confirmar'},
  {id:'s5', cat:'sandwiches', name:'Huevo palta parmesano', desc:'Con parmesano rallado.', price:0, note:'Precio a confirmar'},
  {id:'s6', cat:'sandwiches', name:'Pesto tomate queso', desc:'Vegetariano.', price:0, note:'Precio a confirmar'},
];
/* Pan a elección: Panini · Ciabatta · Marraqueta · Molde (dato real, sin sección propia). */

const fmt = n => n === 0 ? 'Consultar' : '$' + n.toLocaleString('es-CL');

/* ===================== RENDER MENÚ ===================== */
const grid = document.getElementById('menu-grid');
function renderMenu(filter){
  grid.innerHTML = '';
  const items = filter === 'todas' ? MENU : MENU.filter(m => m.cat === filter);
  items.forEach(item => {
    const card = document.createElement('button');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="icon">${ICONS[item.cat]}</div>
      <div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="row">
        <span class="price">${fmt(item.price)}</span>
        <span class="see-more">Ver +</span>
      </div>`;
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });
}
renderMenu('todas');

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.cat);
  });
});

/* ===================== MODAL DE PRODUCTO ===================== */
const modalOverlay = document.getElementById('modal-overlay');
let currentItem = null;
function openModal(item){
  currentItem = item;
  document.getElementById('modal-icon').innerHTML = ICONS[item.cat];
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-desc').textContent = item.desc;
  document.getElementById('modal-note').textContent = item.note || '';
  document.getElementById('modal-price').textContent = fmt(item.price);
  const addBtn = document.getElementById('modal-add');
  addBtn.disabled = item.price === 0;
  addBtn.textContent = item.price === 0 ? 'Consultar en el local' : 'Agregar';
  modalOverlay.classList.add('show');
}
function closeModal(){ modalOverlay.classList.remove('show'); }
document.getElementById('modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.getElementById('modal-add').addEventListener('click', () => {
  if (currentItem && currentItem.price > 0){ addToCart(currentItem); closeModal(); openDrawer(); }
});

/* ===================== CARRITO ===================== */
let cart = [];
function addToCart(item){
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({...item, qty:1});
  renderCart();
}
function renderCart(){
  const wrap = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count');
  const totalCount = cart.reduce((s,c)=>s+c.qty,0);
  countEl.textContent = totalCount;
  countEl.classList.toggle('show', totalCount > 0);

  if (cart.length === 0){
    wrap.innerHTML = '<p class="cart-empty">Tu pedido está vacío.</p>';
  } else {
    wrap.innerHTML = cart.map(c => `
      <div class="cart-line">
        <div>
          <p style="margin:0;font-size:.9rem;font-weight:500">${c.name}</p>
          <p style="margin:0;font-family:'IBM Plex Mono',monospace;font-size:.72rem;opacity:.6">${fmt(c.price)} · x${c.qty}</p>
        </div>
        <div class="qty-controls">
          <button class="qty-btn qty-minus" data-id="${c.id}">−</button>
          <button class="qty-btn qty-plus" data-id="${c.id}">+</button>
        </div>
      </div>`).join('');
    wrap.querySelectorAll('.qty-plus').forEach(b => b.addEventListener('click', () => {
      cart.find(c=>c.id===b.dataset.id).qty += 1; renderCart();
    }));
    wrap.querySelectorAll('.qty-minus').forEach(b => b.addEventListener('click', () => {
      const it = cart.find(c=>c.id===b.dataset.id);
      it.qty -= 1;
      if (it.qty <= 0) cart = cart.filter(c=>c.id!==b.dataset.id);
      renderCart();
    }));
  }
  const total = cart.reduce((s,c)=>s + c.price*c.qty, 0);
  document.getElementById('cart-total').textContent = fmt(total);
}
renderCart();

/* Drawer abrir/cerrar */
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('show'); }
function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('show'); }
document.getElementById('cart-btn').addEventListener('click', openDrawer);
document.getElementById('drawer-close').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

/* Selector de método de entrega (sólo retiro en local disponible; ver reporte de datos faltantes) */
document.querySelectorAll('.mode-btn:not([disabled])').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.mode-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
}));

/* ===================== ENVÍO DE PEDIDO POR WHATSAPP ===================== */
/* WhatsApp — número real confirmado por Google Maps: 9 3143 8043 */
const WHATSAPP_NUMBER = '56931438043';
function buildWaMessage(){
  if (cart.length === 0) return 'Hola! Quisiera hacer un pedido en Ponterosso.';
  let msg = 'Hola! Quisiera pedir:%0A';
  cart.forEach(c => { msg += `- ${c.name} x${c.qty} (${fmt(c.price*c.qty)})%0A`; });
  const total = cart.reduce((s,c)=>s + c.price*c.qty, 0);
  msg += `Total: ${fmt(total)}%0AMétodo: Retiro en local`;
  return msg;
}
document.getElementById('wa-send').addEventListener('click', () => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWaMessage()}`, '_blank');
});

/* ===================== HORARIOS / ABIERTO-CERRADO ===================== */
/* Fuente: bio de @ponterossocafe en Instagram — "Lunes a viernes 9:30 a 20 hrs, sábado 9:00 a 20 hrs".
   Domingo: cerrado (confirmado por el cliente). */
const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const HORARIO = {
  0: 'closed',
  1: {open:9.5, close:20}, 2: {open:9.5, close:20}, 3: {open:9.5, close:20},
  4: {open:9.5, close:20}, 5: {open:9.5, close:20},
  6: {open:9, close:20}
};
function renderHours(){
  const list = document.getElementById('hours-list');
  list.innerHTML = DIAS.map((d,i) => {
    const h = HORARIO[i];
    let text = 'Cerrado';
    if (h && h !== 'closed') text = (h.open === 9 ? '9:00' : '9:30') + ' – 20:00';
    return `<div class="row"><span>${d}</span><span>${text}</span></div>`;
  }).join('');

  const now = new Date();
  const day = now.getDay();
  const hourDecimal = now.getHours() + now.getMinutes()/60;
  const badge = document.getElementById('open-badge');
  const today = HORARIO[day];
  if (today && today !== 'closed' && hourDecimal >= today.open && hourDecimal < today.close){
    badge.textContent = 'Abierto ahora';
    badge.classList.add('open');
  } else if (today === 'closed'){
    badge.textContent = 'Cerrado los domingos';
  } else {
    badge.textContent = 'Cerrado por ahora';
  }
}
renderHours();
