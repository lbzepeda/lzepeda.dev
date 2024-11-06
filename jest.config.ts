import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Proporciona la ruta a tu app de Next.js
  dir: './',
});

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Configuración para manejar ES Modules y TypeScript
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    // Maneja las importaciones de módulos
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Patrones de archivos de test
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  // Configuración específica para Next.js
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig se asegura de que next/jest pueda manejar las transformaciones
export default createJestConfig(config);
