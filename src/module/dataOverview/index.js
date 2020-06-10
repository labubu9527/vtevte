/*
 * @Author: cdluxy
 * @Desc: 数据概览
 * @Date: 2020-05-16 11:16:43
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-10 23:13:01
 */ 

import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import ReactEcharts from 'echarts-for-react';
import { sendGet } from 'rootSrc/common/request';
// import pimaData from '../../mockData/pima';
import style from './style.scss?module';

const DataOverview = () => {

	const [renderDatas, setRenderDatas] = useState([]);

	// 加载用户列表数据
	useEffect(() => {
		sendGet('/data_overview/overview/pima', { dataset: 'pima' }).then((data) => {
			// setUseTableDataTotal(total);
			// setUseTableDataSource(data);
			setRenderDatas(data);
		});
	}, []);

	const [tempData1 = {}, tempData2 = {}, tempData3 = {}, tempData4 = {}, tempData5 = {}] = renderDatas;
	const {data: renderData1 = []} = tempData1;
	const {data: renderData2 = []} = tempData2;
	const {data: renderData3 = []} = tempData3;
	const {data: renderData4 = []} = tempData4;
	const {data: renderData5 = []} = tempData5;

	// 糖尿病图表配置
	const configTangniaobing = {
		legend: {
			orient: 'horizontal',
			top: 25,
			itemGap: 50,
			itemWidth: 12,
			itemHeight: 12,
			textStyle: {
				fontFamily: 'PingFangSC-Regular',
				fontSize: 13,
				color: '#3F3F3F'
			},
			// data: ['未患糖尿病', '罹患糖尿病']
			data: renderData1.map(({ name }) => name),
		},
		series: [
			{
				name: '',
				type: 'pie',
				top: 60,
				// radius: ['34.5%', '65.5%'],
				radius: ['50', '95'],
				hoverAnimation: false,
				label: {
					show: true,
					formatter: '{d}%',
					color: '#3F3F3F',
					fontFamily: 'PingFangSC-Regular',
					fontSize: 13
				},
				emphasis: {
					label: {
						show: true,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: true,
				},
				/* data: [
					{value: pimaData.filter(({outcome}) => !outcome).length, name: '未患糖尿病'},
					{value: pimaData.filter(({outcome}) => !!outcome).length, name: '罹患糖尿病'},
				] */
				data: renderData1
			}
		],
		color: ['#35ACD0', '#2D4454', '#F08206', '#B7CAC6']
	};

	// 年龄分布图表配置
	const configCategory = {
		tooltip: {
			trigger: 'item',
			position: 'top',
			padding: [10, 27],
			textStyle: {
				fontFamily: 'PingFangSC-Light',
				fontSize: 14,
				color: '#FFFFFF'
			},
			backgroundColor: '#3C3F4E',
			formatter: '<font style="font-family: PingFangSC-Medium; font-size: 16px;">{b}</font><br>人数统计：{c}人'
		},
		xAxis: {
			type: 'category',
			// data: ['< 40岁', '40-59岁', '≥ 60岁'],
			data: renderData2.map(({ name }) => name),
			axisLine: {
				lineStyle: {
					width: 2,
					color: '#E4E7ED'
				},
			},
			nameTextStyle:{
				fontFamily: 'PingFangSC-Regular',
				fontSize: 14,
				color: '#3F3F3F'
			},
			axisTick:{
				show: false
			},
			axisLabel: {
				margin: 12,
				fontamily: 'PingFangSC-Regular',
				fontSize: 14,
				color: '#3F3F3F'
			}
		},
		yAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					width: 2,
					color: '#E4E7ED'
				},
			},
			axisTick:{
				show: false
			},
			axisLabel: {
				margin: 17,
				fontamily: 'PingFangSC-Regular',
				fontSize: 14,
				color: '#3F3F3F'
			}
		},
		series: [{
			// data: [pimaData.filter(({age}) => age < 40).length, pimaData.filter(({age}) => age >= 40 && age <= 59).length, pimaData.filter(({age}) => age >= 60).length],
			data: renderData2.map(({ value }) => value),
			type: 'bar',
			itemStyle: {
				color: '#F08206'
			},
			barWidth: 36
		}]
	};

	// BMI图表配置
	const configBMI = {
		legend: {
			orient: 'horizontal',
			top: 25,
			itemGap: 50,
			itemWidth: 12,
			itemHeight: 12,
			textStyle: {
				fontFamily: 'PingFangSC-Regular',
				fontSize: 14,
				color: '#3F3F3F'
			},
			// data: ['偏瘦', '正常', '超重', '肥胖']
			data: renderData3.map(({ name }) => name),
		},
		series: [
			{
				name: '',
				type: 'pie',
				top: 60,
				// radius: ['34.5%', '65.5%'],
				radius: ['50', '95'],
				hoverAnimation: false,
				label: {
					show: true,
					formatter: '{d}%',
					color: '#3F3F3F',
					fontFamily: 'PingFangSC-Regular',
					fontSize: 13
				},
				emphasis: {
					label: {
						show: true,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: true,
				},
				// data: [
				// 	{value: pimaData.filter(({bmi}) => 30 <= bmi).length, name: '肥胖'},
				// 	{value: pimaData.filter(({bmi}) => 25 <= bmi && bmi < 30).length, name: '超重'},
				// 	{value: pimaData.filter(({bmi}) => 18.5 <= bmi && bmi < 25).length, name: '正常'},
				// 	{value: pimaData.filter(({bmi}) => bmi < 18.5).length, name: '偏瘦'},
				// ]
				data: renderData3
			}
		],
		color: ['#2D4454', '#35ACD0', '#F08206', '#B7CAC6']
	};
	
	// 血压图表配置
	const configXueya = {
		series: [{
			type: 'treemap',
			itemStyle: {
				gapWidth: 8,
			},
			label: {
				show: true,
				position: 'inside',
				formatter: '{b} {c}%',
				color: '#fff',
				fontFamily: 'PingFangSC-Regular',
				fontSize: 14
			},
			nodeClick: false,
			roam: false,
			breadcrumb: {
				show: false
			},
			// data: [{
			// 	name: '正常',            // First tree
			// 	value: (pimaData.filter(({blood_pressure: v}) => 60 <= v && v < 90).length * 100 / pimaData.length).toFixed(1),
			// }, {
			// 	name: '偏低',            // Second tree
			// 	value: (pimaData.filter(({blood_pressure: v}) => v < 60).length * 100 / pimaData.length).toFixed(1),
			// }, {
			// 	name: '偏高',            // Second tree
			// 	value: (pimaData.filter(({blood_pressure: v}) => 90 <= v).length * 100 / pimaData.length).toFixed(1),
			// }]
			data: (() => {
				const total = renderData4.reduce((acc, {value}) => {
					return acc + value;
				}, 0);
				return renderData4.map(({name, value}) => ({name, value: (value * 100 / total).toFixed(1) }))
			})()
		}],
		color: ['#8ACAD3', '#F7C456', '#2D4454'],
	};

	// 怀孕次数图表配置
	// const tempPregnanciesObj = pimaData.reduce((acc, {pregnancies}) => {return acc[pregnancies] = (acc[pregnancies] || 0) + 1, acc}, {});
	const maxPregnanciesTemp = renderData5.sort(({name: num1}, {name: num2}) => num2 - num1)[0];
	const maxPregnanciesNum = maxPregnanciesTemp? maxPregnanciesTemp.name: 0;
	
	const configHuaiyun = {
		tooltip: {
			trigger: 'item',
			position: 'top',
			padding: [10, 27],
			textStyle: {
				fontFamily: 'PingFangSC-Light',
				fontSize: 14,
				color: '#FFFFFF'
			},
			backgroundColor: '#3C3F4E',
			formatter: '<font style="font-family: PingFangSC-Medium; font-size: 16px;">怀孕{b}次</font><br>人数统计：{c}人'
		},
		xAxis: {
			name: '怀孕次数',
			type: 'category',
			// data: new Array(Math.max(...pimaData.map(({pregnancies}) => pregnancies)) + 1).fill(0).map((item, index) => index),
			data: new Array(maxPregnanciesNum + 1).fill(0).map((item, index) => index),
			nameTextStyle:{
				fontFamily: 'PingFangSC-Regular',
				fontSize: 14,
				color: '#3F3F3F',
				padding: [35, 0, 0, 0]
			},
			axisLine: {
				lineStyle: {
					width: 2,
					color: '#E4E7ED'
				},
			},
			axisLabel: {
				margin: 12,
				fontamily: 'PingFangSC-Regular',
				fontSize: 14,
				color: '#3F3F3F'
			}
		},
		yAxis: {
			name: '计数',
			type: 'value',
			nameTextStyle: {
				fontFamily: 'PingFangSC-Regula',
				fontSize: 14,
				color: '#3F3F3F',
				align: 'right',
				padding: [0, 15, 10, 0]
			},
			axisLine: {
				lineStyle: {
					width: 2,
					color: '#E4E7ED'
				},
			},
			axisTick:{
				show: false
			},
			axisLabel: {
				margin: 17,
				fontamily: 'PingFangSC-Regular',
				fontSize: 14,
				color: '#3F3F3F'
			}
		},
		series: [{
			// data: Object.keys(tempPregnanciesObj).map((key) => tempPregnanciesObj[key]),
			data: renderData5.sort(({name: num1}, {name: num2}) => num1 - num2),
			type: 'line',
			lineStyle: {
				width: 4
			},
			itemStyle: {
				color: '#35ACD0',
			},
			symbolSize: 4
		}]
	};

	return (
		<div className={style['wrap']}>
			{renderDatas.length > 0 && <>
				<section>
					<div className={style["left"]}>
						<div className={classNames(style["title"], style["tangniaobing"])}>糖尿病患病情况</div>
						<div className={style["chart-wrap"]}>
							<ReactEcharts
								option={configTangniaobing}
								notMerge={true}
								lazyUpdate={true}
								theme={"theme_name"}
								onChartReady={null}
								onEvents={null}
								opts={null} />
						</div>
					</div>
					<div className={style["right"]}>
						<div className={classNames(style["title"], style["nianling"])}>年龄分布</div>
						<div className={style["chart-wrap"]}>
							<ReactEcharts
								option={configCategory}
								notMerge={true}
								lazyUpdate={true}
								theme={"theme_name"}
								onChartReady={null}
								onEvents={null}
								opts={null} />
						</div>
					</div>
				</section>
				<section>
					<div className={style["left"]}>
						<div className={classNames(style["title"], style["BMI"])}>BMI分布</div>
						<div className={style["chart-wrap"]}>
							<ReactEcharts
								option={configBMI}
								notMerge={true}
								lazyUpdate={true}
								theme={"theme_name"}
								onChartReady={null}
								onEvents={null}
								opts={null} />
						</div>
					</div>
					<div className={style["right"]}>
						<div className={classNames(style["title"], style["xueya"])}>血压情况</div>
						<div className={style["chart-wrap"]}>
							<ReactEcharts
								option={configXueya}
								notMerge={true}
								lazyUpdate={true}
								theme={"theme_name"}
								onChartReady={null}
								onEvents={null}
								opts={null} />
						</div>
					</div>
				</section>
				<section>
					<div className={style["full"]}>
						<div className={classNames(style["title"], style["huaiyun"])}>怀孕次数分布</div>
						<div className={style["chart-wrap"]}>
							<ReactEcharts
								option={configHuaiyun}
								notMerge={true}
								lazyUpdate={true}
								theme={"theme_name"}
								onChartReady={null}
								onEvents={null}
								opts={null} />
						</div>
					</div>
				</section>
			</>}
		</div>
	);
}

export default DataOverview;