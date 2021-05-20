/**
 * registers the keys for the main menu options, with exception to the 1-5 keys for the individual boxes, for they depend on the actual fillstate.
 * @returns {Promise<void>}
 */
function resetKeysAndUi() {

    //clean slate - remove all keyevents / clickevents
    $(document).unbind(); // <-- literally the only reliable way to get rid of a keyhandler.

    // register callback for "export" button
    $('#export').on('click', exportAllCards);

    // simulate import click on "i"-key
    $(document).keyup(function (e) {
        if (e.key === "i") {
            console.log("i pressed");
            $('#import-file').click();
        }
    });

    // register callback for "import" button
    document.getElementById('import-form').addEventListener('change', handleFileSelect, false);


    // register key listener for export as json
    $(document).keyup(function (e) {
        if (e.key === "e") {
            exportAllCards();
        }
    });

    // register key listener for "database reset" (d key). - developer option.
    $(document).keyup(function (e) {
        if (e.key === "d") {
            resetDatabase();
        }
    });

    // register key access to "Add card menu"
    $(document).keyup(function (e) {
        if (e.key === "a") {
            window.location.href = "/polyglot/add.html";
        }
    });

    showFillState();
}

/**
 * query fills tate per box from api, update enabled/disabled UI visualization, enable/disable click and key based access.
 * @returns {Promise<void>}
 */
 function showFillState() {

    fetch('/polyglot/api/')
        .then(result => result.json())
        .then(json => {
            if (json.error) // assumes that the server is nice enough to send an error message
                throw Error(json.error);
            else {

                // Update fillstate text in UI for all boxes.
                let fillState = json;

                $('#niveau0').text("Niveau [1]  (" + fillState[0] + ")");
                if (fillState[0] == 0) {
                    $('#niveau0').addClass("disabled");
                } else {
                    // enable that box
                    $('#niveau0').removeClass("disabled");
                    $(document).keyup(function (e) {
                        if (e.key === "1") {
                            window.location.href = "/polyglot/niveau.html?level=1";
                        }
                    });
                }
                $('#niveau1').text("Niveau [2]  (" + fillState[1] + ")");
                if (fillState[1] == 0) {
                    $('#niveau1').addClass("disabled");
                } else {
                    $('#niveau1').removeClass("disabled");
                    $(document).keyup(function (e) {
                        if (e.key === "2") {
                            window.location.href = "/polyglot/niveau.html?level=2";
                        }
                    });
                }
                $('#niveau2').text("Niveau [3]  (" + fillState[2] + ")");
                if (fillState[2] == 0) {
                    $('#niveau2').addClass("disabled");
                } else {
                    $('#niveau2').removeClass("disabled");
                    $(document).keyup(function (e) {
                        if (e.key === "3") {
                            window.location.href = "/polyglot/niveau.html?level=3";
                        }
                    });
                }
                $('#niveau3').text("Niveau [4]  (" + fillState[3] + ")");
                if (fillState[3] == 0) {
                    $('#niveau3').addClass("disabled");
                } else {
                    $('#niveau3').removeClass("disabled");
                    $(document).keyup(function (e) {
                        if (e.key === "4") {
                            window.location.href = "/polyglot/niveau.html?level=4";
                        }
                    });
                }
                $('#niveau4').text("Niveau [5]  (" + fillState[4] + ")");
                if (fillState[4] == 0) {
                    $('#niveau4').addClass("disabled");
                } else {
                    $('#niveau4').removeClass("disabled");
                    $(document).keyup(function (e) {
                        if (e.key === "5") {
                            window.location.href = "/polyglot/niveau.html?level=5";
                        }
                    });
                }

            }
        })
        .catch(error => {
            // error handling here
            console.log(error);
        });
}

/**
 * reads out content of selected file (import context menu.)
 * @param event
 */
function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
}

/**
 * extract content of uploaded file, send to backend.
 * @param event
 */
async function handleFileLoad(event) {
    const content = event.target.result;
    const contentAsJsonArray = JSON.parse(content);
    await postCards(contentAsJsonArray);

    // finally update the fill-state of the boxes (has changed due to import)
    await sleep(300);
    await resetKeysAndUi();

}

function exportAllCards() {
    fetch('api/cards/')
        .then(result => result.json())
        .then(json => {
            if (json.error) // assumes that the server is nice enough to send an error message with a field "error", in case something goes wrong
                throw Error(json.error);
            else {

                // remove the database card id entry fpr every card in array.
                for (let i = 0; i < json.length; i++) {
                    delete json[i].id;
                    delete json[i].box;
                }

                // actually trigger download as a text file
                download(getDateTimeString() + '.pglt', JSON.stringify(json));
            }
        })
        .catch(error => {
            // error handling here
            console.log(error);
        });
}

/**
 * Function to generate downloadable text file from input text variable. Used for export
 * https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
 * @param filename
 * @param text
 */
function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

/**
 * Generates a string variable with date and time, separated by dashes.
 * https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
 * @returns {string}
 */
function getDateTimeString() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    let dateTime = year + '-' + month + '-' + day + '--' + hour + '-' + minute + '-' + second;
    return dateTime;
}

// hidden developer option. D key resets the DB.
function resetDatabase() {
    const init = {
        method: 'DELETE'
    };

    fetch('api/cards', init)
        .then((response) => {
            return response.json(); // or .text() or .blob() ...
        })
        .then((text) => {
            // text is the response body
        })
        .catch((e) => {
            // error in e.message
        });

    setTimeout(function () {
        resetKeysAndUi();
        showFillState();
    }, 300);

}