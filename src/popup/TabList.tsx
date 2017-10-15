import * as React from "react";

export interface ListProps { 
    tabs: Array<chrome.tabs.Tab>;
}

export class TabList extends React.Component<ListProps,{}> {
    constructor(){
        super();
    }
    
    render() {
        const listItems = this.props.tabs.map((tab) => {
            return <li>{ tab.title }</li>
        });

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}