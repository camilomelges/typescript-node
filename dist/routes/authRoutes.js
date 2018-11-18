"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
class CustomerAuthRoutes {
    constructor() {
        this.customerAuthentication = new authController_1.CustomerAuthentication();
    }
    router(app) {
        app.route('/register')
            .post(this.customerAuthentication.register);
        app.route('/login')
            .post(this.customerAuthentication.login);
    }
}
exports.CustomerAuthRoutes = CustomerAuthRoutes;
//# sourceMappingURL=authRoutes.js.map