import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended,
});

const config = [
	...tseslint.configs.recommended,
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript'],
	}),
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			prettier,
			'simple-import-sort': simpleImportSort,
			import: importPlugin,
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'@next/next/no-img-element': 'off',
			'react-hooks/exhaustive-deps': 'off',

			// Import sort config
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',

			'prefer-destructuring': [
				'error',
				{
					VariableDeclarator: {
						array: false,
						object: true,
					},
					AssignmentExpression: {
						array: false,
						object: false,
					},
				},
				{
					enforceForRenamedProperties: false,
				},
			],
			'prettier/prettier': [
				'error',
				{
					semi: true,
					trailingComma: 'es5',
					singleQuote: true,
					printWidth: 80,
					tabWidth: 2,
					useTabs: true,
				},
			],
			'no-console': [
				'error',
				{
					allow: ['warn', 'error', 'info'],
				},
			],
			'no-restricted-imports': ['error'],
		},
	},
];

export default config;
