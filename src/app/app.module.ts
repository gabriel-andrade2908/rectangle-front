import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RectangleComponent } from './components/rectangle/rectangle.component';
import { RectangleService } from './services/rectangle.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    RectangleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RectangleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
