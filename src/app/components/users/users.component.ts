import { Component, OnInit, Input} from '@angular/core';
import {User} from "../../core/interfaces";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
@Input() usersList : Array<User>
@Input() searchFirst :any
@Input() searchLast :any
@Input() searchUser :any
@Input() searchMail :any
@Input() searchPhone :any
  constructor() { }

  ngOnInit(): void {
  }

}
