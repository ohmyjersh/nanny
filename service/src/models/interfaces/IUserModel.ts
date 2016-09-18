import * as mongoose from 'mongoose';

interface IUserModel extends mongoose.Document {
  username: string;
  email:string;
}

export default IUserModel;