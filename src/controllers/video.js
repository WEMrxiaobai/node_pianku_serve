// 处理方法
const { execSQL } = require('../db/mysql');
const fs = require('fs');
const { type } = require('os');

// 从数据库user  list
// 首页电影推荐
const getIndexMv = (page) => {

    let sql = `select vod_id,vod_name,vod_pic,vod_year,
    vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where 1=1 `;
    if (page) {
        sql += ` and type_id_1='1' `;
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("mv-sql:",sql,);
    log(sql)
    return execSQL(sql);
}
// 首页电视剧推荐
const getIndexTv = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where 1=1 `;
    if (page) {
        sql += ` and type_id_1='2' `
        sql += ` LIMIT ${page}`;
    }
    // console.log("Tv-sql:",sql);
    log(sql)
    return execSQL(sql);
}
// 首页综艺推荐
const getIndexVa = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where 1=1 `;
    if (page) {
        sql += ` and type_id='3' `;
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("Va-sql:",sql);
    log(sql)
    return execSQL(sql);
}

// 首页动漫推荐
const getIndexAC = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where 1=1 `;
    if (page) {
        sql += ` and type_id='4' `;
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}

// 电影页
const getMv = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where `;
    if (page) {
        sql += ` type_id_1='1'`
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}

// 电视剧页
const getTv = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where `;
    if (page) {
        sql += ` type_id_1='2'`
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}

// 综艺
const getVa = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where `;
    if (page) {
        sql += ` type_id='3'`
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}

// 动漫
const getAc = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where `;
    if (page) {
        sql += ` type_id='4'`
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}


// 纪录片
const getDoc = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where `;
    if (page) {
        sql += ` type_id='21'`
        sql += `ORDER BY mac_vod.vod_time_add DESC`
        sql += ` LIMIT ${page}`;
    }
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}

// getID 获取影片详情
const getID = (id) => {
    let sql = `select vod_id,vod_name,type_id,type_id_1,vod_pic,vod_year,vod_class,vod_area,vod_lang,vod_score,
    vod_en,vod_blurb,vod_content,vod_remarks,vod_hits,vod_time,vod_director,vod_actor,vod_duration
     from mac_vod where `;
    if (id) {
        sql += ` vod_id='${id}'`
        sql += ` LIMIT 1`;
    }
    // const sqldata = execSQL(sql);
    // sqldata.then((data) => {
    //     console.log("data----------:", data[0].type_id);
    //     let type_id = data[0].type_id;
    //     let type_id_1 = data[0].type_id_1;
    //     let hotSql = 
    //     log(hotSql);
    //     execSQL(hotSql).then((data) => {
    //         console.log("hotSql--------", data);
    //         backdata[1]=data;
    //     })
    // })
    log(sql)
    return execSQL(sql);
}

// getHot 获取当前类型热榜
const getHot = (type_id_1) => {
    let sql = `select vod_id,vod_name,type_id,type_id_1,vod_pic,vod_year,vod_class,vod_area,vod_lang,vod_score,vod_hits,vod_actor
    from mac_vod where type_id='${type_id_1}' ORDER BY vod_hits desc LIMIT 8 ;  `;
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}
// getHot 获取当前类型相关
const getAbout = (type_id) => {
    let sql = `select vod_id,vod_name,type_id,type_id_1,vod_pic,vod_year,vod_class,vod_area,vod_lang,vod_score,vod_hits,vod_actor
    from mac_vod where type_id='${type_id}' ORDER BY vod_score_all desc LIMIT 6 ;  `;
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}


//获取文章
const getArt = (id) => {
    let sql = `select * from article where 1=1 `;

    if (id) {
        sql += `and title_id='${id}'`
    }

    console.log("getArt--sql:", sql);
    return execSQL(sql);
}
// 添加用户
const insertUser = (reqbody) => {
    console.log("reqbody:", reqbody);
    const user_name = reqbody.name;
    const email = reqbody.email;
    const user_password = reqbody.password;
    let sql = `INSERT INTO user ( user_name, email, user_password) VALUES ( '${user_name}', '${email}', '${user_password}');`;

    console.log("insertUser--sql:", sql);

    return execSQL(sql).then(mysqlbackMsg => {
        // console.log('blogre下的insertedResult',insertedResult);
        //insertedResult  mysql 中的catch return
        if (mysqlbackMsg.insertId) {
            //成功添加状态
            return {
                id: mysqlbackMsg.insertId,
                add: true
            }
        } else {
            return { 'error': mysqlbackMsg }
        }
    });

}


let count = 0;
function log(msg) {
    count++;
    let logText = '';
    let time = timeSc();
    logText = count + "." + time + ":  " + msg + "\r\n";

    fs.appendFile('test.log', logText, "utf8", function (err) {
        if (err) {
            throw new Error("追加数据失败");
        } else {
            console.log("log写入", time);
        }
    });
}

function timeSc(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
}

module.exports = {
    getIndexMv, getIndexTv, getIndexVa, getArt, insertUser, getIndexAC,
    getMv, getTv, getVa, getAc, getDoc, getID, getHot, getAbout
}


