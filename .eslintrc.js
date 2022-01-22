module.exports = {
    env: {
        browser: true,
        // "es2021": true, // option caused Code Climate to break LOL!
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
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
        "@typescript-eslint/no-explicit-any": ["off"],
    },
};
