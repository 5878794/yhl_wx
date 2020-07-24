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
                if (rs.code != 200) {
                    error(rs.msg);
                    return;
                }

                success(rs.data);
            },
            error: function (rs) {
                console.log(rs);
                error("网络错误,无法连接服务器。");
            }
        })
    },
    //发送一堆请求
    async send(arr) {
        //预约挂号特有
        // this.token = await this.getToken();
        // this.userToken = await app.getUserToken();

        return new Promise((success, error) => {
            Promise.all(arr).then(rs => {
                success(rs)
            }).catch(rs => {
                error(rs);
                // throw rs;
            })
        })
    }

};

let api = {
    getYzm: 'verify/messageCode'
};

api = new Proxy(api, {
    get(target, key, receiver) {
        return function (data, type) {
            return new Promise((success, error) => {
                let url = target[key];
                type = type || 'post';
                ajax.run(url, data, type, success, error);
            })
        }
    }
})




export { ajax, api };