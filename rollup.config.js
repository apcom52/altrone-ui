import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss'
import {terser} from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [{
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      scss({ input: 'src/index.scss' }),
      typescript({ tsconfig: "./tsconfig.json" }),
      sucrase({
        exclude: ['node_modules/**'],
        transforms: ['typescript', 'jsx'],
      }),
      terser(), //minification,
      copy({
        targets: [{
          src: 'src/assets',
          dest: 'dist'
        }]
      })
    ],
    external: ["react", "react-dom"]
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: "esm" }],
    external: [/\.scss$/],
    plugins: [dts()],
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