// // This function will be injected into the page context
// const addTextSelectionListener = () => {
//   document.addEventListener("mouseup", () => {
//     const selectedText = window.getSelection().toString().trim(); // Get the selected text

//     if (selectedText) {
//       // Get the position of the selection
//       const selection = window.getSelection();
//       const range = selection.getRangeAt(0);
//       const rect = range.getBoundingClientRect(); // Get the bounding rectangle of the selection

//       const analyzeButton = document.createElement("button");
//       analyzeButton.textContent = "Analyze";
//       analyzeButton.style.position = "absolute";
//       analyzeButton.style.top = `${rect.top + window.scrollY - 40}px`; // Position above the selection
//       analyzeButton.style.left = `${rect.left + window.scrollX}px`; // Align with the selection
//       analyzeButton.style.zIndex = "9999";
//       analyzeButton.style.padding = "8px 16px";
//       analyzeButton.style.backgroundColor = "#007bff";
//       analyzeButton.style.color = "white";
//       analyzeButton.style.border = "none";
//       analyzeButton.style.borderRadius = "5px";
//       analyzeButton.style.cursor = "pointer";
//       analyzeButton.style.fontSize = "14px";

//       // Add event listener to the "Analyze" button
//       analyzeButton.addEventListener("click", () => {
//         alert(selectedText);
//       });

//       // Append the button to the body
//       document.body.appendChild(analyzeButton);

//       // Remove the button if the selection changes (user clicks elsewhere)
//       const removeButton = () => {
//         analyzeButton.remove();
//         document.removeEventListener("selectionchange", removeButton);
//       };
//       document.addEventListener("selectionchange", removeButton); // Event to remove the button when selection changes
//     }
//   });
// };
// addTextSelectionListener();
