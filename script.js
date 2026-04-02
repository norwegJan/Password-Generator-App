// DECLARE VARIABLES

const copyBtn = document.querySelector("#copy-btn");
const copiedMsg = document.querySelector("#copied");

const sliderInput = document.querySelector("#char-slider");
const numberLength = document.querySelector("#number-length");

let numberValue = 0;

// ADD EVENT LISTENERS

copyBtn.addEventListener("click", (e) => {
  copiedMsg.textContent = "COPIED";
});

sliderInput.addEventListener("input", renderSliderState);

// DECLARE FUNCTIONS

function renderSliderState() {
  numberValue = sliderInput.valueAsNumber;

  const min = sliderInput.min;
  const max = sliderInput.max;
  const progress = ((numberValue - min) / (max - min)) * 100;

  numberLength.textContent = numberValue;
  sliderInput.style.setProperty("--progress", `${progress}%`);
}

renderSliderState();
