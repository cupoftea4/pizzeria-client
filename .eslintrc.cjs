module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/ban-types": "warn",
    "no-return-assign": "warn",
    "@typescript-eslint/no-invalid-void-type": "warn",
    "no-prototype-builtins": "off",
    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "one-var": ["warn", { let: "consecutive" }],
    "@typescript-eslint/prefer-nullish-coalescing": [
      "warn",
      { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: true },
    ],
    "@typescript-eslint/restrict-plus-operands": ["warn", { allowNumberAndString: true }],
    "@typescript-eslint/restrict-template-expressions": "off",
    eqeqeq: ["error", "always"],
    "max-len": ["warn", { code: 120, ignoreComments: true }],
    "react/react-in-jsx-scope": "off",
    "no-extend-native": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-unused-expressions": "error",
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
    "no-use-before-define": ["error", { functions: false, classes: true }],
    "eol-last": ["error", "always"],
    "no-array-constructor": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-trailing-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "space-before-blocks": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "arrow-spacing": "error",
    "no-class-assign": "error",
    "no-const-assign": "error",
    "no-dupe-class-members": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "require-yield": "error",
    complexity: ["warn", 10],
    "max-depth": ["warn", 3],
    "max-params": ["warn", 4],
    "max-statements": ["warn", 15],
    "no-nested-ternary": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
