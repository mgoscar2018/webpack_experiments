const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Para obtener guia de autocompletar
/** @type {import('webpack').Configuration} */  

module.exports = {
    entry: './src/index.js',    
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'bundle.js'        
    },
    resolve: {        
        extensions: ['.js','.jsx']
    },
    mode: 'development',
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
    devServer:{ //Esto sólo para modo desarrollo
        static: path.join(__dirname, 'dist'),
        compress:true,
        open: true, //para que se abra automáticamente 
        port:3006
    }
}
