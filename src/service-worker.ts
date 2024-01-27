// Only memorize three tabs: [current, current-1, current-2]
let previousTabsId: number[] = new Array(3);

let timeoutId: number | null = null;

const DEBOUNCE = 200; // ms

function memorizeTab(tab: chrome.tabs.TabActiveInfo) {
  // Remove oldest tab
  previousTabsId.pop();
  // Add current tab at index 0 and shift-right other tabs
  previousTabsId.unshift(tab.tabId);
}

function switchToTab(index: number) {
  timeoutId = setTimeout(async () => {
    try {
      await chrome.tabs.update(previousTabsId[index], {
        active: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      timeoutId = null;
    }
  }, DEBOUNCE);
}

function switchToPreviousTab() {
  // If double click or double command within debounce delay
  if (timeoutId) {
    // Cancel current timeout
    clearTimeout(timeoutId);
    timeoutId = null;
    // Go back two tabs
    switchToTab(2);
  } else {
    // Go back one tab
    switchToTab(1);
  }
}

chrome.tabs.onActivated.addListener((tab) => {
  memorizeTab(tab);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "switch-to-previous-tab") {
    switchToPreviousTab();
  }
});

chrome.action.onClicked.addListener(() => {
  switchToPreviousTab();
});
