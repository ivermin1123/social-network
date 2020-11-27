module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "linebreak-style": ["error", "windows"],
        "no-console": 0,
        "no-unused-vars": 0,
        "react/prop-types": 0,
    },
};
