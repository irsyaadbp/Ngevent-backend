module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@ngevent': './src',
        },
      },
    ],
    'jest-hoist',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
