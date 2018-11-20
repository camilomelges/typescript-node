import { UserAuthentication } from "../controllers/authController";

export class UserAuthRoutes {

    private userAuthentication: UserAuthentication = new UserAuthentication();
    
    public router(app): void {
        app.route('/register')           
        .post(this.userAuthentication.register);
        app.route('/login')
        .post(this.userAuthentication.login);
    }
}
