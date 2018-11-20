"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
class UserAuthRoutes {
    constructor() {
        this.userAuthentication = new authController_1.UserAuthentication();
    }
    router(app) {
        app.route('/register')
            .post(this.userAuthentication.register);
        app.route('/login')
            .post(this.userAuthentication.login);
    }
}
exports.UserAuthRoutes = UserAuthRoutes;
//# sourceMappingURL=authRoutes.js.map