// Section 1
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {User} from '../../core/interfaces/'
import {DeleteUser, AddUser, FetchGetUsers, UpdateUser} from '../actions/user.actions'
import {Injectable} from '@angular/core';
import {UsersService} from "../../core/services/users/users.service";
import {tap} from 'rxjs/operators';

// Section 2
export interface UsersStateStateModel {
  users: User[];
}

// Section 3
@State<UsersStateStateModel>({
  name: 'Users',
  defaults: {
    users: []
  }
})
@Injectable()
export class UsersState {

  @Selector()
  static getUserList(state: UsersStateStateModel) {
    console.log("state =>  getUsers")
    return state.users
  }

  constructor(private userService: UsersService) {
  }

  @Action(FetchGetUsers)
  fetchAll(ctx: StateContext<UsersStateStateModel>) {
    return this.userService.getUsers()
      .pipe(
        tap(users => {
          console.log("state =>  fetchAll")
          ctx.patchState({users});
          // console.log(ctx.getState().users)
        })
      )
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UsersStateStateModel>,
             {payload}: UpdateUser) {
    console.log("state =>  updateUser")
    return this.userService.updateUser(payload)
      .pipe(
        // filter(res => !!res),
        tap(users => {
          ctx.setState({...ctx.getState(), ...payload});
          // console.log(ctx.getState().users)
        })
      )
  }

  @Action(AddUser)
  addNewUser({getState, setState}: StateContext<UsersStateStateModel>,
             {payload}: AddUser) {
    console.log("state =>  addNewUser")
    return this.userService.postUser(payload)
      .pipe(
        // filter(res => !!res),
        tap(users => {
          // console.log(payload)
          setState({...getState(), ...payload});
          // console.log('AddUser', getState().users)
        })
      )
  }

  @Action(DeleteUser)
  delete({getState, patchState}: StateContext<UsersStateStateModel>,
         {payload}: DeleteUser) {
    const state = getState();
    const filteredArray = state.users.filter(item => item.id !== payload);
    patchState({
      ...state,
      users: filteredArray,
    });
    console.log("state =>  delete");
    this.userService.delUser(payload)
    return;

  }
}
