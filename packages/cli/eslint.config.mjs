import config from '@github-please/eslint-config/library.mjs'

export default {
  ...config,
  rules: {
    'eslint/no-console': 'off',
  }
}
