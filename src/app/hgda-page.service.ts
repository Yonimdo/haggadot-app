import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HgdaPageService {

  constructor(private http: Http) { }

  getPageImages() {
    return this.http
      .get('http://iiif.nli.org.il/IIIFv21/DOCID/PNX_MANUSCRIPTS000041667-2/manifest')
      .map(x => x.json());

  }

  getPage() {
    return this.http
      .get('assets/haggadah.json')
      .map(x => x.json().schema);
  }

  getPagesContent() {
    return this.http
      .get('assets/haggadah.json')
      .map(x => x.json().text);
  }
}
