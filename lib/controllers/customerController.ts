import * as mongoose from 'mongoose';
import { CustomerSchema } from '../models/customerModel';
import { Request, Response } from 'express';

const Customer = mongoose.model('Contact', CustomerSchema);

export class CustomerController{

    public add (req: Request, res: Response) {                
        const newCustomer = new Customer(req.body);
    
        newCustomer.save((err, customer) => {tes
            if(err){
                res.send(err);
            }    
            res.json(customer);
        });
    }

    public list (req: Request, res: Response) {           
        Customer.find({}, (err, customers) => {
            if(err){
                res.send(err);
            }
            res.json(customers);
        });
    }

    public view (req: Request, res: Response) {           
        Customer.findById(req.params.id, (err, customer) => {
            if(err){
                res.send(err);
            }
            res.json(customer);
        });
    }

    public update (req: Request, res: Response) {           
        Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, customer) => {
            if(err){
                res.send(err);
            }
            res.json(customer);
        });
    }

    public delete (req: Request, res: Response) {           
        Customer.remove({ _id: req.params.id }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted customer!'});
        });
    }
}