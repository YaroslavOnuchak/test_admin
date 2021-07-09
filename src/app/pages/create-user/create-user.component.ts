import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressType, Adress, User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {take, pluck} from "rxjs/operators";
import {Router} from '@angular/router';
import {HelperListService} from "../../core/services/helperList/helper-list.service";
import {ConfirmedValidator} from "../../core/validators/confirm";
import {Select, Selector, Store} from "@ngxs/store";

import {DeleteUser, FetchGetUsers, UpdateUser, AddUser} from "../../store/actions/user.actions";
import {GetAddressType, GetListCountry, SetListCountry} from "../../store/actions/helperList.actions";
import {DataState} from "../../store/state/datas.state";
import {Observable} from "rxjs";


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  newUser: FormGroup;
  user: User = {
    id: 1,
    firstName: "",
    lastName: "",
    username: "",
    mail: "",
    phone: 1,
    password: "",
    passwordCheck: "",
    addressList: []
  }
  users: Array<User>;
  countries: Array<string>;
  addressType: Array<AddressType>
  toggleShowForm: boolean = true;
  validForm: boolean = true;
  currentPage: number = 0;
 @Select(DataState.getCountries) countries$ : Observable<Array<string>>;

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router) {

  }

  ngOnInit(): void {

    this.store.dispatch(new GetListCountry())
      .pipe(take(1), pluck('Data', "helperList" , "addressListType"))
      .subscribe((
        addressListType:Array<AddressType>) => {
          this.addressType = addressListType;
        }
      )

    this.countries$.subscribe( res=> {
      this.countries = res;
    });

    this.buildUserForm()
    this.getUsers()
  }

  get firstName() {
    return this.newUser.get('firstName');
  }

  get lastName() {
    return this.newUser.get('lastName');
  }

  get username() {
    return this.newUser.get('username');
  }

  get mail() {
    return this.newUser.get('mail');
  }

  get phone() {
    return this.newUser.get('phone');
  }

  get pass() {
    return this.newUser.get('password');
  }

  get reapedPass() {
    return this.newUser.get('passwordCheck');
  }

  next(): void {
    if (this.user.addressList.length) {
      this.user = this.newUser.value
      this.toggleShowForm = false
    } else {
      if (this.newUser.valid) {
        if (this.newUser.value.password === this.newUser.value.passwordCheck) {
          if (this.currentPage) {
            this.user = this.newUser.value
            this.toggleShowForm = false
          }
          this.currentPage++
        }
      } else {
        this.validForm = false
      }
    }
  }

  previous(): void {
    this.currentPage--
  }

  addNewAddress(): void {
    const addressItem = this.fb.group({
      id: [this.user.addressList.length ? (this.user?.addressList[this.user.addressList.length - 1]?.id + 1) : 1],
      addressType: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      editStatus: false
    })
    this.addressListArray.push(addressItem);
    this.user = this.newUser.value
  }

  get addressListArray(): FormArray {
    return this.newUser.get('addressList') as FormArray;
  }

  delAddresField(id: number): void {
    this.addressListArray.removeAt(id);
  }

  sendForm(): void {
    this.store.dispatch((new AddUser(this.newUser.value)))
      .pipe(take(1))
      .subscribe(data => {
        this.router.navigate(['/main-page']);
      })
  }

  cancelSend(): void {
    this.user = this.buildUserForm().value
    this.router.navigate(['/main-page']);
  }

  getUsers(): void {
    this.store.dispatch(new FetchGetUsers())
      .pipe(take(1), pluck('Data', 'users'))
      .subscribe((users: User[]) => {
        this.users = users;
        this.buildUserForm();
      })
  }


  buildUserForm(): FormGroup {
    return this.newUser = this.fb.group({
      id: [this.users ? this.users[this.users.length - 1].id + 1 : null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern("[0-9]{10,15}")
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24),]
      ],
      passwordCheck: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24),]
      ],
      addressList: this.fb.array(
        this.user?.addressList?.map((el: Adress, i: number) => {
          return this.fb.group({
            id: [
              el.id || this.user.addressList[i].id,
            ],
            addressType: [
              el.addressType ||
              this.user.addressList[i].addressType ||
              ''
            ],
            address: [
              el.address || this.user.addressList[i].address || ''
            ],
            city: [
              el.city || this.user.addressList[i].city || "",
            ],
            country: [
              el.country || this.user.addressList[i].country || ""
            ],
            postalCode: [
              el.postalCode || this.user.addressList[i].postalCode || ""
            ],
            editStatus: [false]

          });
        })
      ),
    }, {
      validator:
        ConfirmedValidator('password', 'passwordCheck')
    })
  }

}
