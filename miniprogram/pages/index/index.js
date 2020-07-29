//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';

app.globalData.$ = $;

var a = {
	data: {
		banner:[{img:'../../images/_banner1.png',href:''}]
	},

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
		let [product] = await ajax.send([
			api.getProducts()
		]);

		await sys.setLocalData('product',product);
	}

};
Page(a);
