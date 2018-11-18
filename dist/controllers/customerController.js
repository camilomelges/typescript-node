"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const customerModel_1 = require("../models/customerModel");
const Customer = mongoose.model('Contact', customerModel_1.CustomerSchema);
class CustomerController {
    add(req, res) {
        let newCustomer = new Customer(req.body);
        newCustomer.save((err, customer) => {
            if (err) {
                res.send(err);
            }
            res.json(customer);
        });
    }
    list(req, res) {
        Customer.find({}, (err, customers) => {
            if (err) {
                res.send(err);
            }
            res.json(customers);
        });
    }
    view(req, res) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) {
                res.send(err);
            }
            res.json(customer);
        });
    }
    update(req, res) {
        Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, customer) => {
            if (err) {
                res.send(err);
            }
            res.json(customer);
        });
    }
    delete(req, res) {
        Customer.remove({ _id: req.params.id }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted customer!' });
        });
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map