import { CustomerAuthentication } from "../controllers/authController";

export class CustomerAuthRoutes {

    private customerAuthentication: CustomerAuthentication = new CustomerAuthentication();
    
    public router(app): void {
        app.route('/register')           
        .post(this.customerAuthentication.register);
        app.route('/login')
        .post(this.customerAuthentication.login);
    }
}
