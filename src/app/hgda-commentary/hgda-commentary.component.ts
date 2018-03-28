import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';

@Component({
  selector: 'app-hgda-commentary',
  templateUrl: './hgda-commentary.component.html',
  styleUrls: ['./hgda-commentary.component.scss']
})
export class HgdaCommentaryComponent implements OnInit, OnChanges {
  open: String = 'active';

  constructor(private pageService: HgdaPageService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  toggle() {
    setTimeout(() => {
      this.open = this.open === '' ? 'active' : '';
    }, 100);
  }
}
