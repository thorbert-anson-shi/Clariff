// Card styling and structure
const cardContainer = document.createElement("dialog");
cardContainer.id = "clariff-root";
cardContainer.open = true;
document.body.appendChild(cardContainer);

const cardHeader = document.createElement("h1");
cardHeader.id = "clariff-header";
cardHeader.innerText = "Clariff";
cardContainer.appendChild(cardHeader);

const textArea = document.createElement("textarea");
textArea.id = "clariff-textarea";
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

const optionShorten = document.createElement("option");
optionShorten.value = "shorten";
optionShorten.innerText = "Shorten";
lengthDropdown.appendChild(optionShorten);

const optionLengthen = document.createElement("option");
optionLengthen.value = "lengthen";
optionLengthen.innerText = "Lengthen";
lengthDropdown.appendChild(optionLengthen);

buttonGroup.appendChild(lengthDropdown);

// Tone option
const toneDropdown = document.createElement("select");
toneDropdown.id = "clariff-tone-dropdown";

const optionFormal = document.createElement("option");
optionFormal.value = "formal";
optionFormal.innerText = "Formal";
toneDropdown.appendChild(optionFormal);

const optionCasual = document.createElement("option");
optionCasual.value = "casual";
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

// This is a dummy listener for testing purposes
document.addEventListener("mouseup", () => {
  const selection = window.getSelection().toString();
  textArea.value = selection;
});

rephraseButton.addEventListener("click", async () => {
  const selection = textArea.value;
  const rephraseType = lengthDropdown.value;

  const rewriter = await ai.rewriter.create();

  const stream = rewriter.rewriteStreaming(selection);
});
