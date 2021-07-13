// Section 1
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AddressType, User} from '../../core/interfaces'

import {DeleteUser, GetFilterUsers, AddUser, FetchGetUsers, UpdateUser} from '../actions/user.actions'
import {Login, LoginGoogle, GetLoggedUser} from '../actions/authentication.actions';
import {SetListCountry, GetAddressType, GetListCountry} from '../actions/helperList.actions';

import {tap, map, filter} from 'rxjs/operators';
import {UsersService} from "../../core/services/users/users.service";
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";
import {HelperListService} from "../../core/services/helperList/helper-list.service";
import {SocialUser} from "angularx-social-login";
import {Observable} from "rxjs";

const defaultUser: User = {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: 0,
    password: "",
    passwordCheck: "",
    addressList: []
  },
  defaultAddressType: Array<AddressType> = [
    {value: 'Billing', text: 'Billing Address '},
    {value: 'Shipment', text: 'Shipment Address '},
    {value: 'Home', text: 'Home Address '}];


// Section 2
export interface DataStateModel {
  users: User[];
  loggedUser: User,
  helperList: {
    countryList: string[],
    addressListType: AddressType[],
  }
}


// Section 3
@State<DataStateModel>({
  name: `Data`,
  defaults: {
    users: [],
    loggedUser: defaultUser,
    helperList: {
      countryList: [],
      addressListType: defaultAddressType,
    }
  }
})
@Injectable()
export class DataState {

  @Selector()
  static getUserList(state: DataStateModel): Array<User> {
    return state.users;

  }

  @Selector()
  static getCountries(state: DataStateModel): Array<string> {
    return state.helperList.countryList
  }

  constructor(
    private userService: UsersService,
    private authentication: AuthGuardService,
    private helperListService: HelperListService,
  ) {
  }

  @Action(FetchGetUsers)
  fetchAll(ctx: StateContext<DataStateModel>) {
    return this.userService.getUsers()
      .pipe(
        filter(res => !!res),
        tap(users => {
          ctx.patchState({users});
        })
      )
  }

  @Action(GetFilterUsers)
  getFilterUsers(ctx: StateContext<DataStateModel>, {payload}: GetFilterUsers) {
    return this.userService.getFilterUsers(payload)
      .pipe(
        filter(res => !!res),
        tap(users => {
          ctx.patchState({users});
        })
      )
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<DataStateModel>,
             {payload}: UpdateUser) {
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
  delete({patchState, getState}: StateContext<DataStateModel>,
         {payload}: DeleteUser) {
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
  addNewUser({getState, patchState}: StateContext<DataStateModel>,
             {payload}: AddUser) {
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
  Login({getState, patchState}: StateContext<DataStateModel>,
        payload: Login):Observable<User> {
    return this.authentication.login(payload)
      .pipe(
        // filter(res => !!res),
        tap(user => {
          patchState({
            loggedUser: user
          });
        })
      )
  }

  @Action(LoginGoogle)
  loginGoogle(ctx: StateContext<DataStateModel>) :Observable<User>{

    return this.authentication.loginGoogle()
      .pipe(
        tap(googleUser => {
          ctx.patchState({
            loggedUser: googleUser
          })
        })
      )
  }

  @Action(GetLoggedUser)
  GetLoggedUser({getState}: StateContext<DataStateModel>): User {
    return getState().loggedUser
  }

  @Action(SetListCountry)
  SetListCountry({getState, patchState}: StateContext<DataStateModel>): any {
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
        })
      )
  }

  @Action(GetListCountry)
  GetListCountry({getState}: StateContext<DataStateModel>): Array<string> {
    return getState().helperList.countryList
  }

  @Action(GetAddressType)
  GetAddressType({getState}: StateContext<DataStateModel>): Array<AddressType> {
    return getState().helperList.addressListType
  }

}
