"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const file = process.argv[2];
const reader = new index_1.WarcReader(file).entries();
const loop = setInterval(() => {
    const { done, value } = reader.next();
    if (!done) {
        const { version, headers: WarcHeaders, content } = value;
        process.stdout.write(value.content);
    }
    else {
        clearInterval(loop);
    }
}, 1);
//# sourceMappingURL=test.js.map