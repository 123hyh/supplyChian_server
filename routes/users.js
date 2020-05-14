const router = require('koa-router')()

const { getMenu, loginControler } = require("../controler/users/menu");

router.prefix("/users");

router.get("/", getMenu);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 登陆
 *     description: 登陆
 *     tags:
 *       - users 用户模块
 *     parameters:
 * 
 *     responses:
 *       200:
 *         description: 成功获取
 */

router.post("/login", loginControler);

/**
 * @swagger
 * /users/menu:
 *   get:
 *     summary: 获取菜单
 *     description: 用户登录
 *     tags:
 *       - users 用户模块
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get("/menu", getMenu);
router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

module.exports = router;
