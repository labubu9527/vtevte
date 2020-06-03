/*
 * @Author: cdluxy
 * @Desc: 不带状态控制的步骤组件
 * @Date: 2020-05-23 14:10:17
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-23 15:04:40
 */

import React from 'react';
import classNames from 'classnames';
import style from './style.scss?module';

const Step = ({stepList, activeStep}) => {

	const {length: total} = stepList;
	const activeStatus = (() => {
		const arr = new Array(total).fill(false);
		for(let i = 0; i <= activeStep; i++){
			arr[i] = true;
		}
		return arr;
	})();
	
	return (
		<div className={style['wrap']}>
			{stepList.map(({name, defaultItemClass = style['default-item'], activeItemClass = style['active-item'], defaultSeparateClass = style['default-separate'], activeSeparateClass = style['active-separate']}, index) => {
				const isActived = activeStatus[index];
				const isHead = index === 0;
				const arr = [];
				if(!isHead){
					arr.push(<i className={classNames(defaultSeparateClass, isActived? activeSeparateClass: '')} key={index + '_i'}></i>);
				}
				arr.push(<div key={index} className={classNames(defaultItemClass, isActived? activeItemClass: '')}>
					<div className={style["box"]}>{index + 1}</div>
					<div className={style["name"]}>{name}</div>
				</div>);
				return arr;
			})}
		</div>
	);
}

export default Step;