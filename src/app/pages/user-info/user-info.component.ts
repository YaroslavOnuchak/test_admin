import { Component, OnInit, ChangeDetectorRef,} from '@angular/core';
import {User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { take} from "rxjs/operators";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  users: Array<User>
  searchForm: FormGroup;

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private ref: ChangeDetectorRef
              ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', Validators.required], // regex
      phone: ['', Validators.required], // number
    });
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().pipe(take(1)
    ).subscribe(data => {
      this.users = data
    })
  }

  clearForm(): void {
    this.searchForm.reset();
    this.getUsers();
  }
}
