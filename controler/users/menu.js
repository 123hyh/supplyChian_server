const { getMenu } = require('../../service/users/menu');
const { controlerBox } = require('../../utils');

module.exports.getMenu = (ctx, next) =>
  controlerBox(async () => {
    debugger;
    const { data } = await getMenu(ctx.body);
    ctx.body = data;
  });
