/*
 * @Author: cdluxy
 * @Desc: 人群点阵图
 * @Date: 2020-05-04 15:44:12
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-04 17:49:22
 */

import React from 'react';
import classNames from 'classnames';
import style from './style.scss?module';

/**
 * 返回最大数量
 * @param {*} arr 
 */
function getMaxNumber(arr){
	return Math.max(...arr.map(({number}) => number));
}

const Figure = ({list, unit}) => {

	if(!Array.isArray(list)){
		return null;
	}

	const arrItemClassName = [style['blue'], style['red'], style['green']];
	const rowTotal = 4;		// 总共行数
	const rowPerson = 20;	// 每行最大小人数量
	const maxData = getMaxNumber(list);		// 单个最大数据量
	const onePersonNumber = maxData / (rowPerson * rowTotal);		// 单个小人代表的统计数量

	const renderList = list.map(item => {
		const {number} = item;
		const personTotal = Math.ceil(number / onePersonNumber);
		return {personTotal, ...item}
	});

	const {length} = renderList;

	return (
		<div className={style["wrap"]}>
			{renderList.map(({name, number, personTotal}, index) => {
				const isEnd = index === length - 1;
				const needAfterAddArrow = !isEnd;
				const returnArr = [];
				const personArr = [];
				const classNameIndex = index % 3;
				for(let i = 0; i < personTotal; i++){
					personArr.push(
						<i></i>
					);
				}
				returnArr.push(
					<div key={index} className={classNames(style["box"], arrItemClassName[classNameIndex])}>
						<div className={style["person-wrap"]}>{personArr}</div>
						<div className={style["total"]}>
							<span className={style["number"]}>{number}</span><span className={style["unit"]}>{unit}</span>
						</div>
						<div className={style["name"]}>{name}</div>
					</div>
				);
				if(needAfterAddArrow){
					returnArr.push(
						<div key={index + 'arrow'} className={style["arrow"]}></div>
					);
				}
				return returnArr; 
			})}
		</div>
	);
}

export default Figure;