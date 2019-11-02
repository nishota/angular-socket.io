import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { WebSocketService } from '../web-socket.service';
import { StageConfig, TextConfig } from '../model/config.model';
import { TextBoxComponent } from '../text-box/text-box.component';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('textbox', { static: true }) textbox: TextBoxComponent;
  width: number;
  height: number;
  connection: Subscription;
  stageConfig$: Observable<StageConfig>;
  textConfig$: Observable<TextConfig>;
  textConfigSource: Subject<TextConfig>;

  items: string[] = [];

  constructor(private webSocketService: WebSocketService) {
    // for (let i = 0; i < 20; i++) {
    //   this.items.push('test' + i.toString());
    // }
  }

  ngOnInit(): void {
    const width = (3 * innerWidth) / 4;
    const height = innerHeight - 56;
    this.stageConfig$ = of(new StageConfig(width, height));
    this.textConfig$ = of(
      new TextConfig(
        Math.random() * (3 * innerWidth) / 4 / 2,
        Math.random() * (innerHeight - 56) / 2,
        'hogehoge',
        30)
    );
  }

  ngAfterViewInit(): void {
    // this.connection = this.webSocketService.on('sync-canvas').subscribe(
    //   (data: { text: string }) => {
    //     this.textbox.textConfig$ = of(
    //       new TextConfig(
    //         Math.random() * (3 * innerWidth) / 4,
    //         Math.random() * (innerHeight - 56),
    //         data.text,
    //         30)
    //     );
    //   });
  }
}
