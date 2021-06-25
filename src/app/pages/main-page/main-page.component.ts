import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/Auth/auth.service";
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
    this.user = this.authenticationService.loginedUser() || {
      id: 1,
      firstName: "user",
      lastName: "user",
      username: "user",
      password: "user",
      mail: "exam@example",
      phone: 555555,
      token: "token"
    }
    console.log("this.user ", this.user )
  }

}
