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

  getFilterUsers(form: FormGroup): any {
    // for (let key in form.value) {
    //
    // console.log(key)
    // }
    // return this.http.get<any>(
    //   // `${environment.apiUrl}/users?firstName=${a}&mail=${mail}`
    // )
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
