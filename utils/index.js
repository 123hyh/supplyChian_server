/**
 * 处理 async 函数报错方法
 */
module.exports.strongbox = async (handler = () => null) => {
  try {
    const data = await handler();
    return { data };
  } catch (error) {
    return Promise.reject({ error: error.message });
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
