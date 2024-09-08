module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:unicorn/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'unicorn/no-useless-promise-resolve-reject': 'off',
		'unicorn/prefer-date-now': 'off',
		'unicorn/no-abusive-eslint-disable': 'off',
		'arrow-body-style': ['error', 'as-needed'],
		'unicorn/better-regex': 2,
		'unicorn/explicit-length-check': 2,
		'unicorn/prefer-default-parameters': 2,
		'unicorn/no-array-push-push': 2,
		'unicorn/prefer-array-index-of': 2,
		'unicorn/prefer-array-flat-map': 2,
		'unicorn/prefer-array-some': 2,
		'unicorn/prefer-array-find': 2,
		'unicorn/prefer-array-flat': 2,
		'unicorn/prefer-includes': 2,
		'unicorn/prefer-top-level-await': 2,
		'unicorn/no-useless-spread': 2,
		'unicorn/no-useless-fallback-in-spread': 2,
		'unicorn/no-for-loop': 2,
		'unicorn/prefer-set-size': 2,
		'unicorn/prefer-type-error': 2,
		'unicorn/prefer-object-from-entries': 2,
		'unicorn/no-instanceof-array': 2,
		'unicorn/prefer-native-coercion-functions': 2,
		'unicorn/prefer-logical-operator-over-ternary': 2,
		'unicorn/prefer-event-target': 2,
		'unicorn/no-await-expression-member': 2,
		'unicorn/no-new-array': 2,
		'unicorn/throw-new-error': 2,
		'unicorn/no-useless-length-check': 2,
		'unicorn/prefer-prototype-methods': 2,
		'unicorn/prefer-export-from': [2, { ignoreUsedVariables: true }],
		'unicorn/no-new-buffer': 2,
		'unicorn/prefer-query-selector': 2,
		'unicorn/prefer-string-replace-all': 2,
		'unicorn/prefer-switch': [2, { emptyDefaultCase: 'do-nothing-comment' }],
		'unicorn/switch-case-braces': 2,
		'unicorn/catch-error-name': 2,
		'unicorn/consistent-destructuring': 2,
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: ['camelCase', 'PascalCase'],
				leadingUnderscore: 'allow',
				filter: {
					regex: '^(_count|__html|_sum)$',
					match: false
				}
			},
			{
				selector: 'variable',
				types: ['boolean'],
				format: ['PascalCase'],
				prefix: ['is', 'should', 'has', 'can', 'did', 'will']
			},

			{
				selector: 'variable',
				format: ['camelCase'],
				types: ['boolean', 'string', 'number']
			},
			{
				selector: 'memberLike',
				modifiers: ['private'],
				format: ['camelCase']
			},
			{
				selector: 'property',
				format: null,
				modifiers: ['requiresQuotes']
			},
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				prefix: ['T', 'K', 'V']
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				suffix: ['Interface', 'Type', 'Properties', 'Output', 'Payload']
			},
			{
				selector: 'variable',
				types: ['number'],
				format: ['UPPER_CASE']
			}
		],
		'unicorn/filename-case': [
			'error',
			{
				case: 'kebabCase',
				ignore: ['use', 'App']
			}
		],
		'@typescript-eslint/no-use-before-define': 2,
		'@typescript-eslint/no-inferrable-types': 2,
		'@typescript-eslint/no-loop-func': 2,
		'@typescript-eslint/no-non-null-assertion': 2,
		'@typescript-eslint/prefer-function-type': 2,
		'@typescript-eslint/prefer-string-starts-ends-with': 2,
		'@typescript-eslint/return-await': 2,
		'@typescript-eslint/consistent-type-assertions': 2,
		'@typescript-eslint/consistent-type-imports': [
			2,
			{
				fixStyle: 'inline-type-imports'
			}
		],
		'@typescript-eslint/consistent-type-exports': [
			2,
			{ fixMixedExportsWithInlineTypeSpecifier: true }
		],
		'@typescript-eslint/switch-exhaustiveness-check': 2,
		'@typescript-eslint/method-signature-style': 2,
		'@typescript-eslint/unified-signatures': 2,
		'@typescript-eslint/no-unused-expressions': [
			2,
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true,
				enforceForJSX: true
			}
		],
		'@typescript-eslint/array-type': 2,
		'@typescript-eslint/no-empty-function': 2,
		'@typescript-eslint/prefer-optional-chain': 2,
		'@typescript-eslint/dot-notation': 2,
		'@typescript-eslint/no-import-type-side-effects': 2,
		'@typescript-eslint/default-param-last': 2,

		// warning rules
		'unicorn/prefer-spread': 1,
		'unicorn/consistent-function-scoping': 1,
		'@typescript-eslint/no-explicit-any': 1,
		'@typescript-eslint/no-shadow': [
			1,
			{
				hoist: 'all',
				allow: ['resolve', 'reject', 'done', 'next', 'err', 'error', 'id'],
				ignoreTypeValueShadow: true,
				ignoreFunctionTypeParameterNameValueShadow: true
			}
		],

		// disabled rules
		'@typescript-eslint/ban-ts-comment': 0,
		'@typescript-eslint/no-unsafe-assignment': 0,
		'@typescript-eslint/no-array-constructor': 0,
		'react/jsx-props-no-spreading': 0,
		'unicorn/no-array-reduce': 0,
		'unicorn/no-null': 0,
		'unicorn/no-nested-ternary': 'off'
	}
};
