const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log('path', path.resolve(__dirname, 'src'))
console.log('path', path.resolve('./'))

module.exports = {
    // 入口
    entry: path.resolve(__dirname, 'src/index.tsx'),
    // 出口
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // ts tsx
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // sass scss
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    // publicPath: 'assets',
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, "./src")
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}