// Elementos
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

const redInput = document.getElementById("redInput");
const greenInput = document.getElementById("greenInput");
const blueInput = document.getElementById("blueInput");

const redVal = document.getElementById("redVal");
const greenVal = document.getElementById("greenVal");
const blueVal = document.getElementById("blueVal");

const preview = document.getElementById("preview");
const rgbText = document.getElementById("rgbText");
const hexInput = document.getElementById("hex");
const copyBtn = document.getElementById("copyHex");
const colorPicker = document.getElementById("colorPicker");

// Conversión
function componentToHex(c) {
  const v = Math.max(0, Math.min(255, Number(c) || 0));
  return v.toString(16).padStart(2, "0");
}
function rgbToHex(r, g, b) {
  return (componentToHex(r) + componentToHex(g) + componentToHex(b)).toUpperCase();
}
function hexToRgb(hex) {
  let h = hex.replace(/^#/, "").trim();
  if (h.length === 3) h = h.split("").map((ch) => ch + ch).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

// Actualización desde sliders
function updateFromSliders() {
  const r = Number(red.value);
  const g = Number(green.value);
  const b = Number(blue.value);

  redVal.textContent = r;
  greenVal.textContent = g;
  blueVal.textContent = b;

  redInput.value = r;
  greenInput.value = g;
  blueInput.value = b;

  const rgb = `rgb(${r}, ${g}, ${b})`;
  const hex = rgbToHex(r, g, b);

  preview.style.backgroundColor = rgb;
  rgbText.textContent = rgb;
  hexInput.value = hex;
  colorPicker.value = "#" + hex;
}

// Actualización desde inputs numéricos
function updateFromNumbers() {
  const r = Number(redInput.value);
  const g = Number(greenInput.value);
  const b = Number(blueInput.value);

  if ([r, g, b].some(v => isNaN(v) || v < 0 || v > 255)) return;

  red.value = r;
  green.value = g;
  blue.value = b;
  updateFromSliders();
}

// Actualización desde HEX
function updateFromHex() {
  const parsed = hexToRgb(hexInput.value);
  if (!parsed) return;
  red.value = parsed.r;
  green.value = parsed.g;
  blue.value = parsed.b;
  updateFromSliders();
}

// Actualización desde color picker
function updateFromColorPicker() {
  const parsed = hexToRgb(colorPicker.value);
  if (!parsed) return;
  red.value = parsed.r;
  green.value = parsed.g;
  blue.value = parsed.b;
  updateFromSliders();
}

// Copiar
async function copyHex() {
  try {
    await navigator.clipboard.writeText("#" + hexInput.value.toUpperCase());
    copyBtn.textContent = "¡Copiado!";
    setTimeout(() => (copyBtn.textContent = "Copiar"), 1200);
  } catch {
    hexInput.select();
    document.execCommand("copy");
  }
}

// Eventos
[red, green, blue].forEach((el) => el.addEventListener("input", updateFromSliders));
[redInput, greenInput, blueInput].forEach((el) => el.addEventListener("input", updateFromNumbers));
hexInput.addEventListener("input", updateFromHex);
colorPicker.addEventListener("input", updateFromColorPicker);
copyBtn.addEventListener("click", copyHex);

// Inicialización
updateFromSliders();

