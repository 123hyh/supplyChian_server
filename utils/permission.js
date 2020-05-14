const jwt = require("jsonwebtoken");

/**
 * 生成用户token
 * @param {*} data
 */
module.exports.generatorUserToken = (data) => {
  return jwt.sign(
    data,
    "userToken",
    { expiresIn: 60 * 120 } // 过期时间为 2 个小时
  );
};

/**
 * 解密用户token
 */
const verifyUserToken = (token) => {
  return jwt.verify(token, "userToken");
};
module.exports.verifyUserToken = verifyUserToken;

/**
 * 校验token
 */
module.exports.checkToken = (() => {
  const whiteListUrl = [
    /^\/users\/login/,
    /^\/public/,
    /^\/swagger/,
    /\.(jpg|png|webp|ico|css|js|html)$/,
  ];
  return async (ctx, next) => {
    const path = ctx.originalUrl;
    // 不校验白名单
    if (whiteListUrl.some((item) => item.test(path))) {
      await next();
    } else {
      // 获取 Authorization 请求头
      const token = ctx.get("Authorization");
      if (
        globalThis.userTokenList &&
        globalThis.userTokenList.includes(token)
      ) {
        await next();
        return;
      }
      ctx.body = { error: `登录失效！` };
    }
  };
})();
