import {Component, OnDestroy, OnInit} from '@angular/core';
import {HgdaPageService} from '../hgda-page.service';
import {HgdaIifComponent} from '../hgda-iif/hgda-iif.component';
import {MnFullpageService} from 'ngx-fullpage';
import {WindowRef} from '../win-ref.service';


@Component({
  selector: 'app-hgda-book',
  templateUrl: './hgda-book.component.html',
  styleUrls: ['./hgda-book.component.scss']
})
export class HgdaBookComponent implements OnInit, OnDestroy {
  pages: any;
  page: any;

  constructor(private pageService: HgdaPageService, public fullpageService: MnFullpageService) {

  }

  ngOnInit() {
    // this.winRef.scrollSubscribe();
    this.pageService.getPageImages().subscribe(data => {
      this.setPages(data.sequences[0].canvases);
    });
  }

  ngOnDestroy(): void {
    // this.winRef.scrollUnsubscribe();
  }

  setPages(pages) {
    this.pages = pages;
    // this.fullpageService.reBuild();
    setTimeout(this.fullpageService.reBuild, 1000);
    setTimeout(() => this.fullpageService.moveTo(3), 1002);
  }

  change(e) {
    this.page = e.page;
  }
}
