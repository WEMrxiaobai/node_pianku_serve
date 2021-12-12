//处理路由
const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { getList, insertUser } = require('../controllers/blog')
const {getIndexMv,getIndexTv,getIndexVa,getIndexAC,getMv,getBanner,
      getTv,getVa,getAc,getDoc,getID,getHot,getAbout,getPlayerVideo} =require('../controllers/video')
const {Urlreg} =require('../model/Urlreg')
const handleRoute = (req, res) => {
    
    const method = req.method //获得方法
    const id = req.query.id || ''; //id
    const page=(req.query.page || 1)-1;   //页数   初始值为0   
    const lisNum=req.query.lisNum || 14; //主页推荐显示条数
    var type=['全部','全部','全部','全部','time'];
    // console.log("-----req.query.type:",req.query.type);
    if(req.query.type!=undefined){
        // console.log("type:",type,typeof(type));
        type=JSON.parse(req.query.type); //显示类型 筛选功能  字符串转换为对象
    }
    const type_id=req.query.type_id || '';  
    const type_id_1=req.query.type_id_1 || '';
    const showNum=42; //mv页显示条数
    // 判断路由 
    //首页 banner
    if (method === 'GET' && req.path === '/api/index/banner') {
       
        const indexBannerPromise = getBanner(6);
        return indexBannerPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }
    //首页 电影推荐
    if (method === 'GET' && req.path === '/api/index/mv') {
       
        const indexMvPromise = getIndexMv(lisNum);
        return indexMvPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }
    //首页 电视剧推荐   
    if (method === 'GET' && req.path === '/api/index/tv') {
        
        const indexTvPromise = getIndexTv(lisNum);
        return indexTvPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }
    //首页 综艺 推荐  
    if (method === 'GET' && req.path === '/api/index/va') {
        const indexVaPromise = getIndexVa(lisNum);
        return indexVaPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }
    //首页 动漫 推荐  
    if (method === 'GET' && req.path === '/api/index/ac') {
        const indexACPromise = getIndexAC(lisNum);
        return indexACPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }

    //电影页 
    if (method === 'GET' && req.path === '/api/mv') {
        const MvPromise = getMv(showNum,page,type);
        return MvPromise.then((data) => {
            if (data) {
                // console.log(Urlreg(data));
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }

    //电视剧 
    if (method === 'GET' && req.path === '/api/tv') {
        const TvPromise = getTv(showNum,page,type);
        return TvPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }

    //综艺 
    if (method === 'GET' && req.path === '/api/va') {
        const vaPromise = getVa(showNum,page,type);
        return vaPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }

    //动漫
    if (method === 'GET' && req.path === '/api/ac') {
        const acPromise = getAc(showNum,page,type);
        return acPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }
    
    //纪录片
    if (method === 'GET' && req.path === '/api/doc') {
        const docPromise = getDoc(showNum,page,type);
        return docPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }

    //id 获取电影详情
     if (method === 'GET' && req.path === '/api/id') {
        const movidPromise = getID(id);
        return movidPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }

    //id 获取接口地址
    if (method === 'GET' && req.path === '/api/video') {
        const videoPromise = getPlayerVideo();
        return videoPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }
    // 获取当前类型热榜
    if (method === 'GET' && req.path === '/api/hot') {
        const hotPromise = getHot(type_id_1);
        return hotPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
            }
        })
    }
    // 获取显示电影相关推荐
    if (method === 'GET' && req.path === '/api/about') {
        const aboutPromise = getAbout(type_id);
        return aboutPromise.then((data) => {
            if (data) {
                return new SuccessModel(Urlreg(data));
            } else {
                return new ErrorModel(data);
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
