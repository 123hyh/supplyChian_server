const router = require("koa-router")();

const { getUserList } = require("../controler/user");

router.prefix("/users");
/**
 * @swagger
 * /users/getUserLIst:
 *   post:
 *     summary: 获取用户列表
 *     description: 获取用户列表
 *     tags:
 *       - users 用户模块
 *     parameters:
 *
 *     responses:
 *       200:
 *         description: 成功获取
 */

router.post('/getUserLIst',getUserList)
module.exports = router