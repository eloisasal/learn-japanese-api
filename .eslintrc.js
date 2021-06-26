module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    rules: {},
};
