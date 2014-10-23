module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "public/libs/jquery/dist/jquery.js",
      "public/libs/angular/angular.js",
      "public/libs/angular-mocks/angular-mocks.js",
      "public/libs/angular-resource/angular-resource.js",
      "public/libs/angular-cookies/angular-cookies.js",
      "public/libs/angular-sanitize/angular-sanitize.js",
      "public/libs/angular-route/angular-route.js",
      "public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js",
      "public/libs/angular-http-auth/src/http-auth-interceptor.js",
      "public/js/*.js",
      "public/js/**/*.js",
      "test/mock/**/*.js",
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