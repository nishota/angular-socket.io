"use strict";
const app = require('express')();
const http = require('http').Server(app);
const socketIo = require('socket.io')(http);
socketIo.on('connection', (socket) => {
    const query = socket.handshake.query;
    const conect = query.conect;
    console.log(conect);
    socket.on('disconnect', (data) => {
    });
    socket.on('message', (data) => {
        console.log(`${data.name} : ${data.text}`);
        socketIo.emit('sync-data', { name: data.name, text: data.text, date: new Date() });
    });
    // while (true) {
    //     socketIo.emit('sync-data', { data: 'test' });
    //     setTimeout(() => { }, 5000);
    // }
});
http.listen(5000, () => {
    console.log('port:5000');
});
//# sourceMappingURL=web-socket.js.map