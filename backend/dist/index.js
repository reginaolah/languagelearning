"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const PORT = process.env.PORT || 3000;
server_1.app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}.`);
});
