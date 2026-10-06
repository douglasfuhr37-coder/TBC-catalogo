'use strict';
const $ = id => document.getElementById(id);
const money = value => value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const category = p => p.id === 'kit' ? 'Kits' : p.id === 'sache' ? 'Sachês' : p.id === 'lencois' ? 'Tecidos' : p.id.startsWith('body') || p.id === 'geleia' ? 'Corpo' : 'Ambientes';
let city = '', cart = [], filter = 'Todos';
function product(id) { return PRODUCTS.find(p => p.id === id); }
function limit(p) { return p.stock || 6; }
function validate(items) {
  if (!Array.isArray(items)) return [];
  const result = [];
  for (const x of items) {
    const p = product(x.id);
    if (!p || !p.frags.includes(x.frag) || !Number.isInteger(x.qty) || x.qty <= 0) continue;
    const found = result.find(a => a.id === x.id && a.frag === x.frag);
    if (found) found.qty = Math.min(limit(p), found.qty + x.qty);
    else result.push({id:x.id, frag:x.frag, qty:Math.min(limit(p), x.qty)});
  }
  return result;
}
try {
  const saved = JSON.parse(localStorage.getItem('tbc-order') || '{}');
  city = saved.city || ''; cart = validate(saved.cart || []);
} catch {}
try {
  const raw = new URLSearchParams(location.hash.slice(1)).get('pedido');
  if (raw) {
    const shared = JSON.parse(decodeURIComponent(escape(atob(raw))));
    cart = validate(shared.cart); city = shared.city || '';
  }
} catch { setTimeout(() => toast('Não foi possível recuperar o pedido deste link.'), 200); }
if (!Object.hasOwn(FREIGHT, city) && city !== 'other') city = '';
for (const name of Object.keys(FREIGHT)) $('city').add(new Option(name, name));
$('city').add(new Option('Outra cidade / estado', 'other')); $('city').value = city;
const isLocal = () => Object.hasOwn(FREIGHT, city);
const price = p => city === 'other' ? p.price : p.localPrice;
const mode = () => city === 'other' ? 'Fechamento pela Shopee' : 'Entrega local';
function save() { try {localStorage.setItem('tbc-order', JSON.stringify({city, cart}));} catch {} }
function toast(message) {
  $('toast').textContent = message; $('toast').style.display = 'block';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => $('toast').style.display = 'none', 2800);
}
function setCategory(name) {
  filter = name;
  document.querySelectorAll('#filters button').forEach(b => {
    const active = b.textContent === filter;
    b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active));
  });
  render();
}
function render() {
  const query = $('search').value.trim().toLocaleLowerCase('pt-BR');
  $('grid').replaceChildren();
  const display = PRODUCTS.filter(p => !['body100','body250'].includes(p.id))
    .filter(p => (filter === 'Todos' || category(p) === filter) && (p.name + ' ' + p.frags.join(' ')).toLocaleLowerCase('pt-BR').includes(query));
  $('noResults').hidden = display.length > 0;
  for (const base of display) {
    let p = base;
    const article = document.createElement('article'); article.className = 'card';
    article.innerHTML = '<button class="imageButton"><img loading="lazy" src="assets/' + p.image + '.png" alt=""><span>Ver detalhes ↗</span></button><div class="info"><span class="eyebrow"></span><h3></h3><p></p><div class="choices"></div><div class="buy"><div><strong class="price"></strong><span class="priceMode"></span></div><button class="add">Adicionar +</button></div><span class="stock"></span></div>';
    article.querySelector('h3').textContent = p.name;
    article.querySelector('.eyebrow').textContent = category(p);
    article.querySelector('.info > p').textContent = p.desc;
    article.querySelector('.imageButton').setAttribute('aria-label', 'Ampliar foto de ' + p.name);
    article.querySelector('img').alt = p.name + (p.id.startsWith('body') ? ' — imagem da linha' : '');
    article.querySelector('.imageButton').onclick = () => {
      $('largePhoto').src = 'assets/' + p.image + '.png'; $('largePhoto').alt = p.name;
      $('photo').showModal();
    };
    const choices = article.querySelector('.choices');
    if (base.id === 'body60') {
      const label = document.createElement('label'); label.textContent = 'Tamanho';
      const size = document.createElement('select'); size.setAttribute('aria-label', 'Tamanho do Body Splash');
      for (const b of PRODUCTS.filter(x => x.id.startsWith('body'))) size.add(new Option(b.size, b.id));
      size.onchange = () => { p = product(size.value); update(); };
      label.append(size); choices.append(label);
    } else {
      const size = document.createElement('span'); size.className = 'sizeText'; size.textContent = p.size; choices.append(size);
    }
    const label = document.createElement('label'); label.textContent = 'Fragrância';
    const frag = document.createElement('select'); frag.setAttribute('aria-label', 'Fragrância de ' + p.name);
    for (const f of p.frags) frag.add(new Option(f, f));
    label.append(frag); choices.append(label); frag.onchange = update;
    function update() {
      const n = cart.find(x => x.id === p.id && x.frag === frag.value)?.qty || 0;
      article.querySelector('.price').textContent = money(price(p));
      article.querySelector('.priceMode').textContent = mode();
      article.querySelector('.stock').textContent = n >= limit(p) ? 'Limite desta fragrância no carrinho' : (limit(p) - n) + ' un. para adicionar nesta fragrância';
      article.querySelector('.add').disabled = n >= limit(p);
    }
    article.querySelector('.add').onclick = () => {
      const item = cart.find(x => x.id === p.id && x.frag === frag.value);
      if (item && item.qty >= limit(p)) return;
      if (item) item.qty++; else cart.push({id:p.id, frag:frag.value, qty:1});
      save(); renderCart(); update(); toast(p.name + ' adicionado ao carrinho');
    };
    update(); $('grid').append(article);
  }
  $('pricingNote').textContent = city === 'other'
    ? 'Valores para fechamento pela Shopee. Frete confirmado no atendimento.'
    : 'Valores de entrega local. Para outras cidades, confira os valores pela Shopee no carrinho.';
  const kit = product('kit');
  const saving = ['home','lencois','difusor'].reduce((s, id) => s + price(product(id)), 0) - price(kit);
  $('kitSaving').textContent = money(price(kit)) + ' · Economia de ' + money(saving) + ' nos produtos · ' + mode();
  renderCart();
}
function renderCart() {
  const subtotal = cart.reduce((s, x) => s + price(product(x.id)) * x.qty, 0);
  const count = cart.reduce((s, x) => s + x.qty, 0);
  $('count').textContent = count; $('mobileCount').textContent = count;
  $('items').replaceChildren();
  if (!cart.length) {
    const empty = document.createElement('p'); empty.className = 'small';
    empty.textContent = 'Seu carrinho está vazio. Encontre seus favoritos no catálogo.';
    $('items').append(empty);
  }
  cart.forEach((x, i) => {
    const p = product(x.id), div = document.createElement('div'); div.className = 'item';
    const head = document.createElement('div'); head.className = 'itemHead';
    const image = document.createElement('img'); image.src = 'assets/' + p.image + '.png'; image.alt = p.name;
    const info = document.createElement('div'), title = document.createElement('strong'), detail = document.createElement('p');
    title.textContent = p.name + ' · ' + p.size;
    detail.textContent = x.frag + ' · ' + money(price(p) * x.qty);
    info.append(title, detail); head.append(image, info); div.append(head);
    const row = document.createElement('div'); row.className = 'quantity';
    for (const [text, delta] of [['−', -1], ['+', 1]]) {
      const b = document.createElement('button'); b.textContent = text;
      b.setAttribute('aria-label', (delta > 0 ? 'Aumentar' : 'Diminuir') + ' quantidade de ' + p.name);
      b.disabled = delta > 0 && x.qty >= limit(p);
      b.onclick = () => { x.qty += delta; if (x.qty <= 0) cart.splice(i, 1); save(); render(); };
      row.append(b);
      if (delta === -1) { const span = document.createElement('span'); span.textContent = x.qty; row.append(span); }
    }
    const remove = document.createElement('button'); remove.className = 'remove'; remove.textContent = 'Remover';
    remove.onclick = () => {cart.splice(i, 1); save(); render();};
    row.append(remove); div.append(row); $('items').append(div);
  });
  $('outsideFields').hidden = city !== 'other';
  const freight = isLocal() ? FREIGHT[city] : 0;
  $('deliveryInfo').textContent = !city ? 'Escolha a cidade para confirmar os valores e o frete.'
    : isLocal() ? 'Valores de entrega local · ' + (freight ? 'Frete de ' + money(freight) : 'Frete grátis') + ' em ' + city + '.'
    : 'Valores pela Shopee. A Camila combina o fechamento e confirma o frete com você.';
  $('totals').innerHTML = '<p><span>' + (city ? 'Subtotal dos produtos' : 'Subtotal estimado · entrega local') + '</span><span>' + money(subtotal) + '</span></p><p><span>Frete</span><span>' + (!city ? 'Selecione a cidade' : isLocal() ? (freight ? money(freight) : 'Grátis') : 'A confirmar') + '</span></p><p><span>' + (!city ? 'Estimativa sem frete' : isLocal() ? 'Total do pedido' : 'Produtos sem frete') + '</span><span>' + money(subtotal + freight) + '</span></p>';
  $('cartRoute').textContent = !city ? 'Selecione a cidade acima para confirmar o total antes de enviar.'
    : isLocal() ? 'Entrega local em ' + city + '.'
    : 'Outra região: fechamento pela Shopee, organizado no atendimento.';
  $('checkout').disabled = !cart.length;
}
for (const name of ['Todos','Ambientes','Tecidos','Corpo','Sachês','Kits']) {
  const b = document.createElement('button'); b.textContent = name; b.className = name === filter ? 'active' : '';
  b.setAttribute('aria-pressed', String(name === filter)); b.onclick = () => setCategory(name); $('filters').append(b);
}
$('city').onchange = () => {city = $('city').value; save(); render();};
$('search').oninput = render;
function openCart() { renderCart(); $('cart').showModal(); }
$('openCart').onclick = $('mobileCart').onclick = openCart;
$('closeCart').onclick = $('continueShopping').onclick = () => {$('cart').close(); render();};
$('closePhoto').onclick = () => $('photo').close();
$('showKit').onclick = () => setCategory('Kits');
document.querySelectorAll('[data-category]').forEach(a => a.onclick = () => setCategory(a.dataset.category));
$('checkout').onclick = () => {
  if (!cart.length) return;
  if (!city) { $('city').focus(); toast('Selecione sua cidade no carrinho.'); return; }
  const name = $('customer').value.trim(), outside = $('outsideCity').value.trim();
  if (!name) { $('customer').focus(); toast('Informe seu nome.'); return; }
  if (city === 'other' && !outside) { $('outsideCity').focus(); toast('Informe cidade e estado.'); return; }
  const subtotal = cart.reduce((s, x) => s + price(product(x.id)) * x.qty, 0), freight = isLocal() ? FREIGHT[city] : 0;
  const link = new URL(location.href);
  link.hash = 'pedido=' + encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify({city, cart})))));
  const lines = cart.map(x => {
    const p = product(x.id);
    return '• ' + x.qty + 'x ' + p.name + ' ' + p.size + ' | ' + x.frag + ' | Unitário: ' + money(price(p)) + ' | Subtotal: ' + money(price(p) * x.qty);
  });
  const msg = 'Olá, Camila! Meu nome é ' + name + '. Montei este pedido na TBC:\n\n' + lines.join('\n') +
    '\n\nCidade: ' + (isLocal() ? city : outside) +
    '\nModalidade: ' + mode() +
    '\nSubtotal dos produtos: ' + money(subtotal) +
    '\nFrete: ' + (isLocal() ? (freight ? money(freight) : 'Grátis') : 'A confirmar pela Shopee') +
    '\n' + (isLocal() ? 'Total do pedido' : 'Total dos produtos (sem frete)') + ': ' + money(subtotal + freight) +
    '\n\nCarrinho: ' + link.href + '\n\nPode confirmar a disponibilidade e o fechamento?';
  window.open('https://wa.me/5547991303031?text=' + encodeURIComponent(msg), '_blank', 'noopener');
};
if (typeof CONTACTS !== 'undefined' && CONTACTS.instagram) {
  try {
    const url = new URL(CONTACTS.instagram);
    if (url.protocol === 'https:' && ['instagram.com','www.instagram.com'].includes(url.hostname)) {
      document.querySelectorAll('[data-instagram]').forEach(a => {a.href = url.href; a.hidden = false;});
    }
  } catch {}
}
render();

