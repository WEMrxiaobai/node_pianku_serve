// 处理方法
const {execSQL} =require('../db/mysql')

// 从数据库user  list
const getList = (id) => {
    let sql =`select * from user where 1=1 ` ;

    if(id){
        sql += `and user_id='${id}'`
    }
    // if(name){
    //     sql += `and user_name='${name}'`
    // }
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
    getList,getArt,insertUser
}