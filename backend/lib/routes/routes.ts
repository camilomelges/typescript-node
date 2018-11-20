import { CustomerRoutes } from "./customerRoutes";
import { DashboardRoutes } from "./dashboardRoutes";
import { UserRoutes } from "./userRoutes";
import { UserAuthRoutes } from "./authRoutes";
import { Authentication } from '../middlewares/auth';
export class Routes {

    private customerRoutes: CustomerRoutes = new CustomerRoutes();
    private dashboardRoutes: DashboardRoutes = new DashboardRoutes();
    private userRoutes: UserRoutes = new UserRoutes();
    private userAuthRoutes: UserAuthRoutes = new UserAuthRoutes();
    private authentication: Authentication = new Authentication();

    public routes(app): void {
        this.userAuthRoutes.router(app);
        // Middleware
        app.use(this.authentication.auth);
        this.dashboardRoutes.router(app);
        this.customerRoutes.router(app);
        this.userRoutes.router(app);
    }
}
