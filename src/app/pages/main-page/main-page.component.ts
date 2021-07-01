import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/authentication/auth.service";
import {User} from "../../core/interfaces";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

public user :User ;

  constructor(private  authenticationService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.loginedUser()
  }

}
