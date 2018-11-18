import {Request, Response} from "express";
import { CustomerController } from "../controllers/customerController";

export class Routes {

    public customerController: CustomerController = new CustomerController();
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/contact')            
        .get(this.customerController.list)
        .post(this.customerController.add);
        // Contact/:id
        app.route('/contact/:id')
        .get(this.customerController.view)        
        .put(this.customerController.update)   
        .delete(this.customerController.delete)
    }
}
