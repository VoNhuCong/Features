const http = require('http');
var socketIO = require('socket.io');

const port = process.env.PORT || 8080;
const ip = process.env.IP || '127.0.0.1';

const server = http.createServer().listen(port, ip, function () {
    console.log('Socket.IO server started at %s:%s!', ip, port);
});

const io = socketIO.listen(server);
io.set('match origin protocol', true);
io.set('origins', '*:*');
