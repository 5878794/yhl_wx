//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';


Page({
	data: {
		selected:0,
		list:[]
	},
	openId:null,
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
		if(!userInfo){
			sys.loading.hide();
			sys.openUrl('../login/index');
			return;
		}

		this.openId = userInfo.openId;
		let [list] = await ajax.send([
			api.getWarrantyList({openId:userInfo.openId})
		]);

		list = [{"typeid":2,"imei":"imei","datetimes":"2020-07-28 15:02","val":[{"key":"sn","val":"354434065184270"},{"key":"model","val":"iPhone 6"},{"key":"icloud","val":"Lost"},{"key":"locked","val":"true"}]},{"typeid":1,"imei":"imei","datetimes":"2020-07-27 15:02","val":[{"key":"sn","val":"354434065184270"},{"key":"model","val":"iPhone 6"},{"key":"icloud","val":"Lost"},{"key":"locked","val":"true"}]}];
		console.log(list)

		this.setData({
			list:list
		})

	},
	choose(e){
		let target = e.currentTarget.dataset,
			n = target.n;

		this.setData({
			selected:n
		})
	},
	search(){
		//判断是否可以点击
		if(true){
			sys.loading.show();
			this.searchFn().then(rs=>{
				sys.loading.hide();
			}).catch(e=>{
				sys.loading.hide();
				sys.alert(e);
			})
		}else{
			sys.info.alert('请充值');
			//页面跳转
			// sys.openUrl('');
		}

	},
	async searchFn(){
		// n的值：
		// 0:苹果保修
		// 1:苹果激活锁
		// 2:苹果网络锁
		// 3:三星保修
		// 4:华为保修
		// 5:OPPO保修
		// 6:VIVO保修
		// 7:小米保修
		// 8:小米账号锁
		let imei = await $('#imei').check(),
			n = this.data.selected;

		let [rs] = await ajax.send([
			api.searchImei({
				openId:this.openId,
				typeid:n,
				imei:imei
			})
		]);

		//判断数据
		if(!rs){
			sys.info.show('未查询到数据');
			return;
		}

		//将查询数据前插到数组最前面
		let oldData = this.data.list;
		oldData.unshift(rs);

		this.setData({
			list:oldData
		});

		$('#imei').val('');
		sys.info.show('查询成功！');

		//滚动到第一条数据的地方
		let obj = await sys.getDomParam('#scroll_to'),
			top = obj.top;

		sys.scrollTo(top);
	}

});
