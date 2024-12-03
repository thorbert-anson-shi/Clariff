// Listen for the creation of new tabs
chrome.tabs.onCreated.addListener((tab) => {
  console.log("A new tab has been opened:", tab);
});
