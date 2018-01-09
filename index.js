
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/test', function (request, response) {
    setTimeout(function() {
        console.log('Send response');      
        clearTimeout(timeout);
        response.end('ack');
    }, 500);

});

var INTERVAL = 70;
var timeout;

function emitMessage(index) {
    timeout = setTimeout(function() {
        console.log('Emit message: ' + index)
        io.emit('message', index);
        emitMessage(++index);
    }, INTERVAL);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

io.on('connection', function (socket) {
    clearTimeout(timeout);
    emitMessage(1);
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
