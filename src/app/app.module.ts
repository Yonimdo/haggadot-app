import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';


import {AppComponent} from './app.component';

import {MnFullpageModule} from 'ngx-fullpage';
import {HgdaPageService} from './hgda-page.service';
import {HgdaDivaComponent} from './hgda-diva/hgda-diva.component';
import {WindowRef} from './win-ref.service';
import {HgdaNavbarComponent} from './hgda-navbar/hgda-navbar.component';
import {HgdaChaptersComponent} from './hgda-chapters/hgda-chapters.component';
import {HgdaCommentaryComponent} from './hgda-commentary/hgda-commentary.component';
import {HgdaAudioComponent} from './hgda-audio/hgda-audio.component';
import {HgdaTextFilterPipe} from './hgda-text-filter.pipe';
import {HgdaInfoDialogComponent} from './hgda-info-dialog/hgda-info-dialog.component';
import {HgdaBookComponent} from './hgda-book/hgda-book.component';
import {RouterModule, Routes} from '@angular/router';
import {HgdaHomeComponent} from './hgda-home/hgda-home.component';


const appRoutes: Routes = [
  {path: 'book/:id', component: HgdaBookComponent},
  {path: '', component: HgdaHomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HgdaDivaComponent,
    HgdaNavbarComponent,
    HgdaChaptersComponent,
    HgdaCommentaryComponent,
    HgdaAudioComponent,
    HgdaTextFilterPipe,
    HgdaInfoDialogComponent,
    HgdaBookComponent,
    HgdaHomeComponent
  ],
  imports: [
    BrowserModule,
    MnFullpageModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true, useHash: true} // <-- debugging purposes only
    ),
    HttpModule
  ],
  providers: [HgdaPageService, WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
}
