import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { User } from "../../core/interfaces";
import { UsersService } from "../../core/services/users/users.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { pluck, take } from "rxjs/operators";
import { FetchGetUsers } from "../../store/actions/user.actions";
import { Observable } from "rxjs";
import { Select, Store } from '@ngxs/store';
import { DataState } from '../../store/state/datas.state';
import { ActivatedRoute } from "@angular/router";
import { ConfirmedValidator } from "../../core/validators/confirm";
import { MinLengthNotEmptyFields } from "../../core/validators/emptyFields";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  users: Array<User>;
  searchForm: FormGroup;
  typeSearch = false
  @Select(DataState.getUserList) usersState$: Observable<Array<User>>;

  constructor(
    private formBuilder: FormBuilder,
    private serU: UsersService
  ) {
  }

  ngOnInit(): void {
    this.usersState$.subscribe(res => {
      this.users = res
    })

    this.searchForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      mail: ['',
        [
          Validators.email,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
      ], // regex
      phone: ['',
        [
          Validators.pattern("[0-9]{10,15}")
        ]
      ], // number
    }
      , {
        validator:
          MinLengthNotEmptyFields(2)
      }
    );
  }

  get phone() {
    return this.searchForm.get('phone');
  }

  get mail() {
    return this.searchForm.get('mail');
  }

  searchUserByForm(): void {
    this.serU.getFilterUsers(this.searchForm)
    console.log('valid  =>>', this.searchForm.valid)
    // console.log('valid  mail =>>', this.searchForm.controls.mail.errors)
    let count = 0;
    for (let key in this.searchForm.value) {
      if (this.searchForm.value[key]) {
        count++;
        // console.log("dsddd", this.searchForm.value[key]);
      }
    }
    if (count > 1 && this.searchForm.valid) {
    } else {
      // console.log('seееd  =>>', count)
      // console.log('seееd  =>>', this.searchForm.errors)

    }
  }

  clearForm(): void {
    this.searchForm.reset();
  }
}
