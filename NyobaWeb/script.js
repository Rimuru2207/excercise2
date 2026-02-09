// ============ GACHA DATA ============
const gachaData = [
  // Legendary (5% total)
  {
    name: "Divine Dragon",
    rarity: "legendary",
    chance: 2,
    image: "https://picsum.photos/200?random=1",
    description: "The rarest and most powerful creature!"
  },
  {
    name: "Phoenix Empress",
    rarity: "legendary",
    chance: 3,
    image: "https://picsum.photos/200?random=2",
    description: "Reborn from ashes with eternal flames"
  },
  
  // Epic (15% total)
  {
    name: "Thunder Knight",
    rarity: "epic",
    chance: 7,
    image: "https://picsum.photos/200?random=3",
    description: "Wields the power of lightning"
  },
  {
    name: "Ice Sorceress",
    rarity: "epic",
    chance: 8,
    image: "https://picsum.photos/200?random=4",
    description: "Master of frozen magic"
  },
  
  // Rare (30% total)
  {
    name: "Shadow Assassin",
    rarity: "rare",
    chance: 15,
    image: "https://picsum.photos/200?random=5",
    description: "Strikes from the darkness"
  },
  {
    name: "Forest Guardian",
    rarity: "rare",
    chance: 15,
    image: "https://picsum.photos/200?random=6",
    description: "Protector of nature"
  },
  
  // Common (50% total)
  {
    name: "Brave Warrior",
    rarity: "common",
    chance: 20,
    image: "https://picsum.photos/200?random=7",
    description: "A reliable fighter"
  },
  {
    name: "Novice Mage",
    rarity: "common",
    chance: 15,
    image: "https://picsum.photos/200?random=8",
    description: "Learning the arcane arts"
  },
  {
    name: "Town Guard",
    rarity: "common",
    chance: 10,
    image: "https://picsum.photos/200?random=9",
    description: "Keeps the peace"
  },
  {
    name: "Village Healer",
    rarity: "common",
    chance: 5,
    image: "https://picsum.photos/200?random=10",
    description: "Provides basic healing"
  }
];

// ============ GACHA SYSTEM ============
function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.chance, 0);
  let random = Math.random() * totalWeight;
  
  for (let item of items) {
    if (random < item.chance) {
      return item;
    }
    random -= item.chance;
  }
  return items[items.length - 1];
}

function performGacha() {
  const btnRoll = document.getElementById("btnRoll");
  const rollDisplay = document.getElementById("rollDisplay");
  const gachaResult = document.getElementById("gachaResult");
  
  // Disable button
  btnRoll.disabled = true;
  gachaResult.style.display = "none";
  
  // Create rolling animation
  rollDisplay.innerHTML = '<div class="rolling-names" id="rollingNames"></div>';
  const rollingNames = document.getElementById("rollingNames");
  
  // Add multiple items for rolling effect
  for (let i = 0; i < 20; i++) {
    const randomItem = gachaData[Math.floor(Math.random() * gachaData.length)];
    const item = document.createElement("div");
    item.className = "rolling-item";
    item.textContent = randomItem.name;
    item.style.color = getRarityColor(randomItem.rarity);
    rollingNames.appendChild(item);
  }
  
  // Stop after 3 seconds and show result
  setTimeout(() => {
    const result = weightedRandom(gachaData);
    showResult(result);
    btnRoll.disabled = false;
  }, 3000);
}

function getRarityColor(rarity) {
  const colors = {
    common: "#9ca3af",
    rare: "#3b82f6",
    epic: "#a855f7",
    legendary: "#fbbf24"
  };
  return colors[rarity] || "#fff";
}

function showResult(item) {
  const rollDisplay = document.getElementById("rollDisplay");
  const gachaResult = document.getElementById("gachaResult");
  const resultImage = document.getElementById("resultImage");
  const resultName = document.getElementById("resultName");
  const resultDescription = document.getElementById("resultDescription");
  const rarityBadge = document.getElementById("rarityBadge");
  const resultCard = gachaResult.querySelector(".result-card");
  
  // Clear rolling display
  rollDisplay.innerHTML = '<div class="roll-text">🎉 You got...</div>';
  
  // Set result data
  resultImage.src = item.image;
  resultName.textContent = item.name;
  resultDescription.textContent = item.description;
  rarityBadge.textContent = item.rarity;
  
  // Set rarity styling
  resultCard.className = `result-card rarity-${item.rarity}`;
  
  // Show result
  gachaResult.style.display = "block";
}

// ============ FLOATING SHAPES ============
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

// ============ UI SWITCHING ============
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
  
  // ============ GACHA ROLL BUTTON ============
  const btnRoll = document.getElementById("btnRoll");
  btnRoll.addEventListener("click", performGacha);
  
  // ============ SEARCH BEHAVIOR ============
  const btnSearch = document.getElementById("btnSearch");
  const searchInput = document.getElementById("searchInput");
  
  btnSearch.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(googleSearchUrl, '_blank');
    } else {
      alert("Masukkan kata kunci...");
    }
  });
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      btnSearch.click();
    }
  });
  
  // ============ LOGIN BEHAVIOR ============
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    alert(`Login berhasil! Email: ${email}`);
    showUI(uiIndex);
  });
  
  // ============ START FLOATING SHAPES ============
  initFloatingShapes();
});
