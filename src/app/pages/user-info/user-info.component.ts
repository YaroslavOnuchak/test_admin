import {Component, OnInit, ChangeDetectorRef,} from '@angular/core';
import {User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Select, Store} from '@ngxs/store';
import {DataState} from '../../store/state/datas.state';
import {FetchGetUsers, GetFilterUsers} from "../../store/actions/user.actions";
import {MinLengthNotEmptyFields} from "../../core/validators/emptyFields";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  users: Array<User>;
  searchForm: FormGroup;
  typeSearch: boolean = false;
  minLengthNotEmptyFields: number = 2

  @Select(DataState.getUserList) usersState$: Observable<Array<User>>;

  constructor(
    private formBuilder: FormBuilder,
    private serU: UsersService,
    private store: Store
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
      email: ['',
          [
            Validators.email,
            Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
        ], // regex
        phone: ['',
          [
            Validators.pattern("[0-9]{10,15}")
          ]
        ], // number
      }, {
        validator:
          MinLengthNotEmptyFields(this.minLengthNotEmptyFields)
      }
    );
  }

  get phone() {
    return this.searchForm.get('phone');
  }

  get email() {
    return this.searchForm.get('email');
  }

  searchUserByForm(): void {
    // let arr: any = [];
    if (this.searchForm.valid) {
          this.store.dispatch(new GetFilterUsers(this.searchForm))
    }
  }

  clearForm(): void {
    this.searchForm.reset();
    this.store.dispatch(new FetchGetUsers());
  }
}
