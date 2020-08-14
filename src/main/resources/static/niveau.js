let currentcard;

// Sets the title, according to the selected vocabulary box
function setTitle() {
    let niveau = getUrlParameter('level');
    $('#title').text("Niveau " + niveau);
}

// register listener for enter pressed (solution input field)
function registerUserEntryHandlers() {

    // register same callback for enter on textfield
    $('#firstField').keypress(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            validateUserResponse();
        }
    });

    //register callback for "add" button
    $('#primaryButton').on('click', validateUserResponse);

    // get back to menu with escape
    $(document).keyup(function (e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            window.location.href = "/polyglot/";
        }
    });
}

// triggered when enter is pressed.
async function validateUserResponse() {

    console.log('VALIADATION');

    // If answer was correct, animate transition to next card
    if (currentcard['french'] === $('#firstField').val()) {

        acceptAnswer();
    } else {
        // show solution
        animateShake();
        revealSolution();
    }
}

/**
 * called if the right answer was provided, or the error popup was overridden.
 */
async function acceptAnswer() {
    // if this was the last card, don't replace it (must be done on client side, to avoid Async DB inconsistencies.)
    cardsRemaining = await amountCardsRemainingAfterThis();

    rankUpCard();

    /// only load another card, if there are still cards left.
    if (cardsRemaining == 0)
        window.location.href = "/polyglot/";
    else {
        animateReplace();
        loadCard();
    }
}

async function rejectAnswer() {
    // if this was the last card, don't replace it (must be done on client side, to avoid Async DB inconsistencies.)
    cardsRemaining = amountCardsRemainingAfterThis();

    rankDownCard();

    /// only load another card, if there are still cards left.
    if (cardsRemaining == 0)
        window.location.href = "/polyglot/";
    else {
        animateReplace();
        loadCard();
    }
}

/**
 * Modifies layout if wrong answer was provided.
 */
async function revealSolution() {

    // Update UI elements
    $('#firstField').val(currentcard['french']);
    $('#firstField').prop('disabled', true);
    $('#card').addClass('wrong-halo')
    $('#primaryButton').text('Next');
    $('#secondaryButton').text('Mark as known');

    // re-assign button and keycode handlers
    $('#primaryButton').unbind('click');
    $('#secondaryButton').unbind('click');

    // rebind enter key, so that it emulates a click on "next"
    $(document).keydown(function (event) { // <---  most reliable way to register key listeners.
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#primaryButton').click();
        }
    });

    let level = getUrlParameter('level') - 1;
    let cardsRemaining = await amountCardsRemainingAfterThis();

    // Continue while there are cards remaining or ( the level is 0 + the card was flagged as false)
    if (cardsRemaining > 0 || level == 0) {
        // if next was clicked, rank-down card, proceed to next card
        $('#primaryButton').on('click', function () {
            rejectAnswer();
            resetLayout();
        });
    } else {
        // if next was clicked, rank-down card, go back to menu
        $('#primaryButton').on('click', function () {
            rankDownCard();
            window.location.href = "/polyglot/";
        });
    }


    if (cardsRemaining > 0) {
        // if override was clicked. Treat card as if that would have been the right answer, proceed to next card
        $('#secondaryButton').on('click', function () {
            acceptAnswer();
            resetLayout();
        });
    } else {
        // no cards remaining (the last one just disappeared): rank up card and go back to menu.
        $('#secondaryButton').on('click', function () {
            acceptAnswer();
            //window.location.href = "/polyglot/";
        });
    }
}


async function amountCardsRemainingAfterThis() {
    // Look up current niveau
    let level = getUrlParameter('level') - 1;

    // verify there are cards remaining for this level
    const fillState = await getData('/polyglot/api/');
    let cardsRemaining = fillState[level] - 1;

    console.log('Cards remaining: ' + cardsRemaining);
    return cardsRemaining;
}

/**
 * Instructs API to promotes a card to the next level.
 */
function rankUpCard() {

    // Look up current niveau
    let level = getUrlParameter('level') - 1;
    currentcard['box'] = level + 1;

    // send updated card back to API
    postCardUpdate(currentcard);

    console.log('Ranked up card: ' + currentcard);
}

/**
 * Instructs API to downgrade a card to previous level, IF not yet at lowest level
 */
function rankDownCard() {

    // Look up current niveau
    let level = getUrlParameter('level') - 1;

    if (level != 0) {
        currentcard['box'] = level - 1;

        // send updated card back to API
        postCardUpdate(currentcard);

        console.log('Ranked down card: ' + currentcard);
    }
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

/**
 * Displays the native language information of a card.
 * @returns {Promise<void>}
 */
async function loadCard() {

    // Look up current niveau
    let level = getUrlParameter('level') - 1;

    // load a random card
    currentcard = await getData('/polyglot/api/cards/random?level=' + level);
    console.log(currentcard);

    // display the german part, focus on the french part, disable editing of the german part
    $('#firstField').val('');
    $('#secondField').val(currentcard['german']);
    $('#firstField').focus();
    $('#secondField').prop('disabled', true);
}

async function animateShake() {
    $('#card').addClass("shake-horizontal");

    await sleep(800);
    $('#card').removeClass("shake-horizontal");
}

async function animateReplace() {
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

async function postCardUpdate(card) {
    const headers = new Headers();
    const body = JSON.stringify(card)
    headers.append('Content-Type', 'application/json');

    const init = {
        method: 'POST',
        headers,
        body
    };

    fetch('/polyglot/api/cards/' + card['id'], init)
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

/**
 * Undoes all DOM modifications made for editing / feedback
 */
function resetLayout() {

    //ToDo: get rid of enter key registration on document.
    //clean slate - remove all keyevents / clickevents
    $(document).unbind(); // <-- literally the only reliable way to get rid of a keyhandler.
    
    // Undo changes
    console.log('resetting layout');
    $('#firstField').off('keypress');
    $('#secondField').off('keypress');
    $('#primaryButton').unbind('click');
    $('#secondaryButton').unbind('click');
    $(document).off('keypress');

    // Set as it was before
    registerUserEntryHandlers();
    $('#firstField').prop('disabled', false);
    $('#primaryButton').text('Validate');
    $('#secondaryButton').text('Edit');
    $('#card').removeClass('wrong-halo');


}