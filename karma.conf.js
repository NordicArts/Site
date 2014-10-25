module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "client/libs/jquery/dist/jquery.js",
      "client/libs/angular/angular.js",
      "client/libs/angular-mocks/angular-mocks.js",
      "client/libs/angular-resource/angular-resource.js",
      "client/libs/angular-cookies/angular-cookies.js",
      "client/libs/angular-sanitize/angular-sanitize.js",
      "client/libs/angular-route/angular-route.js",
      "client/libs/angular-bootstrap/ui-bootstrap-tpls.min.js",
      "client/libs/angular-http-auth/src/http-auth-interceptor.js",
      "client/js/*.js",
      "client/js/**/*.js",
      "test/spec/**/*.js"
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