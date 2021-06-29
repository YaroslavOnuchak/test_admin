import {Component, Input, OnInit,Output, EventEmitter ,OnChanges} from '@angular/core';
import {Adress, User} from "../../../core/interfaces";
import {take} from "rxjs/operators";
import {UsersService} from "../../../core/services/users/users.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private unsubscribe = new Subject();
  @Output() save = new EventEmitter<string>();

  @Input() user: User
  // updateAdress: boolean = false;
  statusAddress: boolean = false;
  updateInfo: boolean = false;
  test = 12356;
  editForm: FormGroup;

  constructor(private usersService: UsersService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.buildAddress(this.user)
    this.buildUserForm()
    // console.log(this.addressList())
    // console.log("vall ",this.editForm.value.addressList)
  }
  ngOnChanges():void{
    console.log(`chenge` )
  }
  
  updateContactInfo(user: User): void {
    this.updateInfo = !this.updateInfo;
  }
  
  updateAddsress(user: User, i: number): void {
    // this.statusAddress = !this.statusAddress;
    user.addressList[i].editStatus = !user.addressList[i].editStatus
    
    if ( user.addressList[i].editStatus ) {
      console.log("==>>>",i)
    }else{
      console.log("vall ",this.editForm.value.addressList[i])
      this.usersService.updateTodo(this.editForm.value) .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        // this.getTodos()
      })
      this.usersService.getUsers().pipe(take(1)
      ).subscribe(data => {
        console.log(data)
        // this.user = data
      })
      // this.buildUserForm()
    this.save.emit('em111111it')

    }
  }

  // test1(): void {
  //   // let searchData1 = this.searchForm.value;
  //   // console.log(searchData1)
  //   // let searchData = Object.values(this.searchForm.value)
  //   this.usersService.test().pipe(take(1)
  //   ).subscribe(data => {
  //     console.log(data)
  //     // this.users = data
  //   })
  //
  // }
  //
  // get addressList() {
  //   // return this.editForm.get('addressList') as FormArray;
  // }
  addAlias() {
    // this.addressList.push(this.fb.control(''));
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
      ], mail: [
        this.user ? this.user.mail : ""
      ], phone: [
        this.user ? this.user.phone : ""
      ],
      addressList: this.fb.array(
          this.user.addressList?.map((el:Adress, i:number) => {
            // console.log("ellll",el)
            return  this.fb.group({
              id: [
                el.id || this.user.addressList[i].id ,
              ],
              addressType: [
                el.addressType || this.user.addressList[i].addressType || 'home'
              ],
              address: [
                el.address || this.user.addressList[i].address || ' ',
              ],
              city: [
                el.city || this.user.addressList[i].city ||" "
              ],
              postalCode: [
                el.postalCode || this.user.addressList[i].postalCode || " "
              ]
            });
          })
        )

    })
  }


  // buildAddress(user?: User, length?: number): any {
  //   // user?.addressList.forEach()
  //   // console.log("user",this.user)
  //  return
  // }

}

// this.editForm = this.fb.group({
//   id: [
//     this.user.id ? this.user.id : ''
//   ],
//   firstName: [
//     this.user ? this.user.firstName : '',
//   ],
//   lastName: [
//     this.user ? this.user.lastName : ''
//   ],
//   username: [
//     this.user ? this.user.username : ""
//   ], mail: [
//     this.user ? this.user.mail : ""
//   ], phone: [
//     this.user ? this.user.phone: ""
//   ],
//   address: this.fb.array([this.fb.group({
// id: [
//             this.user.address ? this.user.address[i].id : null,
//           ],
//           addressType: [
//             this.user.address ? this.user.address[i].addressType : 'home'
//           ],
//           address: [
//             this.user.address ? this.user.address[i].address : '',
//           ],
//           city: [
//             this.user.address ? this.user.address[i].city : ''
//           ],
//           postalCode: [
//             this.user.address ? this.user.address[i].city : ""
//           ]
//   })])
//
// })
