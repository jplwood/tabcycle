import * as React from "react";

import { TabManager } from "../utils/TabManager";
import { TabList } from './TabList';

export interface ContainerProps {}
export interface ContainerState {
    tabs: Array<chrome.tabs.Tab>;
}

export class TabContainer extends React.Component<ContainerProps, ContainerState> {
    private TabManager: TabManager 

    constructor() {
        super();
        this.state = {
            tabs: []
        };

        this.TabManager = new TabManager();
        this.TabManager.getTabs().then(this.handleTabsChanged);
    }

    handleTabsChanged = (tabs: Array<chrome.tabs.Tab>) => {
        this.setState({
            tabs: tabs
        });
    }

    render() {
        return (
            <div className="tab-container">
                <h1>Tab List!!</h1>
                <TabList tabs={this.state.tabs} />
            </div>
        );
    }
}