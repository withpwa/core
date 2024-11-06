/* eslint-disable */
const { compose, config } = require("@pwaset/core");

const ok = compose != null && config != null;
process.exit(ok ? 0 : 1);
