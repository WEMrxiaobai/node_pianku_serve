
// 处理网址
function Urlreg(data) {
    let dataurl=data;
    const url="http://10.101.5.21:5200/";

    for(let i=0 ; i<dataurl.length;i++){
        //http://maccms:8083/upload/vod/20211202-1/ddb175c06de6e0cd365e0a8a73e96f80.jpg
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