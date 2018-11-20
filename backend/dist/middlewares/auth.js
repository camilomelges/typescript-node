"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const _config_1 = require("../config/.config");
class Authentication {
    constructor() {
        this.confs = new _config_1.Confs();
        this.auth = (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                return res.status(401).json({ err: 'No token provided' });
            const parts = authHeader.split(' ');
            if (parts.length !== 2)
                return res.status(401).json({ err: 'Token error' });
            const [scheme, token] = parts;
            if (!/^Bearer$/i.test(scheme))
                return res.status(401).json({ err: 'Token malformatted' });
            jwt.verify(token, this.confs.jwtAuthToken(), (err, decoded) => {
                if (err)
                    return res.status(401).json({ err: 'Token invalid' });
                req.userId = decoded.id;
                return next();
            });
        };
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=auth.js.map