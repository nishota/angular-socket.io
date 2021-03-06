import Express from 'express';
import http from 'http';
import socketio from 'socket.io';

import { Canvas } from 'canvas';

const app: Express.Express = Express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = socketio(server);

app.use(Express.static('public'));

io.on('connection', (socket: socketio.Socket) => {
    const query = socket.handshake.query;
    const conect = query.conect;
    console.log(conect);

    socket.on('disconnect', (data: any) => {
    });

    socket.on('message', (data: { text: string, name: string }) => {
        console.log(`${data.name} : ${data.text}`);
        if (data.text.length > 0) {
            io.emit('sync-data', { name: data.name, text: data.text, date: new Date() });
            io.emit('sync-canvas', { text: data.text });
        }
    });
});

server.listen(
    5000,
    () => {
        console.log('Example app listening on port 5000!');
    });
