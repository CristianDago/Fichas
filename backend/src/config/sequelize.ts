import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Profile } from "../models/profile.model";

const createSequelizeInstance = (
  connectionString: string,
  models: any[],
  name: string,
  dialect: "mysql" | "postgres"
): Sequelize => {
  if (!connectionString) {
    throw new Error(`Environment variable for ${name} database not found.`);
  }

  return new Sequelize(connectionString, {
    dialect: dialect,
    models,
    logging: false,
  });
};

export const sequelizeUser = createSequelizeInstance(
  process.env.CONNECT_DG_USERS!,
  [User],
  "User",
  "mysql"
);

export const sequelizeProfile = createSequelizeInstance(
  process.env.CONNECT_DG_PROFILE!,
  [Profile],
  "Profile",
  "mysql"
);
