module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "selector-class-pattern": "^[a-z0-9_-]+$",
    "order/properties-alphabetical-order": true,
    "order/order": ["custom-properties", "declarations"],
    "unit-allowed-list": [
      "px",
      "em",
      "rem",
      "%",
      "s",
      "deg",
      "fr",
      "vw",
      "vh",
      "dvh",
    ],
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
  },
  ignoreFiles: ["dist/**/*"],
};
