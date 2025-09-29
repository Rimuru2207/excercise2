// Ambil elemen navbar
const homeLink = document.getElementById("navHome");
const searchLink = document.getElementById("navSearch");
const loginLink = document.getElementById("navLogin");

// Ambil UI section
const uiIndex = document.getElementById("uiIndex");
const uiSearch = document.getElementById("uiSearch");
const uiLogin = document.getElementById("uiLogin");

// Fungsi untuk pindah UI
function showUI(ui) {
  // sembunyikan semua
  uiIndex.style.display = "none";
  uiSearch.style.display = "none";
  uiLogin.style.display = "none";

  // tampilkan sesuai tombol
  ui.style.display = "flex";
}

// Event listener
homeLink.addEventListener("click", () => showUI(uiIndex));
searchLink.addEventListener("click", () => showUI(uiSearch));
loginLink.addEventListener("click", () => showUI(uiLogin));

// Default tampilan awal
showUI(uiIndex);

// Demo fitur search
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      searchResult.innerHTML = `<p>Hasil pencarian untuk: <b>${query}</b></p>`;
    } else {
      searchResult.innerHTML = "";
    }
  });
}
