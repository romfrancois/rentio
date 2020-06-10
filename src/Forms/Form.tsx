import React from 'react';

import { TextStyle, camelCase } from '../Helpers/text';

import { InfoTabState, InfoTabProps } from '../Forms/FormInfo';
import { DatesTabState, DatesTabProps } from '../Forms/FormDates';
import { PriceTabState, PriceTabProps } from '../Forms/FormPrices';
import { OptionsTabState, OptionsTabProps } from '../Forms/FormOptions';
import { DocsTabState, DocsTabProps } from '../Forms/FormDocs';

type FormProps = InfoTabProps | DatesTabProps | PriceTabProps | OptionsTabProps | DocsTabProps;
type FormState = InfoTabState | DatesTabState | PriceTabState | OptionsTabState | DocsTabState;

type FormData = {
    label: string;
    payload: FormState;
};

export default class Form<P, S> extends React.Component<FormProps, FormState> {
    state: any;
    private initState: FormState;

    private currentFormName: string;

    constructor(props: FormProps, currentFormName: string, initState: FormState) {
        super(props);

        this.state = initState;

        this.initState = initState;
        this.currentFormName = currentFormName;

        this.saveData = this.saveData.bind(this);
    }

    componentDidUpdate(prevProps: FormProps) {
        console.log('this.initState: ', this.initState);
        if (prevProps.currentUserId !== this.props.currentUserId) {
            this.setState(this.initState);
        }
    }

    saveData() {
        const data: FormData = {
            label: this.currentFormName,
            payload: this.state
        };

        this.props.saveFormsData(data);
    }

    handleChange = (styleToApply: TextStyle, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target as HTMLInputElement;

        let newValue = value;
        if (styleToApply === TextStyle.CAMELCASE) {
            newValue = camelCase(value);
        } else if (styleToApply === TextStyle.UPPERCASE) {
            newValue = value.toUpperCase();
        } else if (styleToApply === TextStyle.LOWERCASE) {
            newValue = value.toLowerCase();
        }

        this.setState({
            [name]: newValue.slice(0, 128)
        });
    };

    handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target as HTMLInputElement;

        const inputTextToReveal = document.querySelector('div[id=telephone]');
        const countrycode = inputTextToReveal.getAttribute('data-countrycode');

        const newValue = countrycode + value.slice(1);

        this.setState({
            [name]: newValue.slice(0, 128)
        });
    };

    componentDidMount() {
        const savedData = this.props.loadSavedData();

        if (savedData && savedData[this.currentFormName]) {
            for (const [key, value] of Object.entries(savedData[this.currentFormName])) {
                this.setState((_) => {
                    return { [key]: value };
                });
            }
        }
    }
}
