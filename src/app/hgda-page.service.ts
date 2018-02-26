import {Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HgdaPageService implements OnInit, OnChanges {
  @Input() bookId: any = 'PNX_MANUSCRIPTS000041667';
  book: any;
  page: any;
  track: any;
  chapter: any = [];
  chapters: any = [];
  rows: any;
  tracks: any;
  books: any;
  annotations: any;

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
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  changePage(index) {
    this.page = this.book[index];
  }

  getBook(id) {
    return `http://iiif.nli.org.il/IIIFv21/DOCID/${id}/manifest/`;
  }

  getBookRows() {
    return this.http.get('/assets/books.json')
      .map(x => x.json()[0]);
  }

  getBookmarksRows() {
    return this.http.get('/assets/bookmarks.json').map(x => x.json());
  }

  getBookmarksImages() {
    return Promise.all([
      fetch('/assets/bookmarks.json').then(n => n.json()),
      fetch('/assets/chapters.json').then(n => n.json())
    ]).then(c => {
      const imgs = c[1], bookmarks = c[0];
      bookmarks.map(b => {
        b.img = imgs.filter(im => im.ordinal === b.ordinal)[0].img;
      });
      return bookmarks;
    });
  }

  getRawRows() {
    return this.http.get('/assets/rows.json').map(x => x.json());
  }


  getTracks() {
    return this.http.get('/assets/tracks.json').map((res) => res.json());
  }

  changeChapter(chapter) {
    const row = chapter.rows[0];
    this.page = !!this.book ? this.book.pages.find(n => {
      if (n.hasOwnProperty('children')) {
        return !!(n.children.find(c => c.rows.includes(row)));
      }
      return n.rows.includes(row);
    }) : null;
    this.chapter = chapter;
    return;
  }

}
