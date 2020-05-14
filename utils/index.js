/**
 * 处理 async 函数报错方法
 */
module.exports.strongbox = async (handler = () => null, ctx = {}) => {
  try {
    const data = await handler();
    return { data };
  } catch (error) {
    ctx.status = 500;
    return { error: error.message };
  }
};

/**
 * 处理 controler 公共方法
 */
module.exports.controlerBox = async (handler = () => null) => {
  try {
    return handler();
  } catch (error) {
    debugger;
  }
};
/**
 * 校验token
 */
module.exports.checkToken = (ctx) => {
  debugger;
};
