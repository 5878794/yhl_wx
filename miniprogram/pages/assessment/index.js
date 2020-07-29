//index.js
const app = getApp();
import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';

Page({
	data: {
		hasLogin:false,
		hidden:true,
		productName:'',
		productPrice:'',
		params:[],
		paramSelected:[]
	},
	price:'',
	productId:'',
	paramData:[],
	onLoad(e) {
		//接收参数
		this.setData({
			productName:e.name,
			productPrice:e.price
		});
		this.price = e.price;
		this.productId = e.id;

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
		if(userInfo){
			this.setData({
				hasLogin:true,
				hidden:false
			});
		}else{
			this.setData({
				hidden:false
			});
		}

		let data = await this.getData();

		let selected = [];
		for(let i=0,l=data.length;i<l;i++){
			selected.push(0);
		}

		//改变初始价格
		let price = parseInt(this.price);
		data.map(rs=>{
			let thisPrice = rs[0].price_rate;
			price = price + thisPrice;
		});
		this.paramData = data;

		this.setData({
			paramSelected:selected,
			params:data,
			productPrice:price
		})
	},
	//获取数据
	async getData(){
		let [data] = await ajax.send([
			api.getProductParam({productId:this.productId})
		]);

		data = data.tags;

		data = this.handlerData(data);

		return data;
	},
	//处理 标签 分组数据
 	handlerData(data){
		let obj = {};

	    // group_id: 1
	    // group_name: "内存组合"
	    // price_rate: 100
	    // tag_id: 1
	    // tag_name: "6G+128G"
		data.map(rs=>{
			let groupId = rs.group_id;
			if(!obj[groupId]){
				obj[groupId] = [];
			}
			obj[groupId].push(rs);
		});

		let backData = [];
		for(let [key,val] of Object.entries(obj)){
			backData.push(val)
		}

		return backData;

	},
	//点击登录成功
	getUserInfoSuccess(){
		this.setData({
			hasLogin:true
		})
	},
	//标签点击处理
	paramSelectFn(e){
		let obj = e.currentTarget.dataset,
			group = obj.group,
			index = obj.index,
			oldSelect = this.data.paramSelected;

		oldSelect[group] = index;

		let price = parseInt(this.price);
		this.paramData.map((rs,i)=>{
			let selected = oldSelect[i],
				nowPrice = rs[selected].price_rate;

			price = price + nowPrice;
		})


		this.setData({
			productPrice:price,
			paramSelected:oldSelect
		})
	},
	//提交处理
	submit(){
		let selected = this.data.paramSelected,
			data = this.paramData,
			selectedId = [];
		data.map((rs,i)=>{
			let this_id = rs[selected[i]].tag_id;
			selectedId.push(this_id);
		});

		selectedId = selectedId.join(',');

		let url = `../order/index?id=${this.productId}&tags=${selectedId}&type=1`;
		sys.openUrl(url);
	}

});
