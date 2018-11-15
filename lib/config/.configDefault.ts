export class Confs {

    public mongoUrl(env: string) {
        switch (env) {
            case 'development':
                var mongoUser = 'userName', mongoPassword = 'pass', mongoPort = 'ports';
                break;
            case 'staging':
                var mongoUser = 'userName', mongoPassword = 'pass', mongoPort = 'ports';
                break;
            case 'production':
                var mongoUser = 'userName', mongoPassword = 'pass', mongoPort = 'ports';
                break
        }
        const mongoUrl = 'mongodb://' + mongoUser + ':' + mongoPassword + '@ds1' + mongoPort + '.mlab.com:' + mongoPort + '/goweek_milo';

        return mongoUrl;
    }

    public serverPort(env: string) {
        switch(env) {
            case 'development':
                var serverPort = 8080;
                break;
            case 'staging':
                var serverPort = 8080;
                break;
            case 'production':
                var serverPort = 8080;
                break;
        }
        return serverPort;
    }
}