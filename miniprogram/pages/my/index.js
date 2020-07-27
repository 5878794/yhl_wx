//index.js
const app = getApp();
// import server from '../../lib/server.js';
import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';

app.globalData.$ = $;

var a = {
	data: {

	},

	onLoad: function() {


	},

	setClipboard(e){
		console.log(e)
		let text = e.currentTarget.dataset.copy || '';
		sys.setClipboard(text);
	}

};
Page(a);
