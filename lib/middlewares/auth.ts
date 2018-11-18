import jwt from 'jsonwebtoken';
import { Confs } from '../config/.config';

export class Authentication {

    private confs: Confs = new Confs();

    public auth = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({err: 'No token provided'});
        
        const parts = authHeader.split(' ');
    
        if (parts.length !== 2) return res.status(401).json({err: 'Token error'});
    
        const [scheme, token] = parts;
    
        if (!/^Bearer$/i.test(scheme))
            return res.status(401).json({err: 'Token malformatted'});
    
        jwt.verify(token, this.confs.jwtAuthToken(), (err, decoded) => {
            if (err) return res.status(401).json({err: 'Token invalid'});
    
            req.userId = decoded.id;
            return next();
        })  
    }
}