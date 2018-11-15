"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const _config_1 = require("./config/.config");
const PORT = new _config_1.Confs().serverPort(process.env.NODE_ENV);
app_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map