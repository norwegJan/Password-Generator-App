// DECLARE VARIABLES

const passwordOutput = document.querySelector("#password-output");
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
  const inclusionPools = getInclusionPools();

  numberEl.textContent = lengthValue;
  sliderInput.style.setProperty("--progress", `${progress}%`);

  if (lengthValue >= inclusionPools.length) {
    numberEl.classList.remove("number-error");
  }
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
    numberEl.classList.add("number-error");
    errorMsg.textContent = "Temporary placeholder error text";
  } else {
    generateBtn.classList.remove("error-state");
    numberEl.classList.remove("number-error");
    errorMsg.textContent = "";
    generateGreenLight = true;
  }
  return generateGreenLight;
}

function getRandomCharacter(pool) {
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

function generatePassword() {
  const lengthValue = sliderInput.valueAsNumber;
  const inclusionPools = getInclusionPools();
  const passwordChars = [];
  const combinedPool = inclusionPools.join("");

  inclusionPools.forEach((pool) => {
    passwordChars.push(getRandomCharacter(pool));
  });

  while (passwordChars.length < lengthValue) {
    passwordChars.push(getRandomCharacter(combinedPool));
  }

  const finalPassword = shufflePassword(passwordChars).join("");

  passwordOutput.textContent = finalPassword;
  passwordOutput.classList.add("final-password");
}

function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

renderSliderState();
