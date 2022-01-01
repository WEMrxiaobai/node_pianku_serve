
// 处理网址
const {WEB_CONFIG} =require('../config/config');

function Urlreg(data) {
    let dataurl=data;
    const url=WEB_CONFIG.ipPort;
    for(let i=0 ; i<dataurl.length;i++){
       
        // console.log(dataurl[i].vod_pic.substr(0,6));
        if(data[i].vod_pic){
            let zj=data[i].vod_pic;
            if(zj){
                if(data[i].vod_pic.substr(0,6)=='upload'){
                     dataurl[i].vod_pic=url+data[i].vod_pic;
                }
            }
           
        }else if(data[0][i]){
            // data[0][i].vod_pic
            if(data[0][i].vod_pic){
                for(let i=0 ; i<dataurl[0].length;i++){
                    let zj2=data[0][i].vod_pic;
                    if(zj2){
                        if(data[0][i].vod_pic.substr(0,6)=='upload'){
                            dataurl[0][i].vod_pic=url+data[0][i].vod_pic;
                            // console.log(dataurl[0][i].vod_pic);
                        }
                    }
                }  
            }  
        }
    }
    return dataurl;
}

module.exports = {Urlreg}