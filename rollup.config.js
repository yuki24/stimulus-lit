import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";

import { version } from "./package.json";
const banner = `/*\nStimulus Lit ${version}\n*/`;

export default [
  {
    input: "src/index.ts",
    external: ["@hotwired/stimulus", "lit-html"],
    output: [
      {
        name: "Stimulus Lit",
        file: "dist/index.umd.js",
        format: "umd",
        sourcemap: true,
        banner,
        globals: {
          "@hotwired/stimulus": "Stimulus",
          "lit-html": "Lit",
        },
      },
    ],
    plugins: [
      resolve(),
      typescript({ target: "es5", downlevelIteration: true }),
      filesize(),
    ],
    watch: {
      include: "src/**",
    },
  },
  {
    input: "src/index.ts",
    external: ["@hotwired/stimulus", "lit-html"],
    output: [
      {
        file: "dist/index.js",
        format: "es",
        sourcemap: true,
        banner,
        globals: {
          "@hotwired/stimulus": "Stimulus",
          "lit-html": "Lit",
        },
      },
    ],
    plugins: [resolve(), typescript(), filesize()],
    watch: {
      include: "src/**",
    },
  },
];
