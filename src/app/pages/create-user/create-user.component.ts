import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Adress, User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  newUser: FormGroup
  user: User
  users: Array<User>

  constructor(private fb: FormBuilder,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getUsers()
    this.buildUserForm()
    this.user = this.newUser.value

  }

  getUsers(): void {
    this.usersService.getUsers().pipe(take(1)
    ).subscribe(data => {
      console.log(data)
      this.users = data,
        console.log(`get users`, this.users)
      console.log(`get users`, this.user)
      // this.buildUserForm()
      // this.user = this.newUser.value
    })
  }

  buildUserForm(): any {

    return this.newUser = this.fb.group({
      id: null,
      firstName: "",
      lastName: "",
      username: "",
      mail: "",
      phone: "",
      password: "",
      passwordCheck: "",
      addressList: this.fb.array([this.fb.group({
          id: 1,
          addressType: '',
          address: '',
          city: '',
          postalCode: '',
          editStatus: true
        })]
      )
    })
  }
}
