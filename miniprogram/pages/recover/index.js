//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';


Page({
	data: {

	},

	async onLoad() {
		sys.loading.show();
		let userInfo = await sys.getUserInfo();
		sys.loading.hide();
		if(!userInfo){
			sys.openUrl('../login/index');
		}

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
		let number = await $('#number').check(),
			image = await $('#image').check();

		// console.log(number,image);
		image = await sys.uploadFile('/api_upload/upload',image);

		// console.log(image);

		let url = `../order/index?productNumber=${number}&imgSrc=${image}&type=2`;
		sys.openUrl(url);
	}

});
