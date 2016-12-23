const ENVIRONMENT = process.env.NODE_ENV || "development"
const path = require('path')
const routes = require('./routes.json')
const route = routes.app[ENVIRONMENT]
const HtmlWebpackPlugin = require("html-webpack-plugin")

const $ = {
  devtool: 'source-map',
  entry: {
    site: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: "[name].js",
    sourceMapFilename: "[name].map"
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
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
  ]
}

if (ENVIRONMENT === "development") {
  $.devtool = "eval"

  const devServerClient = `webpack-dev-server/client?http://0.0.0.0:${route.port}`

  if (Array.isArray($.entry)) {
    $.entry.unshift(devServerClient)
  }
  else {
    $.entry["dev-server-client"] = devServerClient
  }
}

module.exports = $
