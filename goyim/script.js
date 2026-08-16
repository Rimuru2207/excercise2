const masterItems = [ 
  "Makan Bergizi Gratis", "Demi Bangsa Dan Negara", "Akal Akalan", "Kita Harus Kerja Keras", "Seenak Jidat",
  "Kita Harus Berani", "Pantang menyerah", "Negara harus hadir", "Sembarangan", "Jangan Macam-Macam",
  "Kopdes Merah Putih", "Swasembada", "Merdeka!!", "Berdiri diatas kaki sendiri", "Kepentingan Rakyat",
  "Penjajah", "Gotong Royong", "Adu Domba", "Bangsa yang Besar", "Indonesia Emas",
  "Kita akan bangkit", "Toxic", "Demi Rakyat", "Petani dan Nelayan", "Asing Goyim 😹",
  "Kelaparan", "Lapangan Pekerjaan", "Koruptor", "Ekonomi", "Militer", "Desa", "Perang", "Pendidikan", "Kesulitan", "Program",
  "Memberi Makan", "NKRI", "Oknum", "Orang Susah", "Saudara-Saudara"
];

const boardEl = document.getElementById('board');
const bingoCountEl = document.getElementById('bingoCount');
const selectedCountEl = document.getElementById('selectedCount');
const toastEl = document.getElementById('bingoToast');
const resetBtn = document.getElementById('resetBtn');
const editBtn = document.getElementById('editBtn');

const SIZE = 5;
const TOTAL = SIZE * SIZE;
let selected = [];
let completedLines = new Set();
let boardItems = []; 

const MAX_EDITS = 3;
let editCount = 0;

function buildLines() {
  const lines = [];
  for (let r = 0; r < SIZE; r++) {
    lines.push(Array.from({length: SIZE}, (_, c) => r * SIZE + c));
  }
  for (let c = 0; c < SIZE; c++) {
    lines.push(Array.from({length: SIZE}, (_, r) => r * SIZE + c));
  }
  lines.push(Array.from({length: SIZE}, (_, i) => i * SIZE + i));
  lines.push(Array.from({length: SIZE}, (_, i) => i * SIZE + (SIZE - 1 - i)));
  return lines;
}
const LINES = buildLines();

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function initGame() {
  if (masterItems.length < TOTAL) {
    boardEl.innerHTML = `<p style="color:#f87171; grid-column: 1 / -1; text-align: center;">
      ⚠️ Bank topik kurang! Harus ada minimal 25 item (saat ini: ${masterItems.length}).
    </p>`;
    return;
  }

  const shuffledItems = shuffleArray([...masterItems]);
  boardItems = shuffledItems.slice(0, TOTAL);

  selected = new Array(TOTAL).fill(false);
  completedLines = new Set();
  
  editBtn.textContent = `✏️ Edit Kotak (Sisa ${MAX_EDITS})`;

  render();
  updateStatus();
}

function render() {
  boardEl.innerHTML = '';
  for (let i = 0; i < TOTAL; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.textContent = boardItems[i];

    if (selected[i]) cell.classList.add('selected');

    cell.addEventListener('click', () => toggleCell(i));
    boardEl.appendChild(cell);
  }
  applyBingoHighlights();
}

function toggleCell(i) {
  selected[i] = !selected[i];
  checkBingo();
  render();
  updateStatus();
}

function checkBingo() {
  let newBingo = false;
  LINES.forEach((line, idx) => {
    const isComplete = line.every(pos => selected[pos]);
    if (isComplete && !completedLines.has(idx)) {
      completedLines.add(idx);
      newBingo = true;
    }
    if (!isComplete && completedLines.has(idx)) {
      completedLines.delete(idx);
    }
  });
  if (newBingo) showToast();
}

function applyBingoHighlights() {
  completedLines.forEach(idx => {
    LINES[idx].forEach(pos => {
      const cellEl = boardEl.querySelector(`[data-index="${pos}"]`);
      if (cellEl) cellEl.classList.add('bingo-line');
    });
  });
}

function updateStatus() {
  bingoCountEl.textContent = completedLines.size;
  const count = selected.filter(Boolean).length;
  selectedCountEl.textContent = `${count} / ${TOTAL}`;
}

function showToast() {
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 1600);
}

resetBtn.addEventListener('click', () => {
  selected = new Array(TOTAL).fill(false);
  completedLines = new Set();
  render();
  updateStatus();
});

editBtn.addEventListener('click', () => {
  if (editCount >= MAX_EDITS) {
    alert("Anda sudah mencapai batas maksimal edit (3 kali)!");
    return;
  }

  const sisa = MAX_EDITS - editCount;
  const nomorKotakStr = prompt(`Sisa edit: ${sisa} kali.\n\nMasukkan nomor kotak yang ingin diubah (1 - 25):\n*Dihitung dari kiri ke kanan, atas ke bawah.`);
  
  if (nomorKotakStr === null) return; 

  const nomorKotak = parseInt(nomorKotakStr, 10);
  if (isNaN(nomorKotak) || nomorKotak < 1 || nomorKotak > 25) {
    alert("Nomor kotak tidak valid! Harap masukkan angka 1 hingga 25.");
    return;
  }

  const index = nomorKotak - 1; 
  const teksLama = boardItems[index]; 

  const teksBaru = prompt(`Ubah isi Kotak ke-${nomorKotak}\nTeks saat ini: "${teksLama}"\n\nMasukkan teks baru:`, teksLama);

  if (teksBaru !== null && teksBaru.trim() !== "" && teksBaru.trim() !== teksLama) {
    boardItems[index] = teksBaru.trim(); 
    editCount++;

    if (editCount >= MAX_EDITS) {
      editBtn.textContent = "✏️ Kuota Edit Habis";
      editBtn.style.opacity = "0.6";
      editBtn.style.cursor = "not-allowed";
    } else {
      editBtn.textContent = `✏️ Edit Kotak (Sisa ${MAX_EDITS - editCount})`;
    }

    render(); 
  }
});

initGame();
