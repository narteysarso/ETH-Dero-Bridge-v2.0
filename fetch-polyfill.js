// fetch-polyfill.js
const fetch = require("node-fetch");

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}
