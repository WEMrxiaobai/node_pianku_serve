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


module.exports={
    getList,getArt
}