/*global chrome*/
chrome.runtime.onInstalled.addListener(async () => {

    let url = chrome.runtime.getURL("index.html");
    let tab = await chrome.tabs.create({ url });
    // tab.src = chrome.extension.getURL('hello.js');
    console.log(`Created tab ${tab.id}`);
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  console.log('messaage:', message);
  console.log('sender:', sender);
  console.log('sendResponse:', sendResponse);
});

chrome.runtime.onConnect.addListener((data) => {
  console.log('onConnect: ', data);
});