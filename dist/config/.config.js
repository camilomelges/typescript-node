"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Confs {
    mongoUrl(env) {
        switch (env) {
            case 'development':
                var mongoUser = 'milo', mongoPassword = 'sk7walk34', mongoPort = '55243';
                break;
            case 'staging':
                var mongoUser = 'milo', mongoPassword = 'sk7walk34', mongoPort = '55243';
                break;
            case 'production':
                var mongoUser = 'milo', mongoPassword = 'sk7walk34', mongoPort = '55243';
                break;
        }
        const mongoUrl = 'mongodb://' + mongoUser + ':' + mongoPassword + '@ds1' + mongoPort + '.mlab.com:' + mongoPort + '/goweek_milo';
        return mongoUrl;
    }
    serverPort(env) {
        switch (env) {
            case 'development':
                var serverPort = 3000;
                break;
            case 'staging':
                var serverPort = 3000;
                break;
            case 'production':
                var serverPort = 3000;
                break;
        }
        return serverPort;
    }
}
exports.Confs = Confs;
//# sourceMappingURL=.config.js.map