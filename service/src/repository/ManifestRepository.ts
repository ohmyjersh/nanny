import BaseRepository from "./BaseRepository";
import IManifestModel from "../models/interfaces/IManifestModel";
import schema  from "../db/schema/ConfigurationSchema";
export default class ManifestRepository extends BaseRepository<IManifestModel> {
  constructor() {
    super(schema);
  }
}