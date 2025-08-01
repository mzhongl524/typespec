import { defineConfig, mergeConfig } from "vitest/config";
import { defaultTypeSpecVitestConfig } from "../../vitest.config.js";

export default mergeConfig(
  defaultTypeSpecVitestConfig,
  defineConfig({
    test: {
      environment: "happy-dom",
      setupFiles: "./test/setup.ts", // assuming the test folder is in the root of our project
      env: {
        TZ: "UTC",
      },
    },
  }),
);
