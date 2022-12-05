import { Schooling } from "./enuns/schooling";

export class User {
  constructor() { };
  id!: number;
  firstName!: string;
  lastName!: string;
  userEmail!: string;
  userBirthdayDate!: string;
  schooling!: Schooling
}
