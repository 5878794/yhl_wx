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

	}

};
Page(a);
