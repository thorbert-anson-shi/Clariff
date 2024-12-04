// This function will be injected into the page context
const addTextSelectionListener = () => {
  document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim(); // Get the selected text

    if (selectedText) {
      // Get the position of the selection
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect(); // Get the bounding rectangle of the selection

      const summarizeButton = document.createElement("button");
      summarizeButton.textContent = "Summarize";
      summarizeButton.style.position = "absolute";
      summarizeButton.style.top = `${rect.top + window.scrollY - 40}px`;
      summarizeButton.style.left = `${rect.left + window.scrollX}px`; // Align with the selection
      summarizeButton.style.zIndex = "9999";
      summarizeButton.style.padding = "8px 16px";
      summarizeButton.style.backgroundColor = "#007bff";
      summarizeButton.style.color = "white";
      summarizeButton.style.border = "none";
      summarizeButton.style.borderRadius = "5px";
      summarizeButton.style.cursor = "pointer";
      summarizeButton.style.fontSize = "14px";

      // Add event listener to the "Analyze" button
      summarizeButton.addEventListener("click", () => {
        cardContainer.hidden = false;

        (async () => {
          const canSummarize = await ai.summarizer.capabilities();
          let summarizer;
          if (canSummarize && canSummarize.available !== "no") {
            if (canSummarize.available === "readily") {
              // The summarizer can immediately be used.
              summarizer = await ai.summarizer.create({
                format: "plain-text",
              });
            } else {
              // The summarizer can be used after the model download.
              summarizer = await ai.summarizer.create({
                format: "plain-text",
              });
              summarizer.addEventListener("downloadprogress", (e) => {
                console.log(e.loaded, e.total);
              });
              await summarizer.ready;
            }
          } else {
            alert("Failed to load summarizer");
            return;
          }

          // Detect language of the selected text
          const canDetect = await translation.canDetect();
          let detector;
          if (canDetect !== "no") {
            if (canDetect === "readily") {
              // The language detector can immediately be used.
              detector = await translation.createDetector();
            } else {
              // The language detector can be used after the model download.
              detector = await translation.createDetector();
              detector.addEventListener("downloadprogress", (e) => {
                console.log(e.loaded, e.total);
              });
              await detector.ready;
            }
          } else {
            alert("Failed to load language detector");
            return;
          }

          try {
            // Create the streaming div directly
            // COMMENTED OUT FOR NOW
            // const streamDiv = document.createElement("div");
            // streamDiv.id = "streaming-box";
            // streamDiv.style.position = "fixed";
            // streamDiv.style.bottom = "20px";
            // streamDiv.style.right = "20px";
            // streamDiv.style.width = "300px";
            // streamDiv.style.maxHeight = "200px";
            // streamDiv.style.overflowY = "auto";
            // streamDiv.style.padding = "10px";
            // streamDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            // streamDiv.style.color = "white";
            // streamDiv.style.borderRadius = "5px";
            // streamDiv.style.zIndex = "1000";
            // streamDiv.style.fontFamily = "Arial, sans-serif";
            // streamDiv.style.fontSize = "14px";
            // document.body.appendChild(streamDiv);

            const results = await detector.detect(selectedText);
            const detectedLanguage = results[0].detectedLanguage;
            outputFooter.textContent = `Language detected: ${detectedLanguage}`;

            // Start streaming the summary
            const stream = summarizer.summarizeStreaming(selectedText);

            output.textContent = "Generating response...";

            for await (let chunk of stream) {
              textOutput = chunk;

              // Parse markdown list items beginning with - and *
              chunk = chunk
                .replace(/^[\*\-]{1}\s/g, "<li>")
                .replace(/(\.[*]*\s)[\s]*[\*\-]{1}/g, "$1</li><li>");
              output.innerHTML = chunk;
              // streamDiv.innerHTML = chunk;
            }
          } catch (error) {
            console.error("Error summarizing text:", error);
            alert("Failed to summarize text.");
          }

          summarizer.destroy();
        })();
      });

      // Append the button to the body
      document.body.appendChild(summarizeButton);

      // Check if the button is outside the viewport
      const buttonRect = summarizeButton.getBoundingClientRect();
      const isOutOfView = buttonRect.top < 0;

      // Adjust position if it's out of view
      if (isOutOfView) {
        summarizeButton.style.top = `${rect.bottom + window.scrollY + 10}px`;
      }

      // Remove the button if the selection changes (user clicks elsewhere)
      const removeButton = () => {
        summarizeButton.remove();
        document.removeEventListener("selectionchange", removeButton);
      };
      document.addEventListener("selectionchange", removeButton); // Event to remove the button when selection changes
    } else {
      output.textContent =
        "Highlight text from the current website to rephrase";
    }
  });
};

addTextSelectionListener();

// Card styling and structure
const cardContainer = document.createElement("dialog");
cardContainer.id = "clariff-root";
cardContainer.hidden = true;
document.body.appendChild(cardContainer);

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
  cardContainer.hidden = !cardContainer.hidden;
});
cardHeader.appendChild(closeButton);

