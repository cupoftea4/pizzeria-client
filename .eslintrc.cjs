   
module.exports = {
root: true,
env: { browser: true, es2020: true },
extends: [
  'standard-with-typescript',
  'plugin:react/recommended',
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:react-hooks/recommended',
],
ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
parser: '@typescript-eslint/parser',
plugins: ['react-refresh'],
rules: {
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
  '@typescript-eslint/semi': ['error', 'always'],
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/strict-boolean-expressions': 'off',
  '@typescript-eslint/no-extraneous-class': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
  '@typescript-eslint/promise-function-async': 'off',
  '@typescript-eslint/ban-types': 'warn',
  'no-return-assign': 'warn',
  '@typescript-eslint/no-invalid-void-type': 'warn',
  'no-prototype-builtins': 'off',
  '@typescript-eslint/no-confusing-void-expression': 'off',
  'one-var': ['warn', {'let': 'consecutive'}],
  '@typescript-eslint/prefer-nullish-coalescing': ['warn', {'ignoreConditionalTests': true, 'ignoreMixedLogicalExpressions': true}],
  '@typescript-eslint/restrict-plus-operands': ['warn', {'allowNumberAndString': true}],
  '@typescript-eslint/restrict-template-expressions': 'off',
  'eqeqeq': ['error', 'always'],
  'max-len': ['warn', { 'code': 120, 'ignoreComments': true }],
  'react/react-in-jsx-scope': 'off',
  
},
settings: {
  'react': {
    'version': 'detect',
  },
},
}