import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {Adress, User} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Array<User>

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<any>(`${environment.apiUrl}/users`)
  }

  getFilterUsers(a:string='',mail:string='onuchak.j@gmail.com'): Observable<Array<User>> {
    return this.http.get<any>(
      `${environment.apiUrl}/users?firstName=${a}&mail=${mail}`
    )
  }

  updateUser(user: User) {
    console.log('updateUser', user)
    return this.http.put<any>(`${environment.apiUrl}/users/${user.id}/`, user)
  }

  postUser(user: User) {
    console.log('postUser')
    return this.http.post<any>(`${environment.apiUrl}/users/`, user)
  }

  deleteUser(userId: number): Observable<Array<User>> {
    return this.http.delete<any>(`${environment.apiUrl}/users/${userId}`)
  }

}
