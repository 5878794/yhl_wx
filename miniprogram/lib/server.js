
//云函数调用的包装
//需要调用哪个云函数，直接写到server的key上，函数内为传递的参数。
//代理自动处理函数成wx的云函数调用

//调用方法
// let server = require('../../lib/server');
// let rs = await server.login({a:1});
// console.log(rs)

let serverFn = new Proxy({}, {
    get(target, key, resiver) {
        return function (data) {
            data = data || {};
            return new Promise((success, error) => {
                wx.cloud.callFunction({
                    name: key,
                    data:data,
                    success(res){
                        if (res.errMsg == 'cloud.callFunction:ok'){
                            success(res.result);
                        }else{
                            error(res.errMsg);
                        }
                    },
                    fail(err){
                        console.log(err)
                        throw err.message;
                    }
                })
            })
        }
    }
});

export default serverFn;