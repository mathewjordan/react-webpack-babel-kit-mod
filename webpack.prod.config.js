const {resolve} = require('path');
const path = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    context: resolve(__dirname, 'resources/ut-header/src'),
    entry: [
        './index.js'
        // the entry point of our app
    ],
    output: {
        filename: 'header-scripts.js',
        path: resolve(__dirname, 'resources/ut-header/dist')
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader',],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader" // translates CSS into CommonJS
                            },
                            {
                                loader: "sass-loader" // compiles Sass to CSS
                            }
                        ],
                        // use style-loader in development
                        fallback: "style-loader"
                    }
                )
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: 'url-loader'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new UglifyJsPlugin({
            sourceMap: false
        }),

        new ExtractTextPlugin({filename: 'header-styles.css', allChunks: true}),

        new HtmlWebPackPlugin({
            template: path.join(__dirname, "./resources/ut-header/src/index.html"),
            filename: "./index.html"
        })
    ],
};