/**
 * webpack 配置
 * @author Philip
 */
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./src/voyage/app.js",
  output: {
    path: path.resolve(__dirname, 'dist/voyage')
  },
  devtool: false,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, "src")],
      loader: "babel-loader"
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
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "main.[contenthash].css" }),
    new ModuleFederationPlugin({
      name: "voyage",
      library: { type: "var", name: "voyage" },
      filename: "remoteEntry.js",
      exposes: {
        "./buttons": "./src/voyage/buttons"
      },
      shared: { vue: { singleton: true }, vuex: { singleton: true }, "vue-router": { singleton: true } }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    open: true,
    host: "localhost",
    port: 3032
  }
}