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
const serialport = require("serialport");
//const MockBinding = serialport.Binding;

// Datos de prueba
/*MockBinding.createPort('/dev/ROBOT', { echo: true, record: true })
const port = new serialport('/dev/ROBOT')*/

const port = new serialport("/dev/cu.wchusbserial1420", {
    baudRate: 57600
});

var datos;

var valor;

// COMUNICACIÓN EN TIEMPO REAL
port.on('data', function (data) {
    datos = JSON.stringify(data);
    console.log(typeof datos);
    var datosObj = JSON.parse(datos);
    console.log(datosObj);
    if (datosObj.data.length == 9) {
        valor = "0";
    } else {
        valor = "1";
    }
    console.log("Valor enviado es: " + valor);
    io.emit("isEmpty", {
        state: valor
    });
});