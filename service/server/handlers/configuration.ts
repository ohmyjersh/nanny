import { Configuration } from "../models/configuration";
export default class ConfigurationHandler {
    async create() {
        const result = await Configuration.create({thing:"thing"});
    }
}