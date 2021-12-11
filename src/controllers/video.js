// 处理方法
const { execSQL } = require('../db/mysql');
const fs = require('fs');
// type_id 二级分类  包括顶级分类
// type_id_1 指定顶级分类组 无顶级分类则为0  指向有子级分类的二级分类

// 首页banner
const getBanner = (page) => {
    let sql = `select vod_id,vod_name,vod_pic,vod_year,vod_blurb,
    vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where 1=1 `;
    if (page) {
        sql += ` and type_id_1='1' `;
        sql += `ORDER BY vod_hits DESC ,vod_time DESC`
        sql += ` LIMIT ${page}`;
    }
    log(sql)
    return execSQL(sql);
}

// 首页电影推荐
const getIndexMv = (page) => {

    let sql = `select vod_id,vod_name,vod_pic,vod_year,
    vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where 1=1 `;
    if (page) {
        sql += ` and type_id_1='1' `;
        sql += `ORDER BY mac_vod.vod_time DESC`
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
        sql += ` and type_id_1='2' `;
        sql += ` ORDER BY mac_vod.vod_time DESC `
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
        sql += ` ORDER BY mac_vod.vod_time DESC `
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
        sql += ` ORDER BY mac_vod.vod_time DESC `
        sql += ` LIMIT ${page}`;
    }
    // console.log("getList--sql:",sql);
    log(sql)
    return execSQL(sql);
}

// 电影页
const getMv = (showNum, page, val) => {
    let startPage = showNum * page;
    let endPage = startPage + showNum;
    // console.log("startPage",startPage,"---endPage",endPage);
    let countSql = `SELECT COUNT(*) as total from mac_vod where  type_id_1='1' `;
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
    vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
    from mac_vod where type_id_1='1'`;
    sql += ` ${sqltype(val)} `;
    sql += `ORDER BY ${sqlPaixu(val)} DESC  `;
    sql += ` LIMIT ${startPage},${endPage} `;
    // console.log("getMv--sql:", sql);
    log(sql)
    const callback = Promise.all([execSQL(sql), execSQL(countSql)])
    return callback;
}

// 电视剧页
const getTv = (showNum, page, val) => {
    let startPage = showNum * page;
    let endPage = startPage + showNum;
    let countSql = `SELECT COUNT(*) as total from mac_vod where type_id_1='2' `;
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where type_id_1='2' `;
    sql += ` ${sqltype(val)} `;
    sql += `ORDER BY ${sqlPaixu(val)} DESC  `;
    sql += ` LIMIT ${startPage},${endPage} `;
    // console.log("getList--sql:",sql);
    log(sql)
    const callback = Promise.all([execSQL(sql), execSQL(countSql)])
    return callback;
}

// 综艺
const getVa = (showNum, page, val) => {
    let startPage = showNum * page;
    let endPage = startPage + showNum;
    let countSql = `SELECT COUNT(*) as total from mac_vod where type_id='3' `;
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where type_id='3' `;
    sql += ` ${sqltype(val)} `;
    sql += `ORDER BY ${sqlPaixu(val)} DESC  `;
    sql += ` LIMIT ${startPage},${endPage} `;
    // console.log("getList--sql:",sql);
    log(sql)
    const callback = Promise.all([execSQL(sql), execSQL(countSql)])
    return callback;
}

// 动漫
const getAc = (showNum, page, val) => {
    let startPage = showNum * page;
    let endPage = startPage + showNum;
    let countSql = `SELECT COUNT(*) as total from mac_vod where  type_id='4' `;
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where type_id='4' `;
    sql += ` ${sqltype(val)} `;
    sql += `ORDER BY ${sqlPaixu(val)} DESC  `;
    sql += ` LIMIT ${startPage},${endPage} `;
    // console.log("getList--sql:",sql);
    log(sql)
    log(countSql)
    const callback = Promise.all([execSQL(sql), execSQL(countSql)])
    return callback;
}

// 纪录片
const getDoc = (showNum, page, val) => {
    let startPage = showNum * page;
    let endPage = startPage + showNum;
    let countSql = `SELECT COUNT(*) as total from mac_vod where  type_id='27' `;
    let sql = `select vod_id,vod_name,vod_pic,vod_year,
    vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
    from mac_vod where  type_id='27' `;
    // console.log("getList--sql:",sql);
    sql += ` ${sqltype(val)} `;
    sql += ` ORDER BY ${sqlPaixu(val)} DESC `;
    sql += ` LIMIT ${startPage},${endPage} `;
    log(sql)
    const callback = Promise.all([execSQL(sql), execSQL(countSql)]);
    return callback;
}

