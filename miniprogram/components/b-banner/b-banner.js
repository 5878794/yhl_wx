




Component({
	behaviors: [],
	options: {
		styleIsolation: 'apply-shared'      //外部样式会影响内部样式，组件样式不影响外部
	},
    properties: {
		//是否显示点
	    indicatorDots:{
	    	type:Boolean,
		    value:true
	    },
	    //是否自动播放
	    autoplay:{
	    	type:Boolean,
		    value:true
	    },
	    //是否采用衔接滑动
	    circular:{
		    type:Boolean,
		    value:true
	    },
	    //滑动方向是否为纵向
	    vertical:{
		    type:Boolean,
		    value:false
	    },
	    //自动切换时间间隔
	    interval:{
			type:Number,
		    value:5000
	    },
	    //滑动动画时长
	    duration:{
		    type:Number,
		    value:500
	    },
	    //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
	    previousMargin:{
			type:String,
		    value:'0'
	    },
	    //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
	    nextMargin:{
		    type:String,
		    value:'0'
	    },
	    //指示点颜色
	    indicatorColor:{
			type:String,
		    value:'rgba(0, 0, 0, .3)'
	    },
	    //当前选中的指示点颜色
	    indicatorActiveColor:{
		    type:String,
		    value:'#000000'
	    },
	    //传入的图片   [{img:'',href:''}]
	    // href 可以不传或空 点击事件无效
	    imgs:{
	    	type:Array,
		    value:[]
	    }

    },
    data: {

    },

	attached(){

	},


    methods: {
	    onclick(e){
	    	let data = e.currentTarget.dataset.data,
			    href = data.href;

	    	if(href){
			    wx.redirectTo({
				    url:href
			    })
		    }

	    }


    }
});