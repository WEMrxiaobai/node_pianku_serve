const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')
//创建连接对象  
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接  
connection.connect();
let errMsg = '';
function execSQL(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                // 返回err信息
                errMsg = {
                    'code': err.code,
                    'errno': err.errno,
                    'sqlMessage': err.sqlMessage,
                    'sqlState': err.sqlState
                };
                reject(err);
                return;
            } else {
                resolve(result);
                //正常执行
            }
        })
    }).catch(() => {
        // 对catch处理
        console.log("执行sql 错误信息 errorMsg", errMsg);
        return errMsg ;

    })

}

// 导出
module.exports = {
    execSQL
}