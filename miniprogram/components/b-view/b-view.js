


Component({
	behaviors: [],
	options: {
		styleIsolation: 'apply-shared',      //外部样式会影响内部样式，组件样式不影响外部
		// virtualHost:true           //虚拟组件
	},
	externalClasses: ['class'],
    properties: {
	    style:{
	    	type:String,
		    value:''
	    },
	    class:{
	    	type:String,
		    value:''
	    }

    },
    data: {

    },

	attached(){
		console.log(this.data)
	},


    methods: {

		onclick(e){
			console.log(e)
		}


    }
});