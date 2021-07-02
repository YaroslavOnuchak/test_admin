import {User} from "../../core/interfaces";

export class FetchGetUsers {
  static readonly type = '[User] Fetch All';
}

export class DeleteUser {
  static readonly type = "[User] Del"

  constructor(public payload: number) {
  }
}

export class AddUser {
  static readonly type = "[User] Add"

  constructor(public payload: User) {
  }
}
