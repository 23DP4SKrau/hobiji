const navLinks = document.querySelectorAll('.nav-links a');
const main = document.querySelector('main');

function loadContent(page) {
  if (page === 'about') {
    main.innerHTML = `
      <h1 class="h1-left">Par mani</h1>
      <p>Sveiki! Mani sauc Sanija Kraukle un es esmu RVT DP3-4 audzēkne. Man patīk dejot, fotografēt, rakstīt un spēlēt bungas.
      Katru dienu meklēju jaunus hobijus vai nodarbes, kuras varētu padarīt manu dzīvi interesātāku. Šī mājaslapa ir radīta, lai dalītos ar savām
      interesēm un iedvesmotu arī citus izmēģināt kaut ko jaunu. Ceru, ka šeit atradīsi daudz interesantu hobiju un
      varēsi iepazīt arī citu pieredzi.</p>
    `;
  } else if (page === 'contacts') {
    main.innerHTML = `
      <h1 class="h1-left">Kontakti</h1>
      <form id="contactForm" novalidate>
        <label for="name">Vārds:</label>
        <input type="text" id="name" name="name" required>
      
        <label for="email">E-pasts:</label>
        <input type="email" id="email" name="email" required>
      
        <label for="message">Ziņojums:</label>
        <textarea id="message" name="message" required></textarea>
      
        <button type="submit">Sūtīt</button>
      
        <p id="formMessage" style="color: red; margin-top: 10px;"></p>
      </form>
    `;

    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      formMessage.textContent = '';
      formMessage.style.color = 'red';

      if (!name) {
        showError('Lūdzu, ievadiet savu vārdu.');
        return;
      }

      if (!email) {
        showError('Lūdzu, ievadiet savu e-pastu.');
        return;
      }

      if (!emailRegex.test(email)) {
        showError('Lūdzu, ievadiet derīgu e-pasta adresi.');
        return;
      }

      if (!message) {
        showError('Lūdzu, ievadiet ziņojumu.');
        return;
      }

      formMessage.style.color = 'green';
      formMessage.textContent = 'Forma veiksmīgi iesniegta! Paldies!';

      form.reset();
    });

    function showError(msg) {
      formMessage.textContent = msg;
      formMessage.style.color = 'red';
      formMessage.style.animation = 'shake 0.3s';
      formMessage.addEventListener('animationend', () => {
        formMessage.style.animation = '';
      });
    }
  }
}

// add event listeners to navigation links
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href') || '';
    const page = href.split('.')[0]; 

    if (page === 'index' || href === '#') {
      return; 
    }

    e.preventDefault();

    navLinks.forEach(link => link.classList.remove('active'));

    this.classList.add('active');

    loadContent(page);
  });
});

const darkModeToggle = document.getElementById('darkModeToggle');

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = '⚪️';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.textContent = '⚫️';
    }
  });
  // update button icon on load
  darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '⚪️' : '⚫️';
}

// for mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navRegion = document.getElementById('primary-navigation');
if (navToggle && navRegion) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navRegion.classList.toggle('open');
  });

  // close for mobile nav when a link is clicked
  const mobileLinks = navRegion.querySelectorAll('a');
  mobileLinks.forEach(l => l.addEventListener('click', () => {
    navRegion.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navRegion.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// modal functionality
const modal = document.getElementById('modal');
if (modal) {
  const modalText = document.getElementById('modalText');
  const closeModal = document.getElementById('closeModal');
  const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

  learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (modalText) modalText.textContent = button.getAttribute('data-content');
      modal.style.display = 'flex';
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}





// contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const successMessage = document.getElementById('successMessage');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    if (nameInput && nameInput.value.trim() === '') {
      if (nameError) nameError.style.display = 'block';
      nameInput.classList.add('error');
      isValid = false;
    } else if (nameInput) {
      if (nameError) nameError.style.display = 'none';
      nameInput.classList.remove('error');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value.trim())) {
      if (emailError) emailError.style.display = 'block';
      emailInput.classList.add('error');
      isValid = false;
    } else if (emailInput) {
      if (emailError) emailError.style.display = 'none';
      emailInput.classList.remove('error');
    }

    if (messageInput && messageInput.value.trim() === '') {
      if (messageError) messageError.style.display = 'block';
      messageInput.classList.add('error');
      isValid = false;
    } else if (messageInput) {
      if (messageError) messageError.style.display = 'none';
      messageInput.classList.remove('error');
    }

    if (isValid) {
      if (successMessage) successMessage.style.display = 'block';
      setTimeout(() => {
        if (successMessage) successMessage.style.display = 'none';
        contactForm.reset();
      }, 3000);
    }
  });
}

// Live search/filter for cards (case-insensitive). Select search input robustly.
const searchInput = document.getElementById('searchInput') || document.querySelector('.search-wrapper input[type="search"]') || document.querySelector('input[type="search"]');
function filterCards() {
  const q = searchInput && searchInput.value ? searchInput.value.trim().toLowerCase() : '';
  const cards = document.querySelectorAll('.card');
  if (!cards) return;
  cards.forEach(card => {
    const h = card.querySelector('h3');
    const p = card.querySelector('p');
    const title = h && h.textContent ? h.textContent.toLowerCase() : '';
    const text = p && p.textContent ? p.textContent.toLowerCase() : '';
    const match = !q || title.includes(q) || text.includes(q);
    card.classList.toggle('hidden', !match);
  });
}

