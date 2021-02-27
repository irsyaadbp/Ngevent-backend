"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Ngevent backend listening on port : ${PORT}`);
});
//# sourceMappingURL=server.js.map