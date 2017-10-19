import windowManager from './utils/WindowManager';
import tabManager from './utils/TabManager';
import TabManager from './TabManager';
import StorageManager from './StorageManager';
import WindowManager from './WindowManager';

export default class ChromeEvents {
    private windowManager: WindowManager;
    private tabManager: TabManager;
    private storageManager: StorageManager;

    private currentWindowId: number;

    constructor(){
        this.windowManager = new WindowManager();
        this.tabManager = new TabManager();
        this.storageManager = new StorageManager();

        // popuplate some vars
        this.windowManager.getCurrentWindow().then(currentWindow => {
            this.currentWindowId = currentWindow.id;
        });
    }

    public ListenForKeyboardShortcuts() {
        chrome.commands.onCommand.addListener(command => {
            if (command === 'switcheroo') {
              var currentWindow = windowManager.getCurrentWindow();
              var switcherWindowId = windowManager.getSwitcherWindowId();
          
              Q.all([currentWindow, switcherWindowId])
              .spread(function(currentWindow, switcherWindowId) {
                // Don't activate the switcher from an existing switcher window.
                if (currentWindow.id == switcherWindowId) return;
          
                // When the user activates the switcher and doesn't have "search
                // in all windows" enabled, we need to know which was the last
                // non-switcher window that was active.
                windowManager.setLastWindowId(currentWindow.id);
                var left = currentWindow.left +
                  Math.round((currentWindow.width - SWITCHER_WIDTH) / 2);
                var top = currentWindow.top + PADDING_TOP;
                var height = Math.max(currentWindow.height - PADDING_TOP - PADDING_BOTTOM, 600);
                var width = SWITCHER_WIDTH;
          
                windowManager.showSwitcher(width, height, left, top);
              });
            }
          });
    }


    public ListenForMessageEvents() {
        chrome.runtime.onMessage.addListener(function(request, sender, respond) {

        });
    }
}