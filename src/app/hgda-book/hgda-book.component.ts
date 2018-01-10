import {Component, OnInit} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';
import {HgdaIifComponent} from '../hgda-iif/hgda-iif.component';

@Component({
  selector: 'app-hgda-book',
  templateUrl: './hgda-book.component.html',
  styleUrls: ['./hgda-book.component.scss']
})
export class HgdaBookComponent implements OnInit {
  pages: any;
  page: any;

  constructor(private pageService: HgdaPageService) {
  }

  ngOnInit() {
    this.pageService.getPageImages().subscribe(data => {
      this.pages = data.sequences[0].canvases;
    });
  }
  change(e) {
    this.page = e.page;
  }
}
