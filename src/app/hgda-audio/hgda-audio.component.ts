declare var $: any;

import {HgdaPageService} from '../hgda-page.service';
import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-hgda-audio',
  templateUrl: './hgda-audio.component.html',
  styleUrls: ['./hgda-audio.component.scss']
})
export class HgdaAudioComponent implements OnInit, OnChanges {
  tracks: any = {};
  selected: any;
  @Input() page: any;

  constructor(private pageService: HgdaPageService) {
  }

  ngOnInit() {
    this.pageService.getTracks().subscribe(ts => {
      this.tracks = ts;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.page = changes.page.currentValue;
    if (!this.page) {
      return;
    }
    this.selected = this.tracks.find(t => t.bookmarks.includes(this.page.ordinal));
    if (!!this.selected) {
      const url = this.selected.audio_url;
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
