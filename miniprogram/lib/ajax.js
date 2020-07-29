const globalData = getApp().globalData;
import SETTING from './setting.js';

let ajax = {
    //请求函数主体
    run(url, data, type, success, error) {
        url = SETTING.serverUrl + url;
        wx.request({
            url: url,
            dataType: 'json',
            data: data,
            timeout: 20000,
            method: type,
            responseType: 'text',
            header: {
                // 'content-type': 'application/json' // 默认值
                // 'token': globalData.token,
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            success: function (rs) {
                rs = rs.data || {};

                if(rs.err || rs.err ==0){
                    error(rs.info);
                }

                success(rs);
            },
            error: function (rs) {
                console.log(rs);
                error("网络错误,无法连接服务器。");
            }
        })
    },
    //发送一堆请求
    async send(arr) {

        return new Promise((success, error) => {
            Promise.all(arr).then(rs => {
                success(rs)
            }).catch(rs => {
                error(rs);
            })
        })
    }

};

let api = {
    //获取类目
    getProducts:{url:'/api_type_brand_model',type:'get'},
    //获取用户金额
    getUserMoney:{url:'/api_user/{openId}',type:'get'},
    //回收单列表
    getRecoverList:{url:'/api_order/{openId}/{page}',type:'get'},
    //保修记录查询
    getWarrantyList:{url:'/api_query/log/{openId}',type:'get'},
    //查询imei
    searchImei:{url:'/api_query/{openId}',type:'post'},
    //获取评估时 产品的分类属性
    getProductParam:{url:'/api_price/{productId}',type:'get'}
};






api = new Proxy(api, {
    get(target, key, receiver) {
        return function (data) {
            return new Promise((success, error) => {
                let url = target[key].url,
                    type = target[key].type || 'post';

                //判断是否含有一堆大括号,大括号内为参数
                let delArray = [];
                url = url.replace(/{(.+?)}/g,function(key){
                    key = key.substr(1,key.length-2);
                    delArray.push(key);
                    return data[key];
                });

                //删除data中的对象
                delArray.map(rs=>{
                    delete data[rs];
                });


                ajax.run(url, data, type, success, error);
            })
        }
    }
});




export { ajax, api };