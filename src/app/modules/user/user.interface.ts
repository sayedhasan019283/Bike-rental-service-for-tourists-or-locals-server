import { USER_ROLE } from "./user.constant";

export type TUser = {
    _id?:string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
}

export type TLoginUser = {
    email: string;
    password: string;
  };

  export type TUserRole = keyof typeof USER_ROLE;
  
