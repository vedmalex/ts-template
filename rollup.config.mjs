import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import TsMacros from 'ts-macros'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import del from 'rollup-plugin-delete'

import pkg from './package.json' assert { type: 'json' }
import dts from 'rollup-plugin-dts'
import path from 'node:path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const processTS = typescript({
  sourceMap: true,
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  transformers: {
    before: [
      {
        type: 'program',
        factory: program => TsMacros.default(program),
      },
    ],
  },
})

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'template',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      del({ targets: './dist', runOnce: true }),
      processTS, // so Rollup can convert TypeScript to JavaScript
      replace({
        preventAssignment: true,
        PROD: process.env.NODE_ENV == 'production',
      }),
      alias([
        { find: '@/', replacement: path.resolve(__dirname) },
        { find: '~/', replacement: path.resolve(__dirname, 'src') },
      ]),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [
      // del({ targets: './dist', runOnce: true }),
      replace({
        preventAssignment: true,
        PROD: process.env.NODE_ENV == 'production',
      }),
      processTS, // so Rollup can convert TypeScript to JavaScript
      alias([
        { find: '@/', replacement: path.resolve(__dirname) },
        { find: '~/', replacement: path.resolve(__dirname, 'src') },
      ]),
    ],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [
      alias([
        { find: '@DTO', replacement: path.resolve(__dirname, './src/dto/*') },
      ]),
      dts({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@DTO/*': ['./src/dto/*'], // алиас для DTO
          },
        },
      }),
    ],
    output: { name: pkg.types, format: 'es' },
  },
]
