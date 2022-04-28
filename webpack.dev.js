const path = require('path');
const ReactRefreshBabelPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const commonConfig=require('./webpack.common')
const { merge }=require('webpack-merge')

module.exports = merge(commonConfig,{
  mode:"development",
  target:"web",
  devServer:{
    hot:true
  },
  plugins:[
    new ReactRefreshBabelPlugin()
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
});