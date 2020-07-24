
import input from '../__publish/b_input.js';

Component({
	behaviors: [input],
	options: {
		styleIsolation: 'apply-shared'      //外部样式会影响内部样式，组件样式不影响外部
	},
	properties: {
		checked:{
			type:Boolean,
			value:false
		},
		disabled:{
			type:Boolean,
			value:false
		},
		color:{
			type:String,
			value:'#04BE02'
		}
	},
	data: {

	},

	attached(){

	},


	methods: {
		onchange(e){
			let state = e.detail.value;

			this.setData({
				value:state
			})

		},
		value(value){
			value = (typeof value == "boolean")? value : false;

			this.setData({
				checked:value,
				value:value
			})
		}
	}
});