// install command: npm install vitest @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom --save-dev
// add to package.json (frontend) "test": "vitest --watch"

// in vite.config add this to object passed to defineConfig:
/*
test: {
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.js",
    globals: true,
    watch: false
},
resolve: {
  alias: {
    "@": resolve(dirname(fileUrlToPath(import.meta.url)), "src")
  }
}
*/

import { fetch, Request, Response, Headers } from "@remix-run/web-fetch";
import { AbortController as NodeAbortController } from "abort-controller";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Request = Request;
  globalThis.Response = Response;
  globalThis.Headers = Headers;
}

if (!globalThis.AbortController) {
  globalThis.AbortController = NodeAbortController;
}
