import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../../core/interfaces";

@Pipe({
  name: 'searchFilter',
  pure:false
})
export class SearchFilterPipe implements PipeTransform {

  transform(data: Array<User>,
            field: string,
            val:any): any {

    if (!data || !field) {
      return data;
    }
    return data.filter((el: any) => { // any type
      return val ? el[field].toLowerCase().indexOf(val.toLocaleLowerCase()) > -1 : true
    });
  }
}
