import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../core/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() usersList: Array<User> ;
  @Input() searchForm?: User

  constructor() {

  }

  ngOnInit(): void {
  }
}
