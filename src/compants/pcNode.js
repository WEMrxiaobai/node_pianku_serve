
const request =require('request');
const iconv= require('iconv-lite');
 
request('https://www.ygdy8.com/html/gndy/china/list_4_1.html',{ encoding: null },function(err, res,body){
    console.log(err);
    // console.log(res);
    // console.log(body);

    const buffs=iconv.decode(body,'gb2312').toString('utf8');
    console.log('------------',buffs);

})
