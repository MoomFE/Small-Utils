module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    './node_modules/@moomfe/eslint-config/.eslintrc.vue.js'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'import/no-extraneous-dependencies': ['off']
  }
};
