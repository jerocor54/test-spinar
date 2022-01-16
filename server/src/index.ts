import express from 'express';

class ServerApp {

    public app = express();
    public server = require('http').Server(this.app);
    public io = require('socket.io')(this.server, {
        cors: {
            origin: "http://localhost:4200",
            allowedHeaders: ["'Access-Control-Allow-Origin', '*'"],
        }
    });

    constructor() {
        this.sockets();
    }

    start() {
        this.app.set('port', process.env.PORT || 3000);
        this.server.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}`);
        });
    }

    sockets() {
        this.io.on('connection', (socket: any) => { 
            const idHandShake = socket.id;  
            console.log(`Socket ${idHandShake} connected'`); 
        
            socket.on('products', (res: any) => {
                this.io.emit('products', res);
            });
        
            socket.on('delete-product', (res: any) => {
                this.io.emit('delete-product', res);
            });
        
            socket.on('call', (res: any) => {
                this.io.emit('call', res);
            });
            
            socket.on('end-call', (res: any) => {
                this.io.emit('end-call', res);
            });
        });
    }
}

const server = new ServerApp();
server.start();