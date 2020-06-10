import React from 'react';

import DataForm from './Forms/DataForm';
import { InfoTabState } from './Forms/FormInfo';
import { DatesTabState } from './Forms/FormDates';
import { PriceTabState } from './Forms/FormPrices';
import { OptionsTabState } from './Forms/FormOptions';
import { initDocsState, DocsTabState } from './Forms/FormDocs';

import GConnect from './GConnect';

import { GoogleStatus } from './Helpers/Connexion';

type AppTab = {
    [tabName: string]:
        | InfoTabState
        | DatesTabState
        | PriceTabState
        | OptionsTabState
        | DocsTabState;
};

type AppState = {
    tabs: Array<AppTab>;
    selectedTab: number;
    previousTab: number;
    currentUserId: number; // init at 0. If we were to load more data that number would be the size of those data
    gStatus: GoogleStatus;
};

type FormData = {
    label: string;
    payload: InfoTabState | DatesTabState | PriceTabState | OptionsTabState | DocsTabState;
};

const initState: AppState = {
    tabs: [{ Docs: initDocsState }],
    selectedTab: 0,
    previousTab: 0,
    currentUserId: 0, // init at 0. If we were to load more data that number would be the size of those data
    gStatus: GoogleStatus.DISCONNECTED
};

class App extends React.Component {
    state: AppState = initState;

    constructor(props: any) {
        super(props);

        this.saveFormsData = this.saveFormsData.bind(this);
        this.loadSavedData = this.loadSavedData.bind(this);
        this.updateGStatus = this.updateGStatus.bind(this);
    }

    handleClick(i: number) {
        this.setState({
            ...this.state,
            previousTab: this.state.selectedTab,
            selectedTab: i
        });
    }

    loadData() {
        const renters = localStorage.getItem('renters');
        if (renters) {
            this.setState(JSON.parse(renters));
        }
    }

    saveData() {
        console.log('saveData: ', this.state);

        localStorage.setItem('renters', JSON.stringify(this.state));

        this.setState({
            ...this.state,
            currentUserId: this.state.currentUserId + 1
        });
    }

    saveFormsData(formData: FormData) {
        console.log('saveFormsData: ', formData, JSON.stringify(formData));

        const currentTabLabel: string = formData.label;
        const currentTabData = formData.payload;

        const _tabs = this.state.tabs.slice();

        // If data is already present in the array, update it
        if (_tabs[this.state.currentUserId]) {
            _tabs[this.state.currentUserId][currentTabLabel] = currentTabData;
        } else {
            // otherwise create it
            _tabs.push({
                [currentTabLabel]: currentTabData
            });
        }

        this.setState({
            ...this.state,
            tabs: _tabs
        });
    }

    loadSavedData(): AppTab {
        return this.state.tabs[this.state.currentUserId];
    }

    updateGStatus(newStatus: GoogleStatus) {
        this.setState({
            ...this.state,
            gStatus: newStatus
        });
    }

    render() {
        const {
            state: { currentUserId, selectedTab }
        } = this;

        let saveNewRenterButton: JSX.IntrinsicElements['button'];
        if (selectedTab !== 5) {
            // need to find a better way of identifying tab
            saveNewRenterButton = (
                <button id="send2google" className="renting-submit" onClick={() => this.saveData()}>
                    Enregistrer la location
                </button>
            );
        } else {
            saveNewRenterButton = null;
        }

        return (
            <div className="rentings">
                <GConnect updateGStatus={this.updateGStatus} />
                <div className="forms">
                    <DataForm
                        onClick={(i: number) => this.handleClick(i)}
                        selectedTab={selectedTab}
                        currentUserId={currentUserId}
                        saveFormsData={this.saveFormsData}
                        loadSavedData={this.loadSavedData}
                    />
                </div>
                <div>{saveNewRenterButton}</div>
            </div>
        );
    }
}

export default App;