// getID 获取影片详情
const getID = (id) => {
    let sql = `select vod_id,vod_name,type_id,type_id_1,vod_pic,vod_year,vod_class,vod_area,vod_lang,vod_score,
    vod_en,vod_blurb,vod_content,vod_remarks,vod_hits,vod_time,vod_director,vod_actor,vod_duration,vod_reurl
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
function sqltype(type) {
    /** 类型查找
    *   类型  type[0]  type_id
    *   年代  type[1]  vod_year
    *   地区  type[2]  vod_area
    *   语言  type[3]  vod_lang
    *   
    */

    if (type[0] === '全部' && type[1] === '全部' && type[2] === '全部' && type[3] === 'time') {  //空类型时
        return 'and 1=1 '
    }
    typeConfig = {
        1: '电影',
        6: '动作',
        7: '喜剧',
        8: '爱情',
        9: '科幻',
        10: '恐怖',
        11: '剧情',
        12: '战争',
        23: '悬疑',
        20: '惊悚',
        21: '犯罪',
        22: '冒险',
        24: '动画',
        25: '武侠',
        26: '奇幻',
        27: '纪录',
        2: '连续剧',
        13: '国产',
        14: '港台',
        15: '日韩',
        16: '欧美',
        3: '综艺',
        4: '动漫',
        31: '影视资讯',
        33: '八卦',
        34: '头条',

    }
    console.log("type[0]", type[0]);
    let sqlback = ' and 1=1 ';
    // 类型 电影
    if (type[0] == "动作") { sqlback += ` and type_id='6' `; }
    if (type[0] == "喜剧") { sqlback += ` and type_id='7' `; }
    if (type[0] == "爱情") { sqlback += ` and type_id='8' `; }
    if (type[0] == "科幻") { sqlback += ` and type_id='9' `; }
    if (type[0] == "恐怖") { sqlback += ` and type_id='10' `; }
    if (type[0] == "剧情") { sqlback += ` and type_id='11' `; }
    if (type[0] == "战争") { sqlback += ` and type_id='12' `; }
    if (type[0] == "悬疑") { sqlback += ` and type_id='23' `; }
    if (type[0] == "惊悚") { sqlback += ` and type_id='20' `; }
    if (type[0] == "犯罪") { sqlback += ` and type_id='21' `; }
    if (type[0] == "冒险") { sqlback += ` and type_id='22' `; }
    if (type[0] == "动画") { sqlback += ` and type_id='24' `; }
    if (type[0] == "武侠") { sqlback += ` and type_id='25' `; }
    if (type[0] == "奇幻") { sqlback += ` and type_id='26' `; }
    if (type[0] == "纪录") { sqlback += ` and type_id='27' `; }

    if (type[0] == "国产") { sqlback += ` and type_id='13' `; }
    if (type[0] == "港台") { sqlback += ` and type_id='14' `; }
    if (type[0] == "日韩") { sqlback += ` and type_id='15' `; }
    if (type[0] == "欧美") { sqlback += ` and type_id='16' `; }


    console.log("-----");
    // 年代  type[1]  vod_year
    if (type[1] != "全部") {
        // console.log("sql过滤字符",stripscript(type[1]));
        sqlback += ` and vod_year='${stripscript(type[1])}' `;
        // console.log("----", ` and vod_year='${stripscript(type[1])}' `);
    } else {
        console.log("-----");
    }

    // 地区  type[2]  vod_area
    if (type[2] != "全部") { sqlback += ` and vod_area='${stripscript(type[2])}' `; }

    // 语言  type[3]  vod_lang
    if (type[3] != "全部") { sqlback += ` and vod_lang='${stripscript(type[3])}' `; }

    return sqlback;
}
// 排序项s
function sqlPaixu(type) {
    //排序  type[4]  时间 vod_time_add  人气 vod_hits   评分 vod_score_all
    let paixu = 'vod_time_add';
    if (type[4] == "time") { paixu = `vod_time_add `; }
    if (type[4] == "hot") { paixu = ` vod_hits `; }
    if (type[4] == "score") { paixu = ` vod_score `; }
    return paixu
}

let count = 0;
//日志输出
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
//时间转换
function timeSc(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
}
// 对接收字符进行过滤
function stripscript(s) {  //格式 RegExp("[在中间定义特殊过滤字符]")
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")      
    var rs = "";
    if(!s){return}
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
module.exports = {
    getIndexMv, getIndexTv, getIndexVa, getArt, insertUser, getIndexAC,
    getMv, getTv, getVa, getAc, getDoc, getID, getHot, getAbout, getBanner
}


