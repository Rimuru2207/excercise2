var gachaData = [
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

function weightedRandom(items) {
  var totalWeight = 0;
  for (var i = 0; i < items.length; i++) {
    totalWeight = totalWeight + items[i].chance;
  }
  
  var random = Math.random() * totalWeight;
  
  for (var j = 0; j < items.length; j++) {
    if (random < items[j].chance) {
      return items[j];
    }
    random = random - items[j].chance;
  }
  
  return items[items.length - 1];
}

function performGacha() {
  var btnRoll = document.getElementById("btnRoll");
  var rollDisplay = document.getElementById("rollDisplay");
  var gachaResult = document.getElementById("gachaResult");
  
  btnRoll.disabled = true;
  gachaResult.style.display = "none";
  
  rollDisplay.innerHTML = '<div class="rolling-names" id="rollingNames"></div>';
  var rollingNames = document.getElementById("rollingNames");
  
  for (var i = 0; i < 20; i++) {
    var randomItem = gachaData[Math.floor(Math.random() * gachaData.length)];
    var item = document.createElement("div");
    item.className = "rolling-item";
    item.textContent = randomItem.name;
    item.style.color = getRarityColor(randomItem.rarity);
    rollingNames.appendChild(item);
  }
  
  setTimeout(function() {
    var result = weightedRandom(gachaData);
    showResult(result);
    btnRoll.disabled = false;
  }, 3000);
}

function getRarityColor(rarity) {
  if (rarity === "legendary") return "#fbbf24";
  if (rarity === "epic") return "#a855f7";
  if (rarity === "rare") return "#3b82f6";
  if (rarity === "common") return "#9ca3af";
  return "#fff";
}

function showResult(item) {
  var rollDisplay = document.getElementById("rollDisplay");
  var gachaResult = document.getElementById("gachaResult");
  var resultImage = document.getElementById("resultImage");
  var resultName = document.getElementById("resultName");
  var resultDescription = document.getElementById("resultDescription");
  var rarityBadge = document.getElementById("rarityBadge");
  var resultCard = gachaResult.querySelector(".result-card");
  
  rollDisplay.innerHTML = '<div class="roll-text">🎉 You got...</div>';
  
  resultImage.src = item.image;
  resultName.textContent = item.name;
  resultDescription.textContent = item.description;
  rarityBadge.textContent = item.rarity;
  
  resultCard.className = "result-card rarity-" + item.rarity;
  
  gachaResult.style.display = "block";
  
  setTimeout(function() {
    gachaResult.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }, 100);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createShape(section) {
  var shape = document.createElement("div");
  shape.classList.add("shape");
  var size = randomInRange(50, 150);
  shape.style.width = size + "px";
  shape.style.height = size + "px";
  shape.style.top = randomInRange(0, 70) + "%";
  shape.style.left = randomInRange(0, 90) + "%";
  var duration = randomInRange(3, 8);
  shape.style.animationDuration = duration + "s";
  section.querySelector(".floating-shapes").appendChild(shape);
  setTimeout(function() {
    shape.remove();
  }, duration * 1000);
}

function initFloatingShapes() {
  var sections = document.querySelectorAll("section.hero");
  for (var i = 0; i < sections.length; i++) {
    (function(sec) {
      setInterval(function() {
        createShape(sec);
      }, 1000);
    })(sections[i]);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var homeLink = document.getElementById("navHome");
  var gachaLink = document.getElementById("navGacha");
  var searchLink = document.getElementById("navSearch");
  var loginLink = document.getElementById("navLogin");
  var btnStartGacha = document.getElementById("btnStartGacha");
  
  var uiHome = document.getElementById("uiHome");
  var uiGacha = document.getElementById("uiGacha");
  var uiSearch = document.getElementById("uiSearch");
  var uiLogin = document.getElementById("uiLogin");
  
  function showUI(ui) {
    uiHome.style.display = "none";
    uiGacha.style.display = "none";
    uiSearch.style.display = "none";
    uiLogin.style.display = "none";
    ui.style.display = "flex";
  }
  
  homeLink.addEventListener("click", function(e) {
    e.preventDefault();
    showUI(uiHome);
  });
  
  gachaLink.addEventListener("click", function(e) {
    e.preventDefault();
    showUI(uiGacha);
  });
  
  searchLink.addEventListener("click", function(e) {
    e.preventDefault();
    showUI(uiSearch);
  });
  
  loginLink.addEventListener("click", function(e) {
    e.preventDefault();
    showUI(uiLogin);
  });

  if (btnStartGacha) {
    btnStartGacha.addEventListener("click", function() {
      showUI(uiGacha);
    });
  }
  
  showUI(uiHome);
  
  var btnRoll = document.getElementById("btnRoll");
  if (btnRoll) {
    btnRoll.addEventListener("click", performGacha);
  }
  
  var btnSearch = document.getElementById("btnSearch");
  var searchInput = document.getElementById("searchInput");
  
  if (btnSearch) {
    btnSearch.addEventListener("click", function() {
      var query = searchInput.value.trim();
      if (query) {
        var googleSearchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
        window.open(googleSearchUrl, '_blank');
      } else {
        alert("Masukkan kata kunci...");
      }
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener("keypress", function(e) {
      if (e.key === 'Enter') {
        btnSearch.click();
      }
    });
  }
  
  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      var email = document.getElementById("email").value;
      alert("Login berhasil! Email: " + email);
      showUI(uiHome);
    });
  }
  
  initFloatingShapes();
});
