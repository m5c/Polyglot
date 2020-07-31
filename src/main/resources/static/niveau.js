// Sets the title, according to the selected vocabulary box
function setTitle() {
    let niveau = getUrlParameter('level');
    $('#title').text("Niveau "+niveau);
}

// register listener for enter pressed (solution input field)
function registerEntryHandler() {
    // register same callback for enter on Add User button
    $('#userResponseField').keypress(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            validateUserResponse();
        }
    });

    // make sure the first input field is focused
    $('#userResponseField').on('shown.bs.modal', function () {
        $('#userResponseField').focus();
    })
}

// triggered when enter is pressed.
function validateUserResponse() {

    // Add some cool card flip animation here? Or some shaking, if wrong.
    alert("yay");
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