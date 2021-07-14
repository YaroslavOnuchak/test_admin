import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {
  }

  singOut(): void {
    localStorage.removeItem("logged_user");
    this.router.navigateByUrl('/log').then()
  }
}
