// 初始化分类
const { execSQL } = require('../db/mysql');
const fs = require('fs');
const path = require('path');
let sql = `select type_id,type_name,type_en,type_pid,type_status,type_sort from mac_type `;

execSQL(sql).then((data) => {
    let str =` let type_data=  ` ;
    str +=  JSON.stringify(data,null,"\t");
    str+=`
module.exports = {
    type_data
} `;
// ../config/type_data.js
    fs.access("./src/config/type_data.js",function(err){
        //文件和目录不存在的情况下；
        if(err){
            console.log("文件和目录不存在,生成中...")
            fs.writeFile('./src/config/type_data.js', str, function (error) {
                if (error) {
                    console.log('分类初始化失败 type_data.js', error);
                }
                console.log('生成分类信息：type_data.js',new Date());
            });
        }else{
           console.log('已经生成分类信息 type_data.js');
        }
    })

    }).catch((error) => {
        console.log('分类初始化查询失败', error);
    })

let aaa=111;
module.exports = {
    aaa
}

// console.log(__dirname);


// let value = {
//     type_id: '',
//     type_name: '',
//     type_status: '',
//     type_pid: '',
//     type_sort: '',
//     type_en: ''

// };