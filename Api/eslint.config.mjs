import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
    },
  },
];
