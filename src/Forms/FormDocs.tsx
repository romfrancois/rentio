import React from 'react';

import Form from './Form';
import { TextStyle } from '../Helpers/text';

const currentFormName = 'Docs';

export enum Languages {
    FR = 'FR',
    EN = 'EN'
}

export enum Locations {
    BELLEGARDE = 'BELLEGARDE',
    SALOU = 'SALOU'
}

export enum Origins {
    HOMEAWAY = 'HOMEAWAY',
    AIRBNB = 'AIRBNB'
}

export type DocsTabProps = {
    currentUserId;
    saveFormsData;
    loadSavedData;
};

export type DocsTabState = {
    language: string; // Languages,
    location: string; // Locations,
    origin: string; // Origins
};

export const initDocsState: DocsTabState = {
    language: Languages.FR,
    location: Locations.BELLEGARDE,
    origin: Origins.HOMEAWAY
};

export default class FormDocs extends Form<DocsTabProps, DocsTabState> {
    constructor(props: DocsTabProps) {
        super(props, currentFormName, initDocsState);
        this.saveData();
    }

    render() {
        console.log('state: ', this);

        const { language, location, origin } = this.state as DocsTabState;

        return (
            <form>
                <fieldset>
                    <div className="items">
                        <div className="oneColumn">
                            <div>
                                <label>Langue du contrat</label>
                                <select
                                    id="language"
                                    name="language"
                                    placeholder="Langue du contrat"
                                    value={language}
                                    onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                                    onBlur={this.saveData}
                                >
                                    <option value={Languages.FR} defaultValue="selected">
                                        FR
                                    </option>
                                    <option value={Languages.EN}>ENG</option>
                                </select>
                            </div>
                        </div>

                        <div className="oneColumn">
                            <div>
                                <label>Endroit de la location</label>
                                <select
                                    id="location"
                                    name="location"
                                    placeholder="Endroit de la location"
                                    value={location}
                                    onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                                    onBlur={this.saveData}
                                >
                                    <option value={Locations.BELLEGARDE} defaultValue="selected">
                                        Bellegarde
                                    </option>
                                    <option value={Locations.SALOU}>Salou</option>
                                </select>
                            </div>
                        </div>
                        <div className="oneColumn">
                            <div>
                                <label>Site de la résa</label>
                                <select
                                    id="origin"
                                    name="origin"
                                    placeholder="Site web de la location"
                                    value={origin}
                                    onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                                    onBlur={this.saveData}
                                >
                                    <option value={Origins.HOMEAWAY} defaultValue="selected">
                                        HomeAway
                                    </option>
                                    <option value={Origins.AIRBNB}>AirBnB</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}
