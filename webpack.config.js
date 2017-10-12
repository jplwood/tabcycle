var path = require('path')
var webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    entry: path.join(__dirname, 'src/popup.tsx'),
    manifest: path.join(__dirname, 'src/manifest.json'),
    img: path.join(__dirname, 'src/img'),
    build: path.join(__dirname, 'dist')
};


module.exports = {
    entry: {
        popup: PATHS.entry
        // vendor: [
        //     'react',
        //     'react-dom'
        // ]
    },
    output: {
        filename: "bundle.js",
        path: PATHS.build
    },
    devServer: {
        contentBase: PATHS.build,
        historyApiFallback: true,
        inline: true
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
            { test: /\.tsx?$/,  loader: "awesome-typescript-loader", include: PATHS.src},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader", include: PATHS.src},
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    // options: {
                    //     includePaths: [PATHS.src]
                    // }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['popup'],
            filename: 'popup.html',
            template: path.join(__dirname, 'src/popup.html')
        }),
        new CopyWebpackPlugin([
            { from: PATHS.manifest },
            { context: PATHS.img, from: 'icon**' }
        ])
    ]
}