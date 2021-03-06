//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';

app.globalData.$ = $;

var a = {
	data: {
		list:[]
	},
	openId:null,
	nowPage:0,
	hasData:true,
	onShow() {
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
		if(!userInfo){
			sys.loading.hide();
			sys.openUrl('../login/index');
			return;
		}

		let [user,list] = await ajax.send([
			api.getUserMoney({
				openId:userInfo.openId
			}),
			api.getRecoverList({
				page:this.nowPage,
				openId:userInfo.openId
			})
		]);
		user = user || {};
		console.log(user)

		this.openId = userInfo.openId;


		list.map(rs=>{
			//状态字符的class
			let state = rs.order_state,
				_class = (state.indexOf('评')>-1)? 'state1' :
						(state.indexOf('已')>-1)? 'state2' : 'state3';
			rs.class = _class;

			//拷贝按钮需要的文字
			let text = [];
			text.push('订单编号:'+rs.id);
			text.push('订单状态:'+rs.order_state);
			rs.list.map(list=>{
				text.push(list.key+':'+list.val);
			});
			text = text.join(';\r\n');
			rs.copy = text;
		});

		this.setData({
			userIcon:userInfo.avatarUrl,
			nickname:userInfo.nickName,
			money:user.balance || 0,
			list:list
		});

	},
	//下拉加载更多触发函数
	onReachBottom(){
		if(!this.hasData){return;}
		this.nowPage++;

		sys.loading.show();
		this.getList().then(rs=>{
			sys.loading.hide();
		}).catch(e=>{
			sys.loading.hide();
			sys.alert(e);
		})

	},
	//滚动加载获取数据
	async getList(){
		let [list] = await ajax.send([
			api.getRecoverList({
				page:this.nowPage,
				openId:this.openId
			})
		]);

		if(list.length==0){
			this.hasData = false;
			sys.info.show('没有更多数据咯！');
			return;
		}

		//获取已有数据
		let data = this.data.list;
		list.map(rs=>{
			data.push(rs);
		});


		this.setData({
			list:data
		})

	},

	setClipboard(e){
		let text = e.currentTarget.dataset.copy || '';
		sys.setClipboard(text);
	}

};
Page(a);
