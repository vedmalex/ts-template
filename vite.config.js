import path from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'
import typescript from '@rollup/plugin-typescript'
import TsMacros from 'ts-macros'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const getPackageName = () => {
  return packageJson.name
}

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing.')
  }
}

const fileName = {
  esm: `index.mjs`,
  cjs: `index.js`,
  iife: `index.iife.js`,
}

const formats = Object.keys(fileName)

module.exports = defineConfig({
  resolve: {
    alias: [
      { find: '@/', replacement: path.resolve(__dirname) },
      { find: '~/', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  base: './',
  define: {
    PROD: process.env.NODE_ENV == 'production',
  },
  plugins: [
    typescript({
      sourceMap: true,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      transformers: {
        before: [
          {
            type: 'program',
            factory: program => TsMacros(program),
          },
        ],
      },
    }),
    commonjs(),
    nodeResolve(),
  ],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: getPackageNameCamelCase(),
      formats,
      fileName: format => fileName[format],
    },
  },
})
