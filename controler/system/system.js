const { getMenu, loginService } = require("../../service/system/system");

module.exports.getMenu = async (ctx, next) => {
  const { data } = await getMenu(ctx);
  ctx.body = data;
};

module.exports.loginControler = async (ctx, next) => {
  const data = await loginService(ctx.request.body, ctx);
  ctx.body = data;
};
