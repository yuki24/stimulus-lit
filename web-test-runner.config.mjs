import { esbuildPlugin } from "@web/dev-server-esbuild"
import { playwrightLauncher } from "@web/test-runner-playwright"

export default {
  rootDir: ".",
  files: "test/**/*.test.ts",
  concurrentBrowsers: 1,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true })
  ],
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "firefox" }),
    playwrightLauncher({ product: "webkit" }),
  ],
}
