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

export class UpdateUser {
  static readonly type = "[User] Update"

  constructor(public payload: User) {
  }
}
