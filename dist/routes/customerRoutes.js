"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customerController_1 = require("../controllers/customerController");
class CustomerRoutes {
    constructor() {
        this.customerController = new customerController_1.CustomerController();
    }
    router(app) {
        app.route('/customers')
            .get(this.customerController.list);
        app.route('/customer')
            .post(this.customerController.add);
        app.route('/customer/:id')
            .get(this.customerController.view)
            .put(this.customerController.update)
            .delete(this.customerController.delete);
    }
}
exports.CustomerRoutes = CustomerRoutes;
//# sourceMappingURL=customerRoutes.js.map