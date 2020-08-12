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
            addCard();
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

function addCard() {

    if ($.trim($('#firstField').val()) == '') {
        shake();
        return;
    }
    if ($.trim($('#secondField').val()) == '') {
        shake();
        return;
    }

    // Actually buikd a json for the new card and send REST query to API.
    let card = {"french":$('#firstField').val(),"german":$('#secondField').val()};
    postCard(card);
    console.log(card);

    //provide visual feedback for success
    puff();

    //clear the fields
    $('#firstField').val('');
    $('#secondField').val('');

    //focus first field again
    $('#secondField').focus();
}

async function shake() {
    $('#card').addClass("shake-horizontal");
    await sleep(800);
    $('#card').removeClass("shake-horizontal");
}

async function puff() {
    $('#card').addClass("puff-in-center");
    await sleep(300);
    $('#card').removeClass("puff-in-center");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function postCard(card)
{
    const headers = new Headers();
    let body = [];
    body.push(card);
    body = JSON.stringify(body);
    console.log(body);
    headers.append('Content-Type', 'application/json');

    const init = {
        method: 'POST',
        headers,
        body
    };

    fetch('/polyglot/api/cards', init)
        .then((response) => {
            return response.json(); // or .text() or .blob() ...
        })
        .then((text) => {
            // text is the response body
        })
        .catch((e) => {
            // error in e.message
        });
}