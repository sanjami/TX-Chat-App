module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	parser: 'babel-eslint',
	plugins: [
		'react',
	],
	rules: {
		semi: 2,
		'no-tabs': 0,
		indent: [
			'error',
			'tab',
		],
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'react/jsx-filename-extension': [
			1,
			{
				extensions: [
					'.js',
					'.jsx',
				],
			},
		],
		'react/destructuring-assignment': [
			1,
			'always',
		],
		'no-underscore-dangle': ['error', { allow: ['__REDUX_DEVTOOLS_EXTENSION__', '_id'] }],
	},
};
