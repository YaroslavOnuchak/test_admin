import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {Store} from "@ngxs/store";
import {FetchGetUsers} from "../store/actions/user.actions";
import {catchError, delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetUsersResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> {
    return this.store.dispatch(new FetchGetUsers())
      .pipe(delay(1000),
        catchError(() => {
          this.router.navigate(['/log']);
          return EMPTY;
        })
      );
  }
}
