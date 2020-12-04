const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, "..", "./src/index.js"),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Social Network ?",
			template: path.resolve(__dirname, "..", "./src/index.html"),
		}),
		new ESLintPlugin(),
	],
	output: {
		path: path.resolve(__dirname, "..", "dist"),
		filename: "bundle.js",
	},
};
