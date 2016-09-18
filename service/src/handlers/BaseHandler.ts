import Read = require("./interfaces/Read");
import Write = require("./interfaces/Write");
interface BaseHandler<T> extends Read<T>, Write<T> 
{
}
export = BaseHandler;