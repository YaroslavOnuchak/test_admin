

export interface Adress {
  id: number,
  addressType: string,
  address: string,
  city: string,
  postalCode: string,
  editStatus?: boolean

}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  mail: string,
  phone: number,
  password: string;
  passwordCheck?: string;
  addressList: Array<Adress>,
  token?: string,
}
