import {Component, OnInit} from '@angular/core';
import {User} from "../../core/interfaces";
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";
import {ActivatedRoute} from "@angular/router";
import {pluck, take} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {SetListCountry} from "../../store/actions/helperList.actions";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public user: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.user =
      this.route.snapshot.data.loggedUser.Data.loggedUser;
    this.store.dispatch(new SetListCountry());
  }
}
