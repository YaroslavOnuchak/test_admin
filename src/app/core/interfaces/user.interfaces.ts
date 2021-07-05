export interface AddressType {
  value: string,
  text: string
}

export interface Adress {
  id: number,
  addressType: string,
  address: string,
  city: string,
  postalCode: string,
  country?: any,
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
