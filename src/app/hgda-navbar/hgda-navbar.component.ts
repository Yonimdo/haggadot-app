import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {HgdaPageService} from "../hgda-page.service";

@Component({
  selector: 'app-hgda-navbar',
  templateUrl: './hgda-navbar.component.html',
  styleUrls: ['./hgda-navbar.component.scss']
})
export class HgdaNavbarComponent implements OnInit {
  @Output() openLeft = new EventEmitter();
  @Output() openRight = new EventEmitter();
  @Input() page: any;

  constructor(public pageService: HgdaPageService) {
  }

  ngOnInit() {

  }

  home(e) {
  }
}
