import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';


import {AppComponent} from './app.component';

import { MnFullpageModule } from 'ngx-fullpage';
import {HgdaPageService} from './hgda-page.service';
import {HgdaBookComponent} from './hgda-book/hgda-book.component';
import {WindowRef} from './win-ref.service';
import {HgdaNavbarComponent} from './hgda-navbar/hgda-navbar.component';
import {HgdaChaptersComponent} from './hgda-chapters/hgda-chapters.component';
import { HgdaCommentaryComponent } from './hgda-commentary/hgda-commentary.component';
import { HgdaAudioComponent } from './hgda-audio/hgda-audio.component';
import { HgdaTextFilterPipe } from './hgda-text-filter.pipe';
import { HgdaInfoDialogComponent } from './hgda-info-dialog/hgda-info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HgdaBookComponent,
    HgdaNavbarComponent,
    HgdaChaptersComponent,
    HgdaCommentaryComponent,
    HgdaAudioComponent,
    HgdaTextFilterPipe,
    HgdaInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    MnFullpageModule.forRoot(),
    HttpModule
  ],
  providers: [HgdaPageService, WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
}
