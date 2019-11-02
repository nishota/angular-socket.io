import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { KonvaComponent } from 'ng2-konva';
import { Observable, Subject, Subscription, BehaviorSubject, of } from 'rxjs';
import { TextConfig, StageConfig } from '../model/config.model';

declare const Konva: any;

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements AfterViewInit {
  private shape: any;
  @ViewChild('stage', { static: true }) stage: KonvaComponent;
  @ViewChild('layer', { static: true }) layer: KonvaComponent;
  @ViewChild('dragLayer', { static: true }) dragLayer: KonvaComponent;

  @Input() stageConfig$: Observable<StageConfig>;
  @Input() textConfig$: Observable<TextConfig>;

  subscription: Subscription;

  constructor() {
    
  }

  // TODO:あとで有効化
  public handleDragstart(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const dragLayer = this.dragLayer.getStage();
    const stage = this.stage.getStage();

    // moving to another layer will improve dragging performance
    shape.moveTo(dragLayer);
    stage.draw();
  }

  // TODO:あとで有効化
  public handleDragend(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const layer = this.layer.getStage();
    const stage = this.stage.getStage();

    shape.moveTo(layer);
    stage.draw();
  }

  ngAfterViewInit(): void {
    console.log(this.stageConfig$);
    console.log(this.textConfig$);
    this.shape = this.layer.getStage();

    const anim = new Konva.Animation((frame: any) => {
      this.update(this.shape, frame);
    }, this.layer.getStage());
    anim.start();
  }

  update(shape: any, frame: any) {
    const amp = 100;
    const period = 10000;
    shape.x(amp * Math.sin((frame.time * 2 * Math.PI) / period));
    shape.y(amp * Math.cos((frame.time * 2 * Math.PI) / period));
  }
}
