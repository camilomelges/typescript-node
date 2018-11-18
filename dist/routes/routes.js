"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customerRoutes_1 = require("./customerRoutes");
const dashboardRoutes_1 = require("./dashboardRoutes");
class Routes {
    constructor() {
        this.customerRoutes = new customerRoutes_1.CustomerRoutes();
        this.dashboardRoutes = new dashboardRoutes_1.DashboardRoutes();
    }
    routes(app) {
        this.dashboardRoutes.router(app);
        this.customerRoutes.router(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map