const path = require('path');
const commonConfig=require('./webpack.common')
const { merge }=require('webpack-merge')
const { CleanWebpackPlugin }=require("clean-webpack-plugin")

console.log(CleanWebpackPlugin, new CleanWebpackPlugin())
module.exports = merge(commonConfig,{
  mode:"production",
  target: "browserslist",
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[new CleanWebpackPlugin()]
})