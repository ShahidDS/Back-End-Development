import { randomPersonRoutes } from "./randomPerson";
export type User = {
  name: string;
  age: number;
  email: string;
};

export type RandomPersonResponse = {
  fullName: string;
  country: string;
};

export type RandomLoginResponse = {
  username: string;
  registeredDate: string;
  summary: string;
};

export type RandomAddressResponse = {
  city: string;
  postcode: string;
};
