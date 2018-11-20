"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _config_1 = require("../config/.config");
const mongoose = require("mongoose");
const customerModel_1 = require("../models/customerModel");
const userModel_1 = require("../models/userModel");
const Customer = mongoose.model('Customer', customerModel_1.CustomerSchema);
const User = mongoose.model('User', userModel_1.UserSchema);
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
class UserAuthentication {
    constructor() {
        this.confs = new _config_1.Confs();
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = new User(req.body.user);
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    if (err.code === 11000)
                        return res.status(400).json({ message: 'User alredy registered' });
                    return res.status(400).json({ err: err });
                }
                const token = this.generateToken({ id: user.id });
                return res.status(200).json({ 'user': user, 'token': token });
            });
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            return console.log(email, password);
            const user = yield User.findOne({ email }).select('+password');
            if (!user)
                return res.status(400).json({ err: 'User not found' });
            if (!(yield bcrypt.compare(password, user.password)))
                return res.status(400).json({ err: 'Invalid password' });
            const token = this.generateToken({ id: user.id });
            res.status(200).json({ 'user': user, 'token': token });
        });
    }
    generateToken(params) {
        return jwt.sign(params, this.confs.jwtAuthToken(), {
            expiresIn: 7200
        });
    }
}
exports.UserAuthentication = UserAuthentication;
//# sourceMappingURL=authController.js.map