function encrypt() {
  const input = document.getElementById("inputText").value;
  const key = parseInt(document.getElementById("key").value);

  if (input.trim() === "") {
    alert("Masukkan teks yang ingin dienkripsikan terlebih dahulu!");
    return;
  }
  if (isNaN(key) || key < 0 || key > 94) {
    alert("Masukkan key antara 0-94");
    return;
  }

  let result = caesarCipher(input, key, "encrypt");
  document.getElementById("result").value = result;
}

function decrypt() {
  const input = document.getElementById("inputText").value;
  const key = parseInt(document.getElementById("key").value);

  if (input.trim() === "") {
    alert("Masukkan teks terenkripsi terlebih dahulu!");
    return;
  }
  if (isNaN(key) || key < 0 || key > 94) {
    alert("Masukkan key antara 0-94");
    return;
  }

  let result = caesarCipher(input, key, "decrypt");
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
      alert("Gagal menyalin: " + err);
    });
}
