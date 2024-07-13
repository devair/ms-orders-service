/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: 'node',  
  setupFilesAfterEnv: ['<rootDir>/src/testSetup/setup.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {    
    '^.+\\.(t|j)s$': 'ts-jest'
  },    
  coverageProvider: "v8",
  testMatch: ["**/*.spec.ts"],  
  testTimeout: 180000, 
  globalSetup: '<rootDir>/src/testSetup/globalSetup.ts',
  globalTeardown: '<rootDir>/src/testSetup/globalTeardown.ts',
  collectCoverage: true, // Habilita a coleta de cobertura de código
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/I*.{ts,js}', '!src/**/I*.spec.{ts,js}','!src/testSetup/**/*.spec.{ts,js}'], // Arquivos para coletar cobertura
  coverageDirectory: 'reports/coverage', // Diretório para salvar o relatório de cobertura  
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports',
      outputName: 'junit.xml',
    }],
  ],
};

export default config;
