declare var diva: any;
declare var $: any;

import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';
import {HgdaIifComponent} from '../hgda-iif/hgda-iif.component';
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

  ngOnInit() {


    this.pageService.getBookRows().subscribe(data => {
      this.setPages(data.pages);


    });


    $('#diva-wrapper').diva({
      fixedHeightGrid: true,
      goDirectlyTo: 3,
      enableSpaceScroll: true,   // Scrolling down by pressing the space key
      // enableGridControls: 'slider',
      // inFullscreen: true,
      // toolbarParentObject: true,
      minPagesPerRow: 1,
      objectData: 'http://iiif.nli.org.il/IIIFv21/DOCID/PNX_MANUSCRIPTS000041667-2/manifest/'
    });

    diva.Events.subscribe('VisiblePageDidChange', (index) => {
      this.page = this.pages[index];
      const e = {page: this.page};
      this.change(e);
    }, 1)


    this.selectObject = $('#object-select');
    this.iiif_viewer_data = $('#diva-wrapper').data('diva');
    this.selectObject.on('change', function () {
      this.iiif_viewer_data.changeObject(this.selectObject.val());
    });

    $('#orientation').on('click', function () {
      this.iiif_viewer_data.toggleOrientation();
    });

  }

  ngOnDestroy(): void {
    // this.winRef.scrollUnsubscribe();
  }

  setPages(pages) {
    this.pages = pages;
    // this.fullpageService.reBuild();
    // setTimeout(this.fullpageService.reBuild, 1000);
    // setTimeout(() => this.fullpageService.moveTo(3), 1002);
  }

  change(e) {
    this.page = e.page;
  }
}
