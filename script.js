const themeRange = document.getElementById("calculator__theme-range");
const rootElement = document.body;

// Function to apply a theme
const applyTheme = (theme) => {
  // Remove all theme classes
  rootElement.classList.remove("theme1", "theme2", "theme3");
  // Add the selected theme
  rootElement.classList.add(`theme${theme}`);
};

// Event listener for theme switcher
themeRange.addEventListener("change", (e) => {
  const selectedTheme = e.target.value; // Get the current theme value
  console.log(selectedTheme);
  applyTheme(selectedTheme); // Apply the theme
});
