const router = require("koa-router")();

const { getMenu, loginControler } = require("../controler/system/system");

router.prefix("/system");

router.get("/", getMenu);
/**
 * @swagger
 * /system/login:
 *   post:
 *     summary: 用户登陆
 *     description: 用户登陆
 *     tags:
 *       - system 系统模块
 *     parameters:
 *
 *     responses:
 *       200:
 *         description: 成功获取
 */

router.post("/login", loginControler);

/**
 * @swagger
 * /system/logout:
 *   post:
 *     summary: 用户退出登陆
 *     description: 用户退出登陆
 *     tags:
 *       - system 系统模块
 *     responses:
 *       200:
 *         description: 成功获取
 */

router.post("/logout", async (ctx, next) => {
  ctx.body = `退出登陆`;
});

/**
 * @swagger
 * /system/menu:
 *   get:
 *     summary: 获取菜单
 *     description: 获取菜单
 *     tags:
 *       - system 系统模块
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get("/menu", getMenu);

module.exports = router;
