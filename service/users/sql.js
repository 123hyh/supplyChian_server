// 用户登录
module.exports.USER_LOGIN = `SELECT 
  userId,enName,cnName,departmentId,gender,email,phone,idCard,address,entryTime
FROM userInfo WHERE cnName=? AND password=? AND disabled="0"`;

// 获取菜单
module.exports.GET_MENU = `SELECT menuId,menuEnName,parentId,menuCnName FROM menuList`;
