//处理路由
const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { getList, getArt, insertUser } = require('../controllers/blog')
const {getIndexMv} =require('../controllers/video')
const handleRoute = (req, res) => {

    const method = req.method //获得方法
    const id = req.query.id || '';
    const page=req.query.page || 14;
    const comments=req.query.comments || '';
    // 判断路由
    if (method === 'GET' && req.path === '/api/index/mv') {
        //首页 电影推荐   
        const indexMvPromise = getIndexMv(page);
        return indexMvPromise.then((mvdata) => {
            if (mvdata) {
                return new SuccessModel(mvdata);
            } else {
                return new ErrorModel(mvdata);
            }
        })
    }

    if (method === 'GET' && req.path === '/api/list') {
        // 用户列表 id
        const listDataPromise = getList(id);
        return listDataPromise.then((listData) => {
            if (listData) {
                return new SuccessModel(listData);
            } else {
                return new ErrorModel(listData);
            }
        })

    }

   
    if (method === 'POST' && req.path === '/api/new') {
        // 添加用户
        // console.log("body", req.body, new Date());

        const listDataPromise = insertUser(req.body);
        // console.log("listDataPromise",listDataPromise);
        return listDataPromise.then((inserted) => {
            // console.log("inserted!!!!!!!!!",inserted);
            if (inserted) {
                return new SuccessModel(inserted);
            } else {
                return new ErrorModel(inserted);
            }
        })
    }

    if (method === 'POST' && req.path === '/api/update') {
        return {
            msg: "获取update"
        }
    }


}
module.exports = handleRoute;
