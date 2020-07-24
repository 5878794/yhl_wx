
import input from '../__publish/b_input.js';

Component({
	behaviors: [input],
	options: {
		styleIsolation: 'apply-shared'      //外部样式会影响内部样式，组件样式不影响外部
	},
    properties: {
		clickIcon:{
			type:String,
			value:''
		},
	    nowBtnStyle:{
			type:String,
		    value:''
	    }
    },
    data: {

    },

	attached(){

	},


    methods: {
	    onclick(){
	    	let _this = this;
		    wx.scanCode({
			    onlyFromCamera:true,
			    scanType:[
				    'barCode',//	一维码
				    'qrCode',//	二维码
				    'datamatrix',//	Data Matrix 码
				    'pdf417'	//PDF417 条码
			    ],
			    success:function(res){
			    	_this.setData({
					    value:res.result
				    });
			    }
		    })
	    }
    }
});