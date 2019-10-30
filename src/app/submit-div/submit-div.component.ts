import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-div',
  templateUrl: './submit-div.component.html',
  styleUrls: ['./submit-div.component.scss']
})
export class SubmitDivComponent implements OnInit, AfterViewInit, OnDestroy {
  name: FormControl;
  text: FormControl;
  height: string;
  chat: { text: string, date: Date }[];
  connection: Subscription;

  constructor(private webSocketService: WebSocketService) {
    this.name = new FormControl('');
    this.text = new FormControl('');
    this.chat = [];
  }
  ngOnInit(): void {
    this.height = (window.innerHeight - 56).toString() + 'px';
  }
  ngAfterViewInit(): void {
    this.connection = this.webSocketService.on('sync-data')
      .subscribe((data: { name: string, text: string, date: Date, context: any }) => {
        this.chat.unshift(data);
      });
  }
  ngOnDestroy(): void {
    this.connection.unsubscribe();
  }

  onClick() {
    this.webSocketService.emit(
      'message',
      { text: this.text.value, name: this.name.value }
    );
    this.text.setValue('');
  }
}
