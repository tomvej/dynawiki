import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

/** removes falsy items from array */
const array = (...target) => target.filter((item) => item);

export default ({dev}) => ({
    entry: array(
        dev && 'react-hot-loader/patch',
        'babel-polyfill',
        './src/',
    ),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: array(
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
        }),
        !dev && new webpack.NoEmitOnErrorsPlugin(),
        !dev && new webpack.optimize.UglifyJsPlugin(),
        !dev && new ExtractTextPlugin('style.css'),
    ),
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['es2015', {modules: false}],
                        'react',
                    ],
                    cacheDirectory: true,
                },
            },
            {
                test: /\.less$/,
                loader: dev
                    ? ['style-loader', 'css-loader', 'less-loader']
                    : ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: ['css-loader', 'less-loader'],
                    }),
            },
        ],
    },
});
