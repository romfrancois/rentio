import React from 'react';

import TabsHeader from './TabHeader';

type TabsProps = {
    selectedTab: number;
    onClick: () => void;
    children: Array<any>;
};

const setTabNotSelected = 'tab-list-item';
const setTabSelected = `${setTabNotSelected} tab-list-active`;

class Tabs extends React.Component<TabsProps> {
    renderTabHeader(index: number) {
        const { children, selectedTab, onClick } = this.props;

        const {
            props: { label }
        } = children[index];

        const className = selectedTab === index ? setTabSelected : setTabNotSelected;

        return (
            <TabsHeader
                key={label}
                label={label}
                className={className}
                onClick={onClick}
                position={index}
            />
        );
    }

    render() {
        const {
            props: { children, selectedTab }
        } = this;

        const tabsHeader = children.map((_, index) => {
            return this.renderTabHeader(index);
        });

        return (
            <div className="tabs">
                <ol className="tab-list">{tabsHeader}</ol>

                {children[selectedTab]}
            </div>
        );
    }
}

export default Tabs;
