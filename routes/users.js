const router = require("koa-router")();
const { getMenu, loginControler } = require("../controler/users/menu");

router.prefix("/users");

router.get("/", getMenu);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 用户登录
 *     description: 用户登录
 *     tags:
 *       - users 用户
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: 用户名称
 *         type: string
 *       - name: password
 *         in: query
 *         required: true
 *         description: 用户密码
 *         type: string
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
 *     description: 获取菜单
 *     tags:
 *       - users 用户
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get("/menu", getMenu);
router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

module.exports = router;
