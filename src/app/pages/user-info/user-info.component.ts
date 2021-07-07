import {Component, OnInit, ChangeDetectorRef,} from '@angular/core';
import {User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {pluck, take} from "rxjs/operators";
import {FetchGetUsers} from "../../store/actions/user.actions";
import {Observable} from "rxjs";
import {Select, Store} from '@ngxs/store';
import {UsersState} from '../../store/state/users.state';
import {loggerOptionsFactory} from "@ngxs/logger-plugin/src/logger.module";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  users: Array<User>;
  searchForm: FormGroup;

  @Select(UsersState.getUserList) usersState$: Observable<Array<User>>;

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.usersState$.subscribe(res => this.users = res)
    this.getUsers();

    this.usersService.getFilterUsers()
      .pipe(take(1))
      .subscribe(data => {
        }
      )


    this.searchForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]], // regex
      phone: ['', [
        Validators.required, Validators.pattern("[0-9]{10}")
      ]], // number
    });
  }

  get phone() {
    return this.searchForm.get('phone');
  }

  get mail() {
    return this.searchForm.get('mail');
  }

  getUsers(): void {
    this.store.dispatch(new FetchGetUsers())
      .pipe(take(1), pluck('Data', 'users'))
      .subscribe((users: User[]) => {
        this.users = users;
      })
  }

  clearForm(): void {
    this.searchForm.reset();
    this.getUsers();
  }
}
