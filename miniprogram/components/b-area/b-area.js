
import input from '../__publish/b_input.js';

Component({
	behaviors: [input],
	options: {
		styleIsolation: 'apply-shared'      //外部样式会影响内部样式，组件样式不影响外部
	},
    properties: {
	    customItem:{
	    	type:String,
		    value:''
	    }
    },
    data: {

    },

	attached(){
		let val = this.data.value;
		val = val.split(',') || [];
		this.setData({
			newValue:val,
			showText:val.join(','),
			value:val.join(',')
		});
	},


    methods: {
	    onSelect(e){
	    	let val = e.detail.value;

	    	this.setData({
			    newValue:val,
			    code:e.detail.code,
			    postcode:e.detail.postcode,
			    showText:val.join(','),
			    value:val.join(',')
		    });

		    let myEventDetail = e.detail; // detail对象，提供给事件监听函数
		    let myEventOption = {}; // 触发事件的选项
		    this.triggerEvent('mychange', myEventDetail, myEventOption)

	    },

	    value(value){
	    	value = value.split(',') || [];
		    this.setData({
			    newValue:value,
			    showText:(value.length==0)? '' : value.join(','),
			    value:(value.length==0)? '' : value.join(',')
		    });
	    }
    }
});