// Partículas
particlesJS.load('particles-js', 'particlesjs-config.json');

function stopParticles() {
    $(".lab").fadeOut(1000);
}

function startParticles() {
    $(".lab").fadeIn(1000);
}

function iniciarEfectos() {
    startParticles();
    cambiarColor("1");
}

function detenerEfectos() {
    stopParticles();
    cambiarColor("0");
}

$("#isEmpty").click(function () {
    socket.emit("isEmpty", "1");
    startParticles();
    cambiarColor("1");
});
$("#isNotEmpty").click(function () {
    socket.emit("isEmpty", "0");
    stopParticles();
    cambiarColor("0");
});

// "LEDs"
var numLeds = 6;

function cambiarColor(state) {
    for (var i = 0; i < numLeds; i++) {
        (function (i) {
            setTimeout(function () {
                if (state === "1") {
                    $("#led-" + (numLeds - i - 1)).removeClass().addClass("led led--rojo");
                } else {
                    $("#led-" + i).removeClass().addClass("led led--verde");
                }
            }, 50 * i);
        })(i);
    }
}

// Comunicación en tiempo real
var url = "http://d128e21b.ngrok.io";
var local = "http://localhost:3000";
var socket = io.connect(url);

socket.on('isEmpty', function (datos) {
    var state = datos.state;
    console.log(state);
    if (state === "1") { // 1 = vacío/inciar efectos, 0 = lleno/cancelar efectos.
        iniciarEfectos();
    } else {
        detenerEfectos();
    }
});