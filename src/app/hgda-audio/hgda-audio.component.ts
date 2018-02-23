declare var $: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hgda-audio',
  templateUrl: './hgda-audio.component.html',
  styleUrls: ['./hgda-audio.component.scss']
})
export class HgdaAudioComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('#jquery_jplayer_1').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia', {
          mp3: '/assets/sound.mp3'
        });
      },
      swfPath: '/js',
      supplied: 'mp3'
    });
  }

}
