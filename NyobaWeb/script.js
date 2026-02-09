var gachaData = [
  {
    name: "Pak Cik Owi 😹",
    rarity: "legendary",
    chance: 2,
    image: "https://i.pinimg.com/736x/25/96/8f/25968f31cb5169db10caba91f6ad2391.jpg",
    description: "Pelan Sikit Pak Cik Owi"
  },
  {
    name: "Mas Amba",
    rarity: "legendary",
    chance: 2,
    image: "https://i.pinimg.com/736x/c1/05/9f/c1059f4b30ed245f76711ae20bee9eb1.jpg",
    description: "Oh 😹"
  },
  {
    name: "Pahlawan Ngawi Si Imup",
    rarity: "epic",
    chance: 7,
    image: "https://i.pinimg.com/736x/ea/18/6f/ea186fd44322d2e1c851a9c15acd70ef.jpg",
    description: "Konon Katanya Para Musuh Bermandikan Muani"
  },
  {
    name: "Mas Fuad si Jenderal Sparta",
    rarity: "epic",
    chance: 8,
    image: "https://i.pinimg.com/736x/3b/59/66/3b5966e89d0d503fc478a4d0553c0e42.jpg",
    description: "THIS IS SPARTAA"
  },
  {
    name: "Mas Amba & King",
    rarity: "rare",
    chance: 15,
    image: "https://i.pinimg.com/736x/4a/74/70/4a74709b50859d47164195d06fc7a21a.jpg",
    description: "Ketika Dua Legends Bersatu"
  },
  {
    name: "Mr Ironi",
    rarity: "rare",
    chance: 15,
    image: "https://i.pinimg.com/1200x/90/3b/25/903b25c3de32bbe68fd80fedb9fcfef1.jpg",
    description: "Tolong Celananya Dipakai Yh"
  },
  {
    name: "Mas Rusdi",
    rarity: "common",
    chance: 20,
    image: "https://i.pinimg.com/736x/c5/d8/f7/c5d8f70955f38593845e5f2ab517bb16.jpg",
    description: "Bikin Si Imup Klepek Klepek"
  },
  {
    name: "KING 👑",
    rarity: "common",
    chance: 15,
    image: "https://i.pinimg.com/736x/7d/bb/7d/7dbb7ddd0cca2e940bc68dc8088ac025.jpg",
    description: "RIP MR King"
  },
  {
    name: "Si Imup",
    rarity: "common",
    chance: 10,
    image: "https://i.pinimg.com/736x/97/3b/cf/973bcf8d61facc58f2e29e633ac2f3a3.jpg",
    description: "Sasimok Banget Njir"
  },
  {
    name: "BAHLIL IRENG",
    rarity: "common",
    chance: 5,
    image: "https://i.pinimg.com/736x/ad/1e/b4/ad1eb46c5b65ea8f398e8898ebce96e6.jpg",
    description: "Awas Jaga Nikel dan Emas Mu!!"
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
