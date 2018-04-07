(() => {
    const socket = io.connect('http://localhost:3000');
    let currentMainFrameID;
    let referrer;

    initEvents();

    /**
     * Set listeners on network events.
     */
    function initEvents() {
        chrome.webRequest.onBeforeRequest.addListener(ReportRequests, { urls: ["*://*/*"], types: ['main_frame', 'sub_frame'] })
        chrome.webRequest.onBeforeSendHeaders.addListener(setReferrer, { urls: ["*://*/*"], types: ['main_frame'] })
    }

    /**
     * Set current referrer.
     * This value is changing every new request of 'main_frame' type
     * This is global scope referrer and not tab scope. (By design)
     * @param {any} details 
     */
    function setReferrer(details) {
        referrer = details.url;
    }

    /**
     * Is the domain is blacklisted. 
     * @param {any} url 
     * @returns
     */
    function isDomainBlackListed(url) {
        const blackListedDomains = ['localhost']
        return url.match(blackListedDomains.join('|'))
    }

    
    function ReportRequests(details) {
        if (isDomainBlackListed(details.url)) { return;}
        
        switch (details.type) {
            case 'main_frame':
                socket.emit('createWebpage',
                    { url: details.url, referrer },
                    (data) => { currentMainFrameID = data.id }
                );
                break;
            case 'sub_frame':
                currentMainFrameID && socket.emit('appendIframe', {
                    frameId: details.frameId,
                    url: details.url,
                    mainFrameID: currentMainFrameID,
                    parentFrameId: details.parentFrameId
                });
                break;
        }
    }
})()

