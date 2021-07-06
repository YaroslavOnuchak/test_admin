import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {AddressType, Adress, User} from "../../../core/interfaces";
import {UsersService} from "../../../core/services/users/users.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Subject} from 'rxjs';

import {Store} from "@ngxs/store";
import {DeleteUser, FetchGetUsers, UpdateUser} from "../../../store/actions/user.actions";
// import { BsModalService, BsModalRef } from "ngx-bootstrap/tooltip";
import {PopoverModule} from 'ngx-bootstrap/popover';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  private unsubscribe = new Subject();
  @Output() update = new EventEmitter<any>();
  @Input() user: User


  users: Array<User> = [];
  updateInfo: boolean = false;
  editForm: FormGroup;
  addressType: Array<AddressType> = [
    {value: 'Billing', text: 'Billing Address '},
    {value: 'Shipment', text: 'Shipment Address '},
    {value: 'Home', text: 'Home Address '}];

  constructor(private usersService: UsersService,
              private fb: FormBuilder,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.buildUserForm()
  }

  getUsers(): void {
    this.store.dispatch(new FetchGetUsers())
      .subscribe(data => {
        // console.log("dara=> ",data)
        this.users = data.Users.users;
      })

  }

  get addressListArray(): FormArray {
    return this.editForm.get('addressList') as FormArray;
  }

  deleteUser_Store(index: number, pop?: any) {
    pop.hide();
    this.store.dispatch(new DeleteUser(index))
    // this.update.emit()
  }

  deleteAddress(user: User, index: number, pop?: any): void {
    this.editForm.value.addressList.splice(index, 1)
    pop.hide();
    this.store.dispatch(new UpdateUser(this.editForm.value)).subscribe(() => {

    });
    // this.update.emit()
  }

  updateContactInfo(user: User): void {
    this.updateInfo = !this.updateInfo;
    if (this.updateInfo) {
      return
    } else {
      this.store.dispatch(new UpdateUser(this.editForm.value));
      // this.update.emit();
    }
  }

  updateAddsress(user: User, i: number): void {
    if (user.addressList[i].editStatus) {
      this.editForm.value.addressList[i].editStatus = false
      this.user = this.editForm.value
    } else {
      this.editForm.value.addressList[i].editStatus = true
      this.user = this.editForm.value
    }
    this.store.dispatch(new UpdateUser(this.editForm.value));
    // this.update.emit();
  }

  addNewAddress(): void {
    const addressItem = this.fb.group({
      id: this.user?.addressList[this.user.addressList.length - 1]?.id + 1 || 1,
      addressType: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      editStatus: true
    })
    this.addressListArray.push(addressItem);
    this.user = this.editForm.value
  }

  buildUserForm(address?: FormGroup): FormGroup {

    return this.editForm = this.fb.group({
      id: [
        this.user.id ? this.user.id : ''
      ],
      firstName: [
        this.user ? this.user.firstName : '',
      ],
      lastName: [
        this.user ? this.user.lastName : ''
      ],
      username: [
        this.user ? this.user.username : ""
      ],
      mail: [
        this.user ? this.user.mail : ""
      ],
      phone: [
        this.user ? this.user.phone : ""
      ],
      password: [
        this.user ? this.user.password : ""
      ],
      passwordCheck: [
        this.user ? this.user.passwordCheck : ""
      ],
      addressList: this.fb.array(
        this.user.addressList?.map((el: Adress, i: number) => {
          return this.fb.group({
            id: [
              el.id || this.user.addressList[i].id,
            ],
            addressType: [
              el.addressType || this.user.addressList[i].addressType || ''
            ],
            address: [
              el.address || this.user.addressList[i].address || ' ',
            ],
            city: [
              el.city || this.user.addressList[i].city || " "
            ],
            country: [
              el.city || this.user.addressList[i].city || " "
            ],
            postalCode: [
              el.postalCode || this.user.addressList[i].postalCode || " "
            ],
            editStatus: [
              el.editStatus || this.user.addressList[i].editStatus || false
            ]
          });
        })
      )
    })
  }
}
