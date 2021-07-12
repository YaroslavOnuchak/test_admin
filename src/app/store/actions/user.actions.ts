import {User} from "../../core/interfaces";
import {FormGroup} from "@angular/forms";

export class FetchGetUsers {
  static readonly type = '[User] Fetch All';
}

export class DeleteUser {
  static readonly type = "[User] Del"

  constructor(public payload: number) {
  }
}export class GetFilterUsers {
  static readonly type = "[User] getFilterUsers"

  constructor(public payload: FormGroup) {
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
