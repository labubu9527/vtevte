/*
 * @Author: cdluxy
 * @Desc: 弹框内容里用的表单
 * @Date: 2020-05-05 22:17:08
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-05 22:55:07
 */
import React from 'react';
import { Form, Checkbox, Radio, Button } from 'antd';
import { mapIndicatorTypeConfig, chooseIndicatorLogicalRelation, queueIndicatorLogicalRelation } from 'rootSrc/const';
import style from './style.scss?module';

/**
 * 把外层入参的indicatorList转化成antd form组件初始化数据需要的数据格式
 * @param {*} indicatorList 
 */
function inputDataFormatTransformToAntdFormat(indicatorList){
	return indicatorList.reduce((acc, {logicId, subItemId}) => {
		acc[`subItemId-${subItemId}`] = [subItemId];
		acc[`logicId-${subItemId}`] = logicId;
		return acc;
	}, {});
}

/**
 * 把外层入参的indicatorList转化成antd form组件初始化数据需要的数据格式
 * @param {*} indicatorList 
 */
function antdFormatTransformToInputDataFormat(formData){
	return Object.keys(formData).map(key => {
		const [attrName, subItemId] = key.split('-');
		const attrVal = formData[key];
		if(attrName === 'logicId' && attrVal !== undefined){
			return {
				subItemId: ~~subItemId,	//	指标id
				logicId: attrVal,		//	指标具体选项id
			}
		}
	}).filter(item => !!item);
}

const DialogForm = ({modalCloseFun, editCallback, editData}) => {

	const {indicatorId, indicatorList, subList} = editData;

// "subList": [{id: 2, name: '性别', type: 'string'},{id: 4, name: '民族', type: 'string'}]

// indicatorList: [{
// 	subItemId: 2,	//	性别 
// 	logicId: 1,		//	首次
// }]

	const [form] = Form.useForm();

	const onFinish = values => {
		console.log('onFinish:', values);
		// removeBeginEndDate(values);
		// if(editData){

		const newIndicatorList = antdFormatTransformToInputDataFormat(values);

		editCallback({indicatorId, indicatorList: newIndicatorList});
		// }else{
		// 	addCallback(Object.assign(values, {id: Date.now(), sampleSize: 0}));
		// }
		modalCloseFun();
	};

	// const initialValues = {
	// 	['subItemId-15']: [15],
    //     ['logicId-15']: 1,
	// };
	
	const initialValues = inputDataFormatTransformToAntdFormat(indicatorList);

	const onValuesChange = (changedValues, allValues) => {
		// ["subItemId", "97"]
		const [str, id] = Object.keys(changedValues)[0].split('-');
		const changedValue = changedValues[Object.keys(changedValues)[0]];
		const addObj = {};
		if(str === 'subItemId'){
			// 同步选中对应的radio第一项
			let obj;
			if(changedValue.length === 0){
				// checkbox变成不选中
				delete allValues['logicId-' + id];
				obj = Object.assign({}, allValues);
			}else{
				// checkbox变成选中
				addObj['logicId-' + id] = 1;
				obj = Object.assign({}, allValues, addObj);
			}
			// console.log('subItemId obj:', obj);
			form.setFieldsValue(obj);
		}else if(str === 'logicId'){
			addObj['subItemId-' + id] = [~~id];
			const obj = Object.assign({}, allValues, addObj);
			// console.log('logicId obj:', obj);
			form.setFieldsValue(obj);
		}
	};

	// form.setFieldsValue(editData);
	return (
		<>
			<Form /* {...layout}  */ form={form} name="control-hooks" onFinish={onFinish} initialValues={initialValues} onValuesChange={onValuesChange}>
				<div className={style["form-item-wrap"]}>
					{subList.map(({id, name, type}) => {
						const renderRadioList = chooseIndicatorLogicalRelation[mapIndicatorTypeConfig[type]];
						return (
							<Form.Item key={id} label="" style={{ marginBottom: 0 }}>
								<Form.Item
									name={'subItemId-' + id}
									className={style["item1"]}
								>
									<Checkbox.Group>
										<Checkbox name={'checkbox' + id} value={id} >{name}</Checkbox>
									</Checkbox.Group>
								</Form.Item>
								<Form.Item
									name={'logicId-' + id}
									className={style["item2"]}
								>
									<Radio.Group name={'radio-' + id} >
										{renderRadioList.map(({id: radioId, value}) => <Radio key={radioId} value={radioId}>{value}</Radio>)}
									</Radio.Group>
								</Form.Item>
							</Form.Item>
						);
							
					})}
				</div>
				<div className={style["btn-area"]}>
					<Button htmlType="button" onClick={() => modalCloseFun()}>取消</Button>
					<Button type="primary" htmlType="submit">确定</Button>
				</div>
			</Form>
		</>
	);
};

export default DialogForm;