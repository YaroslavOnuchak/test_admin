import {Component, OnInit, ChangeDetectorRef,} from '@angular/core';
import {User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs/operators";
import {FetchGetUsers} from "../../store/actions/user.actions";
import {Observable} from "rxjs";
import { Select, Store } from '@ngxs/store';
import { UsersState } from '../../store/state/users.state';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  // users: Array<User>;
  searchForm: FormGroup;
  @Select(UsersState.getUserList) users: Observable<User[]>;
  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private  store: Store
  ) {
  }

  ngOnInit(): void {
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
    this.getUsers();
    // this.getAllUser_Store()
  }

  get phone() {
    return this.searchForm.get('phone');
  }

  get mail() {
    return this.searchForm.get('mail');
  }
  getAllUser_Store(){
    this.store.dispatch(new FetchGetUsers())
      // .pipe(take(1))
      .subscribe(data => {
      this.users = data.users.users;
    })
  }
  getUsers(): void {
    this.store.dispatch(new FetchGetUsers())
      // .pipe(take(1))
      .subscribe(data => {
        // console.log(data.users)
        // this.users = data.users.users;
      })
    // this.usersService.getUsers().pipe(take(1)
    // ).subscribe(data => {
    //   this.users = data;
    // })
  }

  clearForm(): void {
    this.searchForm.reset();
    this.getUsers();
  }
}
