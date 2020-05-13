const mysql = require('mysql');
/*数据库默认配置*/
const database = {
  database: 'supplyChian', //数据库名称
  user: 'root', //mysql用户名
  password: '123hyh,./', //mysql密码
  port: '3309', //mysql端口号
  host: '106.54.139.105', //服务器ip
};

/*连接数据库*/
module.exports.operateDB = (sql, value) => {
  /*建立连接池*/
  let pool = mysql.createPool(database);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('数据库连接成功');
        connection.query(sql, value, (err, row) => {
          if (err) reject(err);
          else {
            resolve(row);
          }
          connection.release();
        });
      }
    });
  });
};
