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
  // @Output() save = new EventEmitter<string>();
  // @Output() delAddress = new EventEmitter<string>();
  @Output() update = new EventEmitter<any>();
  @Input() user: User
  // updateAdress: boolean = false;
  statusAddress: boolean = false;
  updateInfo: boolean = false;
  test = 12356;
  editForm: FormGroup;

  // private modalService: BsModalService

  constructor(private usersService: UsersService,
              private fb: FormBuilder,
              // private modalService: P,
              private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.buildUserForm()
    // console.log("onOn")
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
    this.editForm.value.addressList.push({
      id: this.user.addressList[this.user.addressList.length - 1].id + 1,
      addressType: '',
      address: '',
      city: '',
      postalCode: '',
      editStatus: true
    })
    this.setUser(this.editForm.value, this.update )
    // this.user = this.editForm.value
    console.log("addUUUUUU", this.user.addressList[ this.user.addressList.length-1])
    console.log("addFFFFF", this.editForm.value.addressList[ this.editForm.value.addressList.length-1])
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
    // this.update.emit()
      console.log('1=>', this.editForm.value.addressList.length+ " "+this.user.addressList.length)
    if(this.editForm.value.addressList.length>this.user.addressList.length){

      console.log('1', this.editForm.value.addressList.length)
    }else{
      console.log('2')
    }
    user.addressList[i].editStatus = !user.addressList[i].editStatus,
      this.editForm.value.addressList[i].editStatus = !this.editForm.value.addressList[i].editStatus

    if (user.addressList[i].editStatus) {
    } else {
      this.setUser(this.editForm.value, this.update )

    }
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
  // get addressList() {
  //   // return this.editForm.get('addressList') as FormArray;
  // }
  // addAlias() {
    // this.addressList.push(this.fb.control(''));
  // }

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
          // console.log("ellll",el)
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
