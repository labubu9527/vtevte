/*
 * @Author: cdluxy
 * @Desc: 手风琴列表组件（实验步骤展开收缩列表组件）
 * @Date: 2020-04-28 22:56:22
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-05 22:05:47
 */

import React from 'react';
import classNames from 'classnames';
import {useCaseStep} from '../../hooks/caseStep';
import Step1 from './stepContent/step1';
import Step2 from './stepContent/step2';
import style from './style.scss?module';


const Step = () => {

	const [{current: nowStep, stepList}, dispatch] = useCaseStep();
	const activeIndex = nowStep;
	const arrStep = [<Step1/>, <Step2/>];
	
	return (
		<div className={style['wrap']}>
			{stepList.map(({iconWhite, name}, index) => {
				const isActived = index === activeIndex;
				return (
					<div key={index} className={style['item-wrap']}>
						<div className={style["title-wrap"]}>
							<div className={classNames(style['title'], isActived ? style['title-active'] : '')} onClick={() => dispatch({ type: 'set', step: index })} >
								<img src={iconWhite} alt="" /><span>{name}</span><i></i>
							</div>
						</div>
						<div className={classNames['content']}>
							{isActived && (arrStep[index] || <div style={{'textAlign': 'center', 'lineHeight': '100px'}}>开发中~</div>)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Step;