// DECLARE VARIABLES
const passwordOutput = document.querySelector("#password-output");
const copyBtn = document.querySelector("#copy-btn");
const copiedMsg = document.querySelector("#copied");

const sliderInput = document.querySelector("#slider-input");
const numberEl = document.querySelector("#number-el");

const checkboxInputs = document.querySelectorAll(".inclusion-box");

const strengthMsg = document.querySelector("#strength-msg");
const markers = document.querySelectorAll(".marker");

const generateBtn = document.querySelector("#generate-btn");
const errorMsg = document.querySelector("#error-msg");

// ADD EVENT LISTENERS

copyBtn.addEventListener("click", (e) => {
  copyPassword();
});

sliderInput.addEventListener("input", renderSliderState);

checkboxInputs.forEach((element) => {
  element.addEventListener("change", (e) => resetUI());
});

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
    resetUI();
  }
}

function getInclusionPools() {
  const uppercasePool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercasePool = "abcdefghijklmnopqrstuvwxyz";
  const numbersPool = "0123456789";
  const symbolsPool = "$*.-[];:?@+%!{},=()#&/_~";

  const uppercaseCheck = document.querySelector("#uppercase-check");
  const lowercaseCheck = document.querySelector("#lowercase-check");
  const numbersCheck = document.querySelector("#numbers-check");
  const symbolsCheck = document.querySelector("#symbols-check");

  const inclusionPools = [];

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

  if (inclusionPools.length === 0) {
    generateBtn.classList.add("error-state");
    numberEl.classList.add("number-error");
    checkboxInputs.forEach((element) =>
      element.classList.add("checkbox-error"),
    );
    errorMsg.textContent = "At least one of the checkboxes must be selected";
  } else if (lengthValue === 0) {
    generateBtn.classList.add("error-state");
    numberEl.classList.add("number-error");
    errorMsg.textContent = "Length-value must be more than 0";
  } else if (lengthValue < inclusionPools.length) {
    generateBtn.classList.add("error-state");
    numberEl.classList.add("number-error");
    errorMsg.textContent =
      "Length-value can't be less than number of checkboxes selected";
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
  copyBtn.disabled = false;

  const strengthResult = evaluateStrength(lengthValue, inclusionPools);
  renderStrength(strengthResult);
}

function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

function evaluateStrength(lengthValue, inclusionPools) {
  let score = 0;
  const selectedCount = inclusionPools.length;

  if (lengthValue > 0 && lengthValue < 6) {
    score += 0;
  } else if (lengthValue > 5 && lengthValue < 10) {
    score += 1;
  } else if (lengthValue > 9 && lengthValue < 14) {
    score += 2;
  } else if (lengthValue >= 14) {
    score += 3;
  }

  if (selectedCount === 1) {
    score += 0;
  } else if (selectedCount === 2) {
    score += 1;
  } else if (selectedCount === 3) {
    score += 2;
  } else if (selectedCount === 4) {
    score += 3;
  }

  if (score < 2) {
    return {
      strengthLabel: "TOO WEAK!",
      filledMarkers: 1,
      className: "too-weak",
    };
  } else if (score < 4) {
    return {
      strengthLabel: "WEAK",
      filledMarkers: 2,
      className: "weak",
    };
  } else if (score < 6) {
    return {
      strengthLabel: "MEDIUM",
      filledMarkers: 3,
      className: "medium",
    };
  } else {
    return {
      strengthLabel: "STRONG",
      filledMarkers: 4,
      className: "strong",
    };
  }
}

function renderStrength(strengthResult) {
  const markersArray = Array.from(markers);

  strengthMsg.textContent = "";
  markers.forEach((element) => {
    element.classList.remove("too-weak");
    element.classList.remove("weak");
    element.classList.remove("medium");
    element.classList.remove("strong");
  });

  if (!strengthResult) {
    return;
  } else {
    strengthMsg.textContent = strengthResult.strengthLabel;
    markersArray.slice(0, strengthResult.filledMarkers).forEach((element) => {
      element.classList.add(strengthResult.className);
    });
  }
}

async function copyPassword() {
  const currentPassword = passwordOutput.textContent;

  if (!passwordOutput.classList.contains("final-password")) {
    return;
  } else {
    try {
      await navigator.clipboard.writeText(currentPassword);
      copiedMsg.textContent = "COPIED";
    } catch (err) {
      copiedMsg.textContent = "ERROR";
      copiedMsg.classList.add("copy-error");
    }
  }
}

function resetUI() {
  copiedMsg.textContent = "";
  copyBtn.disabled = true;
  passwordOutput.textContent = "P4$5W0rD!";
  passwordOutput.classList.remove("final-password");
  strengthMsg.textContent = "";
  markers.forEach((element) => {
    element.classList.remove("too-weak");
    element.classList.remove("weak");
    element.classList.remove("medium");
    element.classList.remove("strong");
  });

  errorMsg.textContent = "";
  generateBtn.classList.remove("error-state");
  numberEl.classList.remove("number-error");
  copiedMsg.classList.remove("copy-error");
  checkboxInputs.forEach((el) => {
    el.classList.remove("checkbox-error");
  });
}

renderSliderState();
