module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'jest'],
    env: {
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended'],
    rules: {
        quotes: ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1, ignoreComments: false }],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'quote-props': ['error', 'as-needed'],
        'max-len': ['error', { ignoreComments: true, code: 160 }],

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/class-name-casing': 'warn',
    },
    overrides: [
        {
            files: './tests/**/*',
            env: {
                'jest/globals': true,
            },
        },
        {
            files: './declarations/**/*',
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            files: './**/*.ts',
            rules: {
                'no-undef': 'off',
                'max-len': ['error', { ignoreComments: true, code: 300 }],
                'no-dupe-class-members': 'off',
            },
        },
    ],
};
