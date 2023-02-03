import { Optional, Model } from "sequelize";

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  salt: string;
  name: string;
  lastname: string;
  country: string;
  state: string;
  city: string;
  zip: number;
  phone: number;
  admin: boolean;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>

export interface UserInstance 
  extends Model<UserAttributes>,
    UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }
