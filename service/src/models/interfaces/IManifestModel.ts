import * as mongoose from 'mongoose';

interface IConfigurationModel extends mongoose.Document {
  name: string;
  options:Object;
  configurations:Object;
  transforms:Object;

}

export default IConfigurationModel;