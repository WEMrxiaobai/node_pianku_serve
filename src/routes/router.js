//处理路由
const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { getList, getArt, insertUser } = require('../controllers/blog')
const handleRoute = (req, res) => {

    const method = req.method //获得方法
    const id = req.query.id || '';
    // 判断路由
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

    if (method === 'GET' && req.path === '/api/art') {
        //文章 id
        const listDataPromise = getArt(id);
        return listDataPromise.then((listData) => {
            return new SuccessModel(listData);
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
