import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const selectedTextContainer = document.getElementById("selected-text");
  const actionContainer = document.getElementById("action");

  chrome.storage.local.get(
    ["selectedText", "action"],
    ({ selectedText, action }) => {
      if (selectedText) {
        selectedTextContainer.textContent = selectedText;
        actionContainer.textContent = `Action: ${action}`;
      } else {
        selectedTextContainer.textContent = "No text selected.";
      }
    }
  );
});
