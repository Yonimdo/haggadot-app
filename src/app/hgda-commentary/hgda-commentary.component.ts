import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';

@Component({
  selector: 'app-hgda-commentary',
  templateUrl: './hgda-commentary.component.html',
  styleUrls: ['./hgda-commentary.component.scss']
})
export class HgdaCommentaryComponent implements OnInit, OnChanges {
  open: String = 'active';
  texts: any;

  @Input() page: any;
  @Input() inner: any;

  constructor(private pageService: HgdaPageService) {
  }

  ngOnInit() {
    this.pageService.getRawRows().subscribe(data => {
      this.texts = data;
    });
  }

  ngOnChanges() {
    if (!!this.page && this.page.hasOwnProperty('rows')) {
      this.inner = this.texts.filter(verse => this.page.rows.includes(verse[0]));
    }
  }

  toggle() {
    setTimeout(() => {
      this.open = this.open === '' ? 'active' : '';
    }, 100);
  }
}
