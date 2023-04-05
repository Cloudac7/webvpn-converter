function restore_options() {
    let webvpn_link = chrome.storage.sync.get(['webvpn_link']);

    if ( webvpn_link.webvpn_link == "" ) {
        webvpn_link = "https://webvpn.xmu.edu.cn";
    }

    document.querySelector('#webvpn-link').value = webvpn_link.webvpn_link;
}

function update_options() {
    chrome.storage.sync.set({
        webvpn_link: document.querySelector('#webvpn-link').value
    });
}

document.addEventListener('DOMContentLoaded', restore_options)

document.querySelector('#options').addEventListener('submit', event => {
    event.preventDefault()
    update_options()
})
