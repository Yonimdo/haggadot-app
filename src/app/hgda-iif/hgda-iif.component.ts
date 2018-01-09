declare var OpenSeadragon: any;
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hgda-iif',
  templateUrl: './hgda-iif.component.html',
  styleUrls: ['./hgda-iif.component.scss']
})
export class HgdaIifComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    OpenSeadragon({
      id: 'image',
      preserveViewport: true,
      visibilityRatio: 1,
      minZoomLevel: 1,
      defaultZoomLevel: 1,
      sequenceMode: true,
      tileSources: [{
        '@context': 'http://iiif.io/api/image/2/context.json',
        '@id': 'https://libimages1.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000001.jp2',
        'height': 7200,
        'width': 5233,
        'profile': ['http://iiif.io/api/image/2/level2.json'],
        'protocol': 'http://iiif.io/api/image',
        'tiles': [{
          'scaleFactors': [1, 2, 4, 8, 16, 32],
          'width': 1024
        }]
      }]
    });
  }

}
