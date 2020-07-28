


//通过jq方式获取组件对象
//选择器使用id选择器，    class由于微信的选择器问题不能获取多个
//attr方法    组件已有的属性才能添加、修改
//data       数据   设置、获取
//val        input控件的值,    设置、获取
//check      数据检查返回promise对象，并返回值，检查失败进入 throw err


import checkFn from "./inputCheck";


let getPage = Symbol();


class JQ{
	constructor(selected){
		let page = this[getPage]();
		this.dom = page.selectComponent(selected);

		return this;
	}

	[getPage](){
		let pages = getCurrentPages()    //获取加载的页面
		return pages[pages.length-1]    //获取当前页面的对象
	}

	//获取控件值
	val(value){
		if(value === undefined){
			return this.dom.data.value;
		}else{
			this.dom.value(value);
			return this;
		}
	}

	//设置data对象
	data(key){
		if(key === undefined){
			return this.dom.dataset;
		}else if(typeof key == 'string'){
			return this.dom.dataset[key];
		}else{
			for(let [k,v] of Object.entries(key)){
				this.dom.dataset[k] = v;
			}
			return this;
		}
	}

	//组件已有的属性才能添加、修改
	attr(key){
		if(key === undefined){
			return this.dom.data;
		}else if(typeof key == 'string'){
			return this.dom.data[key];
		}else{
			let newObj = {};
			for(let [k,v] of Object.entries(key)){
				newObj[k] = v;
			}
			this.dom.setData(newObj);
			return this;
		}
	}


	//表单检查  规则见 "./inputCheck"
	check(){
		let val = this.val(),
			rule = this.attr('rule'),
			id = this.dom.id,
			errMsg = this.attr('err');

		return new Promise((success,error)=>{
			if(checkFn(val,rule)){
				success(val);
			}else{
				// throw {msg:errMsg,id};
				console.log(errMsg)
				throw errMsg;
			}
		});
	}

}






export default function(selected){
	return new JQ(selected)
};