import * as React from "react";

import { TabService } from "../services/TabService";
import { TabList } from './TabList';

export interface ContainerProps {}
export interface ContainerState {
    tabs: Array<chrome.tabs.Tab>;
}

export class TabContainer extends React.Component<ContainerProps, ContainerState> {
    private tabService: TabService 

    constructor() {
        super();
        this.state = {
            tabs: []
        };

        this.tabService = new TabService();
        this.tabService.getTabs().then(this.handleTabsChanged);
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