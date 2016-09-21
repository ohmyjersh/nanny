import { mongoose } from "../config/db";
import { Schema, Document, Model } from "mongoose";

export interface IManifest extends Document {
    name: string;
    create: Date;
    configurations: Object;
    transforms: Object;
    options:Object
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

export const Manifest= mongoose.model("Manifest", schema);