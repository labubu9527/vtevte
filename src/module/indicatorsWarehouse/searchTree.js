/*
 * @Author: cdluxy
 * @Desc: 左侧指标仓库树
 * @Date: 2020-05-17 14:42:08
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-17 20:08:23
 */
import React, {useState} from 'react';
import { Tree, Input } from 'antd';
import style from './style.scss?module';

const { Search } = Input;


const mockData = [
	{name_cn: '调查指标', name_en: '', value_cn: ['年龄', '糖尿病遗传系数', '怀孕次数'], value_en: ['age', 'diabetes_pedigree_function', 'pregnancies']},
	{name_cn: '无创测量指标', name_en: '', value_cn: ['体重指数', '舒张压', '肱三头肌皮下脂肪厚度'], value_en: ['bmi', 'blood_pressure', 'skin_thickness']},
	{name_cn: '有创检测指标', name_en: '', value_cn: ['餐后两小时血糖', '餐后两小时血清胰岛素'], value_en: ['glucose', 'insulin']},
	{name_cn: '结局', name_en: '', value_cn: ['是否患有糖尿病'], value_en: ['outcome']}
];

/**
 * 补全用于初始化树的数据的字段
 * @param {*} arr 
 */
function completeTreeData(arr){
	return arr.map((item, index) => {
		const {name_cn: title, value_cn, value_en} = item;
		return {key: 'treeNode_' + index, title, children: value_cn.map((text, index) => {return {key: value_en[index], title: text}})}
	});
}

const SearchTree = ({setActiveIndicators, treeOriginData = mockData}) => {

	const treeRenderData = completeTreeData(treeOriginData);

// console.log('treeRenderData:', treeRenderData);

	const [status, setStatus] = useState({
		expandedKeys: [],
		searchValue: '',
		autoExpandParent: true,
	});

	const onExpand = expandedKeys => {
		setStatus({
			searchValue,
			expandedKeys,
			autoExpandParent: false,
		});
	};

	const onSelect = (selectedKeys) => {
		if(selectedKeys[0].includes('treeNode')){
			// 点击的是第一层，去获取这层所包含的所有子key
			const level1Node = treeRenderData.find(item => item.key === selectedKeys[0]);
			const {children} = level1Node;
			const arrKey = children.map(({key}) => key);
			setActiveIndicators(arrKey);
		}else{
			// 点击的是第二层具体某个子节点
			setActiveIndicators(selectedKeys);
		}
	};

	const onChange = e => {
		const { value } = e.target;
		const expandedKeys = treeRenderData.map(({children}) => {
				return children && children.map(({key, title}) => value && title.includes(value)? key: null);
			}).flat().filter(item => !!item);
		console.log('onChange expandedKeys:', expandedKeys);
		setStatus({
			expandedKeys,
			searchValue: value,
			autoExpandParent: true,
		});
	};

	// render() {
	const { searchValue, expandedKeys, autoExpandParent } = status;
	const loop = data => {
		return data.map(item => {
			const index = item.title.indexOf(searchValue);
			const beforeStr = item.title.substr(0, index);
			const afterStr = item.title.substr(index + searchValue.length);
			const title =
				index > -1 ? (
					<span>
						{beforeStr}
						<span className={style["search-key-light"]}>{searchValue}</span>
						{afterStr}
					</span>
				) : (
						<span>{item.title}</span>
					);
			if (item.children) {
				return { title, key: item.key, children: loop(item.children) };
			}

			return {
				title,
				key: item.key,
			};
		});
	};
		
	return (
		<div>
			<div className={style["search-bar"]}>
				{/* <Search placeholder="字段名称" onChange={this.onChange} /> */}
				<input type="text" placeholder="输入字段名称自动检索指标" onChange={onChange}/>
				{/* <button type="button">查询</button> */}
			</div>
			<div className={style["tree-wrap"]}>
				<Tree
					className={"indicators-warehouse-tree"}
					showIcon={true}
					onExpand={onExpand}
					onSelect={onSelect}
					expandedKeys={expandedKeys}
					autoExpandParent={autoExpandParent}
					treeData={loop(treeRenderData)}
				/>
			</div>
		</div>
	);
	// }
}

export default SearchTree;