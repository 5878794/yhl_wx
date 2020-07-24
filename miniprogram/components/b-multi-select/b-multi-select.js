
import b_input from '../__publish/b_input.js';

Component({
	behaviors: [b_input],
	options: {
		styleIsolation: 'apply-shared'      //外部样式会影响内部样式，组件样式不影响外部
	},
    properties: {
	    selectData:{
		    type:Array,
		    value:[]
	    },
	    cascade:{
	    	type:String,
		    value:"true"
	    }
    },
    data: {

    },

	attached(){
		if(this.data.cascade == 'true'){
			this.isCascade();
		}else{
			this.isNotCascade();
		}
	},


	methods: {
		//级联菜单初始化
		isCascade(){
			//处理select
			let selected = this.data.value, //  0,0,0
				selectIndex = [],           //原声控件显示层级的序号 数组
				//数据组的层级必须一致
				selectNumber = this.getSelectNumber();


			selected = selected.split(',') || new Array(selectNumber);

			//获取selectIndex数组
			selectIndex = this.getSelectIndex(selected,selectNumber);

			let selectArray = this.getSelectArray(selectIndex),
				selectText = this.getSelectText(selectIndex);

			this.setData({
				selectValue:selectArray,
				nowValue:selectIndex,
				showText:selectText
			});
		},
		//非级联菜单初始化
		isNotCascade(){
			let val = this.data.value;
			val = val.split(',') || new Array(data.length);

			let keys = [],
				data = this.data.selectData;
			val.map((rs,i)=>{
				let keysLength = keys.length;
				data[i].map((rs1,n)=>{
					if(rs1==rs){
						keys.push(n);
					}
				});
				if(keysLength == keys.length){
					keys.push(0);
				}
			});


			this.setValue1(keys);
		},


		//获取数据的长度，每个数据组层级必须一致
		getSelectNumber(){
			let data = this.data.selectData,
				n = 1;

			while(data[0].children && data[0].children.length != 0){
				n++;
				data = data[0].children;
			}

			return n;
		},
		//key值数组转序号数组
		getSelectIndex(selected,selectNumber){
			let data = this.data.selectData,
				back = [],
				nowData = data;

			for(let i=0,l=selectNumber;i<l;i++){
				let val = selected[i],
					temp = 0;

				if(!val && val !=0){
					back.push(0);
					temp = 0;
				}else{
					let backLength = back.length;
					nowData.map((rs,i)=>{
						if(rs.key == val){
							back.push(i);
							temp = i;
						}
					});

					//未找到对应值，默认选择第一个
					if(backLength == back.length){
						back.push(0);
					}
				}

				nowData = nowData[temp].children || [];
			}

			return back;
		},
		//处理成控件当前需要的数据结构
		getSelectArray(indexs){
			let back = [],
				data = this.data.selectData;

			//取第一层
			let lv1 = [];
			data.map(rs=>{
				lv1.push(rs.value);
			});
			back.push(lv1);


			//取后面的层
			let nowData = data;
			for(let i=0,l=indexs.length-1;i<l;i++){
				nowData = nowData[indexs[i]].children;
				let lv = [];
				nowData.map(rs=>{
					lv.push(rs.value);
				});
				back.push(lv);
			}

			return back;
		},
		//获取显示的文字
		getSelectText(indexs){
			let data = this.data.selectData,
				back = [];

			indexs.map(rs=>{
				back.push(data[rs].value);
				data = data[rs].children || [];
			});

			return back.join(',');
		},


		onSelect(e){
			let data = e.detail,
				col = data.column,
				val = data.value,
				nowIndex = this.data.nowValue;

			nowIndex[col] = val;
			//之后的选择全部默认为第一个
			for(let i=col+1,l=nowIndex.length;i<l;i++){
				nowIndex[i] = 0;
			}


			this.setValue(nowIndex);
		},
		onSelect1(e){
			let data = e.detail,
				col = data.column,
				val = data.value,
				nowIndex = this.data.nowValue;

			nowIndex[col] = val;

			this.setValue1(nowIndex);
		},

		setValue(indexs){
			let selectArray = this.getSelectArray(indexs),
				selectText = this.getSelectText(indexs);


			this.setData({
				selectValue:selectArray,
				nowValue:indexs,
				showText:selectText
			});
		},
		setValue1(indexs){
			let data = this.data.selectData,
				val = indexs,
				text = [];

			data.map((rs,i)=>{
				let n = val[i] || 0;
				text.push(rs[n]);
			});
			text = text.join(',');

			this.setData({
				selectValue:data,
				nowValue:val,
				showText:text
			});
		},


		//index反查key
		getSelectKey(indexs){
			let data = this.data.selectData,
				back = [];

			indexs.map(rs=>{
				back.push(data[rs].key);
				data = data[rs].children;
			});

			return back;

		},

		onSuccess(e){
			let data = e.detail.value,
				keys = this.getSelectKey(data),
				val = keys.join(',');

			this.setData({
				value:val
			});

			let myEventDetail = {value:val}; // detail对象，提供给事件监听函数
			let myEventOption = {}; // 触发事件的选项
			this.triggerEvent('mychange', myEventDetail, myEventOption)

		},
		onSuccess1(e){
			let data = e.detail.value;
			this.setValue1(data);

			let myEventDetail = {value:this.data.showText}; // detail对象，提供给事件监听函数
			let myEventOption = {}; // 触发事件的选项
			this.triggerEvent('mychange', myEventDetail, myEventOption)
		},

		value(value){
			value = value.split(',');
			if(this.data.cascade == 'true'){
				//key转index
				let selectNumber = this.getSelectNumber(),
					selectIndex = this.getSelectIndex(value,selectNumber);

				this.setValue(selectIndex);
			}else{
				let keys = [],
					data = this.data.selectData;
				value.map((rs,i)=>{
					data[i].map((rs1,n)=>{
						if(rs1==rs){
							keys.push(n);
						}
					});
				});

				this.setValue1(keys);
			}
		}
	}
});