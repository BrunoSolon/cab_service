module.exports = {
  env: {
    es2022: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended'
  ],
  plugins: ['prettier'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/semi': 0,
    'unicorn/prefer-module': 0,
    'unicorn/filename-case': 0,
    'unicorn/no-null': 0,
    'unicorn/prefer-top-level-await': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/prefer-logical-operator-over-ternary': 0,
    '@typescript-eslint/method-signature-style': 0,
    '@typescript-eslint/no-invalid-void-type': 0,
    'unicorn/prefer-event-target': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/explicit-function-return-type': 0
  }
};
