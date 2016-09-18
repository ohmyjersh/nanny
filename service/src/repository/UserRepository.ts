import BaseRepository from "./BaseRepository";
import IUserModel from "../models/interfaces/IUserModel";
import schema  from "../db/schema/ConfigurationSchema";
export default class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    super(schema);
  }
}