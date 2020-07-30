//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';



Page({
	data: {
		address:[
			{
				id:1,
				name:'成都营运中心',
				address:'成都市青羊区提督街118号附二号',
				phone:'028-61677960'
			},
			{
				id:2,
				name:'北京营运中心',
				address:'北京市昌都区提督街118号附二号',
				phone:'010-61677960'
			}
		],
		mailData:[]
	},
	type:1,
	productId:'',
	selectedId:'',
	imgSrc:'',
	productNumber:0,
	onLoad: function(e) {
		let type = e.type;
		if(type==1){
			this.type = 1;
			this.productId = e.id;
			this.selectedId = e.tags;
		}
		if(type==2){
			this.type = 2;
			this.productNumber = e.productNumber;
			this.imgSrc = e.imgSrc;
		}

		sys.loading.show();
		this.init().then(rs=>{
			sys.loading.hide();
		}).catch(e=>{
			sys.loading.hide();
			sys.alert(e);
		})

	},
	async init(){
		let [selectData] = await ajax.send([
			api.getMailCompany()
		]);

		let backData = [];
		selectData.map(rs=>{
			backData.push({
				key:rs.id,
				value:rs.name
			})
		})


		this.setData({
			mailData:backData
		});
		$('#company').val(backData[0].key);

	},
	submit(){
		sys.loading.show();
		this.submitFn().then(rs=>{
			sys.loading.hide();
		}).catch(e=>{
			sys.loading.hide();
			sys.alert(e)
		});
	},
	async submitFn(){
		//物流公司名称
		let name = await $('#company').check(),
			//物流单号
			orderId = await $('#ordierId').check(),
			phone = await $('#phone').check(),
			bz = await $('#bz').check();

		let userInfo = await sys.getUserInfo();


		let submitData;
		if(this.type==1){
			//order_type:订单类型,
			// model_info:型号ID,
			// subobj:选中标签集合,
			// wl_cid:物流公司ID,
			// wl_no:物流单号,
			// tel:联系电话[,
			// remake:备注
			submitData = {
				openId:userInfo.openId,
				order_type:1,
				model_info:this.productId,
				subobj:this.selectedId,
				wl_cid:name,
				wl_no:orderId,
				tel:phone,
				remake:bz
			}
		}else{
			// order_type:订单类型,
			// model_info:数量,
			// subobj:图片地址或token集合,
			// wl_cid:物流公司ID,
			// wl_no:物流单号,
			// tel:联系电话,
			// remake:备注
			submitData = {
				openId:userInfo.openId,
				order_type:2,
				model_info:this.productNumber,
				subobj:this.imgSrc,
				wl_cid:name,
				wl_no:orderId,
				tel:phone,
				remake:bz
			}
		}



		let [data] = await ajax.send([
			api.submitOrder(submitData)
		]);

		sys.loading.hide();
		await sys.alert('订单提交成功！');

		sys.closeAllAndOpen('../my/index');
	}

});
