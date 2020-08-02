// Sets the title, according to the selected vocabulary box
function setTitle() {
    let niveau = getUrlParameter('level');
    $('#title').text("Niveau "+niveau);
}

// register listener for enter pressed (solution input field)
function registerHandlers() {
    // register same callback for enter on Add User button
    $('#firstField').keypress(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            validateUserResponse();
        }
    });

    //register callback for "add" button
    $('#verifyButton').on('click', validateUserResponse);
}

// triggered when enter is pressed.
function validateUserResponse() {

    // Add some cool card flip animation here? Or some shaking, if wrong.
    //shake();
    replace();
    console.log('button clicked');
}

// Retrieve URL parameter
// https://stackoverflow.com/questions/19491336/how-to-get-url-parameter-using-jquery-or-plain-javascript
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

async function loadCard() {

    // load a random card
    let level = getUrlParameter('level')-1;
    let card = await getData('/polyglot/api/cards/random?level='+level);
    console.log(card);

    // display the german part, focus on the french part, disable editing of the german part
    $('#secondField').val(card['german']);
    $('#firstField').focus();
    $('#secondField').prop('disabled', true);

}

async function shake() {
    $('#card').addClass("shake-horizontal");
    $('#card').addClass("wrong-halo");

    await sleep(400);
    $('#card').removeClass("wrong-halo");

    await sleep(400);
    $('#card').removeClass("shake-horizontal");
}

async function replace() {
    $('#card').addClass("flip-in-hor-bottom");
    await sleep(800);
    $('#card').removeClass("flip-in-hor-bottom");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getData(url) {
    const response = await fetch(url);
    return response.json()
}