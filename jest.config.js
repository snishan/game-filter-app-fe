export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Ensure this is set to 'jsdom'
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    setupFiles: ['./jest.setup.ts'],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(txt|text)\\?raw$": "<rootDir>/__mocks__/textMock.js",
      "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(import|env)$": "<rootDir>/__mocks__/envMock.js",
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    }
  };