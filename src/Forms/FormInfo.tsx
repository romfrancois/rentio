import React from 'react';

import Form from './Form';
import { TextStyle, camelCase } from '../Helpers/text';

export const currentFormName = 'Info';

export type InfoTabProps = {
    currentUserId;
    saveFormsData;
    loadSavedData;
};

export enum CountryCode {
    'NONE' = -1,
    'ALLEMAGNE' = 49,
    'BELGIQUE' = 32,
    'ESPAGNE' = 34,
    'FRANCE' = 33,
    'PAYS-BAS' = 31,
    'SUISSE' = 41,
    'UK' = 44
}

export type PhoneNumber = {
    prefix: CountryCode;
    separator: '-';
    telephone: number;
};

export type InfoTabState = {
    prenom: string;
    nom: string;
    adresse: string;
    codePostal: string;
    ville: string;
    pays: string;
    email: string;
    telephone: string; //PhoneNumber,
    nbPersonnes: number;
    ageEnfants: string;
};

const initState: InfoTabState = {
    prenom: '',
    nom: '',
    adresse: '',
    codePostal: '',
    ville: '',
    pays: '',
    email: '',
    telephone: '',
    nbPersonnes: 0,
    ageEnfants: ''
};

export default class FormInfo extends Form<InfoTabProps, InfoTabState> {
    constructor(props: InfoTabProps) {
        super(props, currentFormName, initState);
    }

    handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target as HTMLInputElement;

        const countryPhone = CountryCode[value];
        // console.log('CountryCode: ', countryPhone);

        const divTextToReveal = document.querySelector('div[id=telephone]');
        const inputTextToReveal = document.querySelector('input[id=telephone]');

        if (countryPhone !== -1) {
            divTextToReveal.setAttribute('data-countrycode', `00${countryPhone}-`);
            inputTextToReveal.classList.add('telephone-padding');
        } else {
            divTextToReveal.removeAttribute('data-countrycode');
            inputTextToReveal.classList.remove('telephone-padding');
        }

        this.setState({
            [name]: value.slice(0, 128)
        });
    };

    render() {
        // const {
        //     state: {
        //         prenom,
        //         nom,
        //         adresse,
        //         codePostal,
        //         ville,
        //         pays,
        //         email,
        //         telephone,
        //         nbPersonnes,
        //         ageEnfants
        //     }
        // } = this;

        const {
            prenom,
            nom,
            adresse,
            codePostal,
            ville,
            pays,
            email,
            telephone,
            nbPersonnes,
            ageEnfants
        } = this.state as InfoTabState;

        return (
            <form>
                <fieldset>
                    <legend>Info</legend>
                    <div className="items">
                        <div className="twoColumn">
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                placeholder="Prénom"
                                className="input-very-short"
                                value={camelCase(prenom)}
                                onChange={this.handleChange.bind(this, TextStyle.CAMELCASE)}
                                onBlur={this.saveData}
                            />
                        </div>
                        <div className="twoColumn">
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                placeholder="Nom"
                                className="input-very-short"
                                value={nom.toUpperCase()}
                                onChange={this.handleChange.bind(this, TextStyle.UPPERCASE)}
                                onBlur={this.saveData}
                            />
                        </div>
                        <div className="twoColumn">
                            <div>
                                <label>Nb Personnes</label>
                                <select
                                    id="nbPersonnes"
                                    name="nbPersonnes"
                                    placeholder="Nombre de personnes"
                                    value={nbPersonnes}
                                    onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                                    onBlur={this.saveData}
                                >
                                    <option value="0" defaultValue="selected">
                                        0
                                    </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="twoColumn">
                            <div>
                                <input
                                    type="text"
                                    id="ageEnfants"
                                    name="ageEnfants"
                                    placeholder="Age des enfants"
                                    className="input-very-short"
                                    value={ageEnfants}
                                    onChange={this.handleChange.bind(this, TextStyle.NO_STYLE)}
                                    onBlur={this.saveData}
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Adresse</legend>
                    <div className="items">
                        <div className="oneColumn">
                            <input
                                type="text"
                                id="address"
                                name="adresse"
                                placeholder="Adresse"
                                className="input-address-one input-long"
                                value={camelCase(adresse)}
                                onChange={this.handleChange.bind(this, TextStyle.CAMELCASE)}
                                onBlur={this.saveData}
                            />
                        </div>
                        <div className="threeColumn">
                            <input
                                type="text"
                                id="codePostal"
                                name="codePostal"
                                placeholder="Code Postal"
                                className="input-very-very-short"
                                value={codePostal.toUpperCase()}
                                onChange={this.handleChange.bind(this, TextStyle.UPPERCASE)}
                                onBlur={this.saveData}
                            />
                        </div>
                        <div className="threeColumn">
                            <input
                                type="text"
                                id="city"
                                name="ville"
                                placeholder="Ville"
                                value={ville}
                                onChange={this.handleChange.bind(this, TextStyle.UPPERCASE)}
                                onBlur={this.saveData}
                            />
                        </div>
                        <div className="threeColumn">
                            <select
                                id="country"
                                name="pays"
                                placeholder="Pays"
                                value={pays}
                                onChange={this.handleCountryChange.bind(this)}
                                onBlur={this.saveData}
                            >
                                <option value="NONE">Choisir un pays</option>
                                <option value="ALLEMAGNE">Allemagne</option>
                                <option value="BELGIQUE">Belgique</option>
                                <option value="ESPAGNE">Espagne</option>
                                <option value="FRANCE">France</option>
                                <option value="PAYS-BAS">Pays Bas</option>
                                <option value="SUISSE">Suisse</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Contacts</legend>
                    <div className="items">
                        <div className="oneColumn">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="input-short"
                                value={email}
                                onChange={this.handleChange.bind(this, TextStyle.LOWERCASE)}
                                onBlur={this.saveData}
                            />
                        </div>
                        <div
                            className="oneColumn telephone"
                            id="telephone"
                            data-countrycode={
                                telephone.length > 0
                                    ? telephone.slice(0, telephone.indexOf('-') + 1)
                                    : ''
                            }
                        >
                            <input
                                type="text"
                                id="telephone"
                                name="telephone"
                                placeholder="Téléphone"
                                className={
                                    telephone.length > 0 ? 'telephone-padding' : 'input-short'
                                }
                                value={
                                    telephone.length > 0
                                        ? 0 + telephone.slice(telephone.indexOf('-') + 1)
                                        : ''
                                }
                                onChange={this.handlePhoneNumberChange.bind(this)}
                                onBlur={this.saveData}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}
