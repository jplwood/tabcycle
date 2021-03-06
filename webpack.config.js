var path = require('path')
var webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    // Files
    uiEntry: path.join(__dirname, 'src/ui.tsx'),
    bgEntry: path.join(__dirname, 'src/background.ts'),
    manifest: path.join(__dirname, 'src/manifest.json'),

    //Folders
    src: path.join(__dirname, 'src'),
    img: path.join(__dirname, 'src/assets'),
    build: path.join(__dirname, 'dist'),
    nm: path.join(__dirname, 'node_modules')
};


const config = {
    entry: {
        ui: ['babel-polyfill', PATHS.uiEntry],
        background: ['babel-polyfill', PATHS.bgEntry]
    },
    output: {
        filename: "[name].bundle.js",
        path: PATHS.build
    },
    watch: true,

    //Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolveable exts.
        extensions: [".ts", ".tsx", ".js", "json"]
    },
    module: {
        rules: [
            { 
                // ts -> ES6 -> babel -> ES5
                test: /\.(ts|tsx)?$/,  
                include: PATHS.src,
                exclude: PATHS.nm,
                loaders: ['babel-loader', 'awesome-typescript-loader']
            },
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader", 
                include: PATHS.src
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" }, // creates style nodes from JS strings
                    { loader: "css-loader" }, // translates CSS into CommonJS
                    { loader: "sass-loader"}, // compiles Sass to CSS
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new CopyWebpackPlugin([
            { from: PATHS.manifest },
            { context: PATHS.img, from: 'icon**' }
        ])
    ]
}

module.exports = config;