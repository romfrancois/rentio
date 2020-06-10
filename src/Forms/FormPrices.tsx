import React from 'react';

import Form from './Form';
import { TextStyle } from '../Helpers/text';

const currentFormName = 'Prix';

export type PriceTabProps = {
    currentUserId;
    saveFormsData;
    loadSavedData;
};

export type PriceTabState = {
    prixLocation: number;
    arrhes: number;
    garantie: number;
};

const initState: PriceTabState = {
    prixLocation: 0,
    arrhes: 0,
    garantie: 0
};

export default class FormPrices extends Form<PriceTabProps, PriceTabState> {
    constructor(props: PriceTabProps) {
        super(props, currentFormName, initState);
    }

    render() {
        // console.log('state: ', this);

        // const {
        //     state: { dateHeureDebut, dateHeureFin }
        // } = this.state;

        const { prixLocation, arrhes, garantie } = this.state as PriceTabState;

        return (
            <form>
                <fieldset className="fieldset-no-border">
                    <label>Prix de la location</label>
                    <input
                        type="number"
                        id="prixLocation"
                        name="prixLocation"
                        min="0"
                        max="10000"
                        placeholder="Prix de la location"
                        className="input-address-two input-very-very-short"
                        value={prixLocation}
                        onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                        onBlur={this.saveData}
                    />
                </fieldset>

                <fieldset className="fieldset-no-border">
                    <label>Arrhes</label>
                    <input
                        type="number"
                        id="arrhes"
                        name="arrhes"
                        min="0"
                        max="10000"
                        placeholder="Arrhes"
                        className="input-address-two input-very-very-short"
                        value={arrhes}
                        onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                        onBlur={this.saveData}
                    />
                </fieldset>

                <fieldset className="fieldset-no-border">
                    <label>Garantie</label>
                    <input
                        type="number"
                        id="garantie"
                        name="garantie"
                        min="0"
                        max="10000"
                        placeholder="Garantie"
                        className="input-address-two input-very-very-short"
                        value={garantie}
                        onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                        onBlur={this.saveData}
                    />
                </fieldset>
            </form>
        );
    }
}
