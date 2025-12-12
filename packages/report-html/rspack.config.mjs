// @ts-check
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'
// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig({
	entry: {
		main: "./src/index.js"
	},
	output: {
		filename: '[name].js',
		chunkFilename: 'monaco-chunk-[name].js',
	},
	module: {
		rules: [
			{
				test: /\.woff2$/,
				type: "asset"
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "builtin:swc-loader",
						/** @type {import('@rspack/core').SwcLoaderOptions} */
						options: {
							jsc: {
								parser: {
									syntax: "ecmascript"
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [
		new rspack.HtmlRspackPlugin({ template: "./index.html" }),
		new MonacoWebpackPlugin({
			// 不加载任何语言服务 worker，只保留 Monarch 高亮
			languages: [
				'javascript',
				// 'typescript',
				// 'json',
				// 'css',
				// 'html'
			],
		})
,
	],
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		],
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				monaco: {
					name: 'monaco-editor',
					test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
					chunks: 'all',
					priority: 20,
				},

				vendor: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					priority: 10,
				}
			}
		}
	},
	experiments: {
		css: true
	}
});
