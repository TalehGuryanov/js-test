module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "prettier/prettier": "error",
      "max-len": ["error", { code: 80 }],
      "newline-after-var": ["error", "always"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-use-before-define": [
        "error",
        { functions: false, variables: true, classes: true },
      ],
      "import/prefer-default-export": "off",
    },
  },
];
