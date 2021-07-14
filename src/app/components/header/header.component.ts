import {AfterViewInit, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";
import {Select, Selector, Store} from "@ngxs/store";
import {DataState} from "../../store/state/datas.state";
import {Observable} from "rxjs";
import {User} from "../../core/interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit {

  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {

  }

}
