import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';


import {AppComponent} from './app.component';

import {HgdaPageService} from './hgda-page.service';
import {HgdaIifComponent} from './hgda-iif/hgda-iif.component';
import { HgdaBookComponent } from './hgda-book/hgda-book.component';
import { WindowRef } from './win-ref.service';


@NgModule({
  declarations: [
    AppComponent,
    HgdaIifComponent,
    HgdaBookComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [HgdaPageService,WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
}