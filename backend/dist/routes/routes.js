"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customerRoutes_1 = require("./customerRoutes");
const dashboardRoutes_1 = require("./dashboardRoutes");
const userRoutes_1 = require("./userRoutes");
const authRoutes_1 = require("./authRoutes");
const auth_1 = require("../middlewares/auth");
class Routes {
    constructor() {
        this.customerRoutes = new customerRoutes_1.CustomerRoutes();
        this.dashboardRoutes = new dashboardRoutes_1.DashboardRoutes();
        this.userRoutes = new userRoutes_1.UserRoutes();
        this.userAuthRoutes = new authRoutes_1.UserAuthRoutes();
        this.authentication = new auth_1.Authentication();
    }
    routes(app) {
        this.userAuthRoutes.router(app);
        // Middleware
        app.use(this.authentication.auth);
        this.dashboardRoutes.router(app);
        this.customerRoutes.router(app);
        this.userRoutes.router(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map