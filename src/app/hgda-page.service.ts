import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HgdaPageService {

  constructor(private http: Http) { }

  getPageImages() {
    return this.http
      .get('assets/manifest.json')
      .map(x => x.json());

  }

  getPage() {
    return this.http
      .get('assets/bookmarks.json')
      .map(x => x.json());
  }

  getPagesContent() {
    return this.http
      .get('assets/rows.json')
      .map(x => x.json());
  }
}
