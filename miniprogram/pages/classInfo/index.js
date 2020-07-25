//index.js
const app = getApp();
// import server from '../../lib/server.js';
// import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';


Page({
	data: {
		list:[],
		lv1:0,
		lv2:0
	},

	onLoad: function() {

		this.handlerData();



	},
	handlerData(){
		let data =[{"id":1,"name":"手机","level":0,"parent_id":0,"price":null},{"id":2,"name":"平板","level":0,"parent_id":0,"price":null},{"id":3,"name":"笔记本","level":0,"parent_id":0,"price":null},{"id":4,"name":"智能手表","level":0,"parent_id":0,"price":null},{"id":5,"name":"蓝牙耳机","level":0,"parent_id":0,"price":null},{"id":6,"name":"数码相机","level":0,"parent_id":0,"price":null},{"id":7,"name":"华为","level":1,"parent_id":1,"price":null},{"id":8,"name":"小米","level":1,"parent_id":1,"price":null},{"id":9,"name":"VIVO","level":1,"parent_id":1,"price":null},{"id":10,"name":"OPPO","level":1,"parent_id":1,"price":null},{"id":11,"name":"三星","level":1,"parent_id":1,"price":null},{"id":12,"name":"苹果 在保","level":1,"parent_id":1,"price":null},{"id":13,"name":"苹果 过保","level":1,"parent_id":1,"price":null},{"id":14,"name":"Meta 40 Pro","level":2,"parent_id":7,"price":3500},{"id":15,"name":"小米10 Pro","level":2,"parent_id":8,"price":3200},{"id":16,"name":"iPhone8 在保","level":2,"parent_id":12,"price":1000},{"id":17,"name":"iPhone8 过保","level":2,"parent_id":13,"price":800}];
		data.push({"id":114,"name":"Meta1 40 Pro","level":2,"parent_id":7,"price":3500});
		data.push({"id":115,"name":"Meta2 40 Pro","level":2,"parent_id":7,"price":3500});
		data.push({"id":116,"name":"Meta3 40 Pro","level":2,"parent_id":7,"price":3500});
		data.push({"id":117,"name":"Meta4 40 Pro","level":2,"parent_id":7,"price":3500});
		data.push({"id":118,"name":"Meta5 40 Pro","level":2,"parent_id":7,"price":3500});
		data.push({"id":119,"name":"Meta6 40 Pro","level":2,"parent_id":7,"price":3500});
		data.push({"id":120,"name":"平板lv2","level":1,"parent_id":2,"price":3500});
		data.push({"id":121,"name":"平板lv2--1","level":2,"parent_id":120,"price":3500});


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

		console.log(data)
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
	}

});
