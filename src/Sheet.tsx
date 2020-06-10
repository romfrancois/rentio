import React from 'react';
import { GoogleStatus } from './Helpers/Connexion';

const gapi = (window as any).gapi;

// Google Spreadsheet params
const SPREADSHEET_ID = '1dKSCcTzZjuB3twn8C604Ibf8HPj5I0g7-4peFioNbEs';
const SPREADSHEET_NAME = 'Sheet1';

const CALENDAR_ID = 'qkcfi6u5hl4a4cfue1pmblh2k8@group.calendar.google.com';

const DOCUMENT_FILE_ID = '1Ee3QewneacnCAEetD0H2m500TSQmQyZLADxL73fu74c';

const SHEET_STARTING_POINT = 'A1'; // 1st col that defines fixed cols' names
const SHEET_ENDING_POINT = 'D'; // Last col to consider in the spreadsheet

let nextInsertionRow = 2;

// const GOOGLE_STATUSES = {
//     CONNECTED: 'connected',
//     DISCONNECTED: 'disconnected'
// };

const HEADERS = ['Info', 'Dates', 'Prix', 'Options', 'Docs'];

class Sheet extends React.Component<any, any> {
    componentDidUpdate(oldProps: { gStatus: any; currentUserId: number }) {
        console.log('this.props: ', this.props);
        console.log(
            '(this.props as any).gStatus === GOOGLE_STATUSES.CONNECTED): ',
            (this.props as any).gStatus === GoogleStatus.CONNECTED
        );

        if (
            (this.props as any).gStatus !== oldProps.gStatus &&
            (this.props as any).gStatus === GoogleStatus.CONNECTED
            //      ||
            // (this.props as any).currentUserId !== oldProps.currentUserId
        ) {
            this.listMajors();
            // this.listUpcomingEvents();
            // this.populateEvent();
            // this.printDocTitle();
            // this.listFiles();
            // this.getDocFile();
        }

        if ((this.props as any).currentUserId !== oldProps.currentUserId) {
            console.log('this.props.currentUserId: ', (this.props as any).currentUserId);
            console.log('newProps.currentUserId: ', oldProps.currentUserId);

            this.populateData(oldProps.currentUserId);
        }
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre(message: string) {
        const pre = document.getElementById('content');
        const textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    populateEvent() {
        const event = {
            summary: 'Location Berger',
            location: 'Bellegarde, 30127 Bellegarde, France',
            description: 'Email: catalytec@gmail.com \nTél: 330628478043',
            start: {
                dateTime: '2019-09-28T09:00:00-01:00'
            },
            end: {
                dateTime: '2019-10-03T17:00:00-01:00'
            },
            attendees: [{ email: 'romain.francois@gmail.com' }]
        };

        const request = gapi.client.calendar.events.insert({
            calendarId: CALENDAR_ID,
            resource: event
        });

        request.execute((event: any) => {
            this.appendPre('Event created: ' + event.htmlLink);
        });
    }

    listUpcomingEvents() {
        console.log('listUpcomingEvents');

        gapi.client.calendar.events
            .list({
                calendarId: CALENDAR_ID,
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: 'startTime'
            })
            .then((response: any) => {
                const events = response.result.items;
                this.appendPre('Upcoming events:');

                if (events.length > 0) {
                    for (let i = 0; i < events.length; i++) {
                        const event = events[i];

                        let startTime = event.start.dateTime;
                        let endTime = event.end.dateTime;
                        const location = event.location;
                        const details = event.description;
                        const renterName = event.summary;
                        if (!startTime) {
                            startTime = event.start.date;
                        }
                        if (!endTime) {
                            endTime = event.end.date;
                        }

                        // this.appendPre(event.summary + ' (' + startTime + ')');
                        this.appendPre(
                            renterName +
                                ': \n\t\t - location: ' +
                                location +
                                '\n\t\t - début: ' +
                                startTime +
                                '\n\t\t - fin: ' +
                                endTime +
                                '\n\t\t - détails: ' +
                                details
                        );
                        console.log('event: ', event);
                    }
                } else {
                    this.appendPre('No upcoming events found.');
                }
            });
    }

    listMajors() {
        console.log('listMajors');

        gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SPREADSHEET_NAME}!${SHEET_STARTING_POINT}:${SHEET_ENDING_POINT}`
            })
            .then(
                (response: any) => {
                    console.log('response: ', response);
                    const range = response.result;
                    if (range.values.length > 0) {
                        nextInsertionRow = range.values.length + 1;
                        console.log('nextRow: ', nextInsertionRow);

                        const pre = document.getElementById('content');
                        pre.innerHTML = '';
                        const tableContent = document.createElement('table');

                        for (let i = 0; i < range.values.length; i++) {
                            const row = document.createElement('tr');

                            const dataRow = range.values[i];

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
                        this.appendPre('No data found.');
                    }
                },
                (response: any) => {
                    this.appendPre('Error: ' + response.result.error.message);
                }
            );
    }

    populateData(idToBackup: number) {
        console.log('populateData: ', nextInsertionRow);

        // should deactivate "Save data" while synching to GSheet

        const renters = JSON.parse(localStorage.getItem('renters'));
        if (renters) {
            const data2Backup = renters.tabs[idToBackup];

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

            // values.push(['', 'fr']);

            console.log('values: ', values.flat());

            const body = {
                values: [values.flat()]
            };

            gapi.client.sheets.spreadsheets.values
                .update({
                    spreadsheetId: SPREADSHEET_ID,
                    range: `${SPREADSHEET_NAME}!A${nextInsertionRow}`,
                    valueInputOption: 'RAW',
                    resource: body
                })
                .then((response: any) => {
                    const updatedRange = response.status === 200; //result.updatedRange;
                    console.log('response: ', updatedRange, response);

                    // should reeactivate "Save data" after synching to GSheet

                    nextInsertionRow += 1;
                    console.log('nextRow: ', nextInsertionRow);
                    // parseInt(
                    //     updatedRange.substring(
                    //         updatedRange.indexOf('!') + 2,
                    //         updatedRange.indexOf(':')
                    //     )
                    // ) + 1;
                });
            // .then(() => this.listMajors());
        }
    }

    printDocTitle() {
        gapi.client.docs.documents
            .get({
                documentId: DOCUMENT_FILE_ID
            })
            .then(
                (response: any) => {
                    const doc = response.result;
                    const title = doc.title;
                    this.appendPre('Document "' + title + '" successfully found.\n');

                    console.log('Document: ', doc);
                    (window as any).doc = doc;
                },
                (response: any) => {
                    this.appendPre('Error: ' + response.result.error.message);
                }
            );
    }

    listFiles() {
        gapi.client.drive.files
            .list({
                pageSize: 100,
                fields: 'nextPageToken, files(id, name)'
            })
            .then((response: any) => {
                this.appendPre('Files:');
                const files = response.result.files;
                if (files && files.length > 0) {
                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        this.appendPre(file.name + ' (' + file.id + ')');
                    }
                } else {
                    this.appendPre('No files found.');
                }
            });
    }

    getDocFile() {
        const file = gapi.client.drive.files.get({
            fileId: DOCUMENT_FILE_ID
        });
        file.execute(function (resp: any) {
            console.log('resp-1: ', resp);
        });

        file.then(
            (response: any) => {
                console.log('response file: ', response); //response.body contains the string value of the file
                // if (typeof callback === "function") callback(response.body);
            },
            (error: any) => {
                console.error('Getting file error: ', error);
            }
        );

        // gapi.client.drive.files
        //     .export({
        //         fileId: DOCUMENT_FILE_ID,
        //         mimeType: 'application/pdf'
        //     })
        //     .then(
        //         response => {
        //             console.log('resp-3: ', response);
        //         },
        //         fail => {
        //             console.log(fail);
        //             console.log('Error ' + fail.result.error.message);
        //         }
        //     );
        // file.execute(function(resp) {
        //     console.log('resp-2: ', resp);
        // });

        // gapi.client.drive.files
        //     .get({
        //         fileId: DOCUMENT_FILE_ID
        //     })
        //     .then(response => {
        //         this.appendPre('Files:');
        //         var files = response.result.files;
        //         if (files && files.length > 0) {
        //             for (var i = 0; i < files.length; i++) {
        //                 var file = files[i];
        //                 this.appendPre(file.name + ' (' + file.id + ')');
        //             }
        //         } else {
        //             this.appendPre('No files found.');
        //         }
        //     });
    }

    render() {
        return <pre id="content" />;
    }
}

export default Sheet;
