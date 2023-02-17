const path = require('path')
const TsMacros = require('ts-macros').default

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
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
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       cache: true,
      //     },
      //   },
      //   exclude: /node_modules/,
      // },
    ],
  },
  devtool: 'source-map',
}
