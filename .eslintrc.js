module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "standard",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
    ],
    rules: {
        indent: ["error", 4],
        semi: ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        quotes: ["error", "double"],
        "quote-props": ["error", "as-needed"],
        "no-use-before-define": ["off"],
        "no-trailing-spaces": ["error"],
        "no-tabs": ["error"],
        "eol-last": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "no-extra-boolean-cast": ["off"],
        "linebreak-style": ["error", "unix"],
    },
};
