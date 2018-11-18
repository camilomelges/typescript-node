import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Confs } from '../config/.config';
import * as mongoose from 'mongoose';
import { CustomerSchema } from '../models/customerModel';
import { Request, Response } from 'express';
const Customer = mongoose.model('Contact', CustomerSchema);

export class CustomerAuthentication {
    private confs: Confs = new Confs();
    private generateToken(params: {}) {
        return jwt.sign(params, this.confs.jwtAuthToken(), {
            expiresIn: 7200
        });
    }

    public async register (req: Request, res: Response) {                
        const newCustomer = new Customer(req.body);
    
        newCustomer.save((err, customer) => {
            if(err){
                if (err.code === 11000) return res.status(400).json({message: 'User alredy registered'});
                return res.status(400).json({err: err});
            }
            const token = this.generateToken({id: customer.id});
            return res.status(200).json({'customer': customer, 'token': token});
        });
    }

    public async login (req: Request, res: Response) {
        const {email, password} = req.body;
    
        const customer = await Customer.findOne({email}).select('+password');
    
        if (!customer) return res.status(400).json({err: 'Customer not found'});
    
        if (!await bcrypt.compare(password, customer.password))
            return res.status(400).json({err: 'Invalid password'});
    
        const token = this.generateToken({id: customer.id});
        res.status(200).json({'customer': customer, 'token': token});
    }
}