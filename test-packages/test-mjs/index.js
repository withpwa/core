/* eslint-disable */
import { compose, config } from "@pwaset/core";

const ok = compose != null && config != null;
process.exit(ok ? 0 : 1);
