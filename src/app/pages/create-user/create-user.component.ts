import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Adress, User} from "../../core/interfaces";
import {UsersService} from "../../core/services/users/users.service";
import {take} from "rxjs/operators";
import {Router, ActivatedRoute} from '@angular/router';


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
      postalCode: '',
      editStatus: true
    }
    ]
  }
  users: Array<User>;
  addressType :any=[ // add interface AddressType
    {value:'Billing', text:'Billing Address '},
    {value:'Shipment', text:'Shipment Address '},
    {value:'Home', text:'Home Address '}];
  toggleShowForm: boolean = true;
  toggle: boolean = true;
  curentPage: number = 0;

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.buildUserForm()
    this.getUsers()
  }


  next(): void {
    if (this.curentPage === this.user.addressList.length) {
      this.user = this.newUser.value
      this.toggleShowForm = false
    } else {
      this.curentPage++
    }
  }

  previous(): void {
    this.curentPage--

  }

  addNewAddress(): void {
    const addressItem = this.fb.group({
      id: this.user.addressList[this.user.addressList.length - 1].id + 1,
      addressType: '',
      address: '',
      city: '',
      postalCode: '',
      editStatus: false
    })
    this.addressListArray.push(addressItem);
  }
  get addressListArray() : FormArray {
    return this.newUser.get('addressList') as FormArray;
  }
  delAddresField(id:number):void{
    this.addressListArray.removeAt(id);
  }
  sendForm():void{
    this.usersService.postUser(this.newUser.value)
      .pipe(take(1))
      .subscribe(data => {
        this.router.navigate(['/main-page']);
      })

  }  canselSend():void{
    this.user =this.buildUserForm().value
        this.router.navigate(['/main-page']);
  }
  getUsers(): void {
    this.usersService.getUsers().pipe(take(1)
    ).subscribe(data => {
      this.users = data;
      this.buildUserForm()
    })
  }


  buildUserForm(): FormGroup {
    return this.newUser = this.fb.group({
      id: [this.users ? this.users[this.users.length - 1].id + 1 : null],
      firstName:  ['', Validators.required],
      lastName:  ['', Validators.required],
      username: ['', Validators.required],
      mail:  ['', Validators.required],
      phone: ['', Validators.required],
      password:  ['', Validators.required],
      passwordCheck:  ['', Validators.required],
      addressList: this.fb.array(
       this.user.addressList?.map((el: Adress, i: number) => {
          return this.fb.group({
            id: [
              el.id || this.user.addressList[i].id,Validators.required
            ],
            addressType: [
              el.addressType ||
              this.user.addressList[i].addressType ||
              '', Validators.required
            ],
            address: [
              el.address || this.user.addressList[i].address || ' ',Validators.required
            ],
            city: [
              el.city || this.user.addressList[i].city || " ",
              Validators.required
            ],
            postalCode: [
              el.postalCode || this.user.addressList[i].postalCode || " "
            ], editStatus:  [false]

          });
        })
      )
    })
  }
}
