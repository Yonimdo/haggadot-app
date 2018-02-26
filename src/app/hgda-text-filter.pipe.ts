import {Pipe, PipeTransform} from '@angular/core';
import {HgdaPageService} from './hgda-page.service';

@Pipe({
  name: 'hgdaTextFilter'
})
export class HgdaTextFilterPipe implements PipeTransform {

  constructor() {

  }

  transform(rows: any[], chapter: any) {
    if (!!chapter && !!(chapter.rows) && !!rows) {
      return rows.filter(row => {
        return chapter.rows.includes(row[0]);
      });
    } else {
      return rows;
    }
  }

}
