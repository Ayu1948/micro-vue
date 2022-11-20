module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', './.eslintrc-auto-import.json'],
  overrides: [],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: true, // 不限制eslint对import使用位置

    //     ecmaFeatures: {
    //       modules: true,
    //       legacyDecorators: true
    //     }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
    __webpack_public_path__: 'writable',
  },
  plugins: ['vue'],
  rules: {
    //关闭组件命名规则
    'vue/multi-word-component-names': 'off',
  },
};
