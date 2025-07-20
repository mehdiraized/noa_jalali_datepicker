// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.ts', // Entry point
	output: [
		{
			file: 'dist/index.js', // Output file
			format: 'cjs', // CommonJS format for Node.js
			sourcemap: true,
		},
		{
			file: 'dist/index.esm.js', // ES module format
			format: 'esm', // ES module format
			sourcemap: true,
		},
		{
			file: 'dist/index.umd.js', // UMD format for browser
			format: 'umd',
			name: 'NoaJalaliDatepicker',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
				'jalali-moment': 'moment',
				classnames: 'classNames',
			},
			sourcemap: true,
		},
	],
	plugins: [
		resolve(), // Resolve node modules
		commonjs(), // Convert CommonJS to ES6
		typescript(), // Compile TypeScript
		terser(), // Minify the output
	],
	external: ['react', 'react-dom', 'jalali-moment', 'classnames'], // Treat these as external dependencies
};
