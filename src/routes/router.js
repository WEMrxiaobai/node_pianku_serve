//处理路由
const {SuccessModel} =require('../model/responseModel')
const {getList,getArt} =require('../controllers/blog')
const handleRoute = (req, res) => {

    const method = req.method //获得方法
    const id=req.query.id ||'';
    const name=req.query.name || '';
    // 判断路由
    if (method === 'GET' && req.path === '/api/list') {
        // 用户列表 id
        const listDataPromise=getList(id);
        return listDataPromise.then((listData) =>{
            return new SuccessModel(listData);
        })
        
    }

    if (method === 'GET' && req.path === '/api/art') {
        //文章 id
        const listDataPromise=getArt(id);
        return listDataPromise.then((listData) =>{
            return new SuccessModel(listData);
        })
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
