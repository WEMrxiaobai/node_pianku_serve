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
    let tkor=tokenIS(data.token);
    let sqlCategory='';
    if(tkor){ //token判断
        // console.log("分类管理",tkor);
        console.log("分类管理data:",data);
        try {
        if(data.method=='get'){
            // 查询
            sqlCategory = `select type_id,type_name,type_en,type_pid,type_status,
            type_sort from mac_type order by type_id asc `;
        }else if(data.method=='upt'){
            // 更新
            sqlCategory = `UPDATE mac_type SET type_name = '${data.edit.type_name}' ,type_pid = '${data.edit.type_pid}',
            type_en = '${data.edit.type_en}' , type_sort = '${data.edit.type_sort}', type_status = '${data.edit.type_status}'
            WHERE type_id = ${data.edit.type_id} ;`

        }else if(data.method=='add'){
            // 添加
            sqlCategory = ` INSERT INTO mac_type (type_id, type_name, type_en, type_sort, type_mid, type_pid, type_status) 
            VALUES (NULL, '${data.edit.type_name}', '${data.edit.type_en}', '${data.edit.type_sort}', '1',
             '${data.edit.type_pid}', '${data.edit.type_status}'); `;
         
        }else if(data.method=='del'){
            // 删除
            sqlCategory = ` DELETE FROM mac_type WHERE type_id = ${data.edit.type_id} `;
        }
        } catch (error) {
            console.log(error,new Date() ,'分类');
        }
        
        log(sqlCategory)
        let newtoken={"token":generateToken(tkor.uid,tkor.scope)}
        const callback = Promise.all([execSQL(sqlCategory),newtoken])
        return callback;
    }else{
        console.log("分类管理err");
        return Promise.all([{'error': -1,'code': 10099,'msg': 'token失效'}])
    }
    
}
// 视频管理
const adminVideo=(data)=>{
    let tkor=tokenIS(data.token);
    let sqlVideo='';
    if(tkor){ //token判断
        // console.log("分类管理",tkor);
        console.log("视频管理:",data);
        try {
        if(data.method=='get'){
            // 查询
            sqlVideo = `select type_id,type_name,type_en,type_pid,type_status,
            type_sort from mac_type order by type_id asc `;
        }else if(data.method=='upt'){
            // 更新
            sqlVideo = `UPDATE mac_type SET type_name = '${data.edit.type_name}' ,type_pid = '${data.edit.type_pid}',
            type_en = '${data.edit.type_en}' , type_sort = '${data.edit.type_sort}', type_status = '${data.edit.type_status}'
            WHERE type_id = ${data.edit.type_id} ;`

        }else if(data.method=='add'){
            // 添加
            sqlVideo = ` INSERT INTO mac_type (type_id, type_name, type_en, type_sort, type_mid, type_pid, type_status) 
            VALUES (NULL, '${data.edit.type_name}', '${data.edit.type_en}', '${data.edit.type_sort}', '1',
             '${data.edit.type_pid}', '${data.edit.type_status}'); `;
         
        }else if(data.method=='del'){
            // 删除
            sqlVideo = ` DELETE FROM mac_type WHERE type_id = ${data.edit.type_id} `;
        }
        } catch (error) {
            console.log(error,new Date() ,'分类');
        }
        
        log(sqlVideo)
        let newtoken={"token":generateToken(tkor.uid,tkor.scope)}
        const callback = Promise.all([execSQL(sqlVideo),newtoken])
        return callback;
    }else{
        console.log("视频管理error");
        return Promise.all([{'error': -1,'code': 10099,'msg': 'token失效'}])
    }
    
}


const tokenIS=(token)=>{
    let verify=verifyToken(token);
    if(verify){
        let uid=verify.uid;
        let scope=verify.scope;
        // const {uid,scope}=verify;
        // console.log("----uid",uid,scope,new Date());
        return {uid,scope} ;
    }else{
        return false;
    }
}
// console.log(tokenIS('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ4aWFvYmFpIiwic2NvcGUiOjEsImlhdCI6MTYzOTY0NTYzOSwiZXhwIjoxNjM5NjQ5MjM5fQ.TYPSbkVaJJG0gKMquBKC2nxS4jWQ1hAcmXT6dXo6Vr8'));
module.exports = {
    adminLogin,tokenIS,
    adminCategory,adminVideo
}
