import { useEffect } from "react";

function App() {
  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        alert("Hello from the page");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-2xl font-thin">Clariff</h1>
        <p className="font-medium">
          An extension that rearticulates information to help you understand
          better, faster.
        </p>
        <button className="px-3 py-2 drop-shadow-md rounded-lg bg-slate-200 hover:bg-slate-300 hover:drop-shadow-none">
          Settings
        </button>
      </div>
    </>
  );
}

export default App;
