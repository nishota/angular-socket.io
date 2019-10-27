import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Observable } from 'rxjs';

@Injectable()
export class WebSocketService {

  constructor() { }

  private url = 'http://localhost:5000';
  private socket;

  connect(queryString: string) {
    this.socket = io(this.url, { query: queryString });
  }

  emit(emitName: string, data?) {
    this.socket.emit(emitName, data);
  }

  on(onName: string) {
    const observable = new Observable(observer => {
      this.socket.on(onName, (data) => {
        observer.next(data);
      });

      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

}
