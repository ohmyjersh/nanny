import { Configuration } from "../models/configuration";
import { Manifest } from "../models/manifest";

export default class Generate {
    configurations(request:any) {
        var manifest = Manifest.findByName(request.manifest.name);
        request.configurations.forEach((x) => {
            var result = Configuration.findAllByName(x);
        });
    }
} 