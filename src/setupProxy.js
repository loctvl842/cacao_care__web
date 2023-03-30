const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api/v2/",
    createProxyMiddleware({
      target: "https://io.adafruit.com/",
      changeOrigin: true,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://localhost:8400/",
      target: "https://cacao-care.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
