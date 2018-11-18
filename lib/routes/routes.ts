import { CustomerRoutes } from "./customerRoutes";
import { DashboardRoutes } from "./dashboardRoutes";
import { CustomerAuthRoutes } from "./authRoutes";
import { Authentication } from '../middlewares/auth';
export class Routes {

    private customerRoutes: CustomerRoutes = new CustomerRoutes();
    private dashboardRoutes: DashboardRoutes = new DashboardRoutes();
    private customerAuthRoutes: CustomerAuthRoutes = new CustomerAuthRoutes();
    private authentication: Authentication = new Authentication();

    public routes(app): void {
        this.customerAuthRoutes.router(app);
        // Middleware
        app.use(this.authentication.auth);
        this.dashboardRoutes.router(app);
        this.customerRoutes.router(app);
    }
}
