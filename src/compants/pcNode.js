
const request =require('request');
const iconv= require('iconv-lite');

request('https://www.ygdy8.com/html/gndy/china/list_4_1.html',function(err, res,body){
    console.log(err);
    // console.log(res);
    console.log(body);
})
