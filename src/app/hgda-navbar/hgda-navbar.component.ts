import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-hgda-navbar',
  templateUrl: './hgda-navbar.component.html',
  styleUrls: ['./hgda-navbar.component.scss']
})
export class HgdaNavbarComponent implements OnInit {
  @Output() openLeft = new EventEmitter();
  @Output() openRight = new EventEmitter();
  @Input() page: any;

  constructor() { }

  ngOnInit() {

  }

}
