const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

async function jestConfig() {
  const nextJestConfig = await createJestConfig({
    moduleNameMapper: {
      'utils/(.*)$': '<rootDir>/utils/$1'
    },
    testEnvironment: 'jsdom'
  })()

  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(!jest-runner)/'
  return nextJestConfig
}

module.exports = jestConfig
