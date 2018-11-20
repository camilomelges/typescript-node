"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customerController_1 = require("../controllers/customerController");
class Routes {
    constructor() {
        this.customerController = new customerController_1.CustomerController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        // Contact 
        app.route('/contact')
            .get(this.customerController.list)
            .post(this.customerController.add);
        // Contact/:id
        app.route('/contact/:id')
            .get(this.customerController.view)
            .put(this.customerController.update)
            .delete(this.customerController.delete);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map