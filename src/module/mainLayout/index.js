/*
 * @Author: cdluxy
 * @Desc: 主布局
 * @Date: 2020-04-19 17:09:33
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-04 00:11:56
 */
import React from 'react';
import style from './style.scss?module';
import TopBar from '../topBar';
import LeftMenu from '../leftMenu';
import RightContent from '../rightContent';

const MainLayout = () => {
	return (
		<div className={style['main-Layout']}>
			<div className={style['layout-left']}>
				<div className={style['logo-part']}>临床路径挖掘系统</div>
				<LeftMenu/>
			</div>
			<div className={style['layout-right']}>
				<TopBar/>
				<RightContent/>
			</div>
		</div>
	);
}

export default MainLayout;