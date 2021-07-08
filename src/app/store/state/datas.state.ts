// Section 1
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddressType, User } from '../../core/interfaces'

import { DeleteUser, AddUser, FetchGetUsers, UpdateUser } from '../actions/user.actions'
import { Login, GetLoggedUser } from '../actions/authentication.actions';
import { SetListCountry, GetAddressType, GetListCountry } from '../actions/helperList.actions';

import { tap, map, filter } from 'rxjs/operators';
import { UsersService } from "../../core/services/users/users.service";
import { AuthGuardService } from "../../core/services/authentication/auth-guard.service";
import { HelperListService } from "../../core/services/helperList/helper-list.service";

const user: User = {
  id: 1,
  firstName: "",
  lastName: "",
  username: "",
  mail: "",
  phone: 1,
  password: "",
  passwordCheck: "",
  addressList: []
},
  addressType: Array<AddressType> = [
    { value: 'Billing', text: 'Billing Address ' },
    { value: 'Shipment', text: 'Shipment Address ' },
    { value: 'Home', text: 'Home Address ' }];


// Section 2
export interface UsersStateStateModel {
  users: User[];
  loggedUser: User,
  helperList: {
    countryList: string[],
    addressListType: AddressType[],
  }
}


// Section 3
@State<UsersStateStateModel>({
  name: `Data`,
  defaults: {
    users: [],
    loggedUser: user,
    helperList: {
      countryList: [],
      addressListType: addressType,
    }
  }
})
@Injectable()
export class UsersState {

  @Selector()
  static getUserList(state: UsersStateStateModel): Array<User> {
    return state.users
  }

  constructor(
    private userService: UsersService,
    private authentication: AuthGuardService,
    private helperListService: HelperListService,
  ) {
  }

  @Action(FetchGetUsers)
  fetchAll(ctx: StateContext<UsersStateStateModel>) {
    return this.userService.getUsers()
      .pipe(
        filter(res => !!res),
        tap(users => {
          ctx.patchState({ users });
        })
      )
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UsersStateStateModel>,
    { payload }: UpdateUser) {
    return this.userService.updateUser(payload).pipe
      (
        filter(res => !!res),
        tap(res => {
          const UserList = [...ctx.getState().users];
          UserList[UserList.findIndex(item => item.id === payload.id)] = payload;
          ctx.setState({
            ...ctx.getState(), users: UserList,
          });
        })
      )
  }

  @Action(DeleteUser)
  delete({ patchState, getState }: StateContext<UsersStateStateModel>,
    { payload }: DeleteUser) {
    return this.userService.deleteUser(payload).pipe(
      tap(
        res => {
          patchState({
            users: getState().users.filter(item => item.id !== payload),
          })
        }
      )
    )
  }

  @Action(AddUser)
  addNewUser({ getState, patchState }: StateContext<UsersStateStateModel>,
    { payload }: AddUser) {
    return this.userService.postUser(payload)
      .pipe(
        filter(res => !!res),
        tap(users => {
          const state = getState();
          patchState({
            users: [...state.users, payload]
          });
        })
      )
  }

  @Action(Login)
  Login({ getState, patchState }: StateContext<UsersStateStateModel>,
    payload: Login) {
    return this.authentication.login(payload)
      .pipe(
        filter(res => !!res),
        tap(user => {
          patchState({
            loggedUser: user
          });
        })
      )
  }

  @Action(GetLoggedUser)
  GetLoggedUser({ getState }: StateContext<UsersStateStateModel>): User {
    return getState().loggedUser
  }

  @Action(SetListCountry)
  SetListCountry({ getState, patchState }: StateContext<UsersStateStateModel>): any {
    return this.helperListService.getAll()
      .pipe(
        filter(res => !!res),
        tap(country => {
          patchState({
            helperList: {
              ...getState().helperList,
              countryList: country,
            }
          });
          // console.log('getState().helperList,', getState().helperList)
        })
      )
  }

  @Action(GetListCountry)
  GetListCountry({ getState }: StateContext<UsersStateStateModel>): Array<string> {
    return getState().helperList.countryList
  }

  @Action(GetAddressType)
  GetAddressType({ getState }: StateContext<UsersStateStateModel>): Array<AddressType> {
    return getState().helperList.addressListType
  }

}
