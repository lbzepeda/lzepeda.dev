module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
  plugins: ['react-perf', 'react-refresh', 'simple-import-sort', 'sonarjs'],
  rules: {
    // React Performance
    'react-perf/jsx-no-new-object-as-prop': 'warn',
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',

    // React Refresh
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
        checkJS: false,
      },
    ],

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
      },
    ],

    // Code Maintainability
    'max-lines': [
      'warn',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    complexity: ['warn', 10],

    // SonarJS
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',

    // Import Sorting
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // React y Next.js imports
          ['^react$', '^next'],
          // Librerías externas
          ['^@?\\w'],
          // Imports internos
          ['^@/'],
          // Imports relativos
          ['^\\.'],
          // Imports de tipos
          ['^@/types'],
          // Imports de estilos
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
  },
  overrides: [
    // Rules for Next.js
    {
      files: ['src/app/**/*.ts?(x)', 'src/pages/**/*.ts?(x)'],
      rules: {
        'react-refresh/only-export-components': 'off',
        '@typescript-eslint/no-unused-vars': 'off', // Para metadata y generateMetadata
      },
    },
  ],
};
