import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { AuthGuardService } from "../core/services/authentication/auth-guard.service";
import { User } from "../core/interfaces";
import { catchError, delay, pluck, take } from 'rxjs/operators';
import { Store } from "@ngxs/store";
import { GetLoggedUser } from "../store/actions/authentication.actions";


@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserResolver implements Resolve<Observable<any>> {
  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return of(
      this.store.dispatch(new GetLoggedUser())
        .pipe(delay(0)
          ,
          catchError(() => {
            this.router.navigate(['/log']);
            return EMPTY;
          })
        )
    )
  }
}
