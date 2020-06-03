/*
 * @Author: cdluxy
 * @Desc: 登录页
 * @Date: 2020-04-19 17:09:33
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 00:52:14
 */
import React from 'react';
import {
	Switch,
	Route,
} from "react-router-dom";
import LoginForm from './loginForm';
import OpenAccount from './openAccount';
import ResetPassword from './resetPassword';

import style from './style.scss?module';

const Login = () => {
	return (
		<div className={style['wrap']}>
			<div className={style["top"]}></div>
			<div className={style["top-logo"]}></div>
			<div className={style["content"]}>
				<Switch>
					<Route path="/contact">
						<OpenAccount/>
					</Route>
					<Route path="/resetPassword">
						<ResetPassword/>
					</Route>
					<Route path="/">
						<LoginForm/>
					</Route>
				</Switch>
			</div>
			<div className={style["bottom"]}>临床路径挖掘系统 信息中心 -JISHUITAN HOSPITAL 京ICP备00000000号 京卫网审字󞪓]第0333号 京公网安备：110100000000</div>
		</div>
	);
}

export default Login;