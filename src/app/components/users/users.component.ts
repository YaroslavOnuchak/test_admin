import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../core/interfaces";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
@Input() usersList : Array<User>
@Input() searchForm :User

@Output() update = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    // console.log(this.searchForm)
  }

  upDate():void{
    this.update.emit()

  }

}
