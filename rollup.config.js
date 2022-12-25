import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    cache: false,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.tsx', '**/*.stories.tsx']
      }),
      scss({ input: 'src/index.scss' })
      // sucrase({
      //   exclude: ['node_modules/**'],
      //   transforms: ['typescript', 'jsx'],
      // }),
      // terser(), //minification,
      // copy({
      //   targets: [{
      //     src: 'src/assets',
      //     dest: 'dist'
      //   }]
      // })
    ],
    external: ['react', 'react-dom']
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.scss$/],
    plugins: [dts()]
  }
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
