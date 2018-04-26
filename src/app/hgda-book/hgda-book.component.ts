import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HgdaPageService} from '../hgda-page.service';

@Component({
  selector: 'app-hgda-book',
  templateUrl: './hgda-book.component.html',
  styleUrls: ['./hgda-book.component.scss']
})
export class HgdaBookComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, public pageService: HgdaPageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.pageService.setBook(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }

}
