/*
 * @Author: cdluxy
 * @Desc: 存放所有数据字典配置
 * @Date: 2020-05-04 00:06:49
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-05 18:47:09
 */

 // 病例库全量患者数量
const allPatientsTotalConfig = 12345;

// 队列指标id到中文名的映射的配置项
const queueIndicatorIdToNameConfig = {0: '患者ID', 1: '患者姓名', 2: '性别',3: '月经史',4: '民族',5: '国籍',6: '年龄',7: '职业类别',8: '籍贯',9: 'ABO血型',10: '病案号码',11: '住院号',12: '出生地',13: '是否死亡',14: '死亡日期',15: '身高',16: '体重',17: '舒张压',18: '收缩压',19: '脉搏',20: '体温',21: '呼吸频率',22: '体格检查文本',23: '专科检查文本',24: '检查日期',25: '下肢静脉曲张',26: '下肢水肿',27: '主诉',28: '主诉-阳性',29: '主诉-病程',30: '现病史-阳性症状名称',31: '现病史-阴性症状名称',32: '体重改变史',33: '体重改变时间',34: '体重改变数值',35: '体重改变性质',36: '是否有手术史',37: '手术史类型',38: '实验室检查-抗心磷脂抗体ACA',39: '实验室检查凝血酶原20210A',40: '实验室检查因子Vleiden',41: '实验室检查-狼疮抗凝物',42: '实验室检查-血清同型半胱氨酸',43: '实验室检查-血小板',44: '实验室检查-血清同型半胱氨酸',45: '实验室检查-血清同型半胱氨酸',46: '实验室检查-D-二聚体',47: '实验室检查-APTT',48: '实验室检查-抗Xa活性',49: '实验室检查-因子XIII活性定量',50: '影像检查类型',51: '检查编号',52: '检查日期',53: '检查名称',54: '检查部位',55: '检查所见',56: '检查结论',57: '诊断类型',58: '诊断日期',59: '诊断来源',60: '诊断顺位',61: '诊断名称',62: '诊断ICD名称',63: '诊断ICD编码',64: '诊断医生',65: '初诊年龄',66: '手术开始时间',67: '手术结束时间',68: '手术名称',69: '手术名称-ICD9',70: '术前诊断',71: '术后诊断',72: '手术记录来源',73: '手术部位',74: '术中出血量',75: '术者',76: '第一助手',77: '麻醉师',78: '检查类医嘱-开立时间',79: '检查类医嘱-医嘱项目内容',80: '检查类医嘱-就诊类型',81: '处置类医嘱-医嘱项目内容',82: '处置类医嘱-开始时间',83: '处置类医嘱-医嘱数量',84: '处置类医嘱-数量单位',85: '处置类医嘱-频次',86: '处置类医嘱-结束时间',87: '诊断医生',88: '诊断日期',89: '诊断类型',90: '诊断内容',91: '护理负责人',92: '护理日期',93: '护理类型',94: '护理内容',95: '诊断日期',96: '诊断类型',97: '诊断名称'};

 // 队列条件全量配置项
