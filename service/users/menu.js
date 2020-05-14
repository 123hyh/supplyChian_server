const { operateDB } = require("../../config/DBconfig");
const { GET_MENU, USER_LOGIN } = require("./sql");
const { strongbox } = require("../../utils");
const { generatorUserToken } = require("../../utils/permission");
const md5 = require("md5");

module.exports.getMenu = () =>
  strongbox(async () => {
    // 递归归类子集
    function map(data = [], parentID = "M", list = []) {
      for (let item of data) {
        if (item.parentId === parentID) {
          const newData = { ...item, children: map(data, item.menuId) };
          if (!newData.children.length) delete newData.children;
          list.push(newData);
        }
      }
      return list;
    }
    return map(await operateDB(GET_MENU));
  });
/**
 * 用户登录
 */
module.exports.loginService = ({ name, password } = {}, ctx) =>
  strongbox(async () => {
    if (password && password) {
      password = md5(password);
      const [userInfo] = await operateDB(USER_LOGIN, [name, password]);

      if (userInfo) {
        // 生成token
        const { userId } = userInfo;
        const token = generatorUserToken({ userId });

        // 存入全局
        !global.userTokenList && (global.userTokenList = []);
        global.userTokenList.push(token);

        ctx.set("Authorization", token);
        // 删除字段
        return userInfo;
      } else {
        ctx.status = 500;
        const err = new Error("请输入正确账号或密码");
        return err.message;
      }
    } else {
      ctx.status = 500;
      const err = new Error("请输入账号和密码");
      return err.message;
    }
  });
