import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';
import {MnFullpageService} from 'ngx-fullpage';
import {WindowRef} from '../win-ref.service';

declare var diva: any;
declare var $: any;

const hms = function (n) {
  if (n < 60 * 60) {
    return `${Math.floor(n / 60)}:${String(Math.floor(n % 60 / 1)).padStart(2, '0')}`;
  }
  const h = Math.floor(n / 60 / 60);
  const m = Math.floor(n / 60 % 60);
  const s = Math.floor(n % 60);
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};


@Component({
  selector: 'app-hgda-diva',
  templateUrl: './hgda-diva.component.html',
  styleUrls: ['./hgda-diva.component.scss']
})
export class HgdaDivaComponent implements OnInit, OnDestroy {
  @Output() pageChanged = new EventEmitter();
  diva: any;
  currentAnnotation = null;

  constructor(public pageService: HgdaPageService, public fullpageService: MnFullpageService, public window: WindowRef) {
  }

  setDiva() {
    this.diva = $('#viewer').diva({
      enableImageTitles: false,
      enableLinkIcon: false,
      fixedHeightGrid: true,
      objectData: this.pageService.getBookUrl(),
      enableIIIFHighlight: true,
      // enableIIIFMetadata: true, throws error
      goDirectlyTo: this.pageService.book.start_page - 1,
      inFullscreen: true,
      enableHighlight: true,
      zoomLevel: 1
    }).data('diva');

    $('#object-select').on('change', function () {
      this.diva.changeObject(this.selectObject.val());
    });

    $('#orientation').on('click', function () {
      this.diva.toggleOrientation();
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
          'classes': 'audio'.includes(a.type) ? 'highlight-audio' : 'highlight-info',
          'attrs': a.type === 'audio' ? {
            'click': (el) => {
              this.onAudioClick(a, el);
            }
          } : {
            'data-toggle': 'modal',
            'data-target': '#hgda-info-model',
            'click': () => {
              const img = $('#info-img');
              const title = $('#info-title');
              const text = $('#info-text');
              if (!!(a.title)) {
                title.html(a.title);
                title.show();
              } else {
                title.hide();
              }
              text.html(a.content);
            }
          },
          'divID': `page${n.ordinal - 1}-highlight-${index}`
        });
      });
      this.diva.highlightOnPage(n.ordinal - 1, regions, '#ffffff', 'highlight-page');
    });
// Apply the highlight to the first page
  }

  onAudioClick(a, target) {
    const el = $(target);
    if (this.currentAnnotation !== target) {
      $(this.currentAnnotation).removeClass('selected').html('');
      this.currentAnnotation = null;
    }

    if (el.hasClass('selected')) {
      el.removeClass('selected');
      el.html('');
      this.currentAnnotation = null;
    } else {
      this.play(a);
      el.addClass('selected');
      el.html(`<div class="jumbotron track-jumbotron">
          <h4>${a.track.title} <small>| ${hms(a.track.length)}</small></h4>
          <p class="summary">${a.track.summary}</p>
      </div>`);
      this.currentAnnotation = target;
    }

  }

  play(track): void {
    this.pageService.setPlaylist([track]);
  }

  ngOnInit() {
    this.pageService.bookChanged.subscribe(() => {
      this.initBook();
    });
    if (!!(this.pageService.book)) {
      this.initBook();
    }

  }

  initBook() {
    this.setDiva();
    diva.Events.subscribe('ViewerDidLoad', (s) => {
      this.setDivaEvents();
      this.pageService.getPageChangeEmitter()
        .subscribe(item => {
          if (item != null) {
            // TODO: throws error if diva is not loaded before the data
            this.diva.gotoPageByIndex(item.ordinal);
          }
        });
      if (!!(this.pageService.annotations)) {
        this.setDivaAnnotations();
      }
      this.pageService.getAnnoChangeEmitter()
        .subscribe(e => this.setDivaAnnotations());
    });
  }

  ngOnDestroy(): void {
    // this.winRef.scrollUnsubscribe();
  }
}
