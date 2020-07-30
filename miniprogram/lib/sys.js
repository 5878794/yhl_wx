
import server from "./server";
import setting from './setting';
import {ajax, api} from "./ajax";




let sys = {
	//alert promise
	//@param:msg     str
	//@param:title   str
	alert(msg, title) {
		msg = (typeof msg == 'string') ? msg : JSON.stringify(msg);

		return new Promise(success => {
			title = title || "系统提示";
			wx.showModal({
				title: title,
				content: msg,
				showCancel: false,
				confirmText: "确定",
				success: function () {
					success();
				}
			})
		});
	},
	confirm(msg, title) {
		msg = (typeof msg == 'string') ? msg : JSON.stringify(msg);
		return new Promise((success, error) => {
			title = title || "系统提示";
			wx.showModal({
				title: title,
				content: msg,
				success: function (res) {
					if (res.confirm) {
						success();
					} else if (res.cancel) {
						error();
					}
				}
			})
		})

	},

	//显示提示
	//info.show(text);
	//info.hide()
	info: {
		show(msg) {
			if (typeof msg != 'string') {
				msg = JSON.stringify(msg);
			}
			wx.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			})
		},
		hide() {
			wx.hideToast()
		}
	},


	//loading
	//loading.show(text)
	//loading.hide();
	loading: {
		show: function (text = '极速加载中') {
			wx.showLoading({
				title: text,
				mask: true
			});
		},
		hide: function () {
			wx.hideLoading();
		}
	},



	//设置标题
	//#param:title  str
	setTitle(title) {
		wx.setNavigationBarTitle({
			title: title,
		})
	},


	//设置顶部系统条颜色
	//@param  fontColor:str   '#ffffff'
	//@param  bgColor:str     '#ffffff'
	//注意其中fontColor 只能是#ffffff 或  #000000
	setNavigationBarColor(fontColor, bgColor) {
		wx.setNavigationBarColor({
			frontColor: fontColor,
			backgroundColor: bgColor,
			animation: {
				duration: 0,
				timingFunc: 'easeIn'
			}
		})
	},


	//打开新页面
	//@param:url   str
	openUrl(url) {
		wx.navigateTo({ url: url });
	},
	//关闭当前页面跳转到新页面，goback无法返回被关闭页面
	closeAndOpenUrl(url){
		wx.redirectTo({url:url});
	},
	//关闭所有打开的页面跳转到新页面
	closeAllAndOpen(url){
		wx.reLaunch({
			url: url
		})
	},
	//打开tab页面
	openTabUrl(url){
		wx.switchTab({
			url: url
		})
	},

	//返回前几页
	//@param  number:number
	goBack(number = 1) {
		wx.navigateBack({
			delta: number
		})
	},


	//打电话
	//@param:tel   number
	tel(tel) {
		wx.makePhoneCall({
			phoneNumber: tel
		})
	},



	//本地数据缓存  promise 一堆
	//10M空间
	//@param   key:str
	//@param   val:str/obj
	setLocalData(key, val) {
		return new Promise((success, error) => {
			wx.setStorage({
				key: key,
				data: val,
				success: function () {
					success();
				},
				error: function (msg) {
					error(msg);
				}
			})
		});
	},
	//@param   key:str
	getLocalData(key) {
		return new Promise(success => {
			wx.getStorage({
				key: key,
				complete: function (obj) {
					obj = obj || {};
					obj = obj.data || '';
					success(obj)
				}
			})
		});
	},
	//@param   key:str
	delLocalData(key) {
		return new Promise(success => {
			wx.removeStorage({
				key: key,
				success: function (res) {
					success();
				}
			})
		})
	},
	//清除所有缓存
	clearLocalData() {
		wx.clearStorageSync();
	},




	//滚动页面到指定位置
	scrollTo(top = 0, duration = 300) {
		wx.pageScrollTo({
			scrollTop: top,
			duration: duration
		})
	},



	//获取指定元素的实际属性
	//如果传入的是class获取的是第一个找到的class的dom的属性
	//@param:id    .class/#id
	getDomParam(id) {
		return new Promise(success=>{
			let query = wx.createSelectorQuery();
			query.select(id).boundingClientRect();
			query.exec(function (res) {
				if(res[0]){
					let backData = res[0] || {
						top:0,
						bottom:0,
						left:0,
						right:0,
						width:0,
						height:0
					};
					success(backData);
				}
			})
		})
	},


	//获取视窗滚动的距离
	getScrollState() {
		return new Promise(success => {
			wx.createSelectorQuery().selectViewport().scrollOffset(function (res) {
				//res.scrollLeft
				//res.scrollTop
				//res.id
				//res.dataset
				success({
					left: res.scrollLeft,
					top: res.scrollTop
				});
			}).exec();
		})
	},


	device(){
		return wx.getSystemInfoSync();
	},


	sleep(ms){
		return new Promise(success=>{
			setTimeout(function(){
				success();
			},ms)
		})
	},

	//设置剪贴板内容
	setClipboard(text){
		return new Promise(success=>{
			wx.setClipboardData({
				data: text,
				success () {
					success();
				}
			})
		})

	},


	//tab页面传参用
	// text:    name=123&a=222
	async setTabParam(text){
		await this.setLocalData('__temp_tab_param__',text);
	},
	async getTabParam(){
		let text = await this.getLocalData('__temp_tab_param__');
		text = text.split('&');
		let backData = {};
		text.map(rs=>{
			let item = rs.split('=');
			backData[item[0]] = item[1];
		});
		return backData;
	},
	//保存用户信息及openid等
	//带服务器信息保存。。。。
	saveUserInfo(info){
		let _this = this;
		return new Promise(success=>{
			const app = getApp();
			app.globalData.openId = info.openId;
			app.globalData.appId = info.appId;

			ajax.send([
				api.register({
					openid:info.openId,
					nick:info.nickName,
					headurl:info.avatarUrl
				})
			]).then(async rs=>{
				await _this.setLocalData('register',true);
				success();
			}).catch(async e=>{
				sys.loading.hide();
				await _this.setLocalData('register',false);
				await _this.alert(e);
				success();
			});
		})
	},
	//获取用户信息
	//带服务器信息保存。。。。
	getUserInfo(){
		const app = getApp(),
			_this = this;
		return new Promise(success=>{
			let allSuccess = async function(info){
				let isRegister = await _this.getLocalData('register');
				if(isRegister){
					success(info);
					return;
				}
				ajax.send([
					api.register({
						openid:info.openId,
						nick:info.nickName,
						headurl:info.avatarUrl
					})
				]).then(async rs=>{
					await _this.setLocalData('register',true);
					success(info);
				}).catch(async e=>{
					await _this.setLocalData('register',false);
					success(info);
				});
			};

			wx.getSetting({
				success (res){
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称
						wx.getUserInfo({
							success: function(res) {
								let info = res.userInfo;
								if(app.globalData.openId && app.globalData.appId){
									info.openId = app.globalData.openId;
									info.appId = app.globalData.appId;
									allSuccess(info);
								}else{
									server.login().then(rs=>{
										let loginInfo = rs.event.userInfo;
										info.openId = loginInfo.openId;
										info.appId = loginInfo.appId;
										//缓存
										app.globalData.openId = info.openId;
										app.globalData.appId = info.appId;
										allSuccess(info);
									}).catch(e=>{
										sys.alert(e);
									});
								}

							}
						})
					}else{
						success(null);
					}
				}
			})
		});
	},
	//文件上传
	//serverUrl 服务器地址
	//filePath  本地文件路径
	//data      其它form表单
	//name      file文件对应的key
	//header    其它header内的对象
	uploadFile(api,filePath,data,name,header){
		name = name || 'file';
		data = data || {};
		header = header || {};
		return new Promise((success,error)=>{
			wx.uploadFile({
				url: setting.serverUrl+api,
				filePath: filePath,
				name: name,
				formData: data,
				header:header,
				timeout:20000,
				success (res){
					console.log(res)
					let data = res.data
					data = JSON.parse(data);

					if(data.err){
						error(data.info);
						return;
					}

					success(data);
				},
				fail(e){
					error(e);
				}
			})
		})
	}
};



export default sys;