const queueConditionConfig = [{
	"name": "患者人口学信息",
	"icon": require("./icons/step1/1.png"),
	"subList": [{"name": "患者姓名", "type": "string", "id": 1}, {
		"name": "性别",
		"type": "string",
		"id": 2
	}, {"name": "月经史", "type": "string", "id": 3}, {"name": "民族", "type": "string", "id": 4}, {
		"name": "国籍",
		"type": "string",
		"id": 5
	}, {"name": "年龄", "type": "float", "id": 6}, {"name": "职业类别", "type": "string", "id": 7}, {
		"name": "籍贯",
		"type": "string",
		"id": 8
	}, {"name": "ABO血型", "type": "string", "id": 9}, {"name": "病案号码", "type": "string", "id": 10}, {
		"name": "住院号",
		"type": "string",
		"id": 11
	}, {"name": "出生地", "type": "string", "id": 12}, {"name": "是否死亡", "type": "bool", "id": 13}, {
		"name": "死亡日期",
		"type": "datatime",
		"id": 14
	}],
	"id": 1
}, {
	"name": "体征",
	"icon": require("./icons/step1/2.png"),
	"subList": [{"name": "身高", "type": "float", "id": 15}, {
		"name": "体重",
		"type": "float",
		"id": 16
	}, {"name": "舒张压", "type": "float", "id": 17}, {"name": "收缩压", "type": "float", "id": 18}, {
		"name": "脉搏",
		"type": "float",
		"id": 19
	}, {"name": "体温", "type": "float", "id": 20}, {"name": "呼吸频率", "type": "float", "id": 21}, {
		"name": "体格检查文本",
		"type": "string",
		"id": 22
	}, {"name": "专科检查文本", "type": "string", "id": 23}, {
		"name": "检查日期",
		"type": "datetime",
		"id": 24
	}, {"name": "下肢静脉曲张", "type": "bool", "id": 25}, {"name": "下肢水肿", "type": "bool", "id": 26}],
	"id": 2
}, {
	"name": "主诉现病史",
	"icon": require("./icons/step1/3.png"),
	"subList": [{"name": "主诉", "type": "string", "id": 27}, {
		"name": "主诉-阳性",
		"type": "string",
		"id": 28
	}, {"name": "主诉-病程", "type": "string", "id": 29}, {
		"name": "现病史-阳性症状名称",
		"type": "string",
		"id": 30
	}, {"name": "现病史-阴性症状名称", "type": "string", "id": 31}, {
		"name": "体重改变史",
		"type": "string",
		"id": 32
	}, {"name": "体重改变时间", "type": "string", "id": 33}, {
		"name": "体重改变数值",
		"type": "string",
		"id": 34
	}, {"name": "体重改变性质", "type": "string", "id": 35}, {
		"name": "是否有手术史",
		"type": "string",
		"id": 36
	}, {"name": "手术史类型", "type": "string", "id": 37}],
	"id": 3
}, {
	"name": "检验报告",
	"icon": require("./icons/step1/4.png"),
	"subList": [{"name": "实验室检查-抗心磷脂抗体ACA", "type": "float", "id": 38}, {
		"name": "实验室检查凝血酶原20210A",
		"type": "float",
		"id": 39
	}, {"name": "实验室检查因子Vleiden", "type": "float", "id": 40}, {
		"name": "实验室检查-狼疮抗凝物",
		"type": "float",
		"id": 41
	}, {"name": "实验室检查-血清同型半胱氨酸", "type": "float", "id": 42}, {
		"name": "实验室检查-血小板",
		"type": "float",
		"id": 43
	}, {"name": "实验室检查-血清同型半胱氨酸", "type": "float", "id": 44}, {
		"name": "实验室检查-血清同型半胱氨酸",
		"type": "float",
		"id": 45
	}, {"name": "实验室检查-D-二聚体", "type": "float", "id": 46}, {
		"name": "实验室检查-APTT",
		"type": "float",
		"id": 47
	}, {"name": "实验室检查-抗Xa活性", "type": "float", "id": 48}, {"name": "实验室检查-因子XIII活性定量", "type": "XIII", "id": 49}],
	"id": 4
}, {
	"name": "影像检查报告",
	"icon": require("./icons/step1/5.png"),
	"subList": [{"name": "影像检查类型", "type": "string", "id": 50}, {
		"name": "检查编号",
		"type": "string",
		"id": 51
	}, {"name": "检查日期", "type": "datetime", "id": 52}, {
		"name": "检查名称",
		"type": "string",
		"id": 53
	}, {"name": "检查部位", "type": "string", "id": 54}, {"name": "检查所见", "type": "string", "id": 55}, {
		"name": "检查结论",
		"type": "string",
		"id": 56
	}],
	"id": 5
}, {
	"name": "入院诊断",
	"icon": require("./icons/step1/6.png"),
	"subList": [{"name": "诊断类型", "type": "string", "id": 57}, {
		"name": "诊断日期",
		"type": "datetime",
		"id": 58
	}, {"name": "诊断来源", "type": "string", "id": 59}, {"name": "诊断顺位", "type": "string", "id": 60}, {
		"name": "诊断名称",
		"type": "string",
		"id": 61
	}, {"name": "诊断ICD名称", "type": "string", "id": 62}, {
		"name": "诊断ICD编码",
		"type": "string",
		"id": 63
	}, {"name": "诊断医生", "type": "string", "id": 64}, {"name": "初诊年龄", "type": "int", "id": 65}],
	"id": 6
}, {
	"name": "手术知情书",
	"icon": require("./icons/step1/7.png"),
	"subList": [{"name": "手术开始时间", "type": "datetime", "id": 66}, {
		"name": "手术结束时间",
		"type": "datetime",
		"id": 67
	}, {"name": "手术名称", "type": "string", "id": 68}, {
		"name": "手术名称-ICD9",
		"type": "string",
		"id": 69
	}, {"name": "术前诊断", "type": "string", "id": 70}, {
		"name": "术后诊断",
		"type": "string",
		"id": 71
	}, {"name": "手术记录来源", "type": "string", "id": 72}, {
		"name": "手术部位",
		"type": "string",
		"id": 73
	}, {"name": "术中出血量", "type": "int", "id": 74}, {"name": "术者", "type": "string", "id": 75}, {
		"name": "第一助手",
		"type": "string",
		"id": 76
	}, {"name": "麻醉师", "type": "string", "id": 77}],
	"id": 7
}, {
	"name": "医嘱处方",
	"icon": require("./icons/step1/8.png"),
	"subList": [{"name": "检查类医嘱-开立时间", "type": "datetime", "id": 78}, {
		"name": "检查类医嘱-医嘱项目内容",
		"type": "string",
		"id": 79
	}, {"name": "检查类医嘱-就诊类型", "type": "string", "id": 80}, {
		"name": "处置类医嘱-医嘱项目内容",
		"type": "string",
		"id": 81
	}, {"name": "处置类医嘱-开始时间", "type": "datetime", "id": 82}, {
		"name": "处置类医嘱-医嘱数量",
		"type": "int",
		"id": 83
	}, {"name": "处置类医嘱-数量单位", "type": "string", "id": 84}, {
		"name": "处置类医嘱-频次",
		"type": "int",
		"id": 85
	}, {"name": "处置类医嘱-结束时间", "type": "datetime", "id": 86}],
	"id": 8
}, {
	"name": "查房记录",
	"icon": require("./icons/step1/9.png"),
	"subList": [{"name": "诊断医生", "type": "string", "id": 87}, {
		"name": "诊断日期",
		"type": "datetime",
		"id": 88
	}, {"name": "诊断类型", "type": "string", "id": 89}, {"name": "诊断内容", "type": "string", "id": 90}],
	"id": 9
}, {
	"name": "护理记录",
	"icon": require("./icons/step1/10.png"),
	"subList": [{"name": "护理负责人", "type": "string", "id": 91}, {
		"name": "护理日期",
		"type": "datetime",
		"id": 92
	}, {"name": "护理类型", "type": "string", "id": 93}, {"name": "护理内容", "type": "string", "id": 94}],
	"id": 10
}, {
	"name": "出院诊断",
	"icon": require("./icons/step1/11.png"),
	"subList": [{"name": "诊断日期", "type": "datetime", "id": 95}, {
		"name": "诊断类型",
		"type": "string",
		"id": 96
	}, {"name": "诊断名称", "type": "string", "id": 97}],
	"id": 11
}];

 // 指标类型归类配置项
