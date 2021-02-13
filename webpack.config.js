/**
 * webpack 配置
 * @author Philip
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    // home: './src/home.js',
    voyage: './src/voyage.js'
  },
  devtool: false,
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }, {
      test: /.(sa|sc|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'initial',
      minSize: 0,
      minChunks: 1,
      cacheGroups: {
        chunk: {
          test: /utils/,
          priority: 0,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    open: true,
    host: 'localhost'
  }
}