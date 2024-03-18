const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/node',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Change to the appropriate URL for your Node.js backend
      changeOrigin: true,
    })
  );
};