//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';


Page({
	data: {
		list:[],
		scroll_id:'scroll_0',
		lv1:0,
		lv2:0
	},
	isReady:false,
	onLoad() {
		sys.loading.show();
		this.init().then(rs=>{
			sys.loading.hide();
		}).catch(e=>{
			sys.loading.hide();
			sys.alert(e);
		})

	},
	async init(){

		let data = await this.getData();
		this.handlerData(data);

		if(!this.isReady){
			this.isReady = true;
			this.onShow();
		}
	},
	async onShow(){
		if(this.isReady){
			let param = await sys.getTabParam(),
				typeName = param.name;

			this.scrollToType(typeName);
		}
	},
	async getData(){
		let [data] = await ajax.send([
			api.getProducts()
		]);

		return data;
	},
	handlerData(data){
		let dataForKey = {},
			backData = [];

		data.map(rs=>{
			dataForKey[rs.id] = rs;
		});

		data.map(rs=>{
			if(rs.parent_id == 0){
				backData.push(rs);
			}else{
				let parentId = rs.parent_id;
				if(!dataForKey[parentId].children){
					dataForKey[parentId].children = [];
				}
				dataForKey[parentId].children.push(rs);
			}
		});

		this.setData({
			list:backData
		});

	},
	scrollToType(typeName){
		let data = this.data.list,
			n = 0;
		data.map((rs,i)=>{
			let name = rs.name;
			if(name.indexOf(typeName) > -1){
				n = i;
			}
		});

		this.setData({
			scroll_id:'scroll_'+n,
			lv1:n
		})

	},
	lv2Click(e){
		let n = e.currentTarget.dataset.n;
		this.setData({
			lv2:n
		})
	},
	lv1Click(e){
		let n = e.currentTarget.dataset.n;
		this.setData({
			lv1:n,
			lv2:0
		})
	},
	//TODO
	showInfo(e){
		let target = e.currentTarget.dataset,
			data = target.data;

		console.log(data)
		sys.openUrl("../assessment/index")

	}

});
