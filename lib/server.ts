import app from "./app";
import * as https from 'https';
import * as fs from 'fs';
import { Confs } from "./config/.config";

const PORT = new Confs().serverPort(process.env.NODE_ENV);

// Without https
// app.listen(PORT, () => {
//     console.log('Express server listening on port ' + PORT);
// })

const httpsOptions = {
    key: fs.readFileSync('./config/server.key'),
    cert: fs.readFileSync('./config/server.cert')
}

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})