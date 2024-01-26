// Add event listener to the click on extension's icon
chrome.action.onClicked.addListener((tab) => {
  // Execute script in a specific context
  chrome.scripting.executeScript({
    // Execution context
    target: { tabId: tab.id },
    // Script
    func: () => {
      console.log("HELLO");
    },
  });
});
