// Section 1
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {User} from '../../core/interfaces/'
import {DeleteUser, AddUser, FetchGetUsers, UpdateUser} from '../actions/user.actions'
import {Login, GetUser} from '../actions/authentication.actions';
import {Injectable} from '@angular/core';
import {UsersService} from "../../core/services/users/users.service";
import {tap, map, filter} from 'rxjs/operators';
import {AuthGuardService} from "../../core/services/authentication/auth-guard.service";
import {HelperListService} from "../../core/services/helperList/helper-list.service";

const  user: User = {
  id: 1,
  firstName: "",
  lastName: "",
  username: "",
  mail: "",
  phone: 1,
  password: "",
  passwordCheck: "",
  addressList: []
}
// Section 2
export interface UsersStateStateModel {
  users: User[];
  loggedUser: User,
  helperListCountry: string[]
}


// Section 3
@State<UsersStateStateModel>({
  name: `Data`,
  defaults: {
    users: [],
    loggedUser: user,
    helperListCountry: []
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
          ctx.patchState({users});
        })
      )
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UsersStateStateModel>,
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
  delete({patchState, getState}: StateContext<UsersStateStateModel>,
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
  addNewUser({getState, patchState}: StateContext<UsersStateStateModel>,
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
  Login({getState, patchState}: StateContext<UsersStateStateModel>,
        payload: Login) {
    return this.authentication.login(payload)
      .pipe(
        filter(res => !!res),
        tap(user => {
          patchState({
            loggedUser: user
          });
          console.log('state=>>>> login', getState().loggedUser)
        })
      )
  }
  @Action(GetUser)
  GetUser({getState}: StateContext<UsersStateStateModel>):User {
    return getState().loggedUser
  }

}
