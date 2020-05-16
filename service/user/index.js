const { operateDB } = require("../../config/DBconfig");
const { strongbox } = require("../../utils");
module.exports.getUserLIstService = (ctx)=>strongbox(async()=>{
  const data  = await operateDB(`SELECT * FROM userInfo`)
  return data
})