

import input from '../__publish/b_input.js';


Component({
	behaviors: [input],
	options: {
		styleIsolation: 'apply-shared',      //外部样式会影响内部样式，组件样式不影响外部
		virtualHost: true           //虚拟组件
	},
    properties: {
		yzmSrc:{
			type:String,
			value:''
		},
	    yzmWidth:{
		    type:Number,
		    value:''
	    },
	    yzmHeight:{
		    type:Number,
		    value:''
	    },
	    getYzmFn:{
			type:String,
		    value:''
	    }

    },
    data: {

    },

	attached(){
		this.getPic();
	},


    methods: {
		getPic(){
			this.getYzm().then().catch(e=>{
				wx.showModal({
					title: "系统提示",
					content: '获取验证码失败，请稍后再试！',
					showCancel: false,
					confirmText: "确定",
					success: function () {

					}
				})
			})
		},

	    onclick(){
	    	//获取新的验证码
		    this.getPic();


	    },

	    async getYzm(){
		    let pages = getCurrentPages();    //获取加载的页面
		    this.pageObj = pages[pages.length-1];
		    let fnName = this.data.getYzmFn;

		    if(this.pageObj[fnName]){
			    let data = await this.pageObj[fnName]();

			    this.setData({
				    catch:data,
					yzmSrc:data.src,
				    value:''
			    })
		    }
	    }


    }
});