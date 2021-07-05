import {Component, OnInit} from '@angular/core';
import {User} from "../../core/interfaces";
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private navigation: any;

  public user: User;

  constructor(private authenticationService: AuthGuardService,
             ) {
    // this.navigation = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {
    this.user = this.authenticationService.loginedUser()

  }
}
