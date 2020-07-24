

import input from '../__publish/b_input.js';

Component({
	behaviors: [input],
	options: {
		styleIsolation: 'apply-shared'      //外部样式会影响内部样式，组件样式不影响外部
	},
    properties: {
		//按钮发送短信前文字
	    btnText:{
			type:String,
		    value:'发送短信'
	    },
	    //按钮发送短信后，文字模版  {x}变量，会被替换
	    btnSendText:{
		    type:String,
		    value:'剩{x}秒'
	    },
	    //按钮发送短信前样式
	    btnStyle:{
		    type:String,
		    value:'color:#333;'
	    },
	    //发送后样式
	    sendBtnStyle:{
		    type:String,
		    value:'color:#ccc;'
	    },
	    //发送函数名   传入Page中的对象下的函数名
	    sendSmsFn:{
		    type:String,
		    value:''
	    },
	    time:{
	    	type:Number,
		    value:60
	    }

    },
    data: {

    },

	attached(){
		this.setData({
			nowBtnStyle:this.data.btnStyle,
			nowBtnText:this.data.btnText
		})
	},


    methods: {


	    onclick(){
	    	if(this.sendOk){return;}

		    this.sendAjaxFn().then().catch(e=>{
			    wx.showModal({
				    title: "系统提示",
				    content: e.toString(),
				    showCancel: false,
				    confirmText: "确定",
				    success: function () {

				    }
			    })
		    })

	    },

	    async sendAjaxFn(){
		    let pages = getCurrentPages(),    //获取加载的页面
			    page = pages[pages.length-1],
			    fnName = this.data.sendSmsFn;

		    if(page[fnName]){
				let state = await page[fnName]();

				if(state){
					//发送成功
					this.sendOk = true;

					this.intervalTime();

				}
		    }
	    },

	    intervalTime(){
			this.setData({
				nowBtnStyle:this.data.sendBtnStyle
			});

			let t = this.data.time+1;
			let a = setInterval(()=>{
				t--;
				if(t<0){
					//完成
					this.setData({
						nowBtnStyle:this.data.btnStyle,
						nowBtnText:this.data.btnText
					});
					this.sendOk = false;
					clearInterval(a);
					return;
				}

				let text = this.data.btnSendText.replace('{x}',t);
				this.setData({
					nowBtnText:text
				});
			},1000)
	    }


    }
});