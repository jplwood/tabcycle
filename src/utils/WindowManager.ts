import TabManager from './TabManager';
import StorageManager from './StorageManager';

export default class WindowManager {
    private UI_ENTRY_PATH = "index.html";
    private tabManager: TabManager;
    private storageManager: StorageManager;

    constructor() {
        this.tabManager = new TabManager();
        this.storageManager = new StorageManager();
        

    }

    public showTabsWindow() {
        const options = {
            url: chrome.runtime.getURL(this.UI_ENTRY_PATH),
            type: "popup",
            focused: true,
            left: 0,
            top: 0,
            width: 200,
            height: 200
        };

        chrome.windows.create(options, (tabsWindow) => {
            this.setTabsWindowId(tabsWindow.id);
        });
    }

    public getCurrentWindow() {
        return new Promise<chrome.windows.Window>((resolve) => {
            chrome.windows.getCurrent(currentWindow => resolve(currentWindow));
        });
    }

    private setTabsWindowId(id: number ) {

    }
}