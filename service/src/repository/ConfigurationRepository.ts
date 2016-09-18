import BaseRepository from "./BaseRepository";
import IConfigurationModel from "../models/interfaces/IConfigurationModel";
import schema  from "../db/schema/ConfigurationSchema";
export default class ConfigurationRepository extends BaseRepository<IConfigurationModel> {
  constructor() {
    super(schema);
  }
}