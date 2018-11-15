import app from "./app";
import { Confs } from "./config/.config";

const PORT = new Confs().serverPort(process.env.NODE_ENV);

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})

