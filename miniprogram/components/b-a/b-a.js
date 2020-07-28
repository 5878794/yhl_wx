
import sys from '../../lib/sys';

Component({
	options: {},
    properties: {
		type:{          //打开页面的类型  page tab
			type:String,
			value:'page'
		},
	    url:{           //打开页面的地址  tab页面不能带参数
			type:String,
		    value:''
	    },
	    localData:{     //tab页面不能带参数  走本地缓存
			type:String,
		    value:''
	    }
    },
    data: {

    },

	attached(){

	},


    methods: {
	    async onclick(e){
	    	let target = e.currentTarget.dataset,
			    url = target.url,
			    type = target.type,
			    localData = target.localdata;

	    	if(!url){return;}


	    	if(type=='tab'){
			    if(localData){
				    await sys.setTabParam(localData)
			    }
			    wx.switchTab({url:url});

		    }else{
			    wx.navigateTo({url:url});
		    }
	    }
    }
});