import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Product } from 'src/models/Product';

@Injectable({
  providedIn: 'root'
})
export class SocketService{

  constructor(private socket: Socket) {

  }

  sendProduct(product: Product) {
    this.socket.emit('products', product);
  }

  getProduct() {
    return this.socket.fromEvent('products');
  }

  sendIdProductToDelete(idProduct: number = 0) {
    this.socket.emit('delete-product', idProduct);
  }

  getIdProductToDelete() {
    return this.socket.fromEvent('delete-product');
  }

  initCall() {
    this.socket.emit('call');
  }

  listenInitCall() {
    return this.socket.fromEvent('call');
  }

  endCall() {
    this.socket.emit('end-call');
  }

  listenEndCall() {
    return this.socket.fromEvent('end-call');
  }

}
