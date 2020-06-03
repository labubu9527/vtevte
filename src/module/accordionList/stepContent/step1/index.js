/*
 * @Author: cdluxy
 * @Desc: 步骤1-创建患者队列步骤内容
 * @Date: 2020-05-01 12:55:39
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-05 23:22:21
 */
import React, {useState} from 'react';
import classNames from 'classnames';
import { Modal } from 'antd';
import {allPatientsTotalConfig, queueIndicatorIdToNameConfig, queueConditionConfig, queueIndicatorLogicalRelation } from 'rootSrc/const';
import mockPatients from 'rootSrc/mockData/patients';
import {useCurrentCase} from 'rootSrc/module/caseDetailPage';
import SectionHead from 'rootSrc/component/sectionHead';
import Table from 'rootSrc/component/table';
import QueueForm from './queueForm';
import CrowdFigure from './crowdFigure';
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
function getCurrentChooseIndicatorInfo(arrIncludeIndicator){
	return arrIncludeIndicator.map(({list = []}) => {
		return [...list.map(({subItemId}) => {
			return {
				// key: subItemId,
				dataIndex: subItemId,
				title: queueIndicatorIdToNameConfig[subItemId]
			}
		})];
	}).flat();
}

/**
 * 给表格添加固定展示的两个列
 * @param {*} arr 
 */
function addFixedShowFields(arr){
	const arrFixed = [{
		dataIndex: 0,
		title: '患者ID'
	}, {
		dataIndex: 1,
		title: '患者姓名'
	}];
	return arrFixed.concat(arr);
}

