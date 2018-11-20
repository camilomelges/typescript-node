"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DashboardRoutes {
    router(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
    }
}
exports.DashboardRoutes = DashboardRoutes;
//# sourceMappingURL=dashboardRoutes.js.map