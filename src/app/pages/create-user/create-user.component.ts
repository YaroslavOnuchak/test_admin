import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressType, Adress, User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {take} from "rxjs/operators";
import {Router} from '@angular/router';
import {HelperListService} from "../../core/services/helperList/helper-list.service";
import {ConfirmedValidator} from "../../core/validators/confirm";
import {Store} from "@ngxs/store";
import {AddUser, DeleteUser} from "../../store/actions/user.actions";


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
    addressList: [{
      id: 1,
      addressType: '',
      address: '',
      city: '',
      country: "",
      postalCode: '',
      editStatus: true
    }]
  }
  users: Array<User>;
  countries: Array<string>;
  addressType: Array<AddressType> = [
    {value: 'Billing', text: 'Billing Address '},
    {value: 'Shipment', text: 'Shipment Address '},
    {value: 'Home', text: 'Home Address '}];
  toggleShowForm: boolean = true;
  validForm: boolean = true;
  currentPage: number = 0;


  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private helpListService: HelperListService,
              private store: Store,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildUserForm()
    this.getUsers()
    this.getCountries()
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

  // checkShowHelpList(index:number):void{
  //   if((this.newUser.value.addressList[index].country)===""){
  //     return
  //   }else{
  //     this.showHelpList= true;
  //   }
  // }

  // getHelpListValue(e: any, index: number): void {
  //   this.newUser.value.addressList[index].country = e.target.value;
  // }


  next(): void {
    if (this.currentPage === this.user.addressList.length) {
      this.user = this.newUser.value
      this.toggleShowForm = false
    } else {
      if (this.newUser.valid) {
        if (this.newUser.value.password === this.newUser.value.passwordCheck) {
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
    // console.log("object", this.newUser.value.addressList[0]?.country)
    const addressItem = this.fb.group({
      id: this.user.addressList[this.user.addressList.length - 1].id + 1,
      addressType: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      editStatus: false
    })
    this.addressListArray.push(addressItem);
    console.log("'selectedCity'", this.newUser.value)
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
    this.usersService.getUsers().pipe(take(1)
    ).subscribe(data => {
      this.users = data;
      this.buildUserForm();
    })
  }

  getCountries(): void {
    this.helpListService.getAll().pipe(take(1)
    ).subscribe(data => {
      // this.users = data;
      this.countries= new Array(data.length)
      data.map((el, index) => {
        this.countries[index]=el.name
      })
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
        Validators.pattern("[0-9]{10}")
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
        this.user.addressList?.map((el: Adress, i: number) => {
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
