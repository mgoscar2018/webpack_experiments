const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//Para obtener guia de autocompletar
/** @type {import('webpack').Configuration} */  

module.exports = {
    entry: './src/index.js',    
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'bundle.js',
        publicPath: "./"
    },
    resolve: {        
        extensions: ['.js','.jsx'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname,'src/styles/')
        }
    },
    mode: 'production',
    module: {
        rules: [
            {   test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}
			},
            { 
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
	plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    optimization: {//Esto es sólo para producción
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(), //terser-webpack-plugin ⇒ Permite minificar de una mejor forma
        ]
    }
}
