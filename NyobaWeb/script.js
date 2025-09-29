// Floating shapes generator
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
function createShape(section) {
  const shape = document.createElement("div");
  shape.classList.add("shape");

  const size = randomInRange(50, 150);
  shape.style.width = `${size}px`;
  shape.style.height = `${size}px`;

  shape.style.top = `${randomInRange(0, 70)}%`;
  shape.style.left = `${randomInRange(0, 90)}%`;

  const duration = randomInRange(3, 8);
  shape.style.animationDuration = `${duration}s`;

  section.querySelector(".floating-shapes").appendChild(shape);

  setTimeout(() => {
    shape.remove();
  }, duration * 1000);
}
function initFloatingShapes() {
  const sections = document.querySelectorAll("section.hero");
  sections.forEach(sec => {
    setInterval(() => createShape(sec), 1000);
  });
}

// UI switching
document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.getElementById("navHome");
  const searchLink = document.getElementById("navSearch");
  const loginLink = document.getElementById("navLogin");

  const uiIndex = document.getElementById("uiIndex");
  const uiSearch = document.getElementById("uiSearch");
  const uiLogin = document.getElementById("uiLogin");

  function showUI(ui) {
    uiIndex.style.display = "none";
    uiSearch.style.display = "none";
    uiLogin.style.display = "none";

    ui.style.display = "flex";
  }

  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    showUI(uiIndex);
  });
  searchLink.addEventListener("click", (e) => {
    e.preventDefault();
    showUI(uiSearch);
  });
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    showUI(uiLogin);
  });

  showUI(uiIndex);

  // Search behavior
  const btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    const resultDiv = document.getElementById("searchResult");
    if (query) {
      resultDiv.innerHTML = `<p>Hasil pencarian untuk: <b>${query}</b></p>`;
    } else {
      resultDiv.innerHTML = `<p>Masukkan kata kunci...</p>`;
    }
  });

  // Login behavior
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    alert(`Login berhasil! Email: ${email}`);
    showUI(uiIndex);
  });

  // Start floating shapes
  initFloatingShapes();
});
