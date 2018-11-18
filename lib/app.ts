import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/routes";
import { Confs } from "./config/.config";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public confs: Confs = new Confs();
    public mongoUrl: string = '';

    constructor(NODE_ENV: string) {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoUrl = this.confs.mongoUrl(NODE_ENV); 
        this.mongoSetup();
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true
        });    
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}
export default new App(process.env.NODE_ENV).app;