import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as http from "http";
import { GeneratorRouter } from "./routes/generator";
import { ConfigurationRouter } from "./routes/configuration";
import { ManifestRouter } from "./routes/manifest";
import { AuthenticationRouter } from "./routes/authentication";
import { UserRouter } from "./routes/User";
import {ApiKeyRouter} from "./routes/ApiKey";
const app: express.Application = express();

app.use(json());
app.use(urlencoded({
    extended: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get("/", (request: express.Request, response: express.Response) => {
    response.json({
        name: "Express application"
    })
});

app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {

    response.status(err.status || 500);
    response.json({
        error: "Server error"
    })
});

app.use("/api", new AuthenticationRouter().getRouter(), 
                new ConfigurationRouter().getRouter(),
                new ManifestRouter().getRouter(),
                new GeneratorRouter().getRouter(),
                new UserRouter().getRouter(),
                new ApiKeyRouter().getRouter());
                
const server: http.Server = app.listen(3003);

export { server };