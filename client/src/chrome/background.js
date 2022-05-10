/*global chrome*/
chrome.runtime.onInstalled.addListener(async () => {

    let url = chrome.runtime.getURL("index.html");
    let tab = await chrome.tabs.create({ url });
    // tab.src = chrome.extension.getURL('hello.js');
    console.log(`Created tab ${tab.id}`);
  });
  