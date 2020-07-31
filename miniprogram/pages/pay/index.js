//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';

app.globalData.$ = $;

var a = {
	data: {
		pay:[
			{id:1,val:0.01},
			{id:2,val:0.01},
			{id:3,val:0.01},
			{id:4,val:0.02}
		],
		selectNo:0,
		userIcon:'',
		nickname:''
	},
	userInfo:null,
	onLoad: function() {
		sys.loading.show();
		this.init().then(rs=>{
			sys.loading.hide();
		}).catch(e=>{
			sys.loading.hide();
			sys.alert(e);
		})
	},
	async init(){
		let userInfo = await sys.getUserInfo();
		this.setData({
			userIcon:userInfo.avatarUrl,
			nickname:userInfo.nickName
		});
		this.userInfo = userInfo;
	},
	select(e){
		let data = e.currentTarget.dataset,
			index = data.index;

		this.setData({
			selectNo:index
		});
	},
	submit(){
		let n = this.data.selectNo,
			price = this.data.pay[n].val;

		console.log(price,this.userInfo)
	}

};
Page(a);
