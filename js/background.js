import { convert } from "./convert.js";

chrome.contextMenus.create({
    "title": '转换并在新标签页打开',
    "id": 'convert-and-open',
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== 'convert-and-open')
        return;
    
    const webvpn_link = await chrome.storage.sync.get(['webvpn_link']);

    chrome.tabs.create({
        url: convert(webvpn_link.webvpn_link, info.pageUrl),
        index: tab.index + 1
    });
});