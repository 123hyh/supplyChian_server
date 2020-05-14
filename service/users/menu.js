const { operateDB } = require("../../config/DBconfig");
const { GET_MENU, USER_LOGIN, GET_USER_MENU } = require("./sql");
const { strongbox } = require("../../utils");
const {
  generatorUserToken,
  verifyUserToken,
} = require("../../utils/permission");
const md5 = require("md5");

module.exports.getMenu = (ctx) =>
  strongbox(async () => {
    // 递归归类子集
    function map(data = [], parentID = "M", list = []) {
      for (let item of data) {
        if (item.parentId === parentID) {
          const newData = { ...item, children: map(data, item.menuId) };
          newData.children.sort(({ menuId: lmenuId }, { menuId: rmenuId }) => {
            lmenuId = +lmenuId.slice(1);
            rmenuId = +rmenuId.slice(1);
            if (lmenuId < rmenuId) {
              return -1;
            } else if (lmenuId > rmenuId) {
              return 1;
            } else {
              return 0;
            }
          });
          if (!newData.children.length) delete newData.children;
          list.push(newData);
        }
      }
      return list;
    }
    // 获取用户id
    const { userId } = verifyUserToken(ctx.get("Authorization"));

    // 获取所有菜单
    const data = (await operateDB(GET_MENU)).reduce((prev, cur) => {
      prev[cur.menuId] = cur;
      return prev;
    }, {});

    // 获取用户菜单
    const [userMenu = {}] = await operateDB(GET_USER_MENU, [userId]);
    !userMenu.menuList && (userMenu.menuList = "");

    // 处理 chidlren
    const newMenu = map(
      userMenu.menuList
        .split(",")
        .filter(Boolean)
        .map((item) => {
          if (!item) return;
          return data[item];
        })
    );

    return newMenu;
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
