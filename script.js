// DECLARE VARIABLES

const copyBtn = document.querySelector("#copy-btn");
const copiedMsg = document.querySelector("#copied");

const sliderInput = document.querySelector("#slider-input");
const numberEl = document.querySelector("#number-el");

const uppercaseCheck = document.querySelector("#uppercase-check");
const lowercaseCheck = document.querySelector("#lowercase-check");
const numbersCheck = document.querySelector("#numbers-check");
const symbolsCheck = document.querySelector("#symbols-check");

const generateBtn = document.querySelector("#generate-btn");
const errorMsg = document.querySelector("#error-msg");

const uppercasePool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercasePool = "abcdefghijklmnopqrstuvwxyz";
const numbersPool = "0123456789";
const symbolsPool = "$*.-[];:?@+%!{},=()#&/_~";

// ADD EVENT LISTENERS

copyBtn.addEventListener("click", (e) => {
  copiedMsg.textContent = "COPIED";
});

sliderInput.addEventListener("input", renderSliderState);

generateBtn.addEventListener("click", (e) => {
  const canGenerate = validateInputRenderError();

  if (canGenerate) {
    generatePassword();
  }
});

// DECLARE FUNCTIONS

function renderSliderState() {
  const lengthValue = sliderInput.valueAsNumber;
  const min = sliderInput.min;
  const max = sliderInput.max;
  const progress = ((lengthValue - min) / (max - min)) * 100;

  numberEl.textContent = lengthValue;
  sliderInput.style.setProperty("--progress", `${progress}%`);
}

function getInclusionPools() {
  let inclusionPools = [];

  if (uppercaseCheck.checked) {
    inclusionPools.push(uppercasePool);
  }
  if (lowercaseCheck.checked) {
    inclusionPools.push(lowercasePool);
  }
  if (numbersCheck.checked) {
    inclusionPools.push(numbersPool);
  }
  if (symbolsCheck.checked) {
    inclusionPools.push(symbolsPool);
  }
  return inclusionPools;
}

function validateInputRenderError() {
  const lengthValue = sliderInput.valueAsNumber;
  const inclusionPools = getInclusionPools();
  let generateGreenLight = false;

  if (inclusionPools.length === 0 || lengthValue < inclusionPools.length) {
    generateBtn.classList.add("error-state");
    errorMsg.textContent = "Temporary placeholder error text";
  } else {
    generateBtn.classList.remove("error-state");
    errorMsg.textContent = "";
    generateGreenLight = true;
  }
  return generateGreenLight;
}

function generatePassword() {}

renderSliderState();
