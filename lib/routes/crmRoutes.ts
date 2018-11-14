import {Request, Response} from "express";
import { ContactController } from "../controllers/crmController";

export class Routes {

    public contactController: ContactController = new ContactController();
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/contact') 
        // GET endpoint 
        // Get all contacts            
        .get(this.contactController.getContacts)
        // POST endpoint
        // Create a new contact
        .post(this.contactController.addNewContact);

        // Contact detail
        // get a specific contact
        app.route('/contact/:contactId')
        .get(this.contactController.getContactWithID)
        // Update a contact           
        .put(this.contactController.updateContact)
        // Delete a contact     
        .delete(this.contactController.deleteContact)
    }
}
