/**
 * PARIGAI — South Indian Kitchen
 * script.js — All interactivity, data & rendering
 *
 * Structure:
 *  1. Menu Data Array
 *  2. Cart State
 *  3. Render Functions
 *  4. Filter / Search / Sort Logic
 *  5. Cart Logic
 *  6. UI Helpers (navbar scroll, tabs, mobile menu, toast)
 *  7. Init
 */

/* ============================================================
   1. MENU DATA
   ============================================================ */

/**
 * Each item:
 * { id, name, category, subcategory, price, desc, emoji,
 *   badges: ['organic','healthy','lowoil','combo','veg'],
 *   chutneys: [...],   // only for dosa items
 *   isOrganic: bool }
 */
const menuData = [

  /* ── BREAKFAST – Regular Dosas ─────────────────────────── */
  {
    id: 1,
    name: "Plain Dosa",
    category: "breakfast",
    subcategory: "Regular Dosa",
    price: 60,
    desc: "Thin, golden crispy dosa made from fermented rice & urad dal batter. Light and classic.",
    emoji: "🥞",
    badges: ["veg"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 2,
    name: "Masala Dosa",
    category: "breakfast",
    subcategory: "Regular Dosa",
    price: 90,
    desc: "Crispy dosa stuffed with spiced potato masala. The evergreen South Indian favourite.",
    emoji: "🌮",
    badges: ["veg"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 3,
    name: "Ghee Roast Dosa",
    category: "breakfast",
    subcategory: "Regular Dosa",
    price: 110,
    desc: "Extra crispy dosa roasted with pure cow ghee. Rich, indulgent, irresistible.",
    emoji: "✨",
    badges: ["veg"],
    chutneys: ["Coconut Chutney 🥥", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 4,
    name: "Onion Dosa",
    category: "breakfast",
    subcategory: "Regular Dosa",
    price: 80,
    desc: "Crispy dosa topped with finely chopped onions and a hint of green chilli.",
    emoji: "🧅",
    badges: ["veg"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 5,
    name: "Cheese Dosa",
    category: "breakfast",
    subcategory: "Regular Dosa",
    price: 120,
    desc: "Dosa layered with melted cheddar cheese and a sprinkle of herbs. Kids' favourite!",
    emoji: "🧀",
    badges: ["veg"],
    chutneys: ["Tomato Chutney 🍅", "Mint Chutney 🌿"],
    isOrganic: false
  },
  {
    id: 6,
    name: "Rava Dosa",
    category: "breakfast",
    subcategory: "Regular Dosa",
    price: 85,
    desc: "Instant semolina dosa – thin, netted, crunchy. Served with two chutneys and sambar.",
    emoji: "🔶",
    badges: ["veg"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 7,
    name: "Mysore Masala Dosa",
    category: "breakfast",
    subcategory: "Regular Dosa",
    price: 100,
    desc: "Spiced Mysore red chutney spread inside, packed with potato filling. Bold and fiery.",
    emoji: "🌶️",
    badges: ["veg"],
    chutneys: ["Coconut Chutney 🥥", "Sambar 🍲"],
    isOrganic: false
  },

  /* ── BREAKFAST – Organic / Healthy Dosas ───────────────── */
  {
    id: 8,
    name: "Spinach Dosa (Palak)",
    category: "breakfast",
    subcategory: "Organic Dosa",
    price: 100,
    desc: "Batter blended with fresh organic spinach. Vibrant green, iron-rich, and delicious.",
    emoji: "🌿",
    badges: ["organic", "healthy"],
    chutneys: ["Coconut Chutney 🥥", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: true
  },
  {
    id: 9,
    name: "Methi Dosa (Fenugreek)",
    category: "breakfast",
    subcategory: "Organic Dosa",
    price: 95,
    desc: "Fenugreek-infused dosa with a mildly bitter punch — great for blood sugar control.",
    emoji: "🌱",
    badges: ["organic", "healthy", "lowoil"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Sambar 🍲"],
    isOrganic: true
  },
  {
    id: 10,
    name: "Ragi Dosa (Millet)",
    category: "breakfast",
    subcategory: "Organic Dosa",
    price: 90,
    desc: "Finger millet dosa — rich in calcium, fibre, and earthy goodness. Gluten-friendly.",
    emoji: "🌾",
    badges: ["organic", "healthy", "lowoil"],
    chutneys: ["Coconut Chutney 🥥", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: true
  },
  {
    id: 11,
    name: "Beetroot Dosa",
    category: "breakfast",
    subcategory: "Organic Dosa",
    price: 105,
    desc: "Stunning deep-pink dosa made with fresh beet. Loaded with antioxidants and folate.",
    emoji: "❤️",
    badges: ["organic", "healthy"],
    chutneys: ["Coconut Chutney 🥥", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: true
  },
  {
    id: 12,
    name: "Multi-grain Dosa",
    category: "breakfast",
    subcategory: "Organic Dosa",
    price: 110,
    desc: "5-grain blend: ragi, jowar, bajra, thinai & rice. A powerhouse of nutrients.",
    emoji: "🥗",
    badges: ["organic", "healthy", "lowoil"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: true
  },
  {
    id: 13,
    name: "Green Moong Dosa",
    category: "breakfast",
    subcategory: "Organic Dosa",
    price: 95,
    desc: "Protein-rich whole green moong dosa. Soft inside, crispy outside, low on carbs.",
    emoji: "🌼",
    badges: ["organic", "healthy", "lowoil"],
    chutneys: ["Coconut Chutney 🥥", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: true
  },

  /* ── BREAKFAST – Combos ─────────────────────────────────── */
  {
    id: 14,
    name: "Masala Dosa + Filter Coffee",
    category: "breakfast",
    subcategory: "Combo",
    price: 130,
    desc: "The timeless South Indian morning duo — crispy masala dosa + traditional filter coffee.",
    emoji: "☕",
    badges: ["combo", "veg"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 15,
    name: "Ghee Roast + Fresh Juice",
    category: "breakfast",
    subcategory: "Combo",
    price: 160,
    desc: "Indulgent ghee roast dosa paired with a glass of seasonal fresh juice.",
    emoji: "🧃",
    badges: ["combo", "veg"],
    chutneys: ["Coconut Chutney 🥥", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 16,
    name: "Healthy Dosa Combo (Ragi + Juice)",
    category: "breakfast",
    subcategory: "Combo",
    price: 150,
    desc: "Ragi dosa + cold-pressed juice of your choice. The cleanest start to your morning.",
    emoji: "🥤",
    badges: ["combo", "organic", "healthy"],
    chutneys: ["Coconut Chutney 🥥", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: true
  },
  {
    id: 17,
    name: "Idli + Vada + Dosa Combo",
    category: "breakfast",
    subcategory: "Combo",
    price: 180,
    desc: "The ultimate South Indian breakfast spread — 2 idli, 1 vada, and a plain dosa.",
    emoji: "🍽️",
    badges: ["combo", "veg"],
    chutneys: ["Coconut Chutney 🥥", "Tomato Chutney 🍅", "Mint Chutney 🌿", "Sambar 🍲"],
    isOrganic: false
  },

  /* ── LUNCH ──────────────────────────────────────────────── */
  {
    id: 18,
    name: "South Indian Thali",
    category: "lunch",
    subcategory: "Thali",
    price: 220,
    desc: "Full meal: rice, 2 curries, rasam, sambar, papad, pickle & payasam.",
    emoji: "🍛",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 19,
    name: "Organic Millet Thali",
    category: "lunch",
    subcategory: "Thali",
    price: 260,
    desc: "Millet rice + 3 seasonal organic curries + rasam + organic papad. 100% wholesome.",
    emoji: "🌾",
    badges: ["organic", "healthy"],
    chutneys: [],
    isOrganic: true
  },
  {
    id: 20,
    name: "Sambar Rice",
    category: "lunch",
    subcategory: "Rice",
    price: 120,
    desc: "Piping hot rice mixed with our signature slow-cooked sambar + ghee drizzle.",
    emoji: "🍲",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 21,
    name: "Curd Rice",
    category: "lunch",
    subcategory: "Rice",
    price: 100,
    desc: "Creamy yoghurt rice tempered with mustard, curry leaves, and pomegranate seeds.",
    emoji: "🍚",
    badges: ["veg", "healthy"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 22,
    name: "Lemon Rice",
    category: "lunch",
    subcategory: "Rice",
    price: 110,
    desc: "Tangy and zesty rice with turmeric, peanuts, and fresh lemon — light and fragrant.",
    emoji: "🍋",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 23,
    name: "Kootu Curry (Seasonal)",
    category: "lunch",
    subcategory: "Curry",
    price: 90,
    desc: "Mixed seasonal vegetables simmered with coconut and spices. Comforting and hearty.",
    emoji: "🥦",
    badges: ["organic", "veg"],
    chutneys: [],
    isOrganic: true
  },

  /* ── DINNER ─────────────────────────────────────────────── */
  {
    id: 24,
    name: "Uthappam",
    category: "dinner",
    subcategory: "Tiffin",
    price: 100,
    desc: "Thick soft pancake with onion, tomato, and coriander toppings. Wholesome evening meal.",
    emoji: "🥘",
    badges: ["veg"],
    chutneys: ["Coconut Chutney 🥥", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 25,
    name: "Pongal",
    category: "dinner",
    subcategory: "Tiffin",
    price: 90,
    desc: "Soft rice & moong dal cooked with pepper, jeera, and ghee. Ultimate comfort food.",
    emoji: "🍯",
    badges: ["veg", "healthy"],
    chutneys: ["Coconut Chutney 🥥", "Sambar 🍲"],
    isOrganic: false
  },
  {
    id: 26,
    name: "Appam + Stew",
    category: "dinner",
    subcategory: "Tiffin",
    price: 140,
    desc: "Lacy, fermented coconut-milk appam with a mild Kerala vegetable stew.",
    emoji: "🫕",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 27,
    name: "Ragi Mudde + Sambar",
    category: "dinner",
    subcategory: "Healthy",
    price: 120,
    desc: "Traditional finger-millet balls with rich sambar — high protein, low glycemic index.",
    emoji: "🟤",
    badges: ["organic", "healthy", "lowoil"],
    chutneys: [],
    isOrganic: true
  },
  {
    id: 28,
    name: "Pesarattu (Moong Crepe)",
    category: "dinner",
    subcategory: "Healthy",
    price: 110,
    desc: "Crispy green moong crepe served with ginger chutney. High protein, low carb.",
    emoji: "💚",
    badges: ["organic", "healthy"],
    chutneys: ["Coconut Chutney 🥥", "Mint Chutney 🌿"],
    isOrganic: true
  },
  {
    id: 29,
    name: "Idiyappam + Curry",
    category: "dinner",
    subcategory: "Tiffin",
    price: 130,
    desc: "Steamed rice-flour string hoppers with coconut milk curry. Light and nourishing.",
    emoji: "🕸️",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  },

  /* ── DRINKS ─────────────────────────────────────────────── */
  {
    id: 30,
    name: "Filter Coffee",
    category: "drinks",
    subcategory: "Hot",
    price: 40,
    desc: "Traditional South Indian filter decoction with frothy milk. The OG morning ritual.",
    emoji: "☕",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 31,
    name: "Masala Chai",
    category: "drinks",
    subcategory: "Hot",
    price: 35,
    desc: "Spiced tea with ginger, cardamom, and cinnamon. Warming and aromatic.",
    emoji: "🫖",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 32,
    name: "Fresh Sugarcane Juice",
    category: "drinks",
    subcategory: "Fresh",
    price: 60,
    desc: "100% natural pressed sugarcane with a squeeze of lime. Pure liquid energy.",
    emoji: "🌿",
    badges: ["healthy"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 33,
    name: "Organic Turmeric Latte",
    category: "drinks",
    subcategory: "Wellness",
    price: 80,
    desc: "Organic turmeric, black pepper, and cinnamon in warm oat milk. Anti-inflammatory gold.",
    emoji: "💛",
    badges: ["organic", "healthy"],
    chutneys: [],
    isOrganic: true
  },
  {
    id: 34,
    name: "Nannari Sherbet",
    category: "drinks",
    subcategory: "Fresh",
    price: 65,
    desc: "Traditional Indian sarsaparilla root drink — cooling, digestive, and utterly refreshing.",
    emoji: "🌸",
    badges: ["healthy"],
    chutneys: [],
    isOrganic: false
  },
  {
    id: 35,
    name: "Green Detox Juice",
    category: "drinks",
    subcategory: "Wellness",
    price: 90,
    desc: "Spinach, cucumber, amla, ginger & lime. Cold-pressed, no sugar added.",
    emoji: "🥒",
    badges: ["organic", "healthy", "lowoil"],
    chutneys: [],
    isOrganic: true
  },
  {
    id: 36,
    name: "Rose Milk",
    category: "drinks",
    subcategory: "Fresh",
    price: 55,
    desc: "Chilled milk with natural rose syrup — the quintessential Tamil Nadu summer drink.",
    emoji: "🌹",
    badges: ["veg"],
    chutneys: [],
    isOrganic: false
  }
];

/* ============================================================
   2. CART STATE
   ============================================================ */
// cart is an array of { id, name, price, emoji, qty }
let cart = [];

/* ============================================================
   3. RENDER FUNCTIONS
   ============================================================ */

/**
 * Build badge HTML from an array of badge keys
 */
function buildBadges(badges) {
  const map = {
    organic: '<span class="badge badge-organic">🌿 Organic</span>',
    healthy: '<span class="badge badge-healthy">💚 Healthy</span>',
    lowoil:  '<span class="badge badge-lowoil">🫙 Low Oil</span>',
    combo:   '<span class="badge badge-combo">🎁 Combo</span>',
    veg:     '<span class="badge badge-veg">🟢 Veg</span>'
  };
  return badges.map(b => map[b] || '').join('');
}

/**
 * Build chutney tags HTML
 */
function buildChutneys(chutneys) {
  if (!chutneys || chutneys.length === 0) return '';
  const tags = chutneys.map(c => `<span class="chutney-tag">${c}</span>`).join('');
  return `
    <div class="card-chutneys">
      <div class="chutney-label">Served with</div>
      <div class="chutney-tags">${tags}</div>
    </div>`;
}

/**
 * Render a single menu card
 */
function renderCard(item) {
  const badgesHTML  = buildBadges(item.badges);
  const chutneyHTML = buildChutneys(item.chutneys);

  return `
  <div class="menu-card" data-id="${item.id}" data-category="${item.category}" data-organic="${item.isOrganic}">
    <div class="card-img-placeholder">
      <span>${item.emoji}</span>
      <div class="card-badges">${badgesHTML}</div>
    </div>
    <div class="card-body">
      <div class="card-category-label">${item.subcategory || item.category}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-desc">${item.desc}</div>
      ${chutneyHTML}
      <div class="card-footer">
        <div class="card-price">₹${item.price}</div>
        <button class="add-to-cart" onclick="addToCart(${item.id})" id="atc-${item.id}">
          + Add
        </button>
      </div>
    </div>
  </div>`;
}

/**
 * Render the filtered + sorted list into #menuGrid
 */
function renderMenu(items) {
  const grid = document.getElementById('menuGrid');
  const noResults = document.getElementById('noResults');

  if (items.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';
  grid.innerHTML = items.map(renderCard).join('');

  // Re-apply "added" state for items already in cart
  cart.forEach(cartItem => {
    const btn = document.getElementById(`atc-${cartItem.id}`);
    if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); }
  });
}

/* ============================================================
   4. FILTER / SEARCH / SORT LOGIC
   ============================================================ */

let activeCategory = 'all';   // 'all' | 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'combo'
let activeChip     = 'all';   // same + 'organic'
let searchQuery    = '';
let sortOrder      = 'default';

function applyFilters() {
  let items = [...menuData];

  // -- Category tab filter --
  if (activeCategory !== 'all') {
    if (activeCategory === 'combo') {
      items = items.filter(i => i.subcategory === 'Combo');
    } else {
      items = items.filter(i => i.category === activeCategory);
    }
  }

  // -- Chip filter (organic) --
  if (activeChip === 'organic') {
    items = items.filter(i => i.isOrganic);
  } else if (activeChip !== 'all' && activeChip !== 'organic') {
    // chips mirror category tabs for mobile fallback
    if (activeChip === 'combo') {
      items = items.filter(i => i.subcategory === 'Combo');
    } else {
      items = items.filter(i => i.category === activeChip);
    }
  }

  // -- Search filter --
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.desc.toLowerCase().includes(q) ||
      i.subcategory.toLowerCase().includes(q)
    );
  }

  // -- Sort --
  if (sortOrder === 'low')  items.sort((a, b) => a.price - b.price);
  if (sortOrder === 'high') items.sort((a, b) => b.price - a.price);

  renderMenu(items);
}

/* ============================================================
   5. CART LOGIC
   ============================================================ */

/**
 * Add an item to the cart (or increment qty)
 */
function addToCart(id) {
  const item = menuData.find(i => i.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, emoji: item.emoji, qty: 1 });
  }

  // Update button
  const btn = document.getElementById(`atc-${id}`);
  if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); }

  updateCartUI();
  showToast(`${item.emoji} ${item.name} added!`);
}

/**
 * Change quantity from cart (+1 / -1)
 */
function changeQty(id, delta) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx === -1) return;

  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
    // Reset button
    const btn = document.getElementById(`atc-${id}`);
    if (btn) { btn.textContent = '+ Add'; btn.classList.remove('added'); }
  }

  updateCartUI();
}

/**
 * Re-render the cart drawer contents and count badge
 */
function updateCartUI() {
  const countEl   = document.getElementById('cartCount');
  const bodyEl    = document.getElementById('cartBody');
  const footerEl  = document.getElementById('cartFooter');
  const totalEl   = document.getElementById('cartTotal');

  const totalQty   = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  // Count badge
  countEl.textContent = totalQty;
  totalQty > 0 ? countEl.classList.add('visible') : countEl.classList.remove('visible');

  // Cart body
  if (cart.length === 0) {
    bodyEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty.<br>Add something delicious!</p>
      </div>`;
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  totalEl.textContent = `₹${totalPrice}`;

  bodyEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-emoji">${c.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-price">₹${c.price} × ${c.qty} = ₹${c.price * c.qty}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${c.id}, -1)">−</button>
        <span class="qty-num">${c.qty}</span>
        <button class="qty-btn" onclick="changeQty(${c.id}, +1)">+</button>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   6. UI HELPERS
   ============================================================ */

/**
 * Toast notification
 */
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

/**
 * Navbar scroll shadow
 */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });
}

/**
 * Mobile hamburger menu
 */
function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on nav link click
  links.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/**
 * Category tab clicks
 */
function initTabs() {
  document.getElementById('categoryTabs').addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.cat;
    // Sync chip
    activeChip = 'all';
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    document.querySelector('.chip[data-filter="all"]').classList.add('active');
    applyFilters();
  });
}

/**
 * Filter chip clicks
 */
function initChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeChip = chip.dataset.filter;

      // Sync category tab
      activeCategory = 'all';
      if (['breakfast','lunch','dinner','drinks'].includes(activeChip)) {
        activeCategory = activeChip;
      }
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      const matchTab = document.querySelector(`.tab[data-cat="${activeCategory}"]`);
      if (matchTab) matchTab.classList.add('active');
      else document.querySelector('.tab[data-cat="all"]').classList.add('active');

      applyFilters();
    });
  });
}

/**
 * Search input
 */
function initSearch() {
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    applyFilters();
  });
}

/**
 * Sort select
 */
function initSort() {
  document.getElementById('sortSelect').addEventListener('change', e => {
    sortOrder = e.target.value;
    applyFilters();
  });
}

/**
 * Cart drawer open/close
 */
function initCart() {
  const drawer   = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  const openBtn  = document.getElementById('cartBtn');
  const closeBtn = document.getElementById('cartClose');

  function openCart()  { drawer.classList.add('open'); backdrop.classList.add('open'); }
  function closeCart() { drawer.classList.remove('open'); backdrop.classList.remove('open'); }

  openBtn.addEventListener('click', openCart);
  closeBtn.addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   7. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderMenu(menuData);
  updateCartUI();

  // UI setup
  initNavbar();
  initMobileMenu();
  initTabs();
  initChips();
  initSearch();
  initSort();
  initCart();
  initSmoothScroll();
});
