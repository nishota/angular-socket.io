import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy, AfterViewInit {
  height: string;
  connection: Subscription;

  @ViewChild('myCanvas', { static: true }) myCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.height = (window.innerHeight - 56).toString() + 'px';
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }
  ngAfterViewInit(): void {
    this.connection = this.webSocketService.on('sync-canvas')
      .subscribe((data: { font: string, rotate: number, text: { data: string, height: number, width: number } }) => {
        this.ctx.font = data.font;
        this.ctx.rotate(data.rotate);
        this.ctx.fillText(data.text.data, data.text.height, data.text.width);
        this.ctx.restore();
      });
  }
  ngOnDestroy(): void {
    this.connection.unsubscribe();
  }

}