const Content = () => {
	// console.log('mockPatients:', mockPatients);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [modalTitle, setModalTitle] = useState('');
	const [visible, setVisible] = useState(false);
	const [editIndicatorData, setEditIndicatorData] = useState();

	const currentCase = useCurrentCase();

	const [caseInfo, setCaseInfo] = useState(currentCase);
	const {name = '', purpose = '', sampleSize, queueInfo = {indicator: {
		include: [],
		exclude: []
	}}} = caseInfo;

	const {include: includeData, exclude: excludeData} = queueInfo.indicator;

	const [sampleSizeInfo, setSampleSizeInfo] = useState(() => {
		const includeSampleSize = getLastSampleSizeInIndicatorData(includeData);
		const excludeSampleSize = getLastSampleSizeInIndicatorData(excludeData);
		return [{name: '满足纳入条件的患者', number: includeSampleSize}, {name: '满足排除条件的患者', number: excludeSampleSize}, {name: '满足纳排条件的患者', number: sampleSize}];
	});

	const isIncludedTab = activeTabIndex === 0;
	const isExcludedTab = activeTabIndex === 1;

	const arrCurrentIncludeIndicator = getCurrentChooseIndicatorInfo(includeData);

	const closeModal = () => {
		setVisible(false);
	};

	/**
	 * 编辑完某个诊疗阶段弹框确定后的回调处理
	 * @param {*} param0
	 */
	const editIndicator = async ({indicatorId, indicatorList}) => {
		// indicatorId, indicatorList
		const indicatorInfo = caseInfo.queueInfo.indicator[isIncludedTab? 'include': 'exclude'];
		const subItem = indicatorInfo.find(({id}) => id === indicatorId);
		const sampleSize = await getSampleSizeByChoosedIndicator(activeTabIndex, indicatorList);
		if(subItem){
			subItem.sampleSize = sampleSize;
			subItem.list = indicatorList;
		}else{
			indicatorInfo.push({
				id: indicatorId,
				list: indicatorList,
				sampleSize
			});
		}
		setCaseInfo(Object.assign({}, caseInfo));
		
		const sampleTotalSize = await getTotalSampleSizeByChoosedIndicator(includeData, excludeData);
		const includeSampleSize = getLastSampleSizeInIndicatorData(includeData);
		const excludeSampleSize = getLastSampleSizeInIndicatorData(excludeData);
		setSampleSizeInfo([{name: '满足纳入条件的患者', number: includeSampleSize}, {name: '满足排除条件的患者', number: excludeSampleSize}, {name: '满足纳排条件的患者', number: sampleTotalSize}]);
	};

	/**
	 * 判定指定诊疗阶段后面是否选择有条件
	 * @param {*} queueConditionConfigIndex 
	 * @param {*} listIndicator 
	 */
	const isInTheBackHasCondition = (queueConditionConfigIndex, listIndicator) => {
		const arr = queueConditionConfig.slice(queueConditionConfigIndex + 1);
		const has = arr.some(({id}) => {
			return !!listIndicator.find(({id: indicatorId}) => indicatorId === id);
		});
		return has;
	};

	return (
		<div className={style['wrap']}>
			<div className={style["form"]}>
				<div className={style["line"]}>
					<label htmlFor="caseName"></label><input name="" id="caseName" type="text" value={name}/>
				</div>
				<div className={classNames(style["line"], style["nomargin"])}>
					<label htmlFor="casePurpose">案例目的</label><textarea name="" id="casePurpose" cols="30" rows="10" value={purpose}></textarea>
				</div>
			</div>
			<div className={style["title-line"]}>选择纳排指标</div>
			<div className={style["tab-wrap"]}>
				<div className={style["tab-title"]}>
					<span onClick={() => setActiveTabIndex(0)} className={isIncludedTab? style["tab-active"]: ''}>纳入条件</span><span onClick={() => setActiveTabIndex(1)} className={isExcludedTab? style["tab-active"]: ''}>排除条件</span>
				</div>
				<div className={style["tab-title-bottom"]}></div>
				<div className={style["tab-content"]}>
					<div className={style["left"]}>
						<div className={classNames(style["left-title"], style[`left-title-${isIncludedTab? 'include': 'exclude'}`])}>{isIncludedTab? '纳入': '排除'}患者数量</div>
						<div className={style["left-y-line"]}></div>
					</div>
					<div className={style["right"]}>
						{queueConditionConfig.map(({id, name, icon, subList}, index) => {
							const indicatorData = (isIncludedTab? includeData: excludeData);
							const inTheBackHasCondition = isInTheBackHasCondition(index, indicatorData);
							const useList = indicatorData.find(({id: indicatorId}) => indicatorId === id);
							const listIndicator = useList || {
								id,
								sampleSize: 0,
								list: []
							};
							// {
							// 	id: 2,	//	性别 
							// 	logic: 1,	// 逻辑关系：包含
							// 	value: '男,女'
							// }
							return (
								<div key={index} className={style["stage-wrap"]}>
									<div className={classNames(style["sample-size"], isIncludedTab? '': style["sample-size-exclude"], index === 0? style["sample-content-first"]: style["sample-content-other"])}>
										{listIndicator.list.length > 0?
											<>
												<div className={style["sample-content"]}>
													{listIndicator.sampleSize}位
												</div>{inTheBackHasCondition? null: <div className={style["sample-blank-half"]}></div>}
												<div className={style["funnel-icon"]}></div>
											</>: 
											(inTheBackHasCondition? null: <div className={style["sample-blank"]}></div>)
										}
									</div>
									<img src={icon} alt=""/>
									<div className={style["stage-item"]}>
										<div className={style["stage-name"]}>{name}</div>
										<div className={style["stage-detail"]}>
											{/* <div>年龄 > 18</div>
											<div>性别 包含 男,女</div> */}
											{listIndicator && listIndicator.list.map(({subItemId, logicId, value}) => {
												const logicText = queueIndicatorLogicalRelation[logicId].value;
												const subItem = subList.find(({id}) => id === subItemId);
												const {name: itemName} = subItem;
												return <div key={subItemId}>{itemName} {logicText} {value}</div>;
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
				</div>
			</div>
			<div className={style["search-result"]}>
				<div className={style["result-left"]}>
					<img src={require('./icons/search-result.png')} alt=""/>
					<div className={style["tip"]}>
						<div className={style["tip1"]}>搜索结果</div>
						<div className={style["tip2"]}>从<span>{allPatientsTotalConfig}</span>位患者中</div>
					</div>
				</div>
				<div className={style["result-right"]}>
					<CrowdFigure list={sampleSizeInfo} unit={'位'} />
				</div>
			</div>
			<div className={style["control-btn"]}>
				<button className={style["go-search"]}>完成纳排条件设置，搜索符合条件的患者</button>
				<button className={style["rechoose"]}>重新选择纳排指标</button>
			</div>
			<SectionHead>患者列表</SectionHead>
			<div className={style["atients-table"]}>
				<button className={style["edit-table-head"]}>编辑表头</button>
				<Table columns={addFixedShowFields(arrCurrentIncludeIndicator)} dataSource={mockPatients}></Table>
			</div>
			{visible && <Modal
				title={modalTitle}
				visible={true}
				cancelText="取消"
				okText="确定"
				width={554}
				footer={null}
				maskClosable={false}
				onCancel={closeModal}
				>
				<QueueForm modalCloseFun={closeModal} editCallback={editIndicator} editData={editIndicatorData} />
			</Modal>}
		</div>
	);
}

export default Content;