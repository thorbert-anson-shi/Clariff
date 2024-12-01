let actionButtonsContainer;

// Create and position the action buttons
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();

    // Remove previous buttons
    if (actionButtonsContainer) actionButtonsContainer.remove();

    // Create button container
    actionButtonsContainer = document.createElement("div");
    actionButtonsContainer.style.position = "fixed"; // Make buttons fixed
    actionButtonsContainer.style.top = `${10}px`; // Place the buttons above the selection
    actionButtonsContainer.style.left = `${rect.left + window.scrollX}px`; // Align with the selection
    actionButtonsContainer.style.zIndex = "2147483647";
    actionButtonsContainer.style.display = "flex";
    actionButtonsContainer.style.gap = "10px";
    actionButtonsContainer.style.background = "white";
    actionButtonsContainer.style.padding = "5px";
    actionButtonsContainer.style.border = "1px solid #ddd";
    actionButtonsContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    actionButtonsContainer.style.borderRadius = "5px";

    const summarizeButton = createActionButton("Summarize");
    const explainButton = createActionButton("Explain");

    summarizeButton.addEventListener("click", () =>
      displayPopup("Summarizing:", selectedText)
    );
    explainButton.addEventListener("click", () =>
      displayPopup("Explaining:", selectedText)
    );

    actionButtonsContainer.appendChild(summarizeButton);
    actionButtonsContainer.appendChild(explainButton);
    document.body.appendChild(actionButtonsContainer);
  } else if (actionButtonsContainer) {
    actionButtonsContainer.remove();
  }
});

// Function to create buttons
function createActionButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.cursor = "pointer";
  button.style.padding = "5px 10px";
  button.style.background = "#007bff";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "3px";
  button.style.fontSize = "14px";
  return button;
}

// Function to display the chatbot-style popup
function displayPopup(action, text) {
  const existingPopup = document.getElementById("extension-popup");
  if (existingPopup) existingPopup.remove();

  const popup = document.createElement("div");
  popup.id = "extension-popup";
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.width = "300px";
  popup.style.background = "white";
  popup.style.border = "1px solid #ddd";
  popup.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
  popup.style.borderRadius = "5px";
  popup.style.padding = "10px";
  popup.style.zIndex = "1001";
  popup.style.fontFamily = "Arial, sans-serif";

  const title = document.createElement("h3");
  title.textContent = action;
  title.style.margin = "0 0 10px";
  title.style.fontSize = "16px";

  const content = document.createElement("p");
  content.textContent = text;
  content.style.margin = "0";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.style.background = "#ff5e5e";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "3px";
  closeButton.style.padding = "5px 10px";
  closeButton.style.cursor = "pointer";

  closeButton.addEventListener("click", () => popup.remove());

  popup.appendChild(title);
  popup.appendChild(content);
  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}
