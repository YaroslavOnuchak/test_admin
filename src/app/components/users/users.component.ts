import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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

@Output() update = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  upDate(e:any):void{
    this.update.emit()

  }

}
