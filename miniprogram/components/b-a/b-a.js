

Component({
	options: {},
    properties: {
		type:{
			type:String,
			value:'page'
		},
	    url:{
			type:String,
		    value:''
	    }
    },
    data: {

    },

	attached(){

	},


    methods: {
	    onclick(e){
	    	console.log(e.currentTarget)
	    	let target = e.currentTarget.dataset,
			    url = target.url,
			    type = target.type;

	    	if(!url){return;}

	    	if(type=='tab'){
			    wx.switchTab({url:url});
		    }else{
			    wx.navigateTo({url:url});
		    }
	    }
    }
});