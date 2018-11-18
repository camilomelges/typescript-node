import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: 'First name are required'
    },
    lastName: {
        type: String,
        required: 'Last name are required'
    },
    passWord: {
        type: String,
        required: 'Password are required'
    },
    email: {
        type: String,
        required: 'E-mail are required'
    },
    phone: {
        type: Number
    },
}, {timestamps: true});