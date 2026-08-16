const items = [ // Isi Pidato Wowok
  "Item 1",  "Item 2",  "Item 3",  "Item 4",  "Item 5",
  "Item 6",  "Item 7",  "Item 8",  "Item 9",  "Item 10",
  "Item 11", "Item 12", "Item 13", "Item 14", "Item 15",
  "Item 16", "Item 17", "Item 18", "Item 19", "Item 20",
  "Item 21", "Item 22", "Item 23", "Item 24", "Item 25"
];

const boardEl = document.getElementById('board');
const bingoCountEl = document.getElementById('bingoCount');
const selectedCountEl = document.getElementById('selectedCount');
const toastEl = document.getElementById('bingoToast');
const resetBtn = document.getElementById('resetBtn');

const SIZE = 5;
const TOTAL = SIZE * SIZE;
let selected = [];
let completedLines = new Set();

// Semua kombinasi garis (5 baris, 5 kolom, 2 diagonal)
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

function initGame() {
  if (items.length !== TOTAL) {
    boardEl.innerHTML = `<p style="color:#f87171; grid-column: 1 / -1;">
      ⚠️ Jumlah item harus tepat 25 (saat ini: ${items.length}).
      Silakan cek array "items" di script.js.
    </p>`;
    return;
  }
  selected = new Array(TOTAL).fill(false);
  completedLines = new Set();
  render();
  updateStatus();
}

function render() {
  boardEl.innerHTML = '';
  for (let i = 0; i < TOTAL; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.textContent = items[i];

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

initGame();