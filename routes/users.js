const router = require('koa-router')();
const { operateDB } = require('../config/DBconfig');
const { getMenu } = require('../controler/users/menu');
router.prefix('/users');

router.get('/', getMenu);

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
