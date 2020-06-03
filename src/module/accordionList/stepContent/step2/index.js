/*
 * @Author: cdluxy
 * @Desc: 步骤2-选择数据指标
 * @Date: 2020-05-04 12:55:39
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-06 00:02:53
 */
import React, {useState} from 'react';
import classNames from 'classnames';
import { Modal } from 'antd';
import {allPatientsTotalConfig, queueIndicatorIdToNameConfig, chooseIndicatorLogicalRelation, clinicalStageDataIndicatorsConfig} from 'rootSrc/const';
import mockPatients from 'rootSrc/mockData/patients';
import {useCurrentCase} from 'rootSrc/module/caseDetailPage';
import SectionHead from 'rootSrc/component/sectionHead';
import HeatMap from 'rootSrc/component/heatMap';
import Table from 'rootSrc/component/table';
import DialogForm from './dialogForm';
import style from './style.scss?module';

/**
 * 获取对应筛选条件的患者数量
 * @param {*} type 纳入还是排除。纳入传0，排除传1。
 * @param {*} indicatorList 
 */
async function getSampleSizeByChoosedIndicator (type, indicatorList){
	// 正常业务逻辑应该是，调用接口获取当前诊疗阶段以及包括之前诊疗阶段，所有设置的条件，对应符合条件的患者数量。
	// 先前端写死返回一个随机患者数量。
	return ~~(Math.random() * 10000);
}

/**
 * 获取满足所有纳排筛选条件的患者数量
 * @param {*} includeData 
 * @param {*} excludeData 
 */
async function getTotalSampleSizeByChoosedIndicator (includeData, excludeData){
	// 正常业务逻辑应该是，调用接口获取满足所有选择的纳排条件的患者数量。
	// 先前端写死返回一个随机患者数量。
	return ~~(Math.random() * 10000);
}

/**
 * 从指定用户选择的条件组里返回最后的一个sampleSize，也就是满足此条件时的样本数量
 * @param {*} arr 
 */
function getLastSampleSizeInIndicatorData(arr){
	const sortedArr = [...arr].sort(({id: id1}, {id: id2}) => id2 - id1);
	return sortedArr[0] && sortedArr[0].sampleSize || 0;
}

/**
 * 从指定选择的数据指标对象中获取[{key:'', title:''},...]指标信息，用于表格列的识别
 * @param {*} arrIncludeIndicator 
 */
function getCurrentChooseIndicatorInfo(arrIncludeIndicator, total){
	return arrIncludeIndicator.map(({list = []}) => {
		return [...list.map(({subItemId}) => {
			return {
				// key: subItemId,
				// width: `calc((100% - 200px) / ${total})`,
				width: `${1000 / total}px`,
				dataIndex: subItemId,
				title: queueIndicatorIdToNameConfig[subItemId]
			}
		})];
	}).flat();
}

/**
 * 给表格添加固定展示的1个列
 * @param {*} arr 
 */
function addFixedShowFields(arr){
	const arrFixed = [{
		dataIndex: 0,
		title: '患者ID',
		width: 100
	}];
	return arrFixed.concat(arr);
}

const Content = () => {
	// console.log('mockPatients:', mockPatients);
	const [modalTitle, setModalTitle] = useState('');
	const [visible, setVisible] = useState(false);
	const [editIndicatorData, setEditIndicatorData] = useState();

	const currentCase = useCurrentCase();

	const [caseInfo, setCaseInfo] = useState(currentCase);
	const {observeIndicatorInfo = []} = caseInfo;	// 获取之前保存的观察指标集合信息

	const heatMapUseColsData = observeIndicatorInfo.map((item) => {
		const {id: thisId} = item;
		const {name} = clinicalStageDataIndicatorsConfig.find(({id}) => id === thisId);
		return {name, ...item};
	});

	// 计算底部患者表格，除掉固定列之外，总共有多少列
	const getTotalColExcludeFixedCol = observeIndicatorInfo.reduce((acc, {list}) => {
		return acc + list.length;
	}, 0);

	const arrCurrentIncludeIndicator = getCurrentChooseIndicatorInfo(observeIndicatorInfo, getTotalColExcludeFixedCol);
	
	const closeModal = () => {
		setVisible(false);
	};

	/**
	 * 编辑完某个诊疗阶段弹框确定后的回调处理
	 * @param {*} param0
	 */
	const editIndicator = async ({indicatorId, indicatorList}) => {
		// indicatorId, indicatorList
		const indicatorInfo = caseInfo.observeIndicatorInfo;
		const subItem = indicatorInfo.find(({id}) => id === indicatorId);
		if(subItem){
			subItem.list = indicatorList;
		}else{
			indicatorInfo.push({
				id: indicatorId,
				list: indicatorList,
			});
		}
		setCaseInfo(Object.assign({}, caseInfo));
		
	};

	return (
		<div className={style['wrap']}>
			<div className={style["section1"]}>
				{clinicalStageDataIndicatorsConfig.map(({id, name, icon, subList}, index) => {
					const indicatorData = observeIndicatorInfo;
					const useList = indicatorData.find(({id: indicatorId}) => indicatorId === id);
					const listIndicator = useList || {
						id,
						list: []
					};
					return (
						<div key={index} className={style["stage-wrap"]}>
							<img src={icon} alt=""/>
							<div className={style["stage-item"]}>
								<div className={style["stage-name"]}>{name}</div>
								<div className={style["stage-detail"]}>
									{listIndicator && listIndicator.list.map(({subItemId, logicId}) => {
										const subItem = subList.find(({id}) => id === subItemId);
										const {name: itemName} = subItem;
										return <div key={subItemId}>{itemName}</div>;
									})}
								</div>
							</div>
							<div className={style["stage-ope"]} onClick={() => {
								setModalTitle(name);
								setEditIndicatorData({
									indicatorId: listIndicator.id,
									indicatorList: listIndicator.list,
									subList,
								});
								setVisible(true);
							}}></div>
						</div>
					);
				})}
			</div>
			<div className={style["control-btn"]}>
				<button className={style["go-search"]}>完成指标选择，显示队列数据集</button>
				<button className={style["rechoose"]}>重新选择指标</button>
			</div>
			<SectionHead>查询结果示意图</SectionHead>
			<div className={style["heatMap-wrap"]}>
				<HeatMap observeIndicatorInfo={heatMapUseColsData} dataSource={mockPatients} />
			</div>
			<SectionHead>患者列表</SectionHead>
			<div className={style["atients-table"]}>
				<div className={style["atients-table-head"]}>
					{heatMapUseColsData.map(({name, list}, index) => {
						const {length} = list;
						return <span key={'atients-table' + index} style={{width: `${length / getTotalColExcludeFixedCol * 100}%`}} >{name}</span>
					})}
				</div>
				<Table columns={addFixedShowFields(arrCurrentIncludeIndicator)} dataSource={mockPatients}></Table>
			</div>
			{visible && <Modal
				title={modalTitle}
				visible={true}
				cancelText="取消"
				okText="确定"
				width={720}
				footer={null}
				maskClosable={false}
				onCancel={closeModal}
				>
				<DialogForm modalCloseFun={closeModal} editCallback={editIndicator} editData={editIndicatorData} />
			</Modal>}
		</div>
	);
}

export default Content;