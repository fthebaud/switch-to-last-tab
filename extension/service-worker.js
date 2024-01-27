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
// Only memorize three tabs: [current, current-1, current-2]
let previousTabsId = new Array(3);
let timeoutId = null;
const DEBOUNCE = 200; // ms
function memorizeTab(tab) {
    // Remove oldest tab
    previousTabsId.pop();
    // Add current tab at index 0 and shift-right other tabs
    previousTabsId.unshift(tab.tabId);
}
function switchToTab(index) {
    timeoutId = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chrome.tabs.update(previousTabsId[index], {
                active: true,
            });
        }
        catch (e) {
            console.log(e);
        }
        finally {
            timeoutId = null;
        }
    }), DEBOUNCE);
}
function switchToPreviousTab() {
    // If double click or double command within debounce delay
    if (timeoutId) {
        // Cancel current timeout
        clearTimeout(timeoutId);
        timeoutId = null;
        // Go back two tabs
        switchToTab(2);
    }
    else {
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
