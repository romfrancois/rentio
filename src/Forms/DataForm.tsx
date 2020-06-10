import React from 'react';

import Tabs from '../Tabs';
import Tab from '../Tab';

import Info from './FormInfo';
import Dates from './FormDates';
import Prices from './FormPrices';
import Options from './FormOptions';
import Docs from './FormDocs';
import LatestRenters from './FormLatestRenters';

class DataForm extends React.Component<any, any> {
    render() {
        const {
            props: { selectedTab, onClick, currentUserId, saveFormsData, loadSavedData }
        } = this;

        return (
            <Tabs selectedTab={selectedTab} onClick={onClick}>
                <Tab label="Info Locataire">
                    <Info
                        currentUserId={currentUserId}
                        saveFormsData={saveFormsData}
                        loadSavedData={loadSavedData}
                    />
                </Tab>
                <Tab label="Dates & Heures">
                    <Dates
                        currentUserId={currentUserId}
                        saveFormsData={saveFormsData}
                        loadSavedData={loadSavedData}
                    />
                </Tab>
                <Tab label="Tarifs">
                    <Prices
                        currentUserId={currentUserId}
                        saveFormsData={saveFormsData}
                        loadSavedData={loadSavedData}
                    />
                </Tab>
                <Tab label="Options">
                    <Options
                        currentUserId={currentUserId}
                        saveFormsData={saveFormsData}
                        loadSavedData={loadSavedData}
                    />
                </Tab>
                <Tab label="Génération Doc">
                    <Docs
                        currentUserId={currentUserId}
                        saveFormsData={saveFormsData}
                        loadSavedData={loadSavedData}
                    />
                </Tab>
                <Tab label="Derniers ajouts">
                    <LatestRenters />
                </Tab>
            </Tabs>
        );
    }
}

export default DataForm;
