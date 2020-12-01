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
				test: /\.js$/,
				loader: "babel-loader",
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "sass-loader",
					},
				],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
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
