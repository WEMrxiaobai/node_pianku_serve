// 处理网址
function Urlreg(data) {
    let dataurl=data;
    const url="http://maccms:8083/";
    for(let i=0 ; i<dataurl.length;i++){
        //http://maccms:8083/upload/vod/20211202-1/ddb175c06de6e0cd365e0a8a73e96f80.jpg
        // console.log(dataurl[i].vod_pic.substr(0,6));
        if(data[i].vod_pic.substr(0,6)=='upload'){
            // console.log("进入", dataurl[i].vod_pic);
            dataurl[i].vod_pic=url+data[i].vod_pic;
        }
        // console.log(dataurl[i].vod_pic);
    }
    return dataurl;
}

module.exports = {Urlreg}