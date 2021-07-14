import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngxs/store";
import {SetListCountry} from "../../store/actions/helperList.actions";
import {CheckLoggedUser, GetLoggedUser} from "../../store/actions/authentication.actions";

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
    this.store.dispatch(new CheckLoggedUser());
    this.store.dispatch(new GetLoggedUser())
      .subscribe( data =>{
      this.user = data.Data.loggedUser
    })
    this.store.dispatch(new SetListCountry());

  }
}
