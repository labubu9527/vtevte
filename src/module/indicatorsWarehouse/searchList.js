/*
 * @Author: cdluxy
 * @Desc: 指标结果列表
 * @Date: 2020-05-17 15:31:34
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 20:55:39
 */ 
import React from 'react';
import classNames from 'classnames';
import style from './style.scss?module';


 const mockData = [{
	name_cn: '体重指数',
	count: 768,
	valid_count: 757
 }, {
	name_cn: '舒张压（mmHg）',
	count: 768,
	valid_count: 733
 }, {
	name_cn: '肱三头肌皮下脂肪厚度（mm）',
	count: 768,
	valid_count: 541
 }];

 /**
  * 通过填充率获取对应的样式名
  * @param {*} fillRate 
  */
 function getClassnameByfillRate(fillRate){
	if(fillRate >= 0.75){
		return '';
	}else if(fillRate >= 0.5 && fillRate < 0.75){
		return 'yellow';
	}else{
		return 'red';
	}
 }

 const SearchList = ({activeIndicators, dataList = mockData}) => {

	// console.log('SearchList activeIndicators:', activeIndicators);

	const filterList = dataList.filter(({name_en}) => activeIndicators.includes(name_en));

	return (
		<div className={style["search-list-wrap"]}>
			<div className={style["head"]}>
				<span className={style["col1"]}>字段中文名称</span>
				<span className={style["col2"]}>应覆盖患者人数</span>
				<span className={style["col3"]}>实覆盖患者人数</span>
				<span className={style["col4"]}>填充率</span>
			</div>
			<div className={style["body"]}>
				{filterList.length > 0? filterList.map(({name_cn, count, valid_count}) => {
						const tempVal = valid_count / count;
						const fillRate = Math.round(tempVal * 1000) / 10 + '%';
						return <div key={name_cn} className={classNames(style["row"], style[getClassnameByfillRate(tempVal)])}>
								<span className={style["col1"]}>{name_cn}</span>
								<span className={style["col2"]}>{count}</span>
								<span className={style["col3"]}>{valid_count}</span>
								<span className={style["col4"]}> <span className={style["outer"]}> <span className={style["inner"]} style={{width: fillRate}}>{fillRate}</span></span> </span>
							</div>;
					}) :
					<div className={style["list-tip"]}>左侧选择指标后查看覆盖填充率</div>
				}
			</div>
		</div>
	);

 };

 export default SearchList;