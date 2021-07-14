import {AfterViewInit, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";
import {Select, Selector, Store} from "@ngxs/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

}
