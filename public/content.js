// Container to hold card and minimized button
const clariffContainer = document.createElement("div");
clariffContainer.id = "clariff-container";
document.body.appendChild(clariffContainer);

// Card styling and structure
const cardContainer = document.createElement("dialog");
cardContainer.id = "clariff-root";
document.body.appendChild(cardContainer);
clariffContainer.appendChild(cardContainer);

const popupButton = document.createElement("button");
popupButton.id = "clariff-popup-btn";
popupButton.addEventListener("click", () => {
  cardContainer.hidden = false;
});
clariffContainer.appendChild(popupButton);

// Title and close button
const cardHeader = document.createElement("div");
cardHeader.id = "clariff-header";

const headerTitle = document.createElement("span");
headerTitle.id = "clariff-title";
headerTitle.innerText = "Clariff";
cardHeader.appendChild(headerTitle);
const closeButton = document.createElement("button");
closeButton.id = "clariff-close-btn";

const closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
closeIcon.setAttribute("viewBox", "0 0 384 512");
closeIcon.innerHTML =
  '<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>';
closeButton.appendChild(closeIcon);
closeButton.addEventListener("click", () => {
  cardContainer.hidden = true;
});
cardHeader.appendChild(closeButton);

cardContainer.appendChild(cardHeader);

// Text area where summarizations are displayed
const textArea = document.createElement("textarea");
textArea.id = "clariff-textarea";
textArea.readOnly = true;
textArea.placeholder = "Highlight text from the current website to rephrase";
cardContainer.appendChild(textArea);

const textAreaFooter = document.createElement("p");
textAreaFooter.id = "clariff-language";
textAreaFooter.textContent = "Language detected: ";
cardContainer.appendChild(textAreaFooter);

const textAreaContainer = document.createElement("div");
textAreaContainer.id = "clariff-textarea-container";
textAreaContainer.appendChild(textArea);
textAreaContainer.appendChild(textAreaFooter);
cardContainer.appendChild(textAreaContainer);

const buttonGroup = document.createElement("div");
buttonGroup.id = "clariff-btn-group";
cardContainer.appendChild(buttonGroup);

// Length option
const lengthDropdown = document.createElement("select");
lengthDropdown.id = "clariff-length-dropdown";

const optionLengthAsIs = document.createElement("option");
optionLengthAsIs.value = "as-is";
optionLengthAsIs.innerText = "As is";
lengthDropdown.appendChild(optionLengthAsIs);

const optionShorten = document.createElement("option");
optionShorten.value = "shorter";
optionShorten.innerText = "Shorten";
lengthDropdown.appendChild(optionShorten);

const optionLengthen = document.createElement("option");
optionLengthen.value = "longer";
optionLengthen.innerText = "Lengthen";
lengthDropdown.appendChild(optionLengthen);

buttonGroup.appendChild(lengthDropdown);

// Tone option
const toneDropdown = document.createElement("select");
toneDropdown.id = "clariff-tone-dropdown";

const optionToneAsIs = document.createElement("option");
optionToneAsIs.value = "as-is";
optionToneAsIs.innerText = "As is";
toneDropdown.appendChild(optionToneAsIs);

const optionFormal = document.createElement("option");
optionFormal.value = "more-formal";
optionFormal.innerText = "Formal";
toneDropdown.appendChild(optionFormal);

const optionCasual = document.createElement("option");
optionCasual.value = "more-casual";
optionCasual.innerText = "Casual";
toneDropdown.appendChild(optionCasual);

buttonGroup.appendChild(toneDropdown);

const rephraseButton = document.createElement("button");
rephraseButton.id = "clariff-rephrase";
rephraseButton.innerText = "Rephrase";
buttonGroup.appendChild(rephraseButton);

// Logic and event listening
// TODO: Add analyze-btn as ID for analyzeButton on azzam branch
// const analyzeButton = document.getElementById("analyze-btn");

let selection;

// This is a dummy listener for testing purposes
document.addEventListener("mouseup", () => {
  selection = window.getSelection().toString();
});

rephraseButton.addEventListener("click", async () => {
  console.log(selection);
  const rephraseLength = lengthDropdown.value;
  const rephraseTone = toneDropdown.value;

  const rewriter = await ai.rewriter.create({
    tone: rephraseTone,
    length: rephraseLength,
    sharedContext:
      "I need help explaining this in a different way, perhaps with additional context. Can you help me with that?",
    format: "markdown",
  });
  console.log(rewriter);

  const stream = rewriter.rewriteStreaming(selection);

  for await (const chunk of stream) {
    textArea.value = chunk;
  }

  rewriter.destroy();
});
