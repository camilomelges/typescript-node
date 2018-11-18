"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes_1 = require("./routes/routes");
const _config_1 = require("./config/.config");
class App {
    constructor(NODE_ENV) {
        this.routePrv = new routes_1.Routes();
        this.confs = new _config_1.Confs();
        this.mongoUrl = '';
        this.app = express();
        this.config();
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
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App(process.env.NODE_ENV).app;
//# sourceMappingURL=app.js.map