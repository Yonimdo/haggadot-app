import {EventEmitter, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HgdaPageService implements OnInit, OnChanges {
  @Input() bookId: any = 'PNX_MANUSCRIPTS000041667';
  pageChanged: EventEmitter<any> = new EventEmitter();
  annotationLoaded: EventEmitter<any> = new EventEmitter();
  playlistChanged: EventEmitter<any> = new EventEmitter();
  book: any;
  page: any;
  track: any;
  chapter: any = [];
  chapters: any = [];
  rows: any;
  tracks: any;
  books: any;
  annotations: any;
  private mplaylist: any;

  getBookUrl(id) {
    return `http://iiif.nli.org.il/IIIFv21/DOCID/${id}/manifest/`;
  }

  constructor(private http: Http) {

    Promise.all([
      fetch('/assets/bookmarks.json').then(n => n.json()),
      fetch('/assets/chapters.json').then(n => n.json()),
      fetch('/assets/rows.json').then(n => n.json()),
      fetch('/assets/tracks.json').then(n => n.json()),
      fetch('/assets/books.json').then(n => n.json()),
      fetch(`http://iiif.nli.org.il/IIIFv21/DOCID/${this.bookId}/manifest/`).then(n => n.json()),
    ]).then(c => {
      const bookmarks = c[0], imgs = c[1];
      this.rows = c[2];
      this.tracks = c[3];
      this.books = c[4];
      const doc = c[5];
      this.book = this.books[0];
      this.book.title = doc.label;
      bookmarks.map(b => {
        b.img = imgs.filter(im => im.ordinal === b.ordinal)[0].img;
      });
      this.chapters = bookmarks;


      const annotations = this.book.pages.filter(n => n.annotations.length !== 0);
      this.tracks.map(t => {
        t.x = 500;
        t.y = 2000;
        t[t.audio_url.split('.').pop()] = t.audio_url;
        const pages = this.getChaptersPages(t.bookmarks.map(b => this.getChapter(b)));
        if (!!pages) {
          pages.map(p => {
            const anno = annotations.find(annoP => annoP.ordinal === p.ordinal);
            if (!!anno) {
              anno.annotations.push(t);
            } else {
              p.annotations = [t];
              annotations.push(p);
            }
          });
        }
      });

      this.annotations = [];
      annotations.map(p => {
        const page_anno = [];
        p.annotations.map(a => {
          if (a.hasOwnProperty('audio_url')) {
            const playlist = !!page_anno[1] ? page_anno[1] : [];
            playlist.push(a);
            page_anno[1] = playlist;
          } else {
            const infolist = !!page_anno[0] ? page_anno[0] : [];
            infolist.push(a);
            page_anno[0] = infolist;
          }
        });
        this.annotations.push({
          'ordinal': p.ordinal,
          'rows': p.rows,
          'annotations': page_anno
        });
      });
      this.page = this.book.pages[this.book.start_page];
      this.pageChanged.emit(this.page);
      this.annotationLoaded.emit();
    });
  }

  getChaptersPages(chapters) {
    const rows = this.getChaptersRows(chapters);
    const pages = this.book.pages.filter(p => {
      return p.rows.some((v) => {
        return rows.includes(v);
      });
    });
    return pages;
  }

  getChaptersRows(chapters) {
    let rows = [];
    chapters.map(c => {
      if (c.hasOwnProperty('children')) {
        rows = rows.concat(this.getChaptersRows(c.children));
      }
      if (c.hasOwnProperty('rows')) {
        rows = rows.concat(c.rows);
      }
    });
    return rows;
  }

  getChapter(id) {
    let chap;
    this.chapters.find(c => {
      if (c.hasOwnProperty('children')) {
        chap = c.children.find(ch => ch.ordinal === id);
        if (!!chap) {
          return true;
        }
      }
      if (c.ordinal === id) {
        chap = c;
        return true;
      }
      return;
    });
    return chap;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  changePage(index) {
    this.page = this.book.pages[index];
  }

  changeChapter(chapter) {
    this.chapter = chapter;
    const page = this.getChaptersPages([chapter]);
    if (!!page && page.length >= 1) {
      this.pageChanged.emit(page[0]);
    }
    return;
  }

  getPageChangeEmitter() {
    return this.pageChanged;
  }

  getAnnoChangeEmitter() {
    return this.annotationLoaded;
  }

  setPlaylist(playlist: any) {
    this.mplaylist = playlist;
    this.playlistChanged.emit(this.mplaylist);
  }

  changeTrack(track: any) {
    this.track = track;
  }
}
