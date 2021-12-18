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
// 分类管理
const adminCategory=(data)=>{
    var tkor=tokenIS(data.token);
    if(tkor){
        // console.log("分类管理",tkor);
        let sql = `select type_id,type_name,type_en,type_pid,type_status,type_sort from mac_type order by type_id asc `;
        log(sql)
        let newtoken={"token":generateToken(tkor.uid,tkor.scope)}
        const callback = Promise.all([execSQL(sql),newtoken])
        return callback;
    }else{
        console.log("err");
        return Promise.all([{'error': -1,'code': 10099,'msg': 'token失效'}])
    }
    
}





const tokenIS=(token)=>{
    let verify=verifyToken(token);
    if(verify){
        let uid=verify.uid;
        let scope=verify.scope;
        // const {uid,scope}=verify;
        console.log("----uid",uid,scope,new Date());
        return {uid,scope} ;
    }else{
        return false;
    }
}
// console.log(tokenIS('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ4aWFvYmFpIiwic2NvcGUiOjEsImlhdCI6MTYzOTY0NTYzOSwiZXhwIjoxNjM5NjQ5MjM5fQ.TYPSbkVaJJG0gKMquBKC2nxS4jWQ1hAcmXT6dXo6Vr8'));
module.exports = {
    adminLogin,tokenIS,
    adminCategory,
}
