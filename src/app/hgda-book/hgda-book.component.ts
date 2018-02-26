declare var diva: any;
declare var $: any;

import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';
import {MnFullpageService} from 'ngx-fullpage';
import {WindowRef} from '../win-ref.service';


@Component({
  selector: 'app-hgda-book',
  templateUrl: './hgda-book.component.html',
  styleUrls: ['./hgda-book.component.scss']
})
export class HgdaBookComponent implements OnInit, OnDestroy {
  @Output() pageChanged = new EventEmitter();
  iiif_viewer_data: any;

  selectObject: any;

  constructor(private pageService: HgdaPageService, public fullpageService: MnFullpageService, public window: WindowRef) {
  }

  setDiva() {
    $('#diva-wrapper').diva({
      enableImageTitles: false,
      fixedHeightGrid: true,
      objectData: this.pageService.getBook(this.pageService.bookId),
      // objectData: 'https://ddmal.github.io/diva.js/try/iiif-highlight-pages/stgallen_390_annotated.json', // Example
      enableIIIFHighlight: true,
      // enableIIIFMetadata: true, throws error
      goDirectlyTo: 3,
      inFullscreen: true,
      enableHighlight: true
    });

    this.selectObject = $('#object-select');
    this.iiif_viewer_data = $('#diva-wrapper').data('diva');
    this.selectObject.on('change', function () {
      this.iiif_viewer_data.changeObject(this.selectObject.val());
    });

    $('#orientation').on('click', function () {
      this.iiif_viewer_data.toggleOrientation();
    });
  }

  setDivaEvents() {
    diva.Events.subscribe('VisiblePageDidChange', (index) => {
      this.pageService.changePage(index);
    }, 1);

  }

  setDivaAnnotations() {
    this.pageService.annotations.map(n => {
      const regions = [];
      n.annotations.map((a, index) => {
        regions.push({
          'width': 300,
          'height': 300,
          'ulx': a.x,
          'uly': a.y,
          'divID': `page${n.ordinal - 1}-highlight-${index}`
        });
      });
      this.iiif_viewer_data.highlightOnPage(n.ordinal, regions, '#ffffff', 'highlight-page');
    });
// Apply the highlight to the first page
  }

  ngOnInit() {
    this.setDiva();
    this.setDivaEvents();
    diva.Events.subscribe('ViewerDidLoad', (s) => this.setDivaAnnotations());
    this.pageService.getPageChangeEmitter()
      .subscribe(item => {
        if (item != null) {
          this.iiif_viewer_data.gotoPageByIndex(item.ordinal);
        }
      });
  }

  ngOnDestroy(): void {
    // this.winRef.scrollUnsubscribe();
  }
}
