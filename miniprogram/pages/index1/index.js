//index.js
const app = getApp();
// import server from '../../lib/server.js';
// import {ajax,api} from '../../lib/ajax.js';
import sys from '../../lib/sys.js';
import $ from '../../lib/jq.js';


Page({
	data: {
		imgs:[
			{img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593492692986&di=b8c5d923298c33ae2ba36f41dff04510&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg',href:'#1'},
			{img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593492692986&di=f0e2cd16a2b2a4a6409797e70208fd96&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F56%2F12%2F01300000164151121576126282411.jpg',href:'#2'},
			{img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593492692986&di=b02ecb4b94b2719a164bc7c67dccf407&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg',href:'#3'},
			{img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593492692985&di=ef8edfb1cf2dd4e39c8086d9254f1281&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg',href:'#4'}
		],
		selectData:[
			{key:11,value:'a'},
			{key:22,value:'b'},
			{key:33,value:'c'},
			{key:44,value:'d'},
			{key:55,value:'e'}
		],
		selectData1:[
			{key:0,value:'无脊柱动物',children:[
				{key:2,value:'无脊1',children:[
					{key:8,value:'无脊1_1'},
					{key:9,value:'无脊1_2'}
				]},
				{key:3,value:'无脊2',children:[
					{key:10,value:'无脊2_1'},
					{key:11,value:'无脊2_2'}
				]},
				{key:4,value:'无脊3',children:[
					{key:12,value:'无脊3_1'},
					{key:13,value:'无脊3_2'}
				]},
				{key:5,value:'无脊4',children:[
					{key:14,value:'无脊4_1'},
					{key:15,value:'无脊4_2'}
				]}
			]},
			{key:1,value:'脊柱动物',children:[
				{key:6,value:'脊1',children:[
					{key:16,value:'脊1_1'},
					{key:17,value:'脊1_2'}
				]},
				{key:7,value:'脊2',children:[
					{key:18,value:'脊2_1'},
					{key:19,value:'脊2_2'}
				]}
			]}
		],
		selectValue1:"1,1,1",
		selectData2:[
			{key:0,value:'无脊柱动物',children:[
					{key:2,value:'无脊1'},
					{key:3,value:'无脊2'},
					{key:4,value:'无脊3'},
					{key:5,value:'无脊4'}
				]},
			{key:1,value:'脊柱动物',children:[
					{key:6,value:'脊1'},
					{key:7,value:'脊2'}
				]}
		],
		selectValue2:"1,7",
		selectData3:[
			{key:0,value:'无脊柱动物',children:[
					{key:2,value:'无脊1',children:[
							{key:8,value:'无脊1_1',children:[
									{key:111,value:'无脊1_1_1'}
								]}
						]}
				]},
			{key:1,value:'脊柱动物',children:[
					{key:6,value:'脊1',children:[
							{key:17,value:'脊1_2',children:[
									{key:222,value:'脊1_2_1'}
								]}
						]}
				]}
		],
		selectValue3:"0,2,8,111",
		selectData4:[[0,1,2,3,4,5],[1,2,3,6,7,8],[1,2,3,6,7,8]],
		selectValue4:"5,8"
	},

	onLoad: function() {
		// console.log(this.selectComponent('#name'))
		// console.log($('#mSelect').val())
		// console.log($('#m1Select').val())

		// $('#name').data({tt:123});
		// console.log($('#name').data('tt'));
		// console.log($('#name').data());



	},
	async login(e){
		let rs = await server.login1();
		console.log(rs)

	},
	inputMyChange(e){
		console.log(e);
		console.log(e.detail.value)

	},


	getVal(){
		// console.log($('#select').val())
		//
		// $('#select').val(55)
		//
		// console.log($('#select').val())
		// $('#name').attr({icon:'../../images/4@1x.png'});

		// console.log($('#name').attr());

		// console.log($('#name').attr('icon'));

		// console.log($('#name').attr('rule'));


		console.log($('#name').attr('rule'))


		this.submit().then().catch(async e=>{
			await sys.alert(e.msg);
			await sys.alert(e.id);
		})

	},


	async submit(){

		let nameVal = await $('#name').check();
		let selectVal = await $('#select').check();

		console.log(nameVal,selectVal)

		console.log('can submit!!!')


	},

	aaa(e){
		console.log(e)
	}


})
