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
  pages: any;
  page: any;
  iiif_viewer_data: any;

  selectObject: any;

  constructor(private pageService: HgdaPageService, public fullpageService: MnFullpageService, public window: WindowRef) {
  }

  setDiva() {


    $('#diva-wrapper').diva({
      enableImageTitles: false,
      fixedHeightGrid: true,
      objectData: `http://iiif.nli.org.il/IIIFv21/DOCID/${this.pageService.pageId}/manifest/`,
      // objectData: 'https://ddmal.github.io/diva.js/try/iiif-highlight-pages/stgallen_390_annotated.json', // Example
      enableIIIFHighlight: true,
      // enableIIIFMetadata: true, throws error
      goDirectlyTo: 26,
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
      this.page = this.pages[index];
      const e = {page: this.page};
      this._change(e);
    }, 1);

  }

  setDivaAnnotations() {
    const ps = this.pages.filter(n => n.annotations.length !== 0);
    ps.map(n => {
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
    this.pageService.getBookRows().subscribe(data => {
      this.setPages(data.pages);
      this.setDivaEvents();
      diva.Events.subscribe('ViewerDidLoad', (s) => this.setDivaAnnotations());
    });
  }

  ngOnDestroy(): void {
    // this.winRef.scrollUnsubscribe();
  }

  setPages(pages) {
    this.pages = pages;
  }

  _change(e) {
    this.page = e.page;
  }

  change() {
    this.iiif_viewer_data.gotoPageByIndex(this.page.ordinal);
  }
}
