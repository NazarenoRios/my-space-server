import { DataTypes, Model } from "sequelize";
import { UserAttributes,UserCreationAttributes } from "../interfaces/user.interface";
import db from "../db";
import bcrypt from "bcrypt";

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare email: string;
  declare password: string;
  declare salt: string;
  declare name: string;
  declare lastname: string;
  declare country: string;
  declare state: string;
  declare city: string;
  declare zip: number;
  declare phone: number;
  declare admin: boolean;

  hashedPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password: string) {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.BIGINT,
    },
    admin: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize: db, modelName: "User", tableName: "users", timestamps: false }
);

User.beforeCreate((user: any) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;

  return user.hashedPassword(user.password, user.salt).then((hash: string) => {
    user.password = hash;
  });
});

User.beforeUpdate((user: any) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;

  return user.hashedPassword(user.password, user.salt).then((hash: string) => {
    user.password = hash;
  });
});

export default User;
