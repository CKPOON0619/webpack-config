# webpack-config
A project to practice webpack configurations.
First, these are some basics in webpack config:
**Entry**: This tells webpack the entry point to begin the bundling

**Output**: This tells webpack where to emit bundles when it has finished the bundling

**Loaders**: Webpack only understands javascript and JSON. Loaders tell webpack how to handle other files in the javascript application such as CSS, images, typescript, etc

**Mode**: This tells webpack the environment in which the bundles are meant for. This enables webpack’s built-in optimizations that correspond to each environment.

**Plugins**: While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management, and injection of environment variables (see official doc).

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
      test: /\.jsx$/,
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
10. Loading png, svg, jpeg and gif assets
To do that we will use html-loader and file-loader. 
```
npm i -D html-loader file-loader
```
and then apply `html-loader` and `file-loader` in webpack config where `"assets"`, the file specified on `outputPath`, would be the file those files would be copied to.

```js
{
    rules:[
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpeg|gif|svg)$/,
        loader: "file-loader",
        options:{
          name:"[name].[hash].[ext]",
          outputPath:"assets"
        }
      },
    ]
}

```

11. Cleaning before every build
We use this plugin to clean up the build files everytime we run build:
```
npm i -D clean-webpack-plugin
```
and then in production config,
```js
{
  plugins:[new CleanWebpackPlugin()]
}
```

12. BrowserLists
We can set up browserlist configurations in webpack to specify what browser the build should be compatible with by sharing this configuration with different loaders and plugins and so the script is properly transpiled. 
To set it up, one option is to create a `.browserslistrc` file. 
```
# Browsers that we support

defaults
not IE 11
maintained node versions
```
Or alternatively, specifying the list in `package.json`

```json
{
  "target": "browserslist",
  "browserslist":["defaults","not IE 11","maintained node versions"]
}
```

13. Set up react
Install react,
```
npm i react react-dom @types/react @types/react-dom
```
Install babel for react
```
npm i -D @babel/preset-react
```
Set up babel config
```js
{
   presets: ["@babel/preset-env",["@babel/preset-react",{ runtime: "automatic"}]]
}
```
the option `{ runtime: "automatic"}` would allow us to use `jsx` without importing `react` explicitly.