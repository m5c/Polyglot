function registerAddHandler() {
    //register callback for "add" button
    $('#addButton').on('click', addCard);

    // register same callback for enter entry fields
    $('#firstField').keypress(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            addCard();
        }
    });
    $('#secondField').keypress(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            // if empty, just reject
            if ($.trim($('#secondField').val()) == '') {
                animateShake();
            }
            // if not empty, set focus on other field
            else
            {
                $('#firstField').focus();
            }
        }
    });

    // get back to menu with escape
    $(document).keyup(function(e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            window.location.href = "/polyglot/";
        }
    });

    //make sure the focus is automatically set for the first field
    $('#secondField').focus();
}

async function addCard() {

    if ($.trim($('#firstField').val()) == '') {
        shake();
        return;
    }
    if ($.trim($('#secondField').val()) == '') {
        shake();
        return;
    }

    // Actually build a json for the new card and send REST query to API.
    let card = {"french":$('#firstField').val(),"german":$('#secondField').val()};
    let wrapperArray = wrapAsArray(card);
    postCards(wrapperArray).then(() => {
        console.log(card);

        //provide visual feedback for success
        animatePuff();

        //clear the fields
        $('#firstField').val('');
        $('#secondField').val('');

        //focus first field again
        $('#secondField').focus();
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * takes a single card and wraps it up in an array, also converst it to the json string representation. So the result is a one-element array, as json-string.
 * @param card
 */
function wrapAsArray(card)
{
    let resultArray = [];
    JSON.stringify(resultArray.push(card));
    return resultArray;
}

/**
 * Sends an array of cards to the rest backend. Input is an array object, not the string representation of the array.
 * @param card
 * @returns {Promise<void>}
 */
function postCards(cardArray)
{
    const headers = new Headers();
    let body = JSON.stringify(cardArray);
    console.log(body);
    headers.append('Content-Type', 'application/json');

    const init = {
        method: 'POST',
        headers,
        body
    };

    return fetch('/polyglot/api/cards', init)
        .then((response) => {
            return response.json();
        })
        .then((text) => {
            // text is the response body
        })
        .catch((e) => {
            // error in e.message
        });
}