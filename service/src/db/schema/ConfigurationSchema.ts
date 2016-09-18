import DataAccess = require("./../db");
import BaseSchema from "./BaseSchema";

export class ConfigurationSchema extends BaseSchema { 
    schema () {
       var schema =  this.mongoose.Schema({
           name : {
               type: String,
               required: true
           },
           configurations: {
               type: {String:String},
               required: true
           }
       });
       
       return schema;
   }
   
}

var schema = new BaseSchema().buildSchema("configurations", ConfigurationSchema);
export default schema;