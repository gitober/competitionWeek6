To install the http-proxy-middleware dependency, you can use the following npm command:
npm install http-proxy-middleware@2.0.6 --save

"dependencies": {
  "http-proxy-middleware": "^2.0.6"
}

frontend/src/setupProxy.js file, you'll find the following content:

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      secure: false
    })
  );
};