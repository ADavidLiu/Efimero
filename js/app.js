// SERVIDOR
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// PUERTO SERIAL
const serialport = require("serialport/test");
const MockBinding = serialport.Binding;

// Datos de prueba
MockBinding.createPort('/dev/ROBOT', { echo: true, record: true })
const port = new serialport('/dev/ROBOT')

/*const port = new serialport("/dev/tty-usbserial1", {
    baudRate: 57600
});*/

var datos;

// COMUNICACIÓN EN TIEMPO REAL
port.on('data', function (data) {
    console.log('Data:', data);
    datos = JSON.stringify(data);
});

io.on('connection', function (socket) {
    console.log('Un usuario se ha conectado');
    socket.on("isEmpty", function (state) {
        console.log(state);
        socket.broadcast.emit("isEmpty", {
            state: state
        });
    });
});