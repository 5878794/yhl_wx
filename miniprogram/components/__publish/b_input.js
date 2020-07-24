


let b_input = Behavior({
	properties: {
		icon:{
			type: String,
			value: ''
		},
		type:{
			type: String,
			value: 'text'
		},
		placeholder:{
			type: String,
			value: ''
		},
		err:{
			type: String,
			value: ''
		},
		name:{
			type: String,
			value: ''
		},
		rule:{
			type: String,
			value: ''
		},
		value:{
			type: String,
			value: ''
		},
		disabled:{
			type:Boolean,
			value:false
		}
	},

	observers: {
		'disabled': function (params) {//  'params'是要监听的字段，（params）是已更新变化后的数据
			if(params){
				this.setData({
					disabledClass:'disabledClass',
					placeholder:''
				})
			}else{
				this.setData({
					disabledClass:'',
					placeholder:this.data.placeholder1
				})
			}
		}
	},

	// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
	attached: function () {
		this.setData({
			placeholder1:this.data.placeholder
		});


		//处理普通的组件
		// this.setData({
		// 	name:this.data.name,
		// 	icon:this.data.icon,
		// 	type:this.data.type,
		// 	placeholder:this.data.placeholder,
		// 	err:this.data.err,
		// 	rule:this.data.rule,
		// 	value:this.data.value,
		// });




	}, // 此处attached的声明会被lifetimes字段中的声明覆盖
	ready: function() {

	},

	methods: {
		onInput(e){
			this.setData({
				value:e.detail.value
			})


			let myEventDetail = {value:e.detail.value}; // detail对象，提供给事件监听函数
			let myEventOption = {}; // 触发事件的选项
			this.triggerEvent('mychange', myEventDetail, myEventOption)
		},

		value(value){
			this.setData({
				value:value
			})
		}
	}

});



export default b_input;