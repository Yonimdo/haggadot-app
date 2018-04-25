declare var $: any;
declare var jPlayerPlaylist: any;

import {HgdaPageService} from '../hgda-page.service';
import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-hgda-audio',
  templateUrl: './hgda-audio.component.html',
  styleUrls: ['./hgda-audio.component.scss']
})
export class HgdaAudioComponent implements OnInit {
  private myPlaylist: any;

  ngOnInit(): void {
    this.pageService.playlistChanged.subscribe(playlist => {
      if (this.myPlaylist) {
        this.myPlaylist.setPlaylist(playlist);
        return;
      }
      // Set the jPlayer once.
      this.myPlaylist = new jPlayerPlaylist({
        jPlayer: '#jquery_jplayer_1',
        cssSelectorAncestor: '#jp_container_1'
      }, playlist, {
        playlistOptions: {
          enableRemoveControls: true,
          autoPlay: true
        },
        swfPath: '/js',
        supplied: 'ogv, m4v, oga, mp3',
        smoothPlayBar: true,
        keyEnabled: true,
        audioFullScreen: false // Allows the audio poster to go full screen via keyboard
      });
      $('#jp_container_1').removeClass('hide');
    });
    $('#jquery_jplayer_1').bind($.jPlayer.event.play, (a) => {
      const current = this.myPlaylist.playlist[this.myPlaylist.current];
      this.pageService.changeTrack(current);
      $('#static-track-title').html(current.title);
      $('#static-track-summary').html(current.summary);
    });
  }

  constructor(private pageService: HgdaPageService) {
  }

  togglePlaylist() {
    $('.jp-playlist').slideToggle('slow', function () {
      $('.jp-playlist').css('display', 'none !important');
    });
  }

}
