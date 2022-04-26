# webpack-config
A project to practice webpack configurations:

1. Init npm package:
```
npm init -y
```
2. Add webpack dev dependencies:
```
npm i -D webpack webpack-cli webpack-dev-server
```
3. Setup script in packConfig:
```json
"scripts": {
    "start": "webpack serve",
    "watch": "webpack --watch",
    "build": "webpack"
  },
```
`webpack serve` would create a dev server, `webpack --watch` would watch and rebuild when changes, `webpack` would run the build.

4. Setup typescript and ts-loader
```
npm i -D typescript ts-loader
```
and then setup `webpack.config.js`. Under `devServer` there are different options to configure the dev server. 
For example, `compress` would serve the files as gzip to the browser, `hot` would hot update when changes happen to files.
```js
const path = require('path');

module.exports = {
  mode:"development",
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot:true
  },
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```
We would need to add `devServer` option to config the dev-server. In webpack 5, we would need to use `static` options. The option `compress` allow sending the assets to browser in compressed(gzip) format.

Setup `entry` and `output` for the build compilation.

Add
```js
 module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
```

For loading typescript files.


`devtool` is an option to create source-map for code tracing `'inline-source-map'` is one of the viable options.

5. Add `tsconfig.json` where we set rules for typescript as well as other configurations.
```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

6. Add Babel to dev dependencies
```npm i -D babel-loader @babel/core @babel/preset-env```
and then update webpack config:
```js
{
  module:{
    rules:[{
      test: /\.tsx$/,
      exclude: /node_modules/,
      use: {
        loader:"babel-loader"
      }
    }]  
  }
}
```
and then add babel config `babel.config.js`
```js
modules.exports = {
    presets: "@babel/preset-env"
}
```
`@babel/preset-env` is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s).

7. Environment splitting
We would need to split the webpack config into 3 different files `webpack.common.js`, `webpack.dev.js` and `webpack.prod.js` each containing corresponding specifics. 
To facilitate merging of the configs, use `webpack-merge`,
```
npm i -D webpack-merge
```

8. cache busting
When serving the files, browser may cache the file and therefore the update would not be effective. To bust that, we can use `html-webpack-plugin` to add content hash to the bundles.
```
npm install --save-dev html-webpack-plugin
```
Then to modify production settings, use `[contenthash]` to represent any hashes to files that require change of name upon content changes.
```js
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
```

9. CSS bundle
First we will need to install the loader for css
```
npm i -D css-loader mini-css-extract-plugin
```
`css-loader` would tell webpack how to handle `css` files and `mini-css-extract-plugin` to create final css bundle file. 
`style-loader` is another alternative which inject the css into the `js` file.

After that we need to update the `webpack.common.js`,

```js
{
  plugins:[new MiniCssExtractPlugin()]
  rules:[{
    test:/\.css/i,
    use: [MiniCssExtractPlugin.loader,"css-loader"]
  }],
}
```