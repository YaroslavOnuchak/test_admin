import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {AuthGuardService} from "../core/services/authentication/auth-guard.service";
import {User} from "../core/interfaces";
import {catchError, delay} from 'rxjs/operators';
import {Store} from "@ngxs/store";
import {GetUser} from "../store/actions/authentication.actions";


@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserResolver implements Resolve<Observable<any>> {
  constructor(
    private userService: AuthGuardService,
    private router: Router,
    private store: Store
  ) {
  }

  resolve(route?: ActivatedRouteSnapshot): any {
    // return of( this.userService.loginedUser())
    //   .pipe(delay(1000),
    //   catchError(() => {
    //   this.router.navigate(['/log']);
    //   return EMPTY;
    // }));
    return of(
      this.store.dispatch(new GetUser)
        .pipe(delay(1000),
          catchError(() => {
            this.router.navigate(['/log']);
            return EMPTY;
          }))
    )
  }
}
