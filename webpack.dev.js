const path = require('path');
const commonConfig=require('./webpack.common')
const { merge }=require('webpack-merge')

module.exports = merge(commonConfig,{
  mode:"development",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
});