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

  togglePlaylist() {
    $('.jp-playlist').slideToggle();
  }
}
