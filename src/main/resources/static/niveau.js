let currentcard;

// Sets the title, according to the selected vocabulary box
function setTitle() {
    let niveau = getUrlParameter('level');
    $('#title').text("Niveau " + niveau);
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
    cardsRemaining = amountCardsRemainingAfterThis();

    rankUpCard();

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
function revealSolution() {

    $('#firstField').val(currentcard['french']);
    $('#firstField').prop('disabled', true);
    $('#card').addClass('wrong-halo')
    $('#primaryButton').text('Next');
    $('#secondaryButton').text('Mark as known');

    // re-assign button handlers
    $('#primaryButton').unbind('click');
    $('#secondaryButton').unbind('click');

    cardsRemaining = amountCardsRemainingAfterThis();

    if (cardsRemaining != 0) {
        // if next was clicked, rank-down card, proceed (WHAT IF IT WAS THE LAST CARD?)
        $('#primaryButton').on('click', function () {
            rankDownCard();
            resetLayout();
            loadCard()
        });

        // if override was clicked. Treat card as if that would have been the right answer
        $('#secondaryButton').on('click', function () {
            resetLayout();
            acceptAnswer();
        });
    }
    else
    {
        // if next was clicked, rank-down card, proceed (WHAT IF IT WAS THE LAST CARD?)
        $('#primaryButton').on('click', function () {
            rankDownCard();
            window.location.href = "/polyglot/";
        });

        // if override was clicked. Treat card as if that would have been the right answer
        $('#secondaryButton').on('click', function () {
            acceptAnswer();
            window.location.href = "/polyglot/";
        });
    }
}


async function amountCardsRemainingAfterThis() {
    // Look up current niveau
    let level = getUrlParameter('level') - 1;

    // verify there are cards remaining for this level
    const fillState = await getData('/polyglot/api/');
    let cardsRemaining = fillState[level] - 1;
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
    // $('#card').addClass("wrong-halo");

    await sleep(400);
    // $('#card').removeClass("wrong-halo");

    await sleep(400);
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

    console.log('resetting layout');
    $('#firstField').off('keypress');
    $('#secondField').off('keypress');
    $('#primaryButton').unbind('click');
    $('#secondaryButton').unbind('click');
    registerHandlers();
    $('#firstField').prop('disabled', false);
    $('#primaryButton').text('Validate');
    $('#secondaryButton').text('Edit');
    $('#card').removeClass('wrong-halo');

}