/*
 * @Author: cdluxy
 * @Desc: 面包屑-导航用
 * @Date: 2020-04-25 23:38:16
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-10 23:49:57
 */
import React from 'react';
import {Link} from 'react-router-dom';
import pagePath from '../../config/pageConfig';
import style from './style.scss?module';

 const Crumbs = ({hasPath = ''}) => {

	const currentPagePath = pagePath.reduce((acc, cur) => {
		const { toPath, subList } = cur;
		if(toPath === hasPath){
			return cur;
		}else if(subList.length){
			const objItem = subList.find((item) => {
				return item.toPath === hasPath;
			});
			if(objItem){
				return {...objItem, parent: cur};
			}else{
				return acc;
			}
		}else{
			return acc;
		}
	}, null);
	
	if(!currentPagePath){
		console.log('访问的路由路径还没有在 /config/pageConfig 中注册！');
		return null;
	}

	const {name, toPath, parent} = currentPagePath;
	const arr = [{name, toPath}];
	if(parent){
		arr.unshift({...parent});
	}
	
	const pathInfo = JSON.parse(sessionStorage.getItem('currentPath'));

	return (
		<div className={style['wrap']}>
			{Array.isArray(pathInfo) && pathInfo.map(({name, toPath}, index) => {
				const isHead = index === 0;
				const isLast = index === pathInfo.length - 1;
				const arr = [];
				if(!isHead){
					arr.push(<i key={index + '_i'}>></i>);
				}
				// 面包屑导航最后一个不能跳转
				if(isLast){
					arr.push(<span key={index}>{name}</span>);
				}else{
					arr.push(<Link key={index} to={toPath + `/${encodeURIComponent(JSON.stringify([{name, toPath}]))}`}><span key={index}>{name}</span></Link>);
				}
				return arr;
			})}
		</div>
	);
 };

 export default Crumbs;