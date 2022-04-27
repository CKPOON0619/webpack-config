const path = require('path');
const ReactRefreshBabelPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot:true,
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template:"./src/template.html"}), 
    new MiniCssExtractPlugin(), 
    new ReactRefreshBabelPlugin()
  ],
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test:/\.css?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              publicPath:""
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader"
        }  
      },
      {
        test: /\.(png|jpeg|gif|svg)$/,
        type:"asset/resource"
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};