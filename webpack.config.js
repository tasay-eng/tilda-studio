const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    resolve: {
        extensions: ['.js']
    },
    entry: {
        'landing-page': './src/pages/landing-page/landing-page.js',

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './docs'),
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use:  [
                    {loader: 'style-loader',
                    },
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader',
                    },
                    {loader: 'postcss-loader',
                    options: { config: { path: 'postcss.config.js' } }
                    },
                    {loader: 'less-loader',
                    options: {
                        useRelativePaths: true,
                        javascriptEnabled: true
                        }
                    }
                    ]
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loaders: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.(jpg|png|svg|jpeg)$/,
                exclude: /node_modules/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        useRelativePaths: true,
                        name: 'img/[name].[ext]',
                        publicPath: './',
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunks: ['landing-page']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/landing-page/landing-page.pug',
            chunks: ['landing-page'],
            filename: './landing-page.html',

        }), 
    ],
    devServer: {
        stats: 'errors-only'
    }
}; 