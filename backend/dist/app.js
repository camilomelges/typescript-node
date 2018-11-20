"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes_1 = require("./routes/routes");
const _config_1 = require("./config/.config");
const cors = require("cors");
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "authorization"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:3001',
    preflightContinue: false
};
class App {
    constructor(NODE_ENV) {
        this.routePrv = new routes_1.Routes();
        this.confs = new _config_1.Confs();
        this.mongoUrl = '';
        this.app = express();
        this.config(NODE_ENV);
        this.routePrv.routes(this.app);
        this.mongoUrl = this.confs.mongoUrl(NODE_ENV);
        this.mongoSetup();
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true
        });
    }
    config(NODE_ENV) {
        // Support application/json type post data
        this.app.use(bodyParser.json());
        // Support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Show requests on console
        if (NODE_ENV === 'development')
            this.app.use(morgan('dev'));
        // enable cors confs
        // enable pre-flight
        this.app.use(cors(options));
        this.app.options("*", cors(options));
    }
}
exports.default = new App(process.env.NODE_ENV).app;
//# sourceMappingURL=app.js.map