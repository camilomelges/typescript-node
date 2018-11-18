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
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("../config/.config");
const mongoose = require("mongoose");
const customerModel_1 = require("../models/customerModel");
const Customer = mongoose.model('Contact', customerModel_1.CustomerSchema);
class CustomerAuthentication {
    constructor() {
        this.confs = new _config_1.Confs();
    }
    generateToken(params) {
        return jsonwebtoken_1.default.sign(params, this.confs.jwtAuthToken(), {
            expiresIn: 7200
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = new Customer(req.body);
            newCustomer.save((err, customer) => {
                if (err) {
                    if (err.code === 11000)
                        return res.status(400).json({ message: 'User alredy registered' });
                    return res.status(400).json({ err: err });
                }
                const token = this.generateToken({ id: customer.id });
                return res.status(200).json({ 'customer': customer, 'token': token });
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const customer = yield Customer.findOne({ email }).select('+password');
            if (!customer)
                return res.status(400).json({ err: 'Customer not found' });
            if (!(yield bcryptjs_1.default.compare(password, customer.password)))
                return res.status(400).json({ err: 'Invalid password' });
            const token = this.generateToken({ id: customer.id });
            res.status(200).json({ 'customer': customer, 'token': token });
        });
    }
}
exports.CustomerAuthentication = CustomerAuthentication;
//# sourceMappingURL=authController.js.map