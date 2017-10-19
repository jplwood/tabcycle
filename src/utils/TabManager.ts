
export default class TabManager {
    
    constructor(){};

    public GetTabs() {
        return new Promise<chrome.tabs.Tab[]>((resolve) => {
            const queryInfo = {
                currentWindow: true
            };

            chrome.tabs.query(queryInfo, (tabs) => {
                resolve(tabs);
            });
        });
    }

    public switchTab(tabId) {
        chrome.tabs.update(tabId, {active: true});
    }

    private addListeners() {
        chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
            
        });
        chrome.tabs.onRemoved.addListener((tabId, info)=>{

        });
        chrome.tabs.onCreated.addListener((tab) => {

        });
    }


}