import {Pipe, PipeTransform} from '@angular/core';
import {HgdaPageService} from './hgda-page.service';

@Pipe({
  name: 'hgdaTextFilter'
})
export class HgdaTextFilterPipe implements PipeTransform {

  constructor() {

  }

  transform(rows: any[], page: any, chapter: any) {
    let result = [];
    if (!!page && !!(page.rows) && !!rows) {
      result = rows.filter(row => {
        return page.rows.includes(row[0]);
      });
      if (result != null) {
        return result;
      }
    }

    if (!!chapter && !!(chapter.rows) && !!rows) {
      result = rows.filter(row => {
        return chapter.rows.includes(row[0]);
      });
      if (result != null) {
        return result;
      }
    }
    
    return rows;
  }

}
