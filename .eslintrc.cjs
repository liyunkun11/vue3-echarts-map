module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard-with-typescript", "plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.{js,cjs}"],
    },
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    extraFileExtensions: [".vue"],
  },
  plugins: ["vue"],
  rules: {
    "@typescript-eslint/strict-boolean-expressions": "off", // 关闭严格的布尔值检查
    "@typescript-eslint/explicit-function-return-type": "off", // 函数可以没有返回类型
    "@typescript-eslint/no-unsafe-argument": "off", // 允许不能传递不安全的参数
    "@typescript-eslint/no-floating-promises": "off", // 允许未处理的 Promise 返回值
  },
};
