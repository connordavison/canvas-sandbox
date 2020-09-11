const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    resolve: {
        alias: { app: path.resolve(__dirname, 'src/') },
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: 'ts-loader',
        }]
    }
};
