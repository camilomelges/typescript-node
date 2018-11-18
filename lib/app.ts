import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import { Routes } from "./routes/routes";
import { Confs } from "./config/.config";

class App {

    public app: express.Application;
    private routePrv: Routes = new Routes();
    private confs: Confs = new Confs();
    private mongoUrl: string = '';

    constructor(NODE_ENV: string) {
        this.app = express();
        this.config(NODE_ENV);
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

    private config(NODE_ENV: string): void{
        // Support application/json type post data
        this.app.use(bodyParser.json());
        // Support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Show requests on console
        if (NODE_ENV === 'development') this.app.use(morgan('dev'));
    }

}
export default new App(process.env.NODE_ENV).app;