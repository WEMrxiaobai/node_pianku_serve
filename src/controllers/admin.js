// 处理方法
const { execSQL } = require('../db/mysql');
const { log } = require('../model/Log');
const md5 = require("md5");
const { generateToken, verifyToken } = require('../model/Tonken')

//admin登录
const adminLogin = (body) => {
    let username = body.name;
    let password = md5(body.password);
    let sql = `select * from mac_admin where admin_name='${username}' and admin_pwd='${password}' `;
    log(sql);
    const isLogin = execSQL(sql).then((data) => {
        if (data.length !== 0) {
            console.log("login：", data[0].admin_name, new Date());
            let token=generateToken(username, data[0].admin_status);
            log(data[0].admin_name,":",token)
            return {
                'token':token ,
                'msg': '登录成功',
            };
        } else {
            return {
                'error': -1,
                'code': 10001,
                'msg': '用户名或密码错误',
            };
        }
    });
    return isLogin;
}

// verify鉴定token


module.exports = {
    adminLogin
}
