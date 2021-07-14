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
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
          this.toggle = true;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit(): void {
  }
  singOut(): void {
    localStorage.removeItem("logged_user");
    this.router.navigateByUrl('/log').then()
    this.toggle = false;
  }

}
