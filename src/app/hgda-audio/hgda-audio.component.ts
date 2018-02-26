declare var $: any;

import {HgdaPageService} from '../hgda-page.service';
import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-hgda-audio',
  templateUrl: './hgda-audio.component.html',
  styleUrls: ['./hgda-audio.component.scss']
})
export class HgdaAudioComponent {

  constructor(private pageService: HgdaPageService) {
  }


  changeTrack(): void {
    if (!this.pageService.page) {
      return;
    }
    if (!!this.pageService.track) {
      const url = this.pageService.track.audio_url;
      $('#jquery_jplayer_1').jPlayer({
        ready: function () {
          $(this).jPlayer('setMedia', {
            mp3: url
          });
        },
        swfPath: '/js',
        supplied:
          'mp3'
      });
    }

  }

}
