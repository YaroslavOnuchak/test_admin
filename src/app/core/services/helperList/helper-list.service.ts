
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperListService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<any>> {
    return this.http.get<any>(`${environment.listCoutry}`)
  }

}
