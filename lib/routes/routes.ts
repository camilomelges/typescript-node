import { CustomerRoutes } from "./customerRoutes";
import { DashboardRoutes } from "./dashboardRoutes";

export class Routes {

    public customerRoutes: CustomerRoutes = new CustomerRoutes();
    public dashboardRoutes: DashboardRoutes = new DashboardRoutes();
    
    public routes(app): void {
        this.dashboardRoutes.router(app);
        this.customerRoutes.router(app);
    }
}
