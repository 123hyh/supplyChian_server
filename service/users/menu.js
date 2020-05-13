const { operateDB } = require('../../config/DBconfig');
const { GET_MENU } = require('./sql');
const { strongbox } = require('../../utils');
module.exports.getMenu = (params) =>
  strongbox(async () => {
    const res = await operateDB(GET_MENU);
    return res;
  });