const mapIndicatorTypeConfig = {
	'int': 'number',
	'float': 'number',
	'string': 'text',
	'bool': 'text',
	'datetime': 'text'
};

// 队列指标逻辑关系配置项
const queueIndicatorLogicalRelation = { 1: { value: '包含', desc: '包含', type: 'text' }, 2: { value: '不包含', desc: '不包含', type: 'text' }, 3: { value: '等于', desc: '等于', type: 'text' }, 4: { value: '不等于', desc: '不等于', type: 'text' }, 5: { value: '＝', desc: '等于', type: 'number' }, 6: { value: '≠', desc: '不等于', type: 'number' }, 7: { value: '＞', desc: '大于', type: 'number' }, 8: { value: '>=', desc: '大于等于', type: 'number' }, 9: { value: '＜', desc: '小于', type: 'number' }, 10: { value: '<=', desc: '小于等于', type: 'number' } };

// 文本指标：选择逻辑有，首次，末次
// 数值指标：筛选逻辑有，首次，末次，最小值，平均值，最大值
// 选择指标逻辑关系配置项
const chooseIndicatorLogicalRelation = {
	text: [{id: 1, value: '首次', desc: '首次'}, {id: 2, value: '末次', desc: '末次'}],
	number: [{id: 1, value: '首次', desc: '首次'}, {id: 2, value: '末次', desc: '末次'}, {id: 3, value: '最小值', desc: '最小值'}, {id: 4, value: '平均值', desc: '平均值'}, {id: 5, value: '最大值', desc: '最大值'}],
};


 // 诊疗阶段数据指标全量配置项
