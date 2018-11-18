import * as mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
        select: false,
        required: 'Password are required'
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'E-mail are required'
    },
    phone: {
        type: Number
    },
}, {timestamps: true});

CustomerSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});