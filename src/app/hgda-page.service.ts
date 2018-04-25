import {EventEmitter, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HgdaPageService implements OnInit, OnChanges {
  pageChanged: EventEmitter<any> = new EventEmitter();
  annotationLoaded: EventEmitter<any> = new EventEmitter();
  playlistChanged: EventEmitter<any> = new EventEmitter();
  book: any;
  page: any;
  track: any;
  chapter: any = [];
  chapters: any = [];
  rows: any;
  books: any;
  annotations: any;
  private mplaylist: any;

  getBookUrl(id) {
    return `http://iiif.nli.org.il/IIIFv21/DOCID/${id}/manifest/`;
  }

  constructor(private http: Http) {
    Promise.all([
      fetch('http://nli.oglam.hasadna.org.il/editors/text/json/').then(n => n.json()),
      fetch('assets/chapters.json').then(n => n.json()),
      fetch('http://nli.oglam.hasadna.org.il/editors/books/json/').then(n => n.json()),
    ]).then(c => {
      const bookmarks = c[0].bookmarks, imgs = c[1];
      this.rows = c[0].rows;
      this.books = c[2];
      bookmarks.map(b => {
        b.img = imgs.filter(im => im.title.match(b.title))[0].img;
      });
      this.chapters = bookmarks;
      this.setBook(0);
    });
  }

  setBook(ordinal) {
    this.book = this.books[ordinal];
    this.annotations = this.book.pages.filter(n => n.annotations.length !== 0);
    this.annotations.map(p => {
      p.annotations.map(a => {
        const is_track = 'audio'.match(a.type);
        if (is_track) {
          a.track.mp3 = a.track.audio_url;
          // TODO: add the song parameters here
        }
        if (!(a.x)) {
          a.x = is_track ? 60 : 20;
        }
        if (!(a.y)) {
          a.y = is_track ? 70 : 30;
        }
      });
    });

    this.page = this.book.pages[this.book.start_page];
    this.pageChanged.emit(this.page);
    this.annotationLoaded.emit();
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
    this.mplaylist = playlist.map(a => a = a.track);
    this.playlistChanged.emit(this.mplaylist);
  }

  changeTrack(track: any) {
    this.track = track;
  }
}
