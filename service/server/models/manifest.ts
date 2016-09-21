import { mongoose } from "../config/db";
import { Schema, Document, Model } from "mongoose";

export interface Manifest extends Document {
    name: string;
    create: Date;
    configurations: Object;
    transforms: Object;
    options:Object
}

export interface IManifestModel {
    findByName(name: string): Promise<Manifest>
}

let schema = new Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object,
    transform: Object,
    options: Object
},{timestamps:true});

schema.static("findByName", (name: string) => {
    return Manifest
        .findOne({ name: name})
        .lean()
        .exec();
});

export type ManifestModel = Model<Manifest> & IManifestModel;

export const Manifest: ManifestModel = <ManifestModel>mongoose.model<Manifest>("Manifest", schema);