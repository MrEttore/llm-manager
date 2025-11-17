import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.ts'],
    plugins: { 'simple-import-sort': simpleImportSort },
    extends: [pluginJs.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    },
  },
);
