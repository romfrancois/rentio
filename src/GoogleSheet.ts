const SPREADSHEET_ID = '1dKSCcTzZjuB3twn8C604Ibf8HPj5I0g7-4peFioNbEs';
const SPREADSHEET_NAME = 'Sheet1';

export default class GoogleSheet {
    exportDataToSheet(idToBackup: number) {
        console.log('exportDataToSheet for userId: ', idToBackup);

        const formattedData = this.prepareToSaveData(idToBackup);
        // console.log('values: ', formattedData.flat());

        if (formattedData.length > 0) {
            this.getNextInsertIndex().then((nextInsertionRow) => {
                const body = {
                    values: [formattedData.flat()]
                };

                gapi.client.sheets.spreadsheets.values
                    .update({
                        spreadsheetId: SPREADSHEET_ID,
                        range: `${SPREADSHEET_NAME}!A${nextInsertionRow + 1}`,
                        valueInputOption: 'RAW',
                        resource: body
                    })
                    .then((response) => {
                        const updatedRange = response.status === 200; //result.updatedRange;
                        console.log('Data saved to Google Sheet: ', updatedRange, response);
                    });
            });
        }
    }

    private prepareToSaveData(idToBackup: number): Array<any> {
        const HEADERS = ['Info', 'Dates', 'Prix', 'Options', 'Docs'];

        const renters = JSON.parse(localStorage.getItem('renters'));
        // console.log('renters: ', renters);

        if (renters) {
            const data2Backup = renters.tabs[idToBackup];
            // console.log('data2Backup: ', data2Backup);

            if (data2Backup === undefined) {
                return;
            }

            let values = [];
            values = HEADERS.map((header) => {
                if (data2Backup[header]) {
                    return Object.values(data2Backup[header]).map((value) => value);
                } else {
                    return ['', ''];
                }
            });

            return values;
        }

        return [];
    }

    private getNextInsertIndex(): Promise<number> {
        const SHEET_STARTING_POINT = 'A1'; // 1st col that defines fixed cols' names
        const SHEET_ENDING_POINT = 'D';

        return gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SPREADSHEET_NAME}!${SHEET_STARTING_POINT}:${SHEET_ENDING_POINT}`
            })
            .then((response) => {
                const result = response.result;
                const numRows = result.values ? result.values.length : 0;
                // console.log(`${numRows} rows retrieved.`);

                return numRows;
            });
    }
}
