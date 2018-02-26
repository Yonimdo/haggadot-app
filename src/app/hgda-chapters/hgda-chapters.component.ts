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
export class HgdaChaptersComponent implements OnInit {
  @Output() pageChanged = new EventEmitter();

  open: String = 'is-active';

  constructor(private pageService: HgdaPageService) {
  }

  ngOnInit() {
  }


  click(e, title, i) {
    this.pageService.changeChapter(title);
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
