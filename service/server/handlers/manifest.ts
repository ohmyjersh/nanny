import { Manifest } from "../models/manifest";
export default class ManifestHandler {
    async create() {
        const result = await Manifest.create({thing:"thing"});
    }
}