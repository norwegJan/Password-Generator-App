// DECLARE VARIABLES

const copyBtn = document.querySelector("#copy-btn");
const copiedMsg = document.querySelector("#copied");

const charSlider = document.querySelector("#char-slider");
const numberLength = document.querySelector("#number-length");

// ADD EVENT LISTENERS

copyBtn.addEventListener("click", (e) => {
  copiedMsg.textContent = "COPIED";
});

copyBtn.addEventListener("dblclick", (e) => {
  copiedMsg.textContent = "";
});

charSlider.addEventListener("input", (e) => {
  numberLength.textContent = e.target.value;
});

// DECLARE FUNCTIONS
