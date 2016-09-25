import { mongoose } from "../config/db";
//import { Schema, Document, Model } from "mongoose";

export interface IManifest extends mongoose.Document {
    name: string;
    create: Date;
    configurations: Object;
    transforms: Object;
    options:Object
}

export interface IManifestModel extends IManifest, mongoose.Document  {
}

let manifestSchema = new mongoose.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object,
    transform: Object,
    options: Object
},{timestamps:true});

export const Manifest= mongoose.model<IManifestModel>("Manifest", manifestSchema);