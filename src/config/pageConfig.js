/*
 * @Author: cdluxy
 * @Desc: 所有页面路径配置相关，包括权限控制
 * @Date: 2020-05-31 19:47:58
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-03 10:52:11
 */ 

 // roleCode 代表是否要为哪些角色用户在左侧菜单栏展示
const pagePath = [
	{
		name: '实验项目',
		icon: require('./icons/experiment.png'),
		toPath: `${window.location.origin}/experiment`,
		roleCode: ['0', '1'],
		subList: [
		]
	},{
		name: '数据概览',
		icon: require('./icons/data.png'),
		toPath: '/main/dataOverview',
		roleCode: ['0', '1'],
		subList: [
			{
				name: '指标仓库',
				toPath: '/main/indicatorsWarehouse',
				roleCode: ['0', '1'],
			},
			{
				name: '文献查询',
				toPath: '/main/literatureQuery',
				roleCode: ['0', '1'],
			},
		]
	},
	{
		name: '用户管理',
		icon: require('./icons/system.png'),
		toPath: '/main/userManagement',
		roleCode: ['0'],
		subList: [
		]
	},
	{
		name: '修改用户名',
		toPath: '/main/editName/',
		roleCode: [],
		subList: [
		]
	},
	{
		name: '修改密码',
		toPath: '/main/editPassword/',
		roleCode: [],
		subList: [
		]
	}
];

export default pagePath;