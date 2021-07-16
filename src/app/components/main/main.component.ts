import { Component, OnInit } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import {Select} from "@ngxs/store";
import {DataState} from "../../store/state/datas.state";
import {Observable} from "rxjs";
import {User} from "../../core/interfaces";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Select(DataState.getLoggedUser) user$: Observable<User>;
  public loading = false;
  toggle: Boolean= true;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }

      }
    });
  }
  ngOnInit(): void {
    this.user$.subscribe((res?: User) => {
      if (res?.id !== 0) {
        // console.log(res)
        this.toggle = true;
      }
    })
  }

  singOut(): void {
    localStorage.removeItem("logged_user");

    this.router.navigateByUrl('/log').then()







    this.toggle = false;
  }

}
