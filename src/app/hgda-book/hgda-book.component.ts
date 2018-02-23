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
      goDirectlyTo: 3,
      inFullscreen: true,
      objectData: 'http://iiif.nli.org.il/IIIFv21/DOCID/PNX_MANUSCRIPTS003146684/manifest/',
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
      this.change(e);
    }, 1);

  }

  ngOnInit() {
    this.setDiva();
    this.pageService.getBookRows().subscribe(data => {
      this.setPages(data.pages);
      this.setDivaEvents();
    });
  }

  ngOnDestroy(): void {
    // this.winRef.scrollUnsubscribe();
  }

  setPages(pages) {
    this.pages = pages;
  }

  change(e) {
    this.page = e.page;
  }
}
