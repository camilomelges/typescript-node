import { CustomerController } from "../controllers/customerController";

export class CustomerRoutes {

    public customerController: CustomerController = new CustomerController();
    
    public router(app): void {
        app.route('/customers')           
        .get(this.customerController.list);
        app.route('/customer')
        .post(this.customerController.add);
        app.route('/customer/:id')
        .get(this.customerController.view)
        .put(this.customerController.update)
        .delete(this.customerController.delete)
    }
}
