import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {LoginForm, User} from "../../interfaces";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  public user: User;
  private loginStatus: boolean = true;


  constructor(
    private http: HttpClient,
  ) {
  }

  login( {username,  password}: LoginForm): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/users`)
      .pipe(map(
        users => {
          let user = users.filter((elem: User) => elem.username === username && elem.password === password)[0];
          this.loginStatus = true
          // this.user = user;
          // console.log('servis=>>>> login', user)
          // console.log('servis=>>>> username',);
          return user;
        }
      ));
  }

  loginedUser(): User {
    return this.user
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}/users`).pipe(
      map(
        res => {
          if (!res) {
            alert("no data");
            return false;
          } else {
            if (this.loginStatus) {
              return true;
            }
            return false;
          }
        }
      ),
      catchError((err) => {
        return of(false);
      })
    );

  }

}
