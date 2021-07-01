import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {User} from '../../interfaces';

@Injectable({providedIn: 'root'})

export class AuthService {
  public user:User;

  constructor(
    private http: HttpClient
  ) {
  }

  loginedUser(): User {
    return this.user
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/users`)
      .pipe(map(user => {
        this.user = user.filter((elem: User) => elem.username === username && elem.password === password)[0];
        return this.user;
      }));


  }

}
