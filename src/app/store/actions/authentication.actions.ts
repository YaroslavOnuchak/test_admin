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
