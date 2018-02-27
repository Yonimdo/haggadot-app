import {Pipe, PipeTransform} from '@angular/core';
import {HgdaPageService} from './hgda-page.service';

@Pipe({
  name: 'hgdaTextFilter'
})
export class HgdaTextFilterPipe implements PipeTransform {

  constructor() {

  }

  transform(rows: any[], page: any, chapter: any) {

    if (!!rows && !!page) {
      return rows.filter(r => page.rows.includes(r[0]));
    }
  }

}