const clinicalStageDataIndicatorsConfig = [
	{
		"id": 1,
		"name": "门诊阶段",
		"icon": require("./icons/step2/1.png"),
		"subList": [{id: 2, name: '性别', type: 'string'},{id: 4, name: '民族', type: 'string'}]
	},
	{
		"id": 2,
		"name": "入院诊疗",
		"icon": require("./icons/step2/2.png"),
		"subList": [{id: 15, name: '身高', type: 'float'},{id: 16, name: '体重', type: 'float'},{id: 22, name: '体格检查文本', type: 'string'},{id: 30, name: '现病史-阳性症状名称', type: 'string'},{id: 31, name: '现病史-阴性症状名称', type: 'string'},{id: 37, name: '手术史类型', type: 'string'},{id: 38, name: '实验室检查-抗心磷脂抗体ACA', type: 'float'},{id: 39, name: '实验室检查凝血酶原20210A', type: 'float'},{id: 40, name: '实验室检查因子Vleiden', type: 'float'},{id: 41, name: '实验室检查-狼疮抗凝物', type: 'float'},{id: 42, name: '实验室检查-血清同型半胱氨酸', type: 'float'},{id: 43, name: '实验室检查-血小板', type: 'float'},{id: 44, name: '实验室检查-血清同型半胱氨酸', type: 'float'},{id: 45, name: '实验室检查-血清同型半胱氨酸', type: 'float'},{id: 46, name: '实验室检查-D-二聚体', type: 'float'},{id: 47, name: '实验室检查-APTT', type: 'float'},{id: 48, name: '实验室检查-抗Xa活性', type: 'float'},{id: 49, name: '实验室检查-因子XIII活性定量', type: 'float'},{id: 53, name: '检查名称', type: 'string'},{id: 61, name: '诊断名称', type: 'string'}]
	},
	{
		"id": 3,
		"name": "手术治疗",
		"icon": require("./icons/step2/3.png"),
		"subList": [{id: 66, name: '手术开始时间', type: 'datetime'},{id: 67, name: '手术结束时间', type: 'datetime'},{id: 68, name: '手术名称', type: 'string'}]
	},
	{
		"id": 4,
		"name": "术后恢复",
		"icon": require("./icons/step2/4.png"),
		"subList": [{id: 74, name: '术中出血量', type: 'int'}]
	},
	{
		"id": 5,
		"name": "康复出院",
		"icon": require("./icons/step2/5.png"),
		"subList": [{id: 95, name: '诊断日期', type: 'datetime'},{id: 96, name: '诊断类型', type: 'string'},{id: 97, name: '诊断名称', type: 'string'}]
	},
	{
		"id": 6,
		"name": "院外随访",
		"icon": require("./icons/step2/6.png"),
		"subList": [{id: 13, name: '是否死亡', type: 'bool'}]
	},
];

export { 
	allPatientsTotalConfig, 
	queueIndicatorIdToNameConfig, 
	queueConditionConfig, 
	mapIndicatorTypeConfig, 
	queueIndicatorLogicalRelation, 
	chooseIndicatorLogicalRelation, 
	clinicalStageDataIndicatorsConfig 
};
