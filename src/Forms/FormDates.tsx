import React from 'react';

import Form from './Form';
import { TextStyle } from '../Helpers/text';

const currentFormName = 'Dates';

export type DatesTabProps = {
    currentUserId;
    saveFormsData;
    loadSavedData;
};

export type DatesTabState = {
    dateHeureDebut: string;
    dateHeureFin: string;
};

const initState: DatesTabState = {
    dateHeureDebut: '',
    dateHeureFin: ''
};

export default class FormDates extends Form<DatesTabProps, DatesTabState> {
    constructor(props: DatesTabProps) {
        super(props, currentFormName, initState);
    }

    render() {
        const { dateHeureDebut, dateHeureFin } = this.state as DatesTabState;

        return (
            <form>
                <fieldset>
                    <label>Date & heure du début de la location</label>
                    <input
                        type="datetime-local"
                        id="dateHeureDebut"
                        name="dateHeureDebut"
                        className="input-medium"
                        value={dateHeureDebut}
                        min="2019-01-01T12:00"
                        max="2029-01-01T12:00"
                        onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                        onBlur={this.saveData}
                    />
                </fieldset>

                <fieldset className="dateHeureFin">
                    <label className="">Date & heure de fin de la location</label>
                    <input
                        type="datetime-local"
                        id="dateHeureFin"
                        name="dateHeureFin"
                        className="input-medium"
                        value={dateHeureFin}
                        min="2019-01-01T12:00"
                        max="2029-01-01T12:00"
                        onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                        onBlur={this.saveData}
                    />
                </fieldset>
            </form>
        );
    }
}
