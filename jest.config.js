module.exports = {
    roots: ['<rootDir>'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['jest-extended'],
};
