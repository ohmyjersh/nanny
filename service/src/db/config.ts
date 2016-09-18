class Config {
    
    static DB_CONNECTION_STRING: string  = "mongodb://localhost/incomm"; 
}
Object.seal(Config);
export = Config;
