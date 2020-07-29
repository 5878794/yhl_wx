//index.js
const app = getApp();
// import server from '../../lib/server.js';
// import {ajax,api} from '../../lib/ajax.js';
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
		]
	},

	onLoad: function(e) {
		console.log(e)



	},
	submit(){
		this.submitFn().then().catch(e=>{sys.alert(e.msg)});
	},
	async submitFn(){
		//物流公司名称
		let name = await $('#company').check(),
			//物流单号
			orderId = await $('#ordierId').check(),
			phone = await $('#phone').check(),
			bz = await $('#bz').check();

		console.log(name,orderId,phone,bz)
	}

});
