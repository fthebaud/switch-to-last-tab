"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ARRAY_SIZE = 10;
let previousTabs = new Array(ARRAY_SIZE);
function memorizeTab(tabId) {
    console.log("Memorize", tabId);
    // Look for the tab
    const tabIndex = previousTabs.findIndex((id) => id === tabId);
    if (tabIndex !== -1) {
        // If the tab is present, remove it
        previousTabs.splice(tabIndex, 1);
    }
    else {
        // Else we remove oldest tab
        previousTabs.pop();
    }
    // Add current tab at index 0 and shift-right other tabs
    previousTabs.unshift(tabId);
    console.log(previousTabs);
}
function removeTab(tabId) {
    console.log("Remove", tabId);
    const tabIndex = previousTabs.findIndex((id) => id === tabId);
    previousTabs.splice(tabIndex, 1);
    previousTabs.length = ARRAY_SIZE;
    console.log(previousTabs);
}
function switchToPreviousTab() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Switch to previous tab");
        try {
            yield chrome.tabs.update(previousTabs[1], {
                active: true,
            });
            console.log(previousTabs);
        }
        catch (e) {
            console.log(e);
        }
    });
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
