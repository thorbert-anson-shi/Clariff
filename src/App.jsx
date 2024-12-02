import { useEffect, useState } from "react";

function App() {
  const analyzeFunc = async (input) => {
    // Assuming ai.summarize.create() returns a promise with the summarized text
    try {
      const summarizer = await ai.summarize.create({ type: "tl;dr" });
      const res = await summarizer(input);
      alert("Summarized text: " + res);
    } catch (error) {
      console.error("Error summarizing text:", error);
      alert("Failed to summarize text.");
    }
  };

  const startProgram = async () => {
    // Query the active tab
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Execute the script to add the text selection listener
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: addTextSelectionListener, // Inject the function
    });
  };

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
  //         analyzeFunc(selectedText);
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
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-2xl font-thin">Clariff</h1>
        <p className="font-medium">
          An extension that rearticulates information to help you understand
          better, faster.
        </p>
        <button
          onClick={startProgram}
          className="px-3 py-2 drop-shadow-md rounded-lg bg-slate-200 hover:bg-slate-300 hover:drop-shadow-none"
        >
          Activate
        </button>
      </div>
    </>
  );
}

export default App;
