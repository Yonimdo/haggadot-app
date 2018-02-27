import {EventEmitter, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HgdaPageService implements OnInit, OnChanges {
  @Input() bookId: any = 'PNX_MANUSCRIPTS000041667';
  pageChanged: EventEmitter<any> = new EventEmitter();
  book: any;
  page: any;
  track: any;
  chapter: any = [];
  chapters: any = [];
  rows: any;
  tracks: any;
  books: any;
  annotations: any;

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
    ]).then(c => {
      const bookmarks = c[0], imgs = c[1];
      this.rows = c[2];
      this.tracks = c[3];
      this.books = c[4];
      this.book = this.books[0];
      this.annotations = this.book.pages.filter(n => n.annotations.length !== 0);
      bookmarks.map(b => {
        b.img = imgs.filter(im => im.ordinal === b.ordinal)[0].img;
      });
      this.chapters = bookmarks;
      this.page = this.book.pages[this.book.start_page];
      this.pageChanged.emit(this.page);
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  changePage(index) {
    this.page = this.book.pages[index];
  }

  changeChapter(chapter) {
    let row;
    if (chapter.hasOwnProperty('children')) {
      row = chapter.children[0].rows[0];
    } else {
      row = chapter.rows[0];
    }
    const page = !!this.book ? this.book.pages.find(n => {
      if (n.hasOwnProperty('children')) {
        return !!(n.children.find(c => c.rows.includes(row)));
      }
      return n.rows.includes(row);
    }) : null;
    this.pageChanged.emit(page);
    this.chapter = chapter;
    return;
  }

  getPageChangeEmitter() {
    return this.pageChanged;
  }

}
