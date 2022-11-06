import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss'
import {terser} from "rollup-plugin-terser";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      scss({ input: 'src/index.scss'}),
      typescript({ tsconfig: "./tsconfig.json" }),
      sucrase({
        exclude: ['node_modules/**'],
        transforms: ['typescript', 'jsx'],
      }),
      terser()
    ],
  },
  // {
  //   input: 'dist/cjs/index.js',
  //   plugins: [
  //     minify()
  //   ]
  // }
  // {
  //   input: "dist/esm/types/index.d.ts",
  //   output: [{ file: "dist/index.d.ts", format: "esm" }],
  //   plugins: [dts()],
  // },
];