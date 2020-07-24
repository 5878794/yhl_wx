
import input from '../__publish/b_input.js';

Component({
	behaviors: [input],
	options: {
		styleIsolation: 'apply-shared'      //外部样式会影响内部样式，组件样式不影响外部
	},
    properties: {
	    start:{
	    	type:String,
		    value:''
	    },
	    end:{
	    	type:String,
		    value:''
	    }
    },
    data: {

    },

	attached(){

	},


    methods: {
	    onSelect(e){
	    	let val = e.detail.value;

	    	this.setData({
			    value:val
		    });

		    let myEventDetail = {value:val}; // detail对象，提供给事件监听函数
		    let myEventOption = {}; // 触发事件的选项
		    this.triggerEvent('mychange', myEventDetail, myEventOption)

	    },

	    value(value){
		    this.setData({
			    value:value
		    });
	    }
    }
});