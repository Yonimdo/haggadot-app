import {hasOwnProperty} from 'tslint/lib/utils';

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

  constructor(public pageService: HgdaPageService, public fullpageService: MnFullpageService, public window: WindowRef) {
  }

  setDiva() {
    $('#diva-wrapper').diva({
      enableImageTitles: false,
      fixedHeightGrid: true,
      objectData: this.pageService.getBookUrl(this.pageService.bookId),
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
          'ulx': a[0].x,
          'uly': a[0].y,
          'classes': a[0].hasOwnProperty('audio_url') ? 'highlight-audio' : 'highlight-info',
          'attrs': a[0].hasOwnProperty('audio_url') ? {
            'click': (box) => {
              const el = $(box);
              if (el.hasClass('selected')) {
                el.removeClass('selected');
                el.html('');
              } else {
                this.playPlaylist(a);
                el.addClass('selected');
                el.html(`<div class="jumbotron track-jumbotron">
                  <h4 class=""><span id="static-track-title">הכותרת של השיר</span>
                  <small>[<span id="static-track-time">00:00</span>]</small></h4>
                  <p>ביצוע:<span id="static-track-author" >שם האומן</span></p>
                  <p>שפות:<span id="static-track-language" >שפה</span></p>
                  <div class="flex-row"><p >מקום:<span id="static-track-location">שם המקום</span>
                  </p><p>שנה:<span id="static-track-year" >שנת יציאה </span></p></div>
                  <p >קרדיט:<span id="static-track-credit">קרדיט</span></p>
                  <p class="summary"><span id="static-track-summary" >תיאור כללי ב</span></p>
              </div>`);
              }
            }
          } : {
            'data-toggle': 'modal',
            'data-target': '#hgda-info-model',
            'click': () => {
              $('#info-img').attr('src', a[0].src);
              $('#info-title').html(a[0].title);
              $('#info-text').html(a[0].content);
            }
          },
          'divID': `page${n.ordinal - 1}-highlight-${index}`
        });
      });
      this.iiif_viewer_data.highlightOnPage(n.ordinal, regions, '#ffffff', 'highlight-page');
    });
// Apply the highlight to the first page
  }

  playPlaylist(playlist): void {
    this.pageService.setPlaylist(playlist);
  }

  ngOnInit() {
    this.setDiva();
    diva.Events.subscribe('ViewerDidLoad', (s) => {
      this.setDivaEvents();
      this.pageService.getPageChangeEmitter()
        .subscribe(item => {
          if (item != null) {
            // TODO: throws error if diva is not loaded before the data
            this.iiif_viewer_data.gotoPageByIndex(item.ordinal);
          }
        });
      this.pageService.getAnnoChangeEmitter()
        .subscribe(e => this.setDivaAnnotations());
    });
  }

  ngOnDestroy(): void {
    // this.winRef.scrollUnsubscribe();
  }
}
