// 处理方法
const { execSQL } = require('../db/mysql');
const { log } = require('../model/Log');
const md5 = require("md5");
const { generateToken, verifyToken } = require('../model/Tonken')
const { sqlPaixu,sqltype}=require('./video')
//admin登录
const adminLogin = (body) => {
    let username = body.name;
    let password = md5(body.password);
    let sql = `select * from mac_admin where admin_name='${username}' and admin_pwd='${password}' `;
    log(sql);
    const isLogin = execSQL(sql).then((data) => {
        if (data.length !== 0) {
            // console.log("login：", data[0].admin_name, new Date());
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
// admin adminIndex
const adminIndex=(body)=>{
    let tkor=tokenIS(body.token);
    if(tkor){
        // admin_auth: ",index/welcome,index/quickmenu,index/iframe,index/clear,index/unlocked,index/select,upload/upload,system/config,system/configseo,system/configuser,system/configcomment,system/configupload,system/configurl,system/configplay,system/configcollect,system/configinterface,system/configapi,system/configconnect,system/configpay,system/configweixin,system/configemail,system/configsms,timming/index,timming/info,timming/del,timming/field,domain/index,domain/del,domain/export,domain/import,type/index,type/info,type/batch,type/del,type/field,type/extend,topic/data,topic/info,topic/batch,topic/del,topic/field,link/index,link/info,link/batch,link/del,link/field,gbook/data,gbook/info,gbook/del,gbook/field,comment/data,comment/info,comment/del,comment/field,annex/data,annex/file,annex/check,annex/init,annex/del,images/opt,images/sync,art/data,art/info,art/del,art/field,art/info,art/data,art/data,art/batch,art/data,vodserver/index,vodserver/info,vodserver/del,vodserver/field,vodplayer/index,vodplayer/info,vodplayer/del,vodplayer/field,voddowner/index,voddowner/info,voddowner/del,voddowner/field,vod/data,vod/info,vod/del,vod/field,vod/info,vod/data,vod/data,vod/data,vod/data,vod/data,vod/batch,vod/data,actor/data,actor/info,actor/del,actor/field,actor/info,role/data,role/info,role/del,role/field,role/info,website/data,website/info,website/del,website/field,website/info,website/data,website/data,website/batch,website/data,admin/index,admin/info,admin/del,admin/field,group/index,group/info,group/del,group/field,user/data,user/info,user/del,user/field,card/index,card/info,card/del,order/index,order/del,ulog/index,ulog/del,plog/index,plog/del,cash/index,cash/del,cash/audit,template/index,template/info,template/del,template/ads,template/wizard,make/opt,make/index,make/index?ac2=wap,make/map,make/make,make/rss,make/type,make/topic_index,make/topic_info,make/info,make/label,collect/union,collect/api,collect/load,collect/bind,collect/vod,collect/art,collect/timing,collect/index,collect/info,collect/del,cj/index,cj/info,cj/del,cj/program,cj/col_url,cj/col_content,cj/publish,cj/export,cj/import,database/index,database/export,database/import,database/optimize,database/repair,database/del,database/columns,database/sql,database/rep,addon/index,urlsend/index,safety/file,safety/data,urlsend/push,urlsend/baidu_push,urlsend/baidu_bear,addon/downloaded,addon/install,addon/uninstall,addon/config,addon/state,addon/local,addon/upgrade,addon/add,"
        // admin_id: 1
        // admin_last_login_ip: 2130706433
        // admin_last_login_time: 1640004959
        // admin_login_ip: 2130706433
        // admin_login_num: 20
        // admin_login_time: 1640074675
        // admin_name: "xiaobai"
        // admin_pwd: "4297f44b13955235245b2497399d7a93"
        // admin_random: "9b6840787d2cf4fede4d947cd2af405b"
        // admin_status: 1
        let sql = `SELECT admin_name,admin_id,admin_last_login_ip,admin_status,admin_login_time,admin_last_login_time,
        admin_login_ip,admin_login_num,admin_random FROM mac_admin where admin_name='${tkor.uid}' `;
        console.log(sql);
        const isLogin = execSQL(sql).then((data) => {
            if (data.length !== 0) {
                let token=generateToken(tkor.uid, 1);
                console.log("login：", token, new Date());
                return {
                    'token':token ,
                    'msg': '',
                    'code': 200,
                    'data':data[0],
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
    }else{
        console.log("index  err");
        return Promise.all([{'error': -1,'code': 10099,'msg': 'token失效'}])
    }
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
    let countSql='';
    if(tkor){ //token判断
        // console.log("视频管理",tkor);
        console.log("视频管理:",data);
        let showNum = data.showNum  ||  20;
        let page= data.page  ||  1;;
        let val=['全部', '全部', '全部', '全部', 'time'];
        try {
        if(data.method=='get'){
            // 查询
            let startPage = showNum * page;
            let endPage = startPage + showNum;
            countSql = `SELECT COUNT(*) as total from mac_vod where  type_id_1='1' `;
            sqlVideo = `select *
            from mac_vod where type_id_1='1'  `;
            sqlVideo += ` ${sqltype(val)} `;
            countSql+=` ${sqltype(val)} `;
            sqlVideo += `ORDER BY ${sqlPaixu(val)} DESC `;
            sqlVideo += ` LIMIT ${startPage},${endPage} `;
            
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
        
        log(sqlVideo,countSql)
        let newtoken={"token":generateToken(tkor.uid,tkor.scope)}
        const callback = Promise.all([execSQL(sqlVideo),newtoken,execSQL(countSql)])
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
//IP转成整型
function _ip2int(ip) 
{
    var num = 0;
    ip = ip.split(".");
    num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
    num = num >>> 0;
    return num;
}
//整型解析为IP地址
function _int2iP(num) 
{
    var str;
    var tt = new Array();
    tt[0] = (num >>> 24) >>> 0;
    tt[1] = ((num << 8) >>> 24) >>> 0;
    tt[2] = (num << 16) >>> 24;
    tt[3] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}
// console.log(tokenIS('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ4aWFvYmFpIiwic2NvcGUiOjEsImlhdCI6MTYzOTY0NTYzOSwiZXhwIjoxNjM5NjQ5MjM5fQ.TYPSbkVaJJG0gKMquBKC2nxS4jWQ1hAcmXT6dXo6Vr8'));


module.exports = {
    adminLogin,tokenIS,adminIndex,
    adminCategory,adminVideo,
    _ip2int,_int2iP
}
