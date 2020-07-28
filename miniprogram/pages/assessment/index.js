//index.js
const app = getApp();
import server from '../../lib/server.js';
// import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';

Page({
	data: {
		hasLogin:false,
		hidden:true
	},
	async onLoad() {
		let userInfo = await sys.getUserInfo();
		if(userInfo){
			this.setData({
				hasLogin:true,
				hidden:false
			});
		}

		await this.getData();
		this.bindData();
	},
	getData(){

	},
	bindData(){

	},
	getUserInfoSuccess(){
		this.setData({
			hasLogin:true
		})
	}

});
