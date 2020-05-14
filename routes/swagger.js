const router = require("koa-router")();
const swaggerJSDoc = require("swagger-jsdoc");

// swagger definition
const swaggerDefinition = {
  info: {
    title: "API接口",
    version: "1.0.0",
    description: "API接口文档",
  },
  host: "0.0.0.0:3000",
  basePath: "/",
};

// initialize swagger-jsdoc
function Swagger() {
  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ["./routes/*.js"],
  };
  return swaggerJSDoc(options);
}
router.get("/swagger.json", async function (ctx) {
  ctx.set("Content-Type", "application/json");
  const swaggerSpec = Swagger();
  ctx.body = swaggerSpec;
});
module.exports = router;
