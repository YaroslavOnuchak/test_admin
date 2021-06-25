import {Component, Input, OnInit} from '@angular/core';
import {Adress, User} from "../../../core/interfaces";
import {take} from "rxjs/operators";
import {UsersService} from "../../../core/services/users/users.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User
  updateAdress: boolean = false;
  updateInfo: boolean = false;
  test = 12356;
  editForm: FormGroup;

  constructor(private usersService: UsersService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.buildUserForm(this.buildAddress(this.user))
    console.log("vall ",this.editForm.value)
  }

  updateContactInfo(user: User): void {
    this.updateInfo = !this.updateInfo;
  }

  updateAddsress(user: User, i: number): void {
    this.updateAdress = !this.updateAdress;
      console.log(this.buildAddress(user))

    if (this.updateAdress) {
      // this.usersService.updateTodo(user)
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
  buildUserForm(address: FormGroup): FormGroup {

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
            console.log("ellll",el)
             this.fb.group({
              id: [
                el.id || this.user.addressList[i].id ||null,
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


  buildAddress(user?: User, length?: number): any {
    // user?.addressList.forEach()
    // console.log("user",this.user)
   return
  }

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
