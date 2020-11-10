module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "linebreak-style": ["error", "windows"],
        "no-console": 0,
        "no-unused-vars": 0,
        "react/prop-types": 0,
    },
};