// Abertura em três cenas: fotos preservadas e movimento nos elementos da página.
(() => {
  const campaign = document.querySelector('.campaign');
  if (!campaign) return;
  const slides = [...campaign.querySelectorAll('[data-slide]')];
  const dots = [...campaign.querySelectorAll('[data-campaign-dot]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, paused = reduced.matches, timer;
  function refreshTimer() {
    clearInterval(timer);
    if (!paused && !document.hidden) timer = setInterval(() => show(current + 1), 5000);
  }
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.classList.toggle('isActive', i === current);
    });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    $('campaignCount').textContent = String(current + 1).padStart(2, '0') + ' / 03';
  }
  function updatePause() {
    campaign.classList.toggle('isPaused', paused);
    $('campaignPause').textContent = paused ? 'Reproduzir' : 'Pausar';
    $('campaignPause').setAttribute('aria-label', paused ? 'Reproduzir troca automática dos destaques' : 'Pausar troca automática dos destaques');
    refreshTimer();
  }
  dots.forEach((dot, i) => dot.onclick = () => {show(i); refreshTimer();});
  $('campaignNext').onclick = () => {show(current + 1); refreshTimer();};
  $('campaignPrev').onclick = () => {show(current - 1); refreshTimer();};
  $('campaignPause').onclick = () => {paused = !paused; updatePause();};
  document.addEventListener('visibilitychange', refreshTimer);
  reduced.addEventListener('change', () => {paused = reduced.matches; updatePause();});
  document.querySelectorAll('[data-product]').forEach(a => a.onclick = () => {
    $('search').value = a.dataset.product; setCategory('Corpo');
  });
  campaign.querySelector('[data-category]').onclick = () => {$('search').value = ''; setCategory('Kits');};
  show(0); updatePause();
})();
