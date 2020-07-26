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

	onLoad: function() {




	}

});
