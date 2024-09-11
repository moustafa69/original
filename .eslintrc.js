module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    'prettier/prettier': 'warn',
    'filename-rules/match': [
      'error',
      /(^([a-z][a-z\d]*)(-[a-z\d]+)*\.(schema|class|helper|interface|dto|service|config|controller|module|aggregation|enum|type|relation|node|model|pipe|provider|default|constant|middleware|guard|loader|filter|decorator|interceptor|strategy|pipeline|util|listener)\.ts$)|(^index\.ts$)|(^main\.ts$)|(spec\.ts$)/,
    ],
  },
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
};
