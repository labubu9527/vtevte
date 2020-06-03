/*
 * @Author: cdluxy
 * @Desc: 实验项目列表假数据
 * @Date: 2020-05-03 16:10:59
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-05 21:49:42
 */

 const data = [{
	id: 10001,
	name: '利伐沙班与依诺肝素预防全膝关节置换术后血栓形成',
	purpose: '为了革命，打发实打实的发送。按时发达时都发。阿斯顿发送到发是。按时发达时都发是。按时发达时都发。',
	beginDate: '2020-04-02',
	endDate: '2020-05-01',
	organization: '中国XXXX机构XXXX中心',
	manager: '张XX',
	sampleSize: 12300,
	queueInfo: {
		indicator: {
			include: [{
				id: 1,
				sampleSize: 10000,	// 到该过滤条件剩余患者数量
				list: [{
					subItemId: 2,	//	性别 
					logicId: 1,	// 逻辑关系：包含
					value: '男,女'
				},{
					subItemId: 6,	//	年龄 
					logicId: 7,	// 逻辑关系：大于
					value: 18	
				}],
			}],
			exclude: []
		},
	}
},{
	id: 10002,
	name: '利伐沙班与依诺肝素预防全膝关节置换术后血栓形成，我的字很多很多，我的字很多很多，我的字很多很多，我的字很多很多',
	purpose: '为了革命，打发实打实的发送。按时发达时都发。阿斯顿发送到发是。按时发达时都发是。按时发达时都发。',
	beginDate: '2020-03-05',
	endDate: '2020-05-02',
	organization: '中国XXXX机构XXXX中心2',
	manager: '李XX',
	sampleSize: 11000,
	queueInfo: {
		indicator: {
			include: [{
				id: 1,
				sampleSize: 10000,	// 到该过滤条件剩余患者数量
				list: [{
					subItemId: 2,	//	性别 
					logicId: 1,	// 逻辑关系：包含
					value: '男,女'
				},{
					subItemId: 6,	//	年龄 
					logicId: 7,	// 逻辑关系：大于
					value: 20	
				}]
			},{
				id: 2,
				sampleSize: 5200,
				list: [{
					subItemId: 15,	//	身高 
					logicId: 8,	// 逻辑关系：大于等于
					value: 180
				},{
					subItemId: 16,	//	体重 
					logicId: 10,	// 逻辑关系：小于大于
					value: 65	
				},{
					subItemId: 25,	//	体重 
					logicId: 4,	// 逻辑关系：不等于
					value: '是'	
				}]
			},{
				id: 6,
				sampleSize: 2800,
				list: [{
					subItemId: 61,	//	身高 
					logicId: 1,	// 逻辑关系：大于等于
					value: '支气管炎'
				}]
			}],
			exclude: []
		},
	},
	observeIndicatorInfo: [{
		id: 1,
		list: [{
			subItemId: 2,	//	性别 
			logicId: 1,		//	首次
		}]
	},
	{
		id: 2,
		list: [{
			subItemId: 15,	//	性别 
			logicId: 1,		//	首次
		},
		{
			subItemId: 16,	//	性别 
			logicId: 1,		//	首次
		}]
	}]
}];

export default data;