const path = require('path')

module.exports = {
  devtool: 'eval',
  devServer: {
    historyApiFallback: true
  },
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.styl$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    modules: [path.join(__dirname, '/src/index.js'), "node_modules"],
    extensions: ['.js', '.jsx', '.styl']
  }
}
