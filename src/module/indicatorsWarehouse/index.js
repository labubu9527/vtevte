/*
 * @Author: cdluxy
 * @Desc: 指标仓库
 * @Date: 2020-05-16 23:25:12
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 20:12:48
 */ 

import React, {useState, useEffect} from 'react';
import { sendGet } from 'rootSrc/common/request';
import SearchTree from './searchTree';
import SearchList from './searchList';
import style from './style.scss?module';

const IndicatorsWarehouse = () => {

	const [activeIndicators, setActiveIndicators] = useState([]);
	const [dataList, setDataList] = useState([]);

	// 加载填充率列表数据
	useEffect(() => {
		sendGet('/data_overview/fill_rate/pima', { dataset: 'pima' }).then((data) => {
			setDataList(data);
		});
	}, []);

	return (
		<div className={style['wrap']}>
			<div className={style["left"]}>
				<SearchTree setActiveIndicators={setActiveIndicators}/>
			</div>
			<div className={style["right"]}>
				<SearchList activeIndicators={activeIndicators} dataList={dataList}/>
			</div>
		</div>
	);
}

export default IndicatorsWarehouse;