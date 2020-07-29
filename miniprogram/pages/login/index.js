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


	},
	loginSuccess(e){
		sys.goBack();
	}

});
