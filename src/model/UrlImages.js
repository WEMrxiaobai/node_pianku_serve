const fs = require('fs');
const path = require('path');
const {WEB_CONFIG} =require('../config/config');

function getImages(pathUrl) {
    // console.log('getImages:', pathUrl);
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(WEB_CONFIG.imgBaseUrl,pathUrl), (err, data) => {
            // console.log("data   imgBaseUrl",path.join(imgBaseUrl,pathUrl));
            if(err){
               return reject(err);
            }
            return resolve(data);
        });
    }).catch((err) => {
        // 对catch处理
        console.log("执行 getImages pathUrl 错误信息 ", err);
        return err;
    })

}

module.exports = { getImages }