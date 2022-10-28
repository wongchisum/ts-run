module.exports = {
	extends: ['alloy', 'alloy/typescript', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	env: {
		// 您的环境变量（包含多个预定义的全局变量）
		browser: true,
		node: true,
		mocha: true,
		jest: true
	},
	globals: {
		// 您的全局变量（设置为 false 表示它不允许被重新赋值）
		// Your global variables (setting to false means it's not allowed to be reassigned)
		// myGlobal: false
	},
	rules: {
		// 自定义您的规则
		// Customize your rules
		'prettier/prettier': 'off'
	}
};
