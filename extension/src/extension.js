(() => {
    
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.create({'url': 'http://localhost:3000/history', 'selected': true});
    });

})()
