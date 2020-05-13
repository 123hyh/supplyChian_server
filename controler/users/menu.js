const { getMenu } = require('../../service/users/menu');
const { controlerBox } = require('../../utils');

module.exports.getMenu = async (ctx, next) => {
  const { data } = await getMenu(ctx.body);
  ctx.body = data;
};
