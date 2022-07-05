//Explicación a detalle sobre cómo funciona webpack
//https://dev.to/duxtech/webpack-para-torpes-l7b

//Curso sobre Webpack 5
//https://www.youtube.com/watch?v=FMNuTj89RzU
//mas antiguo pero de la misma persona: https://www.youtube.com/watch?v=ansUGkcrhwY&t=1s

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://webpack.js.org/plugins/mini-css-extract-plugin/
//Instalar dependencias:
// >npm install mini-css-extract-plugin css-loader -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//https://webpack.js.org/plugins/copy-webpack-plugin/
// >npm i copy-webpack-plugin -D
//const CopyPlugin = require("copy-webpack-plugin");  //a partir de la versión webpack 5 ya no es necesario esto

//css-minimizer-webpack-plugin ⇒ Nos ayuda a comprimir nuestros archivos finales CSS
//terser-webpack-plugin ⇒ Permite minificar de una mejor forma

/** @type {import('webpack').Configuration} */  //Para obtener guia de autocompletar
module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: './src/index.js',
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename le pone el nombre al archivo final
        filename: 'main.js'
        //assetModuleFilename: 'assets/[hash][ext][query]'
    },
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: ['.js']
    },    
    module: {
        rules: [
            {   //instrucciones que indican como trabajar con babel loader conectándolo con webpack
                //test permite saber con que tipo de extensiones vamos a trabajar
                test: /\.m?js$/,  //cualquier archivo que utilice la extensión que empiece con m ó js (aplica para .mjs y .js)
                exclude: /node_modules/, //Excluye los elementos que se encuentran en "node_modules"
                use: {
                    loader: 'babel-loader' //indica que utiliza babel loader
                }
            },
            { //para MiniCssExtractPlugin 
                // test: /\.css|.sass|.scss|.styl$/i, //"|.styl" para agrear soporte al preprocesador Stylus
                // use: [MiniCssExtractPlugin.loader, 'css-loader',"postcss-loader","sass-loader",'stylus-loader'],
                test: /\.css|.styl$/i, //"|.styl" para agrear soporte al preprocesador Stylus
                use: [MiniCssExtractPlugin.loader, 'css-loader','stylus-loader']
            },
            { //Esta es otra manera de mover imagenes y renombrarlas con un hash en lugar de utilizar el plugin de copiar (CopyPlugin)
                test:  /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]',
                }
            },
            {// Para trabajar con letras o fuentes descargadas en el proyecto
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]',
                }
            }
        ]
    }, //se añade la sección de plugins como parte de la instalación de html-webpack-plugin
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin()/*,
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ],
        })*/
    ],
    optimization: { //a partir de webpack5 ya está incluido este plugin llamado: TerserWebpackPlugin
        minimize: true //terser-webpack-plugin ⇒ Permite minificar de una mejor forma
    }
}
