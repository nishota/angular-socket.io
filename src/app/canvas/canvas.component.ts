import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';

declare const Konva: any;
let ng: any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('stage', { static: true }) stage: KonvaComponent;
  @ViewChild('layer', { static: true }) layer: KonvaComponent;
  @ViewChild('dragLayer', { static: true }) dragLayer: KonvaComponent;

  public width: number;
  public height: number;
  public list: Array<any> = [];
  // confStageSource = new Subject<{ width: number, height: number }>();
  confStage$: Observable<{ width: number, height: number }>; // = this.confStageSource.asObservable();
  constructor() {
    this.width = (3 * innerWidth) / 4;
    this.height = innerHeight - 56;
    this.confStage$ = of(
      {
        width: this.width,
        height: this.height
      });
  }

  public handleDragstart(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const dragLayer = ng.dragLayer.getStage();
    const stage = ng.stage.getStage();

    // moving to another layer will improve dragging performance
    shape.moveTo(dragLayer);
    stage.draw();
  }

  public handleDragend(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const layer = ng.layer.getStage();
    const stage = ng.stage.getStage();

    shape.moveTo(layer);
    stage.draw();
  }

  ngOnInit(): void {
    for (let n = 0; n < 20; n++) {
      const scale = Math.random() + 0.5;
      this.list.push(
        new BehaviorSubject({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          rotation: Math.random() * 180,
          numPoints: 5,
          innerRadius: 30,
          outerRadius: 50,
          fill: '#89b717',
          opacity: 0.8,
          draggable: true,
          scaleX: scale,
          scaleY: scale,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          shadowOpacity: 0.6,
          startScale: scale
        })
      );
    }
  }

  ngAfterViewInit(): void {
    const anim = new Konva.Animation((frame: any) => {
      this.update(this.layer, frame);
    }, this.layer.getStage());
    anim.start();
  }

  update(layer: any, frame: any) {
    const shapes = layer.getStage().getChildren();
    const amp = 100;
    const period = 10000;

    for (const component of shapes) {
      component.getStage().setX(amp * Math.sin((frame.time * 2 * Math.PI) / period));
    }
  }
}
