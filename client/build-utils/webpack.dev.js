const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
            path: path.resolve(__dirname, "..", "./.env.development"),
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 3000,
    },
    devtool: "eval-source-map",
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: "http://localhost:5000",
        }),
    },
};
