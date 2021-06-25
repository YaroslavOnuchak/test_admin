import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first, take} from "rxjs/operators";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  users: Array<User>
  searchForm: FormGroup
  public searchFirst: any = '';
  public searchLast: any = '';
  public searchUser: any = '';
  public searchMail: any = '';
  public searchPhone: any = '';

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastNAme: ['', Validators.required],
      userName: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required],
    })
    this.getUsers()
  }

  getUsers(): void {
    this.usersService.getUsers().pipe(take(1)
    ).subscribe(data => {
      // console.log(data)
      this.users = data
    })
  }

  clearForm(): void {
    this.searchForm.reset()
    this.getUsers()
    console.log('click')
  }

  searchUsers(): void {
    let searchData1 = this.searchForm.value;
    // console.log(searchData1)
   let searchData = Object.values(this.searchForm.value)
    this.usersService.searchUsers( searchData1 ).pipe(take(1)
    ).subscribe(data => {
      // console.log(data)
      this.users = data
    })

  }

}
