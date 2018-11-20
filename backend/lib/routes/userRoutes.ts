import { UserController } from "../controllers/userController";

export class UserRoutes {

    private userController: UserController = new UserController();
    
    public router(app): void {
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
