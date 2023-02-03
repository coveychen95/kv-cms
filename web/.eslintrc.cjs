/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    // 强制使用单引号
    quotes: ['error', 'single'],
    // 强制不使用分号结尾
    semi: ['error', 'never'],
    // 拖尾加逗号
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'never',
    //     objects: 'never',
    //     imports: 'never',
    //     exports: 'never',
    //     functions: 'never',
    //   },
    // ],
    // // 关闭冲突规则
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'flow',
        semi: false, // 是否在语句末尾打印分号，这里选择不加
      },
    ],
  },
}