cardContainer.appendChild(cardHeader);

// Text area where summarizations are displayed
const outputContainer = document.createElement("div");
outputContainer.id = "clariff-output-container";
cardContainer.appendChild(outputContainer);

const output = document.createElement("output");
output.id = "clariff-output";
output.textContent = "Highlight text from the current website to rephrase";
output.readOnly = true;
output.ariaDescription = "Highlight text from the current website to rephrase";
outputContainer.appendChild(output);

const outputFooter = document.createElement("p");
outputFooter.id = "clariff-language";
outputFooter.textContent = "Language detected: ";
outputContainer.appendChild(outputFooter);

const buttonGroup = document.createElement("div");
buttonGroup.id = "clariff-btn-group";
cardContainer.appendChild(buttonGroup);

// Choice option
const choiceDropdown = document.createElement("select");
choiceDropdown.id = "clariff-choice-dropdown";

const optionLength = document.createElement("option");
optionLength.value = "length";
optionLength.innerText = "Length";
choiceDropdown.appendChild(optionLength);

const optionTone = document.createElement("option");
optionTone.value = "tone";
optionTone.innerText = "Tone";
choiceDropdown.appendChild(optionTone);

// Provide default option
choiceDropdown.selectedIndex = 0;

buttonGroup.appendChild(choiceDropdown);

// Second dropdown (initially empty)
const secondDropdown = document.createElement("select");
secondDropdown.id = "clariff-second-dropdown";
buttonGroup.appendChild(secondDropdown);

// Set default values for rephrasing
let rephraseLength = "as-is";
let rephraseTone = "as-is";

// Define optgroups for length and tone options
const lengthOptGroup = document.createElement("optgroup");
lengthOptGroup.label = "Length";

const optionLengthAsIs = document.createElement("option");
optionLengthAsIs.value = "as-is";
optionLengthAsIs.innerText = "As is";
lengthOptGroup.appendChild(optionLengthAsIs);

const optionShorten = document.createElement("option");
optionShorten.value = "shorter";
optionShorten.innerText = "Shorter";
lengthOptGroup.appendChild(optionShorten);

const optionLengthen = document.createElement("option");
optionLengthen.value = "longer";
optionLengthen.innerText = "Longer";
lengthOptGroup.appendChild(optionLengthen);

const toneOptGroup = document.createElement("optgroup");
toneOptGroup.label = "Tone";

const optionToneAsIs = document.createElement("option");
optionToneAsIs.value = "as-is";
optionToneAsIs.innerText = "As is";
toneOptGroup.appendChild(optionToneAsIs);

const optionFormal = document.createElement("option");
optionFormal.value = "more-formal";
optionFormal.innerText = "Formal";
toneOptGroup.appendChild(optionFormal);

const optionCasual = document.createElement("option");
optionCasual.value = "more-casual";
optionCasual.innerText = "Casual";
toneOptGroup.appendChild(optionCasual);

secondDropdown.replaceChildren(lengthOptGroup); // Set default options
secondDropdown.selectedIndex = 0; // Set default value

// Update second dropdown based on choice
choiceDropdown.addEventListener("change", () => {
  secondDropdown.replaceChildren(""); // Clear existing options

  if (choiceDropdown.value === "length") {
    // If user switches choice to length, set tone to "as-is"
    rephraseTone = "as-is";
    secondDropdown.replaceChildren(lengthOptGroup);
  } else if (choiceDropdown.value === "tone") {
    // If user switches choice to tone, set length to "as-is"
    rephraseLength = "as-is";
    secondDropdown.replaceChildren(toneOptGroup);
  }
  secondDropdown.selectedIndex = 0; // Set default value
});

const rephraseButton = document.createElement("button");
rephraseButton.id = "clariff-rephrase";
rephraseButton.innerText = "Rephrase";
buttonGroup.appendChild(rephraseButton);

// Logic and event listening

// This is modified whenever text is summarized or when text is rephrased
let textOutput = "";

rephraseButton.addEventListener("click", async () => {
  // If user selects to rephrase the length
  console.log(textOutput);
  if (choiceDropdown.selectedIndex === 0) {
    rephraseLength = secondDropdown.value;
  } else {
    rephraseTone = secondDropdown.value;
  }

  const rewriter = await ai.rewriter.create({
    tone: rephraseTone,
    length: rephraseLength,
    sharedContext:
      "I need help explaining this in a more cheerful, hands-on manner",
    format: "plain-text",
  });

  output.textContent = "Generating response...";

  const stream = rewriter.rewriteStreaming(textOutput);

  for await (let chunk of stream) {
    textOutput = chunk;

    // Parse list items starting with either - or *
    chunk = chunk
      .replace(/^[\*\-]{1}\s/g, "<li>")
      .replace(/(\.[*]*\s)[\s]*[\*\-]{1}/g, "$1</li><li>");
    output.innerHTML = chunk;
  }

  rewriter.destroy();
});
