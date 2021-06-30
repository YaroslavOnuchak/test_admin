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

  searchUsers(arg: any): Observable<Array<User>> {
    let {firstName, lastName, username, mail, phone} = arg
    console.log(firstName)
    return this.http.get<any>(`${environment.apiUrl}/users`).pipe(map(users => {
      console.log(users)
      return users.filter((elem: User) => {
        return elem.firstName.toLowerCase().indexOf(firstName.toLocaleLowerCase()) > -1
        // elem.firstName === firstName || elem.lastName === lastName ||
        // elem.username === username || elem.mail === mail ||
        // elem.phone === phone
        // console.log(elem)

      });

    }));
  }

  updateUser(user: User) {
    return this.http.put<any>(`${environment.apiUrl}/users/${user.id}/`, user)
  }

  postUser(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/users/`, user)
  }

  delUser(userId: number): Observable<Array<User>> {
    return this.http.delete<any>(`${environment.apiUrl}/users/${userId}`)
  }

  // testst() {
  //   return this.http.get<any>(`${environment.apiUrl}/users/${1}/`)
  // }

}
