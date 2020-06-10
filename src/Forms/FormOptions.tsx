import React from 'react';

import Form from './Form';
import { TextStyle } from '../Helpers/text';

const currentFormName = 'Options';

export enum Options {
    MENAGE = 'menage',
    DRAPS_LINGES_BAIN = 'drapsLingesBain'
}

export type OptionsTabProps = {
    currentUserId;
    saveFormsData;
    loadSavedData;
};

export type OptionsTabState = {
    menagePrix: number;
    drapsLingesBainPrix: number;
};

const initState: OptionsTabState = {
    menagePrix: 0,
    drapsLingesBainPrix: 0
};

export default class FormOptions extends Form<OptionsTabProps, OptionsTabState> {
    constructor(props: OptionsTabProps) {
        super(props, currentFormName, initState);
    }

    handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('event: ', event);
        // console.log('event: ', event.target);
        // console.log('event: ', event.target.name);
        // console.log('event: ', event.target.checked);

        let inputTextToReveal = document.querySelector(`input[id=${Options.MENAGE}]`);
        if (event.target.name === Options.DRAPS_LINGES_BAIN) {
            inputTextToReveal = document.querySelector(`input[id=${Options.DRAPS_LINGES_BAIN}]`);
        }

        if (event.target.checked) {
            inputTextToReveal.classList.remove('hide');
        } else {
            inputTextToReveal.classList.add('hide');
        }
    };

    render() {
        const { menagePrix, drapsLingesBainPrix } = this.state as OptionsTabState;

        return (
            <form>
                <fieldset>
                    <div className="items">
                        <div className="twoColumn input-checkbox">
                            <input
                                type="checkbox"
                                name={Options.MENAGE}
                                onChange={this.handleCheckbox.bind(this)}
                            />
                            <label className="menage">Ménage?</label>
                        </div>
                        <div className="twoColumn">
                            <input
                                type="number"
                                id="menage"
                                name="menagePrix"
                                placeholder="Montant du ménage"
                                value={menagePrix}
                                className="hide"
                                onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                                onBlur={this.saveData}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="items">
                        <div className="twoColumn input-checkbox">
                            <input
                                type="checkbox"
                                name={Options.DRAPS_LINGES_BAIN}
                                onChange={this.handleCheckbox}
                            />
                            <label className="menage">Draps & Linges de bain ?</label>
                        </div>
                        <div className="twoColumn">
                            <input
                                type="number"
                                id="drapsLingesBain"
                                name="drapsLingesBainPrix"
                                placeholder="Montant pour les draps & linges de bain"
                                value={drapsLingesBainPrix}
                                className="hide"
                                onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                                onBlur={this.saveData}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}
