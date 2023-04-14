module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	'plugins': [
		'react',
	],
	'rules': {
		'semi': ['error', 'always'],
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		//"jsx-quotes": ["error", "prefer-double"],
		'jsx-quotes': ['error', 'prefer-single'],
		//"no-tabs": 0,
		//"max-len": ["error", { "code": 120}], //, "tabWidth": 4 
		'no-console': 'warn',
		'prefer-const': 'error',
		'comma-dangle': ['error', 'always-multiline'],
		'react/prop-types': [0],
		// 'import/order': ['error', {
		// 	'groups': ['builtin', 'external', 'internal', 
		// 		'parent', 'sibling', 'index', 'object', 'type'],
		// 	'newlines-between': 'always-and-inside-groups',
		// }],    
	},
};
