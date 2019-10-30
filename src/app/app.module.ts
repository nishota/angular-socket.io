import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SubmitDivComponent } from './submit-div/submit-div.component';
import { CanvasComponent } from './canvas/canvas.component';
import { WebSocketService } from './web-socket.service';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SubmitDivComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
