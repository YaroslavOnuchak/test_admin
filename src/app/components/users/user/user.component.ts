import {
  Component,
  Input,
  OnInit, OnChanges, OnDestroy
} from '@angular/core';
import {AddressType, Adress, User} from "../../../core/interfaces";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {pluck, take} from "rxjs/operators";

import {Store} from "@ngxs/store";
import {DeleteUser, UpdateUser} from "../../../store/actions/user.actions";
import {GetListCountry} from "../../../store/actions/helperList.actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  @Input() user: User

  users: Array<User> = [];
  updateInfo: boolean = false;
  showAddress: boolean = false;
  editForm: FormGroup;
  countries: Array<string>;
  addressType: Array<AddressType>

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.buildUserForm();
    this.store.dispatch(new GetListCountry())
      .pipe(take(1), pluck('Data', "helperList"))
      .subscribe(({
                    countryList,
                    addressListType
                  }: {
        countryList: Array<string>,
        addressListType: Array<AddressType>
      }) => {
        this.addressType = addressListType;
        this.countries = countryList;
      })

      //show the address while editing
      this.user?.addressList?.map(el => {
        if (this.user?.addressList[el.id - 1]?.editStatus) {
          this.showAddress = true;
          console.log(this.showAddress)
        }
      })
  }


  get addressListArray(): FormArray {
    return this.editForm.get('addressList') as FormArray;
  }

  deleteUser(index: number, pop?: any) {
    pop.hide();
    this.store.dispatch(new DeleteUser(index))
  }

  showAddressList(): void {
    this.showAddress = !this.showAddress;
  }

  deleteAddress(user: User, index: number, pop?: any): void {
    this.editForm.value.addressList.splice(index, 1)
    pop.hide();
    this.store.dispatch(new UpdateUser(this.editForm.value))
      .subscribe(() => {
        this.showAddress = true;
      });
  }

  updateContactInfo(user: User): void {
    this.updateInfo = !this.updateInfo;
    if (this.updateInfo) {
      return
    } else {
      this.store.dispatch(new UpdateUser(this.editForm.value));
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
    this.showAddress = true;
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
    this.user = this.editForm.value;
    this.showAddress = true
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
              el.country || this.user?.addressList[i]?.country || ''
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
