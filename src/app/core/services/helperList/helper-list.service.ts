
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperListService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<any>> {
    let countries;
    return this.http.get<any>(`${environment.listCoutry}`)
      .pipe(map(data => {
        countries = new Array(data.length);
        data.forEach((el: any, index: number) => {
          countries[index] = el.name
        })
        return countries;
      }))
  }

}
