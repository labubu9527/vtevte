/*
 * @Author: cdluxy
 * @Desc: 实验项目详情页
 * @Date: 2020-04-26 00:18:44
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-03 16:25:39
 */

import React, { useContext } from 'react';
import {CaseStepProvider} from '../../hooks/caseStep';
import Step from '../../component/step';
import AccordionList from '../accordionList';
import mockData from 'rootSrc/mockData/caseList';
import style from './style.scss?module';


const CaseContext = React.createContext();

const CaseDetailPage = ({caseId}) => {

	// const currentCaseData = window.caseListData.find(({id}) => id === caseId);

	return (
		<CaseContext.Provider value={caseId}>
			<div className={style['wrap']}>
				<CaseStepProvider>
					<div className={style['step-wrap']}>
						<Step/>
					</div>
					<AccordionList/>
				</CaseStepProvider>
			</div>
		</CaseContext.Provider>
	);
}

export const useCurrentCase = () => {
	const caseId = Number(useContext(CaseContext));
	return mockData.find(({id}) => id === caseId);
};

export default CaseDetailPage;