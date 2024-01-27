"use strict";
let previousTab;
let currentTab;
function switchToPreviousTab() {
    chrome.tabs.update(previousTab.tabId, { active: true });
}
chrome.tabs.onActivated.addListener((tabActiveInfo) => {
    previousTab = currentTab;
    currentTab = tabActiveInfo;
});
chrome.commands.onCommand.addListener((command) => {
    if (command === "switch-to-previous-tab") {
        switchToPreviousTab();
    }
});
chrome.action.onClicked.addListener(() => {
    switchToPreviousTab();
});
