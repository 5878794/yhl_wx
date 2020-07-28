//index.js
const app = getApp();
// import server from '../../lib/server.js';
// import {ajax,api} from '../../lib/ajax.js';
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
			console.log(123)
			// sys.openUrl();
		}

	},
	submit(){
		this.submitFn().then().catch(e=>{sys.alert(e.msg)});
	},
	async submitFn(){
		let number = await $('#number').check(),
			image = await $('#image').check();

		console.log(number,image)
	}

});
