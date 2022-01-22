const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i><span class="usernames">' + socket.username + '</span> joined the chat..</i>');
        console.log(socket.request.connection.remoteAddress + "/" + socket.handshake.headers["x-real-ip"] + ': ' + socket.username + " joined");
    });

    socket.on('chat_message', function(message) {
        io.emit('chat_message', message.name + ": " + message.message);
        console.log(socket.request.connection.remoteAddress + "/" + socket.handshake.headers["x-real-ip"] + ': ' + message.name + ": " + message.message.replace(/(\r\n|\r|\n)/g, '\\n'));
    });

});

const server = http.listen(3000, function() {
    console.log('listening on *:3000');
});
