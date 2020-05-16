const {getUserLIstService} = require('../../service/user')
// 获取用户列表
module.exports.getUserList = async (ctx,next)=>{
  const {data = []} = await getUserLIstService(ctx,next)
  ctx.body = data
} 