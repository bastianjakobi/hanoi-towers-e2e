import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  e2e: {
    pageLoadTimeout: 120000,
  },
});
