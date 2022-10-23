const path = require('path')

module.exports = {
  entry: {
    bundle: './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    alias: {
      'stimulus-lit': path.resolve(__dirname, '../dist/index.js')
    }
  },
  devServer: {
    contentBase: './',
    watchContentBase: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              [ '@babel/plugin-transform-runtime', { regenerator: true } ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
           {
             loader: 'css-loader',
             options: { importLoaders: 1 }
           },
           'postcss-loader'
         ]
      }
    ]
  }
}
