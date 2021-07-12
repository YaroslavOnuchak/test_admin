import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {Adress, User} from '../../interfaces';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<any>(`${environment.apiUrl}/users`)
  }

  getFilterUsers(form: FormGroup): Observable<Array<User>> {
    let str: String = '';
    let key: string;
    for (key in form.value) {
      if (form.value[key]) {
        str = str + `${key}=${form.value[key]}&`;
      }
    }
    str = str.slice(0, -1)
    return this.http.get<any>(`${environment.apiUrl}/users?${str}`
    )
  }

  updateUser(user: User) {
    return this.http.put<any>(`${environment.apiUrl}/users/${user.id}/`, user)
  }

  postUser(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/users/`, user)
  }

  deleteUser(userId: number): Observable<Array<User>> {
    return this.http.delete<any>(`${environment.apiUrl}/users/${userId}`)
  }

}
