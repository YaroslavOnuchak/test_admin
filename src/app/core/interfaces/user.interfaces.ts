import {Role} from "./role";


export interface Adress {
  id: number,
  addressType: string,
  address: string,
  city: string,
  postalCode: string,

}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  mail: string,
  phone: number,
  password: string;
  addressList: Array<Adress>,
  role?: Role,
  token?: string,
}