if (searchInput) {
  // listen to multiple events for broader compatibility
  searchInput.addEventListener('input', filterCards);
  searchInput.addEventListener('keyup', filterCards);
  searchInput.addEventListener('search', filterCards);
  console.debug('Search input found, listeners attached');
  // clear with Escape
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      filterCards();
    }
  });
  // run once on load in case input has value
  filterCards();
}

function debugFilter() {
  // helper to log current query and visible count
  const q = searchInput && searchInput.value ? searchInput.value.trim().toLowerCase() : '';
  const cards = Array.from(document.querySelectorAll('.card'));
  const visible = cards.filter(c => !c.classList.contains('hidden')).length;
  console.debug('filter run', { query: q, total: cards.length, visible });
}

// wrap filterCards to also debug
const _origFilter = filterCards;
filterCards = function() { _origFilter(); debugFilter(); };

// --- Card management (create / edit / delete) with localStorage persistence ---
const STORAGE_KEY = 'hobiji_cards_v1';

function loadCards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse cards from storage', e);
    return null;
  }
}

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function defaultCards() {
  return [
    { id: 'c1', title: 'Dejošana', text: 'Izbaudi ritmu pie savām mīļākajām dziesmām', img: 'hobijs1.jpg' },
    { id: 'c2', title: 'Fotografēšana', text: 'Iemūžini skaistos mirkļus savā fotoaparātā', img: 'hobijs2.jpg' },
    { id: 'c3', title: 'Rakstīšana', text: 'Izpaud savas domas un idejas rakstot to ko sirds vēlas', img: 'hobijs3.jpg' }
  ];
}

function renderCards(cards) {
  const container = document.querySelector('.card-container');
  if (!container) return;
  container.innerHTML = '';
  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.id = card.id;
    el.innerHTML = `
      <img src="${card.img || 'hobijs.jpg'}" alt="${escapeHtml(card.title)}">
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.text)}</p>
      <div style="display:flex;gap:8px;margin-bottom:16px;">
        <button class="learn-more-btn" data-content="${escapeHtml(card.text)}">Uzzināt vairāk</button>
        <button class="edit-btn">Labot</button>
        <button class="delete-btn">Dzēst</button>
      </div>
    `;
    container.appendChild(el);
  });

  // Re-attach listeners for the newly rendered buttons
  document.querySelectorAll('.learn-more-btn').forEach(b => b.addEventListener('click', (e) => {
    const txt = b.getAttribute('data-content') || '';
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    if (modal && modalText) {
      modalText.textContent = txt;
      modal.style.display = 'flex';
    }
  }));

  document.querySelectorAll('.edit-btn').forEach(b => b.addEventListener('click', (e) => {
    const cardEl = b.closest('.card');
    openCardModal('edit', cardEl.dataset.id);
  }));

  document.querySelectorAll('.delete-btn').forEach(b => b.addEventListener('click', (e) => {
    const cardEl = b.closest('.card');
    const id = cardEl.dataset.id;
    if (confirm('Vai tiešām dzēst šo kartiņu?')) {
      const cards = loadCards() || defaultCards();
      const updated = cards.filter(c => c.id !== id);
      saveCards(updated);
      renderCards(updated);
      filterCards();
    }
  }));
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, function (m) { return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]; });
}

// Initialize cards on load
(function initCards() {
  let cards = loadCards();
  if (!cards) {
    cards = defaultCards();
    saveCards(cards);
  }
  renderCards(cards);
  // ensure search filter applies to rendered cards
  filterCards();
})();

// Card modal behavior
const createBtn = document.getElementById('createCardBtn');
const cardModal = document.getElementById('cardModal');
const closeCardModal = document.getElementById('closeCardModal');
const cardForm = document.getElementById('cardForm');
const cardModalTitle = document.getElementById('cardModalTitle');
const cardSaveBtn = document.getElementById('cardSaveBtn');

function openCardModal(mode, id) {
  if (!cardModal) return;
  cardModal.style.display = 'flex';
  const titleInput = document.getElementById('cardTitle');
  const textInput = document.getElementById('cardText');
  const imgInput = document.getElementById('cardImage');
  const idInput = document.getElementById('cardId');
  if (mode === 'edit') {
    const cards = loadCards() || defaultCards();
    const card = cards.find(c => c.id === id);
    if (!card) return;
    cardModalTitle.textContent = 'Labot kartiņu';
    cardSaveBtn.textContent = 'Saglabāt';
    titleInput.value = card.title;
    textInput.value = card.text;
    imgInput.value = card.img || '';
    idInput.value = card.id;
  } else {
    cardModalTitle.textContent = 'Izveidot kartiņu';
    cardSaveBtn.textContent = 'Izveidot';
    titleInput.value = '';
    textInput.value = '';
    imgInput.value = '';
    idInput.value = '';
  }
}

if (createBtn) createBtn.addEventListener('click', () => openCardModal('create'));
if (closeCardModal) closeCardModal.addEventListener('click', () => { if (cardModal) cardModal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === cardModal) cardModal.style.display = 'none'; });

if (cardForm) {
  cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('cardTitle').value.trim();
    const text = document.getElementById('cardText').value.trim();
    const img = document.getElementById('cardImage').value.trim() || 'hobijs.jpg';
    const idVal = document.getElementById('cardId').value;
    let cards = loadCards() || defaultCards();
    if (idVal) {
      // edit
      cards = cards.map(c => c.id === idVal ? { ...c, title, text, img } : c);
    } else {
      // create
      const newCard = { id: 'c' + Date.now(), title, text, img };
      cards.unshift(newCard);
    }
    saveCards(cards);
    renderCards(cards);
    filterCards();
    if (cardModal) cardModal.style.display = 'none';
  });
}