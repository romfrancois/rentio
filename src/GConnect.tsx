import React from 'react';

import Gcredentials from '../res/credentials.json';
import { GoogleStatus } from './Helpers/Connexion';

class GConnect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.updateSigninStatus = this.updateSigninStatus.bind(this);
        this.initClient = this.initClient.bind(this);
    }

    componentDidMount() {
        this.handleClientLoad();
    }

    handleClientLoad() {
        if (gapi) {
            gapi.load('client:auth2', this.initClient);
        }
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient() {
        gapi.client
            .init({
                apiKey: Gcredentials.API_KEY,
                clientId: Gcredentials.CLIENT_ID,
                discoveryDocs: Gcredentials.DISCOVERY_DOCS,
                scope: Gcredentials.SCOPES
            })
            .then(
                () => {
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

                    // Handle the initial sign-in state.
                    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                },
                (error) => {
                    this.displayErrorMessage(JSON.stringify(error, null, 2));
                }
            );
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus(isSignedIn: boolean) {
        const authorizeButton = document.getElementById('authorize_button');
        const signoutButton = document.getElementById('signout_button');

        if (isSignedIn) {
            console.log("GConnect::updateSigninStatus:You're now connected!");

            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';

            (this.props as any).updateGStatus(GoogleStatus.CONNECTED);
        } else {
            console.log("GConnect::updateSigninStatus:You're now logged out!");

            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';

            (this.props as any).updateGStatus(GoogleStatus.DISCONNECTED);
        }
    }

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick() {
        gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick() {
        gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    displayErrorMessage(message: string) {
        const pre = document.getElementById('errorContent');
        const textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    render() {
        return (
            <div id="gConnect">
                {/* Buttons to initiate auth sequence and sign out */}
                <button
                    id="authorize_button"
                    style={{ display: 'none' }}
                    onClick={() => this.handleAuthClick()}
                >
                    Authorize
                </button>
                <button
                    id="signout_button"
                    style={{ display: 'none' }}
                    onClick={() => this.handleSignoutClick()}
                >
                    Sign Out
                </button>

                <pre id="errorContent" />
            </div>
        );
    }
}

export default GConnect;
