const { getMenu, loginService } = require("../../service/users/menu");
const { generatorUserToken } = require("../../utils/permission");
module.exports.getMenu = async (ctx, next) => {
  const { data } = await getMenu(ctx);
  ctx.body = data;
};
module.exports.loginControler = async (ctx, next) => {
  const data = await loginService(ctx.request.body, ctx);
  ctx.body = data;
};
