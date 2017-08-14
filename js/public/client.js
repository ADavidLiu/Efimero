// Partículas
particlesJS.load('particles-js', 'particlesjs-config.json');

function stopParticles() {
    $(".lab").fadeOut(1000);
}

function startParticles() {
    $(".lab").fadeIn(1000);
}

$("#isEmpty").click(function () {
    socket.emit("isEmpty", "1");
});
$("#isNotEmpty").click(function () {
    socket.emit("isEmpty", "0");
});

// "LEDs"
var numLeds = 6;

function cambiarColor(state) {
    for (var i = 0; i < numLeds; i++) {
        (function (i) {
            setTimeout(function () {
                if (state === "1") {
                    $("#led-" + (numLeds - i)).removeClass().addClass("led led--rojo");
                } else {
                    $("#led-" + i).removeClass().addClass("led led--verde");
                }
            }, 50 * i);
        })(i);
    }
}

// Comunicación en tiempo real
var url = "http://c7c35989.ngrok.io";
var local = "http://localhost:3000";
var socket = io.connect(url);

socket.on('isEmpty', function (datos) {
    var state = datos.state;
    console.log(state);
    if (state === "1") { // 1 = vacío/inciar efectos, 0 = lleno/cancelar efectos.
        startParticles();
        cambiarColor("1");
    } else {
        stopParticles();
        cambiarColor("0");
    }
});