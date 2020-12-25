const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* const WorkboxPlugin = require('workbox-plugin') */

module.exports = {
    entry: ['@babel/polyfill', './src/client/index.js'],
    /* output: {
        libraryTarget: 'var',
        library: 'Client'
    }, */
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin ({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin ({
            filename: '[name].css'
        }),
        /* new WorkboxPlugin.GenerateSW ()*/
    ]
}