export class Login {
  static readonly type = "[Authentication] Login"
  constructor(
    public username: string, public password: string
  ) {
  }
}

export class GetLoggedUser {
  static readonly type = "[Authentication] GetUser"

}

export class LoginGoogle {
  static readonly type = "[Authentication] GetUserGoogle"

}
export class CheckLoggedUser {
  static readonly type = "[Authentication] CheckLoggedUser"

}

