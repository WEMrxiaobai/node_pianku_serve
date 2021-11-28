//处理路由
const {SuccessModel} =require('../model/responseModel')
const {getList}=require('../controllers/blog')
const {execSQL} =require('../db/mysql')
const handleRoute = (req, res) => {

    const method = req.method

    // 判断路由
    if (method === 'GET' && req.path === '/api/list') {
        // const id=req.query.id || '';
        // const name=req.query.name || '';
        const sql=`select user_id from user`;
        let databack='';
        execSQL(sql,(err,result)=>{
            if(err){
                console.error('error',err);
                return ;
            }
            console.log("数据result:",databack);
            databack=result
            console.log("databack回调1" ,databack);
        })
        console.log("databack" ,databack);
        return new SuccessModel(databack)
        
        
        
    }
    if (method === 'POST' && req.path === '/api/new') {
        console.log("body",req.body,new Date());
        
    }
    if (method === 'POST' && req.path === '/api/update') {
        return {
            msg: "获取update"
        }
    }
}   
module.exports = handleRoute;
