import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
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

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.passWord, 10);
    this.passWord = hash;

    next();
});