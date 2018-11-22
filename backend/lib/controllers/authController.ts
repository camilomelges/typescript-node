import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Confs } from '../config/.config';
import * as mongoose from 'mongoose';
import { CustomerSchema } from '../models/customerModel';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { debug } from 'util';
const Customer = mongoose.model('Customer', CustomerSchema);
const User = mongoose.model('user', UserSchema, 'users');

// export class CustomerAuthentication {
//     private confs: Confs = new Confs();
//     private generateToken(params: {}) {
//         return jwt.sign(params, this.confs.jwtAuthToken(), {
//             expiresIn: 7200
//         });
//     }

//     public async register (req: Request, res: Response) {                
//         const newCustomer = new Customer(req.body);
    
//         newCustomer.save((err, customer) => {
//             if(err){
//                 if (err.code === 11000) return res.status(400).json({message: 'User alredy registered'});
//                 return res.status(400).json({err: err});
//             }
//             const token = this.generateToken({id: customer.id});
//             return res.status(200).json({'customer': customer, 'token': token});
//         });
//     }

//     public async login (req: Request, res: Response) {
//         const {email, password} = req.body;
    
//         const customer = await Customer.findOne({email}).select('+password');
    
//         if (!customer) return res.status(400).json({err: 'Customer not found'});
    
//         if (!await bcrypt.compare(password, customer.password))
//             return res.status(400).json({err: 'Invalid password'});
    
//         const token = this.generateToken({id: customer.id});
//         res.status(200).json({'customer': customer, 'token': token});
//     }
// }

export class UserAuthentication {
    private confs = new Confs();
    private generateToken(params: {}) {
        return jwt.sign(params, this.confs.jwtAuthToken(), {
            expiresIn: 7200
        });
    }

    public register = async (req: Request, res: Response) => {                
        const newUser = new User(req.body.user);
        
        newUser.save((err, user) => {
            if(err){
                console.log(err);
                if (err.code === 11000) return res.status(400).json({message: 'User alredy registered'});
                return res.status(400).json({err: err});
            }
            const token = this.generateToken({id: user.id});
            return res.status(200).json({'user': user, 'token': token});
        });
    }

    public login = async (req: Request, res: Response) => {
        const requestUser = req.body.user;

        const user = await User.findOne({email: requestUser.email}).select('+passWord');
        
        if (!user) return res.status(400).json({message: 'Incorrect email or password'});
    
        if (!await bcrypt.compare(requestUser.passWord, user.passWord))
            return res.status(400).json({message: 'Incorrect email or password'});
    
        const token = this.generateToken({id: user.id});
        res.status(200).json({'user': user, 'token': token});
    }
}