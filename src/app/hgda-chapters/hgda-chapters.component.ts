import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-hgda-chapters',
  templateUrl: './hgda-chapters.component.html',
  styleUrls: ['./hgda-chapters.component.scss']
})
// dBefore:string = `M${before.x-0.5},${(i-1)*this.space}h1l10,${ this.space }h-1z`;
// d:string =`M${title.x-0.5},${i*this.space}h1l0,${i+1<arr.length ? this.space : 0}h-1z`;
// dCurrent:string = `M${title.x-0.5},${i*this.space}h1l-10,${i+1<this.nodes.length ? this.space : 0}h-1z`;
export class HgdaChaptersComponent implements OnInit, OnChanges {
  @Output() pageChanged = new EventEmitter();
  @Input() page: any;
  nodes: any[];
  open: String = 'is-active';
  _selected: any;

  constructor(private pageService: HgdaPageService) {
  }

  ngOnInit() {
    this.pageService.getBookmarksImages().then(data => {
      this.nodes = data.map((t, i, a) => this.titleMap(t, i, a));
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('page') && !!changes.page.currentValue) {
      this.page = changes.page.currentValue;
      if (!!!this.page.rows || this.page.rows.length === 0) {
        return;
      }
      const row = this.page.rows[0];
      this._selected = !!this.nodes ? this.nodes.find(n => {
        if (n.hasOwnProperty('children')) {
          return !!(n.children.find(c => c.rows.includes(row)));
        }
        return n.rows.includes(row);
      }) : null;
    }
  }

  click(e, title, i) {
    e.page = title;
    this._selected = title;
    this.pageChanged.emit(e);
  }

  titleMap(title, i, arr) {
    title.name = title.title;
    return title;
  }


  toggleOpen() {
    setTimeout(() => {
      this.open = this.open === '' ? 'is-active' : '';
    }, 100);
  }

}
