function registerAddHandler() {
    //register callback for "add" button
    $('#addButton').on('click', addCard);

    // register same callback for enter on Add User button
    $('#secondField').keypress(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            addCard();
        }
    });

    //make sure the focus is automatically set for the first field
    $('#firstField').focus();
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

    // Actually send REST query to API.
    // ...
}

async function shake() {
    $('#card').addClass("wobble-hor-bottom");
    await sleep(800);
    $('#card').removeClass("wobble-hor-bottom");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}