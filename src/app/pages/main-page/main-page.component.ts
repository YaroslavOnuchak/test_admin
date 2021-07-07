import {Component, OnInit} from '@angular/core';
import {User} from "../../core/interfaces";
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private navigation: any;

  public user: User;

  constructor(private authenticationService: AuthGuardService,
              private route: ActivatedRoute
             ) {}

  ngOnInit(): void {

    // this.user = this.authenticationService.loginedUser();
    this.user = this.route.snapshot.data.user;
    console.log("==>user", this.user)

  }
}
