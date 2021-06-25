import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure:false
})
export class SearchFilterPipe implements PipeTransform {

  transform(data: any,
            field: string, val:any
            ): any {

    if (! data || !field || field === null) {
      return data
    }
    return data.filter((el: any) => {
      return el[field].toLowerCase().indexOf(val.toLocaleLowerCase()) > -1
    });
  }
}
