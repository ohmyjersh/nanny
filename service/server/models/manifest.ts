import { mongoose } from "../config/db";
//import { Schema, Document, Model } from "mongoose";

export interface IManifest extends mongoose.Document {
    title: string;
    manifest:string;
    raw:string;
}

export interface IManifestModel extends IManifest, mongoose.Document  {
}

let manifestSchema = new mongoose.Schema({
    title: String,
    manifest: String,
    raw:String
},{timestamps:true});

export const Manifest= mongoose.model<IManifestModel>("Manifest", manifestSchema);