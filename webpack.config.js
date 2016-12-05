module.exports = {
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.styl$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }],
    preloaders: [{
      exclude: /node_modules/,
      loader: "eslint-loader",
      test: /\.js$/
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}