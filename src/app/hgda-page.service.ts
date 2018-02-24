import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import {mergeMap} from 'rxjs/operator/mergeMap';


@Injectable()
export class HgdaPageService {
  rows: any = new Map();
  pageId: any = 'PNX_MANUSCRIPTS000041667';

  constructor(private http: Http) {
  }

  getPageImages() {
    return this.http
      .get('http://iiif.nli.org.il/IIIFv21/DOCID/PNX_MANUSCRIPTS000041667-2/manifest')
      .map(x => x.json());

  }

  getBookRows() {
    return this.http.get('/assets/books.json')
      .map(x => x.json()[0]);
  }

  getBookmarksRows() {
    return this.http.get('/assets/bookmarks.json').map(x => x.json());
  }

  js(obj) {
    return obj.json();
  }

  getRawRows() {
    return this.http.get('/assets/rows.json').map(x => x.json());
  }


  getTracks() {
    return this.http.get('/assets/tracks.json').map((res) => res.json());
  }


}
