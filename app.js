let isVigenere = false;
let vigenereMode = "huruf";

function toggleCipherMode() {
  const title = document.getElementById("title");
  const keyContainer = document.getElementById("keyContainer");
  const toggleBtn = document.getElementById("toggleBtn");
  const vigenereOptions = document.getElementById("vigenereOptions");

  clearText();

  if (!isVigenere) {
    title.textContent = "VIGENÈRE CIPHER";
    keyContainer.innerHTML = `
      <label for="key" class="block text-sm font-medium mb-1">Key (kata kunci):</label>
      <input
        type="text"
        placeholder="Masukkan kata kunci (huruf atau angka, pisahkan dengan koma untuk angka)"
        id="key"
        class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <p class="text-xs text-gray-400 italic">
        *Gunakan huruf (A-Z) untuk mode huruf, atau angka (boleh lebih dari satu digit) pisahkan dengan koma, contoh: 12,5,9.
      </p>`;
    toggleBtn.textContent = "🔄 Ganti ke Caesar Cipher";
    vigenereOptions.classList.remove("hidden");
    isVigenere = true;
  } else {
    title.textContent = "CAESAR CIPHER";
    keyContainer.innerHTML = `
      <label for="key" class="block text-sm font-medium mb-1">Key (0-94):</label>
      <input
        type="number"
        placeholder="Masukkan angka 0-94"
        id="key"
        class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="0"
        max="94"
      />
      <p class="text-xs text-gray-400 italic">
        *Key (kunci): 0-94 untuk Caesar Cipher.
      </p>`;
    toggleBtn.textContent = "🔄 Ganti ke Vigenère Cipher";
    vigenereOptions.classList.add("hidden");
    isVigenere = false;
  }
}

function setVigenereMode(mode) {
  vigenereMode = mode;
  const btnHuruf = document.getElementById("modeHuruf");
  const btnAngka = document.getElementById("modeAngka");
  if (mode === "huruf") {
    btnHuruf.classList.add("bg-emerald-700");
    btnHuruf.classList.remove("bg-gray-600");
    btnAngka.classList.remove("bg-emerald-700");
    btnAngka.classList.add("bg-gray-600");
  } else {
    btnAngka.classList.add("bg-emerald-700");
    btnAngka.classList.remove("bg-gray-600");
    btnHuruf.classList.remove("bg-emerald-700");
    btnHuruf.classList.add("bg-gray-600");
  }
}

function encrypt() {
  const input = document.getElementById("inputText").value;
  const key = parseInt(document.getElementById("key").value);

  if (input.trim() === "") {
    alert("Masukkan teks yang ingin dienkripsikan terlebih dahulu!");
    return;
  }
  if (isNaN(key) || key < 0 || key > 94) {
    alert("Masukkan key terlebih dahulu!");
    return;
  }
  let result = ceasarCipher(input, key, "encrypt");
  document.getElementById("result").value = result;
}

function decrypt() {
  const input = document.getElementById("inputText").value;
  const key = parseInt(document.getElementById("key").value);

  if (input.trim() === "") {
    alert("Masukkan teks yang terenkripsi terlebih dahulu!");
    return;
  }
  if (isNaN(key) || key < 0 || key > 94) {
    alert("Masukkan key terlebih dahulu!");
    return;
  }
  let result = ceasarCipher(input, key, "decrypt");
  document.getElementById("result").value = result;
}

function caesarCipher(text, key, mode) {
  let result = "";
  const shift = mode === "encrypt" ? key : -key;

  for (let char of text) {
    const code = char.charCodeAt(0);
    if (code >= 32 && code <= 126) {
      char = String.fromCharCode(((code - 32 + shift + 95) % 95) + 32);
    }
    result += char;
  }
  return result;
}

function clearText() {
  document.getElementById("inputText").value = "";
  document.getElementById("result").value = "";
  document.getElementById("key").value = "";
}

function copyResult() {
  const resultTextarea = document.getElementById("result");
  const copySuccess = document.getElementById("copy-success");

  resultTextarea.select();
  resultTextarea.setSelectionRange(0, 99999);

  navigator.clipboard
    .writeText(resultTextarea.value)
    .then(() => {
      copySuccess.classList.remove("opacity-0");
      copySuccess.classList.add("opacity-100");

      setTimeout(() => {
        copySuccess.classList.remove("opacity-100");
        copySuccess.classList.add("opacity-0");
      }, 2000);
    })
    .catch((err) => {
      alert("Gagal Menyalin: " + err);
    });
}
