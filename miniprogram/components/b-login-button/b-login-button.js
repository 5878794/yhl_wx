

import server from "../../lib/server";
import sys from "../../lib/sys";

Component({
	options: {},
    properties: {

    },
    data: {

    },

	attached(){

	},


    methods: {
	    async getUserInfo(e){
	    	sys.loading.show();
		    let userInfo = e.detail.userInfo;

		    if(!userInfo){
		    	sys.loading.hide();
		    	sys.info.show('用户未授权！');
		    	return;
		    }

		    let loginInfo = await server.login();
		    loginInfo = loginInfo.event.userInfo;

		    for(let [key,val] of Object.entries(loginInfo)){
			    userInfo[key] = val;
		    }


		    await sys.saveUserInfo(userInfo);

		    sys.loading.hide();
		    let myEventDetail = userInfo; // detail对象，提供给事件监听函数
		    let myEventOption = {}; // 触发事件的选项
		    this.triggerEvent('success', myEventDetail, myEventOption);
	    }
    }
});