export default class StorageManager {
    private STORAGE_KEY = '6a1f9cdd-72e4-4422-99f8-5ea2aedd0e20';
    
    constructor() {}

    public SaveTabHistory(windowId: number, tabs: Array<chrome.tabs.Tab>) {
        const storageData = {};
        const key = this.getStorageKey(windowId);
        storageData[key] = tabs;
        chrome.storage.sync.set(storageData, () => {});
    }

    public DeleteTabHistory(windowId: number) {
        //todo!!!
    }

    public GetTabHistory(windowId: number) {
        return new Promise<number[]>((resolve, reject) => {
            chrome.storage.sync.get(this.STORAGE_KEY, (items) => {
                const historyByWindow = items[this.getStorageKey(windowId)];
                resolve(historyByWindow || []);
            });
        });
    }

    private getStorageKey(windowId){
        return `${this.STORAGE_KEY}_${ windowId }`;
    }
}