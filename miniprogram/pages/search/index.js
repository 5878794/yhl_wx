//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';


Page({
	data: {
		search:'',
		searchList:[],
		historyList:[]
	},
	listData:[],
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
		let data = await this.getData(),
			searchHistory = await sys.getLocalData('searchLocalData') || [];

		this.setData({
			historyList:searchHistory
		});

		//只需要level2的数据
		let backData = [];
		data.map(rs=>{
			if(rs.level == 2){
				backData.push(rs);
			}
		})
		this.listData = backData;
	},

	async getData(){
		let products = await sys.getLocalData('product');
		if(products){
			return products;
		}

		let [data] = await ajax.send([
			api.getProducts()
		]);

		return data;
	},
	input(e){
		let val = e.detail.value;
		this.setData({
			search:val
		});

		let data = [];
		if(val != ''){
			data = this.getList(val);
		}

		this.setData({
			searchList:data
		})

	},
	getList(val){
		val = val.toLowerCase();
		let data = this.listData,
			backData = [];

		data.map(rs=>{
			let name = rs.name.toLowerCase();
			if(name.indexOf(val) > -1){
				backData.push(rs)
			}
		});

		return backData;
	},
	async searchClick(e){
		let target = e.currentTarget,
			data = target.dataset;
		data = data.data;

		await this.saveHistory(data);

		// {id: 16, name: "iPhone8 在保", level: 2, parent_id: 12, price: 1000}
		let url = `../assessment/index?id=${data.id}&name=${data.name}&price=${data.price}`;
		sys.closeAndOpenUrl(url);

	},
	async saveHistory(data){
		//保存查询记录
		let searchLocalData = await sys.getLocalData('searchLocalData') || [];
		//判断是否已存在
		let hasNo = -1;

		searchLocalData.map((rs,i)=>{
			if(rs.id == data.id){
				hasNo = i;
			}
		});

		//插入历史记录
		if(hasNo == '-1' ){
			searchLocalData.unshift(data);
		}else{
			let n_data = searchLocalData.splice(hasNo,1)[0];
			searchLocalData.unshift(n_data);
		}


		//只保留前10条
		searchLocalData = searchLocalData.splice(0,10);
		await sys.setLocalData('searchLocalData',searchLocalData);
	}

});
