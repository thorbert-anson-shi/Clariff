import { useState, useEffect } from "react";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to 'en' while loading

  // Fetch preferred language from Chrome storage on mount
  useEffect(() => {
    chrome.storage.sync.get(["preferredLang"], (result) => {
      if (result.preferredLang) {
        setSelectedLanguage(result.preferredLang);
      }
    });
  }, []);

  const updateChromeStorage = async (selectedLanguage) => {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [selectedLanguage],
      function: (selectedLanguage) => {
        chrome.storage.sync.set({ preferredLang: selectedLanguage });
      },
    });
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    updateChromeStorage(newLanguage);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-48 p-4 shadow-lg w-80 bg-gradient-to-r from-blue-500 to-indigo-600">
        <h1 className="text-3xl font-bold tracking-wide text-white">Clariff</h1>
        <p className="mt-4 text-lg font-light text-center text-white">
          Rearticulates information to help you understand better, faster.
        </p>
        {/* Language Selection Dropdown */}
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="px-4 py-2 mt-4 font-semibold text-indigo-600 bg-white rounded-lg hover:bg-gray-100"
        >
          <option value="en">English (en)</option>
          <option value="zh">Mandarin Chinese (simplified)</option>
          <option value="zh-Hant">Mandarin (traditional)</option>
          <option value="ja">Japanese (ja)</option>
          <option value="pt">Portuguese (pt)</option>
          <option value="ru">Russian (ru)</option>
          <option value="es">Spanish (es)</option>
          <option value="tr">Turkish (tr)</option>
        </select>
      </div>
    </>
  );
}

export default App;
