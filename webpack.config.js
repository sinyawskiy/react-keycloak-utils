const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'index.js',
    library: {
      name: 'react-keycloak-utils',
      type: 'umd'
    },
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist')
  },
}
