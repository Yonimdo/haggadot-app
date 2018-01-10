import {Component, OnInit, Output, EventEmitter} from '@angular/core';
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
  _nodes: any[];
  nodes: any[];
  prev: any[] = [];
  currentNode: any;
  space = 20;
  x = 110;
  dx = -15;
  open: String = 'is-active';

  constructor(private pageService: HgdaPageService) {

  }

  ngOnInit() {
    this.pageService.getPage().subscribe(data => {
      this.nodes = data.map((t, i, a) => this.titleMap(t, i, a));
      this._nodes = data.map((t, i, a) => this.titleMap(t, i, a));
    });
  }

  toggle() {
    setTimeout(() => {
      this.open = this.open === '' ? 'is-active' : '';
    }, 100);
  }

  unselect() {
    setTimeout(() => {
      if (this.prev.length > 0) {
        const stack = this.prev.pop();
        this.currentNode = stack.prev;
        this.nodes = stack.nodes.map((t, j, a) => this.titleMap(t, j, a));
      } else {
        this.currentNode = null;
        this.nodes = this._nodes.map((t, j, a) => this.titleMap(t, j, a));
      }
    }, 100);
  }

  titleMap(title, i, arr) {
    title.name = title.title;
    title.cy = this.space + i * this.space;
    title.y = title.cy + 4;
    title.x = this.x;
    title.a = `M${title.x - 0.5},${(this.space / 2) + i * this.space}h${-title.x}v${this.space}h${title.x}1z`;
    title.d = `M${title.x - 0.5},${this.space + i * this.space}h1l0,${i + 1 < arr.length ? this.space : 0}h-1z`;
    return title;
  }

  selected(e, title, i) {
    e.page = title;
    this.pageChanged.emit(e);
    if (title === this.currentNode) {
      return;
    }
    const prev = this.currentNode;
    this.currentNode = title;
    if (prev !== undefined) {
      if (prev.hasOwnProperty('children')) {
        // Join the parent stack.
        this.prev.push({'prev': prev, 'nodes': this.nodes});
      } else {
        this.reset(prev, this.nodes.indexOf(prev));
      }
    }
    this.currentNode.x = this.x + this.dx;
    if (title.hasOwnProperty('children')) {
      this.nodes = title.children.map((t, j, a) => this.titleMap(t, j, a));
    } else {
      this.currentNode.d = `M${title.x - 0.5},${this.space + i * this.space}
                          h1l${-this.dx },${i + 1 < this.nodes.length ? this.space : 0}h-1z`;
    }
    if (i !== 0) {
      const before = this.nodes[i - 1];
      before.d = `M${before.x - 0.5},${this.space + (i - 1) * this.space}h1l${this.dx},${ this.space }h-1z`;
    }
  }


  reset(title: any, i: number) {
    if (title === this.currentNode) {
      return;
    }
    let c = 1;
    if (i < this.nodes.length + 1 && this.nodes[i + 1] === this.currentNode) {
      c = 0;
    }
    title.x = this.x;
    title.d = `M${title.x - 0.5},${this.space + i * this.space}
               h1l${c === 0 ? this.dx : 0},${i + 1 < this.nodes.length ? this.space : 0}h-1z`;
    if (i !== 0) {
      const before = this.nodes[i - 1];
      if (before === this.currentNode) {
        before.d = `M${this.currentNode.x - 0.5},${this.space + (i - 1) * this.space}h1l${-this.dx},${ this.space }h-1z`;
      } else {
        before.d = `M${title.x - 0.5},${this.space + (i - 1) * this.space}h1l0,${i < this.nodes.length ? this.space : 0}h-1z`;
      }
    }
  }

  current(title, i) {
    if (title.sub) {
      return;
    }
    if (title === this.currentNode) {
      return;
    }
    let c = 1;
    if (i < this.nodes.length + 1 && this.nodes[i + 1] === this.currentNode) {
      c = 0;
    }
    title.x = this.x + this.dx;
    title.d = `M${title.x - 0.5},${this.space + i * this.space}h1l${-this.dx * c},${i + 1 < this.nodes.length ? this.space : 0}h-1z`;
    if (i !== 0) {
      const before = this.nodes[i - 1];
      if (before === this.currentNode) {
        before.d = `M${this.currentNode.x - 0.5},${this.space + (i - 1) * this.space}h1l0,${ this.space }h-1z`;
      } else {
        before.d = `M${before.x - 0.5},${this.space + (i - 1) * this.space}h1l${this.dx},${ this.space }h-1z`;
      }
    }
  }

}
