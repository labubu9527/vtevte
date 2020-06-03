/*
 * @Author: cdluxy
 * @Desc: 顶部状态栏工具条
 * @Date: 2020-04-25 22:36:27
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-03 23:40:50
 */
import React from 'react';
import {
	useHistory
} from "react-router-dom";
import { Menu, Dropdown } from 'antd';
import { sendPost } from 'rootSrc/common/request';
import { useLoginInfo } from '../../hooks/loginInfo';
import style from './style.scss?module';


const TopBar = () => {

	const [{ userInfo }, dispatch] = useLoginInfo();
	const history = useHistory();

	const userPhoto = require('./icons/user.png');

	const { session } = userInfo;

	const menuClickHandle = (toPath, arrPath) => {
		sessionStorage.setItem('currentPath', JSON.stringify(arrPath));
		if(history.location.pathname === toPath){		// 如果访问的页面没有变，再次点击尝试进入该页面，则改为重新刷新页面，避免由于hash一样导致对应界面无法重新渲染的问题
			window.location.reload();
		}else{
			history.push(toPath);
		}
	};

	const menu = (
		<Menu>
			<Menu.Item onClick={() => menuClickHandle('/main/editName/', [{name: '修改用户名'}])}>修改用户名</Menu.Item>
			<Menu.Item onClick={() => menuClickHandle('/main/editPassword/', [{name: '修改密码'}])}>修改密码</Menu.Item>
		</Menu>
	);

	const { user_name } = session;

	const logoutHandle = () => {
		// to do 调用登出接口
		sendPost('/logout').then((data) => {
			// 退出成功
			dispatch({type: 'logout'});
			// 跳转到登录页
			history.push("/login");
		});
	};

	return (
		<div className={style['wrap']}>
			<div className={style['user']}>
				<img src={userPhoto} alt="" /><span>{user_name}</span>
				<Dropdown overlay={menu} overlayClassName={style['dropdown-menu']} placement="bottomRight"><i></i></Dropdown>
			</div>
			<div className={style['msg']}>
				{/* <span>{msgTotal}</span> */}
			</div>
			<div className={style['logout']} onClick={logoutHandle} >退出</div>
		</div>
	)
};

export default TopBar;
