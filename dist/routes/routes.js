"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customerRoutes_1 = require("./customerRoutes");
const dashboardRoutes_1 = require("./dashboardRoutes");
const authRoutes_1 = require("./authRoutes");
const auth_1 = require("../middlewares/auth");
class Routes {
    constructor() {
        this.customerRoutes = new customerRoutes_1.CustomerRoutes();
        this.dashboardRoutes = new dashboardRoutes_1.DashboardRoutes();
        this.customerAuthRoutes = new authRoutes_1.CustomerAuthRoutes();
        this.authentication = new auth_1.Authentication();
    }
    routes(app) {
        this.customerAuthRoutes.router(app);
        // Middleware
        app.use(this.authentication.auth);
        this.dashboardRoutes.router(app);
        this.customerRoutes.router(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map