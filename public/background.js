chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "sendSelection") {
    console.log(`[Action: ${message.action}] Text:`, message.text);
    sendResponse({ message: "Selection received" });
  }
});
