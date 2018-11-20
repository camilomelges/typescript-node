import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('Users', UserSchema);

export class UserController{

    public add (req: Request, res: Response) {                
        const newUser = new User(req.body);
    
        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }    
            res.json(user);
        });
    }

    public list (req: Request, res: Response) {           
        User.find({}, (err, users) => {
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    }

    public view (req: Request, res: Response) {           
        User.findById(req.params.id, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public update (req: Request, res: Response) {           
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public delete (req: Request, res: Response) {           
        User.remove({ _id: req.params.id }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!'});
        });
    }
}