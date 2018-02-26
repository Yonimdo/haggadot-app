import {Pipe, PipeTransform} from '@angular/core';
import {HgdaPageService} from './hgda-page.service';

@Pipe({
  name: 'hgdaTextFilter'
})
export class HgdaTextFilterPipe implements PipeTransform {

  constructor(private pageSefvice: HgdaPageService) {

  }

  transform(rows: any[], chapter: any) {
    if (!!chapter && !!rows) {
      return rows.filter(row => {
        return chapter.rows.includes(row[0]);
      });
    } else {
      return rows;
    }
  }

}
