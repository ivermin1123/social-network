const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const smp = new SpeedMeasurePlugin();smp.wrap(
module.exports = {
	mode: "development",
	resolve: {
		extensions: [".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
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
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							mimetype: "image/png",
							name: "images/[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "fonts/[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							mimetype: "application/font-woff",
							name: "fonts/[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							mimetype: "application/octet-stream",
							name: "fonts/[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							mimetype: "image/svg+xml",
							name: "images/[name].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.jsx?$/,
			options: {
				eslint: {
					configFile: path.resolve(__dirname, ".eslintrc"),
					cache: false,
				},
			},
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new Dotenv({
			path: path.resolve(__dirname, "..", "./.env.development"),
		}),
	],
	devServer: {
		historyApiFallback: true,
		hot: true,
		port: 3000,
		open: "chrome",
	},
	devtool: "eval-cheap-module-source-map",
	entry: [
		"react-hot-loader/patch",
		"webpack-dev-server/client?http://localhost:3000",
		"webpack/hot/only-dev-server",
		"./src/index.js",
	],
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: "http://localhost:5000",
		}),
	},
};
