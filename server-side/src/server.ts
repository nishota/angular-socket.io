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

    const ctx: CanvasRenderingContext2D = new Canvas(200, 200).getContext('2d');

    socket.on('disconnect', (data: any) => {
    });

    socket.on('message', (data: { text: string, name: string }) => {
        console.log(`${data.name} : ${data.text}`);

        ctx.font = '30px';
        ctx.rotate(0.1);
        ctx.fillText(data.text, 50, 100);

        io.emit('sync-data', { name: data.name, text: data.text, date: new Date() });
        io.emit('sync-canvas', { font: '30px Impact', rotate: 0.1, text: {data: data.text, height: 50, width: 100} });
    });
});

server.listen(
    5000,
    () => {
        console.log('Example app listening on port 5000!');
    });
