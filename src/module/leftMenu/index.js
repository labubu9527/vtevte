/*
 * @Author: cdluxy
 * @Desc: 左侧菜单
 * @Date: 2020-04-25 15:26:31
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-11 00:05:16
 */
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import pagePath from '../../config/pageConfig';
import { useLoginInfo } from '../../hooks/loginInfo';
import style from './style.scss?module';

const currentHashPath = window.location.hash.substring(1);

const LeftMenu = () => {

	const history = useHistory();
	const [openIndex, setOpenIndex] = useState(() => {
		// 初始化默认选中的一级菜单项
		// 满足条件：一级菜单被选中或者其二级菜单被选中
		return pagePath.findIndex(({toPath, subList}) => toPath === currentHashPath || (subList && subList.find((item) => {
			return item.toPath === currentHashPath;
		})) );
	});
	const [activeSubIndex, setActiveSubIndex] = useState(() => {
		// 初始化默认选中的二级菜单项

		return pagePath.reduce((acc, cur) => {
			const {subList} = cur;
			const result = (subList && subList.findIndex((item) => {
				return item.toPath === currentHashPath;
			}));
			return (result === undefined || result === -1)? acc: result;
		}, -1);

		// return pagePath.findIndex(({subList}) => subList && subList.findIndex((item) => {
		// 	return item.toPath === currentHashPath;
		// }));
	});
	const [{ userInfo }] = useLoginInfo();

	const currentUserRole = userInfo.session.role_code;

	const menuClickHandle = (toPath, arrPath, newOpenIndex, newActiveIndex) => {

		if(typeof newOpenIndex === 'number'){
			// 点击一级菜单项的时候，同时重置之前选择的子菜单项
			setActiveSubIndex(-1);
			setOpenIndex(newOpenIndex);
		}

		if(typeof newActiveIndex === 'number'){
			setActiveSubIndex(newActiveIndex);
		}

		sessionStorage.setItem('currentPath', JSON.stringify(arrPath));
		if(toPath.match(/^https?/)){
			window.location.href = toPath;
		}else{
			history.push(toPath);
		}
	};

	return (
		<div className={style['menu-wrap']}>
			{pagePath.map(({name, icon, toPath, subList, roleCode}, index) => {
				const isOpen = index === openIndex;
				const arrPath = [{name, toPath}];
				return ( roleCode.includes(currentUserRole) && <div key={index} className={classNames(style['menu-first'], isOpen? style['open'] : '')}>
					<div onClick={() => menuClickHandle(toPath, arrPath, isOpen? -1: index)} className={style['first-title']}>
						<img className={style['first-icon']} src={icon} alt=""/>
						<span className={style['first-name']}>{name}</span>
						{subList && subList.length > 0 && <span className={style['first-arrow']}></span>}
					</div>
					<div className={style['sub-list']}>
						{subList.map(({name: subName, toPath, roleCode}, subIndex) => {
							const isActive = isOpen && subIndex === activeSubIndex;
							const arrThisPath = [...arrPath];
							arrThisPath.push({name: subName, toPath});
							return (roleCode.includes(currentUserRole) && <div key={'sub' + subIndex} onClick={() => menuClickHandle(toPath, arrThisPath, null, subIndex)}  className={classNames(style['menu-second'], isActive? style['active'] : '')} >{subName}</div>);
						})}
					</div>
				</div>);
			})}
		</div>
	);
}

export default LeftMenu;