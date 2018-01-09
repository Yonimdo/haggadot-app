declare var OpenSeadragon: any;

import {WindowRef} from '../win-ref.service';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';


@Component({
  selector: 'app-hgda-iif',
  templateUrl: './hgda-iif.component.html',
  styleUrls: ['./hgda-iif.component.scss']
})
export class HgdaIifComponent implements OnInit, OnChanges {
  canvas: any;
  @Input() page: any;

  constructor(private winRef: WindowRef) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.canvas = OpenSeadragon({
      id: 'image',
      preserveViewport: true,
      visibilityRatio: 1,
      minZoomLevel: 0,
      defaultZoomLevel: 1,
      sequenceMode: false,
      tileSources: this.page
    });
  }

}
