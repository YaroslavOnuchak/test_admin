import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {Adress, User} from "../../../core/interfaces";
import {take} from "rxjs/operators";
import {UsersService} from "../../../core/services/users/users.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  private unsubscribe = new Subject();
  @Output() update = new EventEmitter<any>();
  @Input() user: User
  // updateAdress: boolean = false;
  statusAddress: boolean = false;
  updateInfo: boolean = false;
  test = 12356;
  editForm: FormGroup;

  constructor(private usersService: UsersService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildUserForm()
  }

  updateContactInfo(user: User): void {
    this.updateInfo = !this.updateInfo;
    if (this.updateInfo) {
      return
    } else {
      this.setUser(this.editForm.value, this.update)

    }
  }

  addNewAddress(): void {
    const addressItem = this.fb.group({
      id: this.user?.addressList[this.user.addressList.length - 1]?.id + 1 ||1,
      addressType: '',
      address: '',
      city: '',
      postalCode: '',
      editStatus: true
    })
    this.addressListArray.push(addressItem);
    this.user = this.editForm.value

  }

  get addressListArray() : FormArray {
    return this.editForm.get('addressList') as FormArray;
  }
  deleteUser(user:User):void{
    this.usersService.delUser(user.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.update.emit()
      });

  }
  deleteAddress(user: User, index: number): void {
    this.editForm.value.addressList.splice(index, 1)
    this.setUser(this.editForm.value, this.update )
  }

  updateAddsress(user: User, i: number): void {
    if(user.addressList[i].editStatus){
      this.editForm.value.addressList[i].editStatus = false
      this.user = this.editForm.value
    }else{
      this.editForm.value.addressList[i].editStatus = true
      this.user = this.editForm.value
    }
      this.setUser(this.editForm.value, this.update )
  }


  setUser(user : User, emit:EventEmitter<any>):void{
    this.usersService.updateUser(user)
      .pipe(take(1))
      .subscribe(data => {
        emit.emit()
      })
  }
  //
  //


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
      ], mail: [
        this.user ? this.user.mail : ""
      ], phone: [
        this.user ? this.user.phone : ""
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
            postalCode: [
              el.postalCode || this.user.addressList[i].postalCode || " "
            ], editStatus: [
              el.editStatus || this.user.addressList[i].editStatus || false
            ]
          });
        })
      )
    })
  }
}
