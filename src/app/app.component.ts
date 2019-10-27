import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  providers: [WebSocketService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  connection;
  text: FormControl;
  name: FormControl;
  chat: { text: string, date: Date}[];

  constructor(private webSocketService: WebSocketService) {
    this.text = new FormControl('');
    this.name = new FormControl('');
    this.chat = [];
  }

  onClick() {
    this.webSocketService.emit(
      'message',
      {text: this.text.value, name: this.name.value}
      );
    this.text.setValue('');
  }

  ngOnInit() {
    this.webSocketService.connect('conect=Hello,ServerSide!');
    this.connection = this.webSocketService.on('sync-data').subscribe((data: {name: string, text: string, date: Date}) => {
      this.chat.unshift(data);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
