// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'studio'
const currentTheme = localStorage.getItem('theme') || 'studio';
html.classList.toggle('personal-mode', currentTheme === 'personal');
updateToggleLabel(currentTheme);

themeToggle.addEventListener('click', () => {
  const isPersonalMode = html.classList.toggle('personal-mode');
  const theme = isPersonalMode ? 'personal' : 'studio';
  localStorage.setItem('theme', theme);
  updateToggleLabel(theme);
});

function updateToggleLabel(theme) {
  const label = theme === 'personal' ? 'Studio' : 'Personal';
  themeToggle.textContent = label;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});