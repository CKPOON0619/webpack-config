const path = require('path');
const commonConfig=require('./webpack.common')
const { merge }=require('webpack-merge')

module.exports = merge(commonConfig,{
  mode:"production",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
})