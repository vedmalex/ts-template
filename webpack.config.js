const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { type } = require('os')
const TsMacros = require('ts-macros').default
/**
 * @enum {string}
 */
const Target = {
  web: 'umd',
  node: 'commonjs',
  esm: 'module',
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const targets = env.targets?.split(',') ?? ['node']
  const noclean = env.noclean
  /**
   * @return {()=>import('webpack').Configuration}
   * @param {Target} target
   * @param {number} index
   */
  function makeConfig(target, index) {
    if (!Target[target]) throw new Error(`unexpected target ${target}`)
    console.log(`target = ${target}`)
    /** @type {()=>import('webpack').Configuration} */

    const plugins = [
      new webpack.DefinePlugin({
        // для того чтобы все эти макро работали нужно добавлять их в /types/global.d.ts
        PROD: isProduction,
      }),
    ]

    const config = {
      entry: './src/index.ts',
      plugins,
      output: {
        path: path.resolve(__dirname, `dist`),
        library: {
          type: Target[target],
        },
        filename: target == 'node' ? 'index.js' : `index.${Target[target]}.js`,
        clean: index == 0 && !noclean,
      },
      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          '@DTO': path.resolve(__dirname, 'src/dto'),
        },
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json'),
                getCustomTransformers: program => ({
                  before: [TsMacros(program)],
                }),
              },
            },
          },
        ],
      },
    }
    if (!isProduction) {
      config.devtool = 'inline-source-map'
    }
    if (target == 'esm') {
      if (!config.experiments) config.experiments = {}
      config.experiments.outputModule = true
    }
    return config
  }

  return targets.map(makeConfig)
}
