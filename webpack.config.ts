import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'web',
    mode: 'development',

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    devServer: {
        port: 8000
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.mustache', '.html', '.json', '.css']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'res', 'html', 'index.html')
        })
    ]

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};
