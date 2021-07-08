import { Component, OnInit } from '@angular/core';
import { User } from "../../core/interfaces";
import { AuthGuardService } from "../../core/services/authentication/auth-guard.service";
import { ActivatedRoute } from "@angular/router";
import { pluck, take } from "rxjs/operators";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private navigation: any;

  public user: any;

  constructor(private authenticationService: AuthGuardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.snapshot.data.loggedUser
      .pipe(take(1), pluck('Data', 'loggedUser'))
      .subscribe((loggedUser: User) => {
        this.user = loggedUser;
      })
  }
}
