module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["ng-scenario"],
    files: [
      "test/e2e/**/*.js"
    ],
    exclude: [],
    port: 3000,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: false,
    browsers: ['PhantomJS'],
    hostname: 'www.chewedfeed.com'
  });
};