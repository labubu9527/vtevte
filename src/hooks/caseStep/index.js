/*
 * @Author: cdluxy
 * @Desc: 实验/案例步骤控制hook
 * @Date: 2020-04-27 23:23:05
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-02 16:51:42
 */
import React, { useContext, useReducer } from 'react';

const CaseStepContext = React.createContext();
const initialStep = {
	current: 0,
	stepList: [
		{
			icon: require('./icons/1.png'),
			iconActive: require('./icons/1a.png'),
			iconWhite: require('./icons/1w.png'),
			name: '创建患者队列'
		},
		{
			icon: require('./icons/2.png'),
			iconActive: require('./icons/2a.png'),
			iconWhite: require('./icons/2w.png'),
			name: '选择数据指标'
		},
		{
			icon: require('./icons/3.png'),
			iconActive: require('./icons/3a.png'),
			iconWhite: require('./icons/3w.png'),
			name: '临床路径展示'
		},
		{
			icon: require('./icons/4.png'),
			iconActive: require('./icons/4a.png'),
			iconWhite: require('./icons/4w.png'),
			name: '添加评估量表'
		},
		{
			icon: require('./icons/5.png'),
			iconActive: require('./icons/5a.png'),
			iconWhite: require('./icons/5w.png'),
			name: '关键路径展示'
		},
		{
			icon: require('./icons/6.png'),
			iconActive: require('./icons/6.png'),
			iconWhite: require('./icons/6w.png'),
			name: '指标统计分析'
		}
	]
};

export const caseStepReducer = (state, action) => {
	const {stepList} = initialStep;
	const {length: total} = stepList;
	const {type, step} = action;
	switch (type) {
		case 'prev': return {current: step > 0 ? step - 1 : 0, stepList};
		case 'next': return {current: step >= total - 1 ? total - 1 : step + 1, stepList};
		case 'set': return {current: step, stepList};
		default: throw new Error('Unexpected action');
	}
};

export const CaseStepProvider = ({ children }) => {
	const contextValue = useReducer(caseStepReducer, initialStep);
	return (
		<CaseStepContext.Provider value={contextValue}>
			{children}
		</CaseStepContext.Provider>
	);
};

export const useCaseStep = () => {
	const contextValue = useContext(CaseStepContext);
	return contextValue;
};
