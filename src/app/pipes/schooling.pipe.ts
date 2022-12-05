import { Pipe, PipeTransform } from '@angular/core';
import { Schooling, SchoolingLabel } from '../models/enuns/schooling';

@Pipe({
  name: 'schooling',
  pure: false
})
export class SchoolingPipe implements PipeTransform {

  schooling = Schooling;
  schoolingList: string[] = [];

  transform(value: Schooling, args?: any): any {
    if (args === undefined || value === undefined) {
      return null;
    }
    for (let index = 0; index < 4; index++) {
      let label = SchoolingLabel.get(this.schooling[index]);
      if (label) {
        this.schoolingList.push(label);
      }
    }
    return this.schoolingList[value];
  }
}
