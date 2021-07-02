// Section 1
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {User} from '../../core/interfaces/'
import {DeleteUser, AddUser, FetchGetUsers} from '../actions/user.actions'
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UsersService} from "../../core/services/users/users.service";

// Section 2
export class UsersStateStateModel {
  users: User[];
}

// Section 3
@State<UsersStateStateModel>({
  name: 'users',
  defaults: {
    users: []
  }
})
@Injectable()
export class UsersState {
  @Selector()
  static getUsers(state: UsersStateStateModel) {
    return state.users
  }

  constructor(private userService: UsersService) {
  }
  @Action(FetchGetUsers)
  getAll({getState, setState}: StateContext<UsersStateStateModel>,
         {payload}: AddUser) {
    this.userService.getUsers().pipe(filter(res => !!res))
    console.log("state get all=>")
    fetch('http://localhost:3000/users/')
      .then((response) =>
        response.json()).then(json => {
      console.log(json)
      const state = getState();
      setState({
        users: [...state.users, json]
      })
    })
      .catch(function () {
        // vm.dataError = true
      })

  }

  @Action(AddUser)
  add({getState, setState}: StateContext<UsersStateStateModel>, {payload}: AddUser) {
    const state = getState();
    setState({
      users: [...state.users, payload]
    })
  }

  @Action(DeleteUser)
  delete({getState, setState}: StateContext<UsersStateStateModel>,
         {payload}: DeleteUser) {
    fetch(`http://localhost:3000/users/${payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify()
    })
      .then(response => {
        return response.json()
      })
      .then(data =>
        // this is the data we get after doing the delete request, do whatever you want with this data
        console.log('=>>', data)
      );

    setState({
      users: getState().users
        .filter(user => {
          // DELETE `http://localhost:3000/users/${user.id}`
          // this.http.delete<any>(`${environment.apiUrl}/users/${userId}`)

        })
    })
  }
}
