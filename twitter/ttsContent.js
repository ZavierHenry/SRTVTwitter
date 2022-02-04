window.addEventListener('load', () => {
    console.log("Load event fired. Attaching mutation observer")
    const root = document.getElementById('react-root')
    const config = {
        attributes: false,
        subtree: true,
        childList: true
    }

    const callback = function(mutations, _observer) {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node instanceof Element) {
                        const tweets = node.querySelectorAll('[data-testid="tweet"]')
                        for (const tweet of tweets) {
                            const verifiedAccountNode = tweet.querySelector('[aria-label="Verified account" i]')
                            if (verifiedAccountNode != null) {
                                verifiedAccountNode.replaceWith(" verified account ")
                            }
                        }
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(callback)
    observer.observe(root, config)
    window.addEventListener('unload', () => observer.disconnect())
    
})