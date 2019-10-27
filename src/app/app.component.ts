import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef,  } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { FormControl } from '@angular/forms';

@Component({
  providers: [WebSocketService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{
  connection;
  text: FormControl;
  name: FormControl;
  chat: { text: string, date: Date }[];

  @ViewChild('myCanvas', { static: true }) myCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private webSocketService: WebSocketService) {
    this.text = new FormControl('');
    this.name = new FormControl('');
    this.chat = [];
  }

  onClick() {
    this.webSocketService.emit(
      'message',
      { text: this.text.value, name: this.name.value }
    );
    this.text.setValue('');
  }

  ngOnInit() {
    this.webSocketService.connect('conect=Hello,ServerSide!');
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.connection = this.webSocketService.on('sync-data')
    .subscribe((data: { name: string, text: string, date: Date, context: any }) => {
      this.chat.unshift(data);
    });
    this.connection = this.webSocketService.on('sync-canvas')
    .subscribe((data: {font: string, rotate: number, text: {data: string, height: number, width: number} }) => {
      this.ctx.font = data.font;
      this.ctx.rotate(data.rotate);
      this.ctx.fillText(data.text.data, data.text.height, data.text.width);
      this.ctx.restore();
    });
  }
}
