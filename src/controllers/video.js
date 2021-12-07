// 处理方法
const {execSQL} =require('../db/mysql')

// 从数据库user  list
const getIndexMv = (page) => {
    // 首页电影推荐
    let sql =`select vod_id,vod_name,vod_pic,vod_year,
     vod_class,vod_area,vod_lang,vod_score,vod_remarks,vod_hits
     from mac_vod where 1=1 `;
    if(page){
        sql+=` and type_id_1='1' `
        sql += ` LIMIT ${page}`;
    }
    console.log("getList--sql:",sql);
    return execSQL(sql);
}

//获取文章
const getArt=(id)=>{
    let sql =`select * from article where 1=1 ` ;

    if(id){
        sql += `and title_id='${id}'`
    }
   
    console.log("getArt--sql:",sql);
    return execSQL(sql);
}   
// 添加用户
const insertUser=(reqbody)=>{
    console.log("reqbody:",reqbody);
    const user_name=reqbody.name;
    const email=reqbody.email;
    const user_password=reqbody.password;
    let sql =`INSERT INTO user ( user_name, email, user_password) VALUES ( '${user_name}', '${email}', '${user_password}');` ;
   
    console.log("insertUser--sql:",sql);
    
    return execSQL(sql).then(mysqlbackMsg=>{
        // console.log('blogre下的insertedResult',insertedResult);
        //insertedResult  mysql 中的catch return
        if(mysqlbackMsg.insertId){
            //成功添加状态
            return {
                id: mysqlbackMsg.insertId,
                add:true
            }
        }else{
            return {'error':mysqlbackMsg}
        }
    });
   
}

module.exports={
    getIndexMv,getArt,insertUser
}