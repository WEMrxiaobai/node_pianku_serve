
const request =require('request')

request('http://www.baidu.com',function(err, res,body){
    console.log(err);
    console.log(res);
    console.log(body);
})
