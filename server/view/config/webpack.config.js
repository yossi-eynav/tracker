const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distPath = path.join(__dirname, '/../', 'dist' );
const APIConfiguration = require('../../config/server') 

module.exports = {
    devtool: 'source-map',
    context: __dirname + '/..',
    progress: true,
    entry: [
        "./src/index.js"
    ],
    output: {
        path: distPath,
        filename: "bundle.js"
    },
    plugins: [
          new webpack.DefinePlugin({
            'API_ENDPOINT': JSON.stringify(`http://127.0.0.1:${APIConfiguration.PORT}/api/${APIConfiguration.API_VERSION}/`)
            }),
            new HtmlWebpackPlugin({
                title: 'extension',    
            })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, '../','src')
            },
              {
                test: /\.scss|\.css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};
