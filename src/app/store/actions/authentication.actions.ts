import {User} from "../../core/interfaces";


export class Login {
  static readonly type = "[Authentication] Login"

  constructor(
    public username: string, public password: string
  ) {
  }
}

export class GetUser {
  static readonly type = "[Authentication] GetUser"

}

