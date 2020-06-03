/*
 * @Author: cdluxy
 * @Desc: 队列用的表单
 * @Date: 2020-05-02 22:17:08
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-04 11:05:32
 */
import React, { useState, useEffect} from 'react';
import { Form, Input, Select, Button } from 'antd';
import { mapIndicatorTypeConfig, queueIndicatorLogicalRelation } from 'rootSrc/const';
import style from './style.scss?module';

const { Option } = Select;

let rowId = 1;

const QueueForm = ({modalCloseFun, editCallback, editData}) => {
	const {indicatorId, indicatorList, subList} = editData;
	// debugger;
	const [rowList, setRowList] = useState(() => {
		return indicatorList.map(item => {
			return {rowId: rowId++, ...item};
		});
	});
	const arrLogic = Object.keys(queueIndicatorLogicalRelation).map(key => {return {id: ~~key, ...queueIndicatorLogicalRelation[key]}});
	const arrTextLogic = arrLogic.filter(({type}) => type === 'text');
	const arrNumberLogic = arrLogic.filter(({type}) => type === 'number');
	
	const [form] = Form.useForm();

	/**
	 * 获取指定subItem（选择指标）相匹配的逻辑关系数组，用于生成逻辑关系下拉框
	 * @param {*} subItemId 
	 */
	const getMatchedLogicArr = (subItemId) => {
		const {type: thisType} = subList.find(({id}) => id === subItemId);
		const indicatorType = mapIndicatorTypeConfig[thisType];
		const mapType = {
			'text': arrTextLogic,
			'number': arrNumberLogic
		};
		return mapType[indicatorType];
	}

	const addRow = () => {
		// 新增加项，都默认选中第一个
		const {id} = subList[0];
		const renderArrLogic = getMatchedLogicArr(id);
		setRowList([...rowList, {rowId: rowId++, subItemId: id, logicId: renderArrLogic[0].id, value: ''}]);
	}

	const delRow = (delRowId) => {
		const needDelRowIndex = rowList.findIndex(({rowId}) => rowId === delRowId);
		const delRow = rowList.splice(needDelRowIndex, 1);
		// console.log('delRow:', delRow);
		setRowList([...rowList]);
	}

	const saveValue = (newValue, name, editRowId) => {
		const rowData = rowList.find(({rowId}) => rowId === editRowId);
		if(name === 'subItemId'){
			// 判断是否要同步修改 逻辑关系选项
			const {subItemId: oldId} = rowData;
			const oldSubItem = subList.find(({id}) => id === oldId);
			const {type: oldType} = oldSubItem;
			const newSubItem = subList.find(({id}) => id === newValue);
			const {type: newType} = newSubItem;
			rowData[name] = newValue;
			if(mapIndicatorTypeConfig[oldType] !== mapIndicatorTypeConfig[newType]){
				// 比如选择的指标，由文本类型变成了数值类型，此种情况下需要变更逻辑关系的可供选项，以及清空对应的内容选项
				const renderArrLogic = getMatchedLogicArr(newValue);
				rowData['logicId'] = renderArrLogic[0].id;	// 重置为第一个选项
				rowData['value'] = '';
				setRowList([...rowList]);
			}
		}else{
			rowData[name] = newValue;
			setRowList([...rowList]);
		}
	}

	const onFinish = () => {
		editCallback({indicatorId, indicatorList: rowList});
		modalCloseFun();
	};

	// form.setFieldsValue(editData);
	return (
		<div className={style["wrap"]}>
			<Button className={style['add-btn']} type="primary" htmlType="button" onClick={addRow} ><i>+</i><span>添加</span></Button>
			<Form /* {...layout}  */form={form} name="control-hooks" onFinish={onFinish}>
				{rowList.map(({rowId, subItemId, logicId, value}) => {
					// mapIndicatorTypeConfig
					const renderArrLogic = getMatchedLogicArr(subItemId);

					return <div name="row" key={rowId} className={style["line"]}>
							<Select name="subItemId" className={style["i1"]} defaultValue={subItemId} onChange={(value) => saveValue(value, 'subItemId', rowId)}>
								{subList.map(({id, name}) => {
									return <Option key={id} value={id}>{name}</Option>;
								})}
							</Select>
							<Select name="logicId" className={style["i2"]} value={logicId || renderArrLogic[0].id} onSelect={(value) => saveValue(value, 'logicId', rowId)}>
								{renderArrLogic.map(({id, value, type}) => {
									return <Option key={id} value={id}>{value}</Option>;
								})}
							</Select>
							<Input name="value" className={style["i3"]} value={value} onChange={(e) => saveValue(e.target.value, 'value', rowId)} />
							<i onClick={() => delRow(rowId)}></i>
						</div>;
				})}
				<div className={style["btn-area"]}>
					<Button htmlType="button" onClick={() => modalCloseFun()}>取消</Button>
					<Button type="primary" htmlType="submit">确定</Button>
				</div>
			</Form>
		</div>
	);
};

export default QueueForm;