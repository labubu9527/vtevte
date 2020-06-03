/*
 * @Author: cdluxy
 * @Desc: 有无数据的热力图
 * @Date: 2020-05-04 20:57:07
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-05 22:29:26
 */

import React, {useRef} from 'react';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import sheetStyle from './style.scss?module';

 const HeatMap = ({style, observeIndicatorInfo, dataSource}) => {
	// columns={[...columns, opeColumn]} dataSource={dataSource}

	// const person = { "0": 16152, "1": "凤淑华", "2": "女", "3": "5J2F7PV", "4": "独龙族", "5": "", "6": 4, "7": "Z", "8": "", "9": "未查", "10": "3GEUI9N5P3", "11": "BG68F", "12": "7R86JX", "13": "否", "14": "1989/11/13", "15": "", "16": "", "17": "51.61", "18": "40.30", "19": "20.80", "20": "79.13", "21": "67.70", "22": "", "23": "", "24": "1986/9/19", "25": "", "26": "", "27": "", "28": "", "29": "1N", "30": "", "31": "", "32": "", "33": "T7M", "34": "", "35": "QYG", "36": "", "37": "", "38": "8.15", "39": "92.30", "40": "78.39", "41": "60.74", "42": "37.64", "43": "46.49", "44": "95.94", "45": "93.83", "46": "21.79", "47": "15.37", "48": "16.25", "49": "54.36", "50": "", "51": "", "52": "1990/7/15", "53": "", "54": "9P1J", "55": "", "56": "", "57": "IMB6A73KEI", "58": "2001/8/31", "59": "", "60": "", "61": "先天性血栓形成", "62": "", "63": "", "64": "GVG2NEUP", "65": 43, "66": "2006/12/13", "67": "1990/8/11", "68": "", "69": "67NH6OIEV", "70": "", "71": "OWLYU1SXO", "72": "", "73": "", "74": 67, "75": "", "76": "9KORW59JQY", "77": "", "78": "2013/12/27", "79": "", "80": "", "81": "", "82": "1994/10/12", "83": 72, "84": "", "85": 87, "86": "1999/4/25", "87": "", "88": "1993/12/8", "89": "", "90": "8UCYXI", "91": "", "92": "1980/6/2", "93": "", "94": "SI8XKQ", "95": "2003/8/24", "96": "P3PKYVB1OG", "97": "" };
/* 
	const observeIndicatorInfo = [{
		id: 1,
		name: '门诊阶段',
		list: [{
			subItemId: 2,	//	性别 
			logicId: 1,		//	首次
		},
		{
			subItemId: 4,	//	性别 
			logicId: 1,		//	首次
		}]
	},{
		id: 2,
		name: '入院阶段',
		list: [{
			subItemId: 15,	//	性别 
			logicId: 1,		//	首次
		},
		{
			subItemId: 16,	//	性别 
			logicId: 1,		//	首次
		},
		{
			subItemId: 61,	//	性别 
			logicId: 1,		//	首次
		}]
	},{
		id: 3,
		name: '手术治疗',
		list: [{
			subItemId: 68,	//	性别 
			logicId: 1,		//	首次
		}]
	},{
		id: 5,
		name: '康复出院',
		list: [{
			subItemId: 95,	//	性别 
			logicId: 1,		//	首次
		},{
			subItemId: 96,	//	性别 
			logicId: 1,		//	首次
		},{
			subItemId: 97,	//	性别 
			logicId: 1,		//	首次
		}]
	}]; */

	// const columns = [{
	// 	dataIndex: 0,
	// 	title: '患者ID'
	// }, {
	// 	dataIndex: 1,
	// 	title: '患者姓名'
	// }];

	// const dataSource = mockPatients;

	const picList = useRef(null);

	const downloadPic = () => {
		html2canvas(picList.current).then(function(canvas) {
			var hideDiv = document.createElement('div');
			document.body.appendChild(hideDiv);
			hideDiv.style.cssText = 'width:0; height: 0; overflow:hidden';
			hideDiv.appendChild(canvas);
			// 得到图片的base64编码数据
			const picUrl = canvas.toDataURL('image/png');
			const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			save_link.href = picUrl;
			save_link.download = '观察指标鸟瞰图';

			const event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			save_link.dispatchEvent(event);

			document.body.removeChild(hideDiv);
		});
	};

	// 计算除掉固定列之外，总共有多少列
	const getTotalColExcludeFixedCol = observeIndicatorInfo.reduce((acc, {list}) => {
		return acc + list.length;
	}, 0);

	// 自动加上患者ID这栏（这写是固定栏目）
	const columns = [{
		id: 0,
		name: '患者ID',
		list: [{
			subItemId: 0,	//	患者ID
			logicId: 1,		//	首次
		}]
	}, ...observeIndicatorInfo];

	const {name: fixedName, list} = columns[0];
	const {subItemId: fixedSubItemId} = list[0];

	return (
		<div style={style} className={sheetStyle["wrap"]}>
			<div className={sheetStyle["desc"]}>
				<div><i className={sheetStyle["empty-data"]}></i>数据缺失</div>
				<div><i className={sheetStyle["has-data"]}></i>数据存在</div>
			</div>
			<div className={sheetStyle['list-wrap']} >
				<div ref={picList} className={sheetStyle['list']} >
					<div className={sheetStyle["col-id"]}>
						<div className={sheetStyle["col-title"]}>
							{fixedName}
						</div>
						{dataSource.map((item, index) => {
							return <div key={index} className={sheetStyle["item"]}>{item[fixedSubItemId]}</div>
						})}
					</div>
					<div className={sheetStyle["col-other"]}>
						<div className={sheetStyle["col-title-wrap"]}>
							{columns.map(({name, list}, index) => {
								const {length} = list;
								return index > 0 && <span key={'other' + index} className={sheetStyle["col-title"]} style={{width: `${length / getTotalColExcludeFixedCol * 100}%`}} >{name}</span>
							})}
						</div>
						<div className={sheetStyle["col-body"]}>
							{dataSource.map((item, index) => {
								return <div key={index} className={sheetStyle["item-wrap"]}>
										{columns.map(({list}, index) => {
											if(index > 0){
												return list.map(({subItemId}) => {
													const showVal = item[subItemId];
													return <div key={'subItemId' + subItemId} className={classNames(sheetStyle["item"], showVal? '': sheetStyle["empty"])}></div>;
												})
											}else{
												return null;
											}
										})}
									</div>;
							})}
						</div>
					</div>
				</div>
				<div className={sheetStyle["download"]}><i onClick={downloadPic} ></i></div>
			</div>
			<div className={sheetStyle["bottom-tip"]}>观察指标的数据稀疏状况鸟瞰，可以反复修改观察指标选择条件，尽可能避免数据缺失</div>
		</div>
	);
 };

 export default HeatMap;