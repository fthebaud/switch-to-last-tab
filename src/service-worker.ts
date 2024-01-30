const ARRAY_SIZE = 10;

let previousTabs: number[] = new Array(ARRAY_SIZE);

function memorizeTab(tabId: number) {
  console.log("Memorize", tabId);
  // Look for the tab
  const tabIndex = previousTabs.findIndex((id) => id === tabId);
  if (tabIndex !== -1) {
    // If the tab is present, remove it
    previousTabs.splice(tabIndex, 1);
  } else {
    // Else we remove oldest tab
    previousTabs.pop();
  }
  // Add current tab at index 0 and shift-right other tabs
  previousTabs.unshift(tabId);
  console.log(previousTabs);
}

function removeTab(tabId: number) {
  console.log("Remove", tabId);
  const tabIndex = previousTabs.findIndex((id) => id === tabId);
  previousTabs.splice(tabIndex, 1);
  previousTabs.length = ARRAY_SIZE;
  console.log(previousTabs);
}

async function switchToPreviousTab() {
  console.log("Switch to previous tab");
  try {
    await chrome.tabs.update(previousTabs[1], {
      active: true,
    });
    console.log(previousTabs);
  } catch (e) {
    console.log(e);
  }
}

chrome.tabs.onActivated.addListener((tab) => {
  memorizeTab(tab.tabId);
});

chrome.tabs.onRemoved.addListener((tab) => {
  removeTab(tab);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "switch-to-previous-tab") {
    switchToPreviousTab();
  }
});

chrome.action.onClicked.addListener(() => {
  switchToPreviousTab();
});
