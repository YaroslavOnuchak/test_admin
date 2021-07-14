import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of, from,} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, catchError, mergeMap} from 'rxjs/operators';
import {LoginForm, User} from "../../interfaces";
import {environment} from "../../../../environments/environment";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {UsersService} from "../users/users.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private loginStatus: boolean = false;


  constructor(
    private http: HttpClient,
    private authSocialSer: SocialAuthService,
    private usersService: UsersService,
    private router: Router
  ) {
  }

  login({username, password}: LoginForm): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/users`)
      .pipe(map(
        users => {
          let user = users.filter((elem: User) =>
            elem.username === username && elem.password === password)[0];
          this.loginStatus = true;
          localStorage.setItem('logged_user', JSON.stringify(user));
          return user;
        }
      ));
  }

  loginGoogle(): Observable<User> {
    return from(this.authSocialSer.signIn(GoogleLoginProvider.PROVIDER_ID))
      .pipe(mergeMap(socialUser => {
        // console.log('',socialUser )
        return this.usersService.getUsers()
          .pipe(map(users => {
            let user = users.filter(
              item =>
                item.firstName == socialUser.firstName &&
                item.lastName == socialUser.lastName &&
                item.email == socialUser.email &&
                item.googleId == socialUser.id
            );
            localStorage.setItem('logged_user', JSON.stringify(user[0]));
            this.loginStatus = true;
            return user[0];
          }))
      }))

  }

  canActivate(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}/users`).pipe(
      map(
        res => {
          if (!res) {
            alert("no data");
            return false;
          } else {
            const storage = localStorage.getItem("logged_user");
            if (this.loginStatus || storage) {
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

  checkLoggedUser() : Observable<any>{
    const storage = localStorage.getItem("logged_user");
    let user
    if (storage) {
      user =JSON.parse(storage)
      this.loginStatus = true;
      this.router.navigate(['/main-page']);
    } else {
      localStorage.removeItem("logged_user");
      this.router.navigateByUrl('/log').then()
    }
    return of (user)
  }

}
