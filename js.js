const navLinks = document.querySelectorAll('.nav-links a');
const main = document.querySelector('main');

// Function to dynamically load content
function loadContent(page) {
  if (page === 'about') {
    main.innerHTML = `
      <h1>Par mani</h1>
      <p>Sveiki! Mani sauc Sanija Kraukle un es esmu RVT DP3-4 audzēkne. Man patīk dejot, fotografēt, rakstīt un spēlēt bungas.
      Katru dienu meklēju jaunus hobijus vai nodarbes, kuras varētu padarīt manu dzīvi interesātāku. Šī mājaslapa ir radīta, lai dalītos ar savām
      interesēm un iedvesmotu arī citus izmēģināt kaut ko jaunu. Ceru, ka šeit atradīsi daudz interesantu hobiju un
      varēsi iepazīt arī citu pieredzi.</p>
    `;
  } else if (page === 'contacts') {
    main.innerHTML = `
      <h1>Kontakti</h1>
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

// Add event listeners to navigation links
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove 'active' class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked link
    this.classList.add('active');

    // Load the appropriate content
    const page = this.getAttribute('href').split('.')[0]; // Extract 'about' or 'contacts'
    loadContent(page);
  });
});

const darkModeToggle = document.getElementById('darkModeToggle');

// Check if dark mode was previously enabled
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});