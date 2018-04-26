import { Component, OnInit } from '@angular/core';
import {HgdaPageService} from "../hgda-page.service";

@Component({
  selector: 'app-hgda-home',
  templateUrl: './hgda-home.component.html',
  styleUrls: ['./hgda-home.component.scss']
})
export class HgdaHomeComponent implements OnInit {

  constructor(public pageService: HgdaPageService) { }

  ngOnInit() {
  }

}
