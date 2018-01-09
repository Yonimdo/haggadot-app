import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HgdaIifComponent } from './hgda-iif/hgda-iif.component';


@NgModule({
  declarations: [
    AppComponent,
    HgdaIifComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
