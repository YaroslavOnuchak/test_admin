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
@Output() saveE = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  save(e:any):void{
    console.log(`1111e`, e)
    this.saveE.emit()
  }

}
