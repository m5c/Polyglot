function animateShake() {
    $('#card').addClass("shake-horizontal");

    sleep(800).then(() => {
        $('#card').removeClass("shake-horizontal");
    });
}

function animateReplace() {
    $('#card').addClass("flip-in-hor-bottom");

    sleep(800).then(() => {
        $('#card').removeClass("flip-in-hor-bottom");
    });
}

function animatePuff() {
    $('#card').addClass("puff-in-center");
    sleep(300).then(() => {
        $('#card').removeClass("puff-in-center");
    });
}