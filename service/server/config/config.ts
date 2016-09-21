export default class {
    private _secret:string; // later get from .env
    constructor() {
        this._secret = "THISISSECRET";
    }
    getSecret() {
        return this._secret;
    }
}