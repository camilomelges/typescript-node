"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.userController = new userController_1.UserController();
    }
    router(app) {
        app.route('/users')
            .get(this.userController.list);
        app.route('/user')
            .post(this.userController.add);
        app.route('/users/:id')
            .get(this.userController.view)
            .put(this.userController.update)
            .delete(this.userController.delete);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map