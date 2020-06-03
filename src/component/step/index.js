/*
 * @Author: cdluxy
 * @Desc: 步骤组件
 * @Date: 2020-04-26 00:28:25
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-01 21:32:09
 */

import React from 'react';
import classNames from 'classnames';
import {useCaseStep} from '../../hooks/caseStep';
import style from './style.scss?module';

const Step = () => {

	const [{current: nowStep, stepList}, dispatch] = useCaseStep();
	const {length: total} = stepList;
	const activeStatus = (() => {
		const arr = new Array(total).fill(false);
		for(let i = 0; i <= nowStep; i++){
			arr[i] = true;
		}
		return arr;
	})();
	
	return (
		<div className={style['wrap']}>
			{stepList.map(({icon, iconActive, name}, index) => {
				const isActived = activeStatus[index];
				const isHead = index === 0;
				const arr = [];
				if(!isHead){
					arr.push(<i className={classNames(isActived? style['line-active']: '')} key={index + '_i'}></i>);
				}
				arr.push(<div onClick={() => dispatch({type: 'set', step: index})} key={index} className={classNames(style['item'], isActived? style['item-active']: '')}>
					<img src={isActived? iconActive: icon} alt=""/>
					<p>{name}</p>
				</div>);
				return arr;
			})}
		</div>
	);
}

export default Step;