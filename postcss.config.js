// It is handy to not have those transformations while we developing
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [
      /* eslint-disable global-require */
      require('autoprefixer'),
      require('cssnano'),
      /* eslint-enable global-require */
      // More postCSS modules here if needed
    ],
  };
}