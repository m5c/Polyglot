async function registerKeys() {

    // register callback for "export" button
    $('#export').on('click', exportAllCards);

    const fillState = await getData('/polyglot/api/');

    // register key listener for fullscreen mode
    $(document).keyup(function (e) {
        if (e.key === "f") {
            enterFullScreen();
        }
    });

    // register key access to "Add card menu"
    $(document).keyup(function (e) {
        if (e.key === "a") {
            window.location.href = "/polyglot/add.html";
        }
    });

    // register key-code access to levels, if non empty
    if (fillState[0] != 0) {
        $(document).keyup(function (e) {
            if (e.key === "1") {
                window.location.href = "/polyglot/niveau.html?level=1";
            }
        });
    }
    if (fillState[1] != 0) {

        $(document).keyup(function (e) {
            if (e.key === "2") {
                window.location.href = "/polyglot/niveau.html?level=2";
            }
        });
    }
    if (fillState[2] != 0) {
        $(document).keyup(function (e) {
            if (e.key === "3") {
                window.location.href = "/polyglot/niveau.html?level=3";
            }
        });
    }
    if (fillState[3] != 0) {
        $(document).keyup(function (e) {
            if (e.key === "4") {
                window.location.href = "/polyglot/niveau.html?level=4";
            }
        });
    }
    if (fillState[4] != 0) {
        $(document).keyup(function (e) {
            if (e.key === "5") {
                window.location.href = "/polyglot/niveau.html?level=5";
            }
        });
    }
}

async function showFillState() {

    const fillState = await getData('/polyglot/api/');

    $('#niveau0').text("Niveau [1]  (" + fillState[0] + ")");
    if (fillState[0] == 0) {
        $('#niveau0').addClass("disabled");
    }
    $('#niveau1').text("Niveau [2]  (" + fillState[1] + ")");
    if (fillState[1] == 0) {
        $('#niveau1').addClass("disabled");
    }
    $('#niveau2').text("Niveau [3]  (" + fillState[2] + ")");
    if (fillState[2] == 0) {
        $('#niveau2').addClass("disabled");
    }
    $('#niveau3').text("Niveau [4]  (" + fillState[3] + ")");
    if (fillState[3] == 0) {
        $('#niveau3').addClass("disabled");
    }
    $('#niveau4').text("Niveau [5]  (" + fillState[4] + ")");
    if (fillState[4] == 0) {
        $('#niveau4').addClass("disabled");
    }
}

async function getData(url) {
    const response = await fetch(url);
    return response.json()
}

async function exportAllCards()
{
    let allCardsJson = await getData('api/cards/');

    // remove the database card id entry fpr every card in array.
    for (let i = 0; i < allCardsJson.length; i++) {
        delete allCardsJson[i].id;
    }

    // actually trigger download as a text file
    download(getDateTimeString() + '.pglt', JSON.stringify(allCardsJson));
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
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        month = '0'+month;
    }
    if(day.toString().length == 1) {
        day = '0'+day;
    }
    if(hour.toString().length == 1) {
        hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        second = '0'+second;
    }
    let dateTime = year+'-'+month+'-'+day+'--'+hour+'-'+minute+'-'+second;
    return dateTime;
}