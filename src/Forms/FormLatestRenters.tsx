import React from 'react';

const SPREADSHEET_ID = '1dKSCcTzZjuB3twn8C604Ibf8HPj5I0g7-4peFioNbEs';
const SPREADSHEET_NAME = 'Sheet1';

const SHEET_STARTING_POINT = 'A1'; // 1st col that defines fixed cols' names
const SHEET_ENDING_POINT = 'D'; // Last col to consider in the spreadsheet

export default class FormLatestRenters extends React.Component {
    componentDidMount() {
        gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SPREADSHEET_NAME}!${SHEET_STARTING_POINT}:${SHEET_ENDING_POINT}`
            })
            .then(
                (response) => this.listLatestRenters(response.result),
                (response) => {
                    this.displayError('Error: ' + response.result.error.message);
                }
            );
    }

    displayError(message: string) {
        const pre = document.getElementById('errors');
        const textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    render() {
        return (
            <div>
                <label>Derniers locataires enregistrés</label>
                <pre id="errors" />
                <pre id="renters" />
            </div>
        );
    }

    listLatestRenters(renters) {
        console.log('listLatestRenters');

        if (renters.values.length > 0) {
            const pre = document.getElementById('renters');
            pre.innerHTML = '';
            const tableContent = document.createElement('table');

            for (let i = 0; i < renters.values.length; i++) {
                const row = document.createElement('tr');

                const dataRow = renters.values[i];

                for (let j = 0; j < dataRow.length; j++) {
                    const cell = document.createElement('td');
                    const cellText = document.createTextNode(dataRow[j]);

                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                tableContent.appendChild(row);
            }
            pre.appendChild(tableContent);
        } else {
            this.displayError('No data found.');
        }
    }
}
