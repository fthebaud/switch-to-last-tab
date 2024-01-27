let previousTab: chrome.tabs.TabActiveInfo;
let currentTab: chrome.tabs.TabActiveInfo;

function saveTab(tab: chrome.tabs.TabActiveInfo) {
  previousTab = currentTab;
  currentTab = tab;
}

function switchToPreviousTab() {
  chrome.tabs.update(previousTab.tabId, { active: true });
}

chrome.tabs.onActivated.addListener((tab) => {
  saveTab(tab);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "switch-to-previous-tab") {
    switchToPreviousTab();
  }
});

chrome.action.onClicked.addListener(() => {
  switchToPreviousTab();
});
