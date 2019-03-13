module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'import'],
  rules: {
    'no-unused-vars': 0,
    'no-undef': 0,
    'no-console': 0,
    'react/prop-types': 0,
    'prefer-destructuring': 1
  },
  extends: ['airbnb'],
  parserOptions: {
    ecmaFeatures: { legacyDecorators: true, experimentalObjectRestSpread: true },
  },
};
