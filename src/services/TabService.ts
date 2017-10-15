export class TabService {
    public tabs: Array<chrome.tabs.Tab> = [];

    constructor(){
        this.getTabs().then((tabs) => {
            this.tabs = tabs;
        });

        this.addListeners();
    };

    public getTabs() {
        return new Promise<Array<chrome.tabs.Tab>>((resolve, reject) => {
            const queryInfo = {
                currentWindow: true
            };

            chrome.tabs.query(queryInfo, (tabs) => {
                resolve(tabs);
            });
        });

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