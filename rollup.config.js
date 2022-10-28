import typescript from 'rollup-plugin-typescript2'; // 处理typescript
import babel from 'rollup-plugin-babel'; // 处理es6
import resolve from '@rollup/plugin-node-resolve'; // 你的包用到第三方npm包
import commonjs from '@rollup/plugin-commonjs'; // 你的包用到的第三方只有commonjs形式的包
// import builtins from 'rollup-plugin-node-builtins'; // 如果你的包或依赖用到了node环境的builtins fs等
import { terser } from 'rollup-plugin-terser'; // 压缩，可以判断模式，开发模式不加入到plugins
import json from '@rollup/plugin-json'; // 解析json文件

const isDev = process.env.NODE_ENV !== 'production';

const rollupConfig = {
	input: 'src/cli.ts', // 源文件入口
	output: [
		{
			file: 'dist/main.js', // package.json 中 "main": "dist/index.cjs.js",
			format: 'cjs', // commonjs 形式的包， require 导入
			sourcemap: true
		}
	],
	plugins: [
		commonjs({
			include: 'node_modules/**',
			exclude: []
		}),
		resolve(),
		typescript(),
		babel({
			exclude: '**/node_modules/**'
		}),

		!isDev && terser(),
		// builtins(),
		json()
	],
	external: []
};

export default rollupConfig;
