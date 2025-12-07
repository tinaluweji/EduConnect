// Step 1: Select the toggle switch
const toggle = document.getElementById('toggle-dark');

// Step 2: Listen for changes on the toggle
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggle.checked);
  localStorage.setItem('darkMode', toggle.checked);
});

// Step 3: Load user preference
window.addEventListener('load', () => {
  const darkModeEnabled = JSON.parse(localStorage.getItem('darkMode'));
  if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }
});